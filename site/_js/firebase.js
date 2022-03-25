// @ts-nocheck
/**
 * @fileoverview Firebase integration.
 */

// Since it has been used for single page chrome-100, so done via CDN.
import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import {
  getDatabase,
  ref,
  runTransaction,
  onValue,
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';


export class Firebase {
  constructor() {
    this.config = null;
    // For local Firebase Emulator
    if (location.hostname === 'localhost') {
      this.config = {
        databaseURL: 'http://localhost:9000/?ns=oct-sip-test2',
      };
      // This is required and taken from firebase project settings.
      // this.config = {
      //   apiKey: "AIzaSyB1zPD5QjfGypRydnHE-F6vWaROlHZebSU",
      //   authDomain: "oct-sip-test2.firebaseapp.com",
      //   databaseURL: "https://oct-sip-test2-default-rtdb.firebaseio.com",
      //   projectId: "oct-sip-test2",
      //   storageBucket: "oct-sip-test2.appspot.com",
      //   messagingSenderId: "802581884830",
      //   appId: "1:802581884830:web:54daed54011bd73be6f08f"
      // }
    }

    //Initialize firebase app
    this.firebase = initializeApp(this.config);
    // Need to enable once production instance is ready.
    // this.appCheck = initializeAppCheck(this.firebase, {
    //   provider: new ReCaptchaV3Provider('6LdHHNweAAAAAA6jtgdZoZ6AFHC2_R4bSnAKY6Fp'),
    //   isTokenAutoRefreshEnabled: true
    // });
    //this.appCheck.activate();

    //Connect to Database
    this.db = getDatabase(this.firebase);
    //Getting chrome100 database
    this.cardsRef = ref(this.db, 'chrome100');
    //this.cardsRef = ref(this.db,'oct-sip-test2-default-rtdb');

    this.updateLikesCount = this.updateLikesCount.bind(this);
    this.initialize();
    this.readData(this.cardsRef);
  }

  initialize() {
    const self = this;
    const cardContainer = document.querySelector('.card-container');
    cardContainer?.addEventListener('click', event => {
      const parent = event.target;

      if (parent.classList.contains('heart-logo')) {
        event.preventDefault();
        const {id, year} = parent.dataset;
        const storedCard = localStorage.getItem(id);
        if (storedCard !== null) {
          self.checkExisis(year, JSON.parse(storedCard), parent);
        } else {
          self.updateLikesCount(year, id, parent);
        }
      }
    });
  }

  readData(cards) {
    onValue(cards, snapshot => {
      const data = snapshot.val();
      for (const year in data) {
        this.updateDomNodeCount(year, data[year]);
      }
    });
  }

  // Update the likes value
  updateDomNodeCount(year, data) {
    const section = document.getElementById(`section${year}`);
    const childrens = section?.querySelectorAll('.like-count');
    childrens.forEach((child, idx) => {
      child.innerText = `${data[idx].likes}`;
      const likeItem = localStorage.getItem(data[idx].id);
      if (likeItem !== null) {
        child.previousSibling.previousSibling.classList.add('like');
      } else {
        child.previousSibling.previousSibling.classList.remove('like');
      }
    });
  }

  // check the card exist on local storage or not
  checkExisis(year, key, parent) {
    runTransaction(this.cardsRef, post => {
      if (post !== null && post[year]) {
        post[year].map(item => {
          if (item.id === key.id && item.likes === key.likes) {
            item.likes -= 1;
            parent.classList.remove('like');
            localStorage.removeItem(item.id);
          }
        });
      }
      return post;
    });
  }

  // Update like count
  updateLikesCount(year, id, parent) {
    runTransaction(this.cardsRef, post => {
      if (post !== null && post[year]) {
        post[year].map(item => {
          if (item.id === parseInt(id)) {
            item.likes += 1;
            parent.classList.add('like');
            localStorage.setItem(item.id, JSON.stringify({...item}));
          }
        });
      }
      return post;
    });
  }
}

export default new Firebase();
