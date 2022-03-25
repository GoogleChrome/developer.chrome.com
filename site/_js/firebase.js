/**
 * @fileoverview Firebase integration.
 */
import {initializeApp} from 'firebase/app';
//import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import {getDatabase, ref, runTransaction, onValue} from 'firebase/database';

export class Firebase {
  constructor() {
    this.config = null;
    // For local Firebase Emulator
    if (location.hostname === 'localhost') {
      this.config = {
        databaseURL: 'http://localhost:9000/?ns=oct-sip-test2',
      };
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
    const buttons = document.querySelectorAll('.heart-logo');
    const self = this;
    for (const button of buttons) {
      button?.addEventListener('click', function (e) {
        e.preventDefault();
        const state = this.classList.toggle('like');
        const {id, year} = this.dataset;
        const storedCard = localStorage.getItem(id);
        if (storedCard !== null) {
          self.checkExisis(year, JSON.parse(storedCard));
        } else {
          self.updateLikesCount(year, id, state);
        }
      });
    }
  }

  readData(cards) {
    onValue(cards, snapshot => {
      const data = snapshot.val();
      console.log(data);
      for (const year in data) {
        this.updateLikeCount(year, data[year]);
      }
    });
  }

  // Update the likes value
  updateLikeCount(year, data) {
    const section = document.getElementById(`section${year}`);
    const childrens = section?.querySelectorAll('.like-count');
    childrens.forEach((child, idx) => {
      child.innerHTML = `${data[idx].likes}`;
    });
  }

  // check the card exist on local storage or not
  checkExisis(year, key) {
    runTransaction(this.cardsRef, post => {
      if (post !== null && post[year]) {
        post[year].map(item => {
          if (item.id === key.id && item.likes === key.likes) {
            item.likes -= 1;
          } else if (item.id === key.id) {
            item.likes += 1;
          }
        });
      }
      return post;
    });
  }

  // Update like count
  updateLikesCount(year, id, state) {
    runTransaction(this.cardsRef, post => {
      if (post !== null && post[year]) {
        post[year].map(item => {
          if (item.id === id) {
            if (state) {
              item.likes += 1;
              localStorage.setItem(item.id, JSON.stringify(item));
            } else {
              item.likes !== 0 ? (item.likes -= 1) : (item.likes = 0);
            }
          }
        });
      }
      return post;
    });
  }
}

export default new Firebase();
