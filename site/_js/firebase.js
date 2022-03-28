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

// utility for the like count conversion
const likeFormat = num =>
  new Intl.NumberFormat().format(Math.round(num * 10) / 10);

const generateLikeCount = num => {
  if (num >= 1000000) return likeFormat(num / 1000000) + 'M';
  if (num >= 1000) return likeFormat(num / 1000) + 'k';
  return likeFormat(num);
};
// Local emulator configuration
const config = {
  databaseURL: 'http://localhost:9000/?ns=oct-sip-test2',
};

const strings = {
  CARD_CONTAINER: 'card-container',
  HEART_LOGO: 'heart-logo',
  LIKE_COUNT: 'like-count',
  LIKE: 'like',
  CHROME_100: 'chrome-100',
};

// This is required and taken from firebase project settings.
// const config = {
//   apiKey: "AIzaSyB1zPD5QjfGypRydnHE-F6vWaROlHZebSU",
//   databaseURL: "https://oct-sip-test2-default-rtdb.firebaseio.com",
//   projectId: "oct-sip-test2",
//   storageBucket: "oct-sip-test2.appspot.com",
// }

export class Firebase {
  constructor() {
    //Initialize firebase app
    const firebaseApp = initializeApp(config);
    // Need to enable once production instance is ready.
    // this.appCheck = initializeAppCheck(firebaseApp, {
    //   provider: new ReCaptchaV3Provider('6LdHHNweAAAAAA6jtgdZoZ6AFHC2_R4bSnAKY6Fp'),
    //   isTokenAutoRefreshEnabled: true
    // });
    //this.appCheck.activate();

    //Connect to Database
    this.db = getDatabase(firebaseApp);
    //Getting chrome100 database
    this.cardsRef = ref(this.db, strings.CHROME_100);
    //this.cardsRef = ref(this.db,'oct-sip-test2-default-rtdb');
    this.updateLikesCount = this.updateLikesCount.bind(this);
    this.initialize();
    this.readData(this.cardsRef);
  }

  initialize() {
    const self = this;
    const cardContainer = document.querySelector(`.${strings.CARD_CONTAINER}`);
    cardContainer?.addEventListener('click', event => {
      const parent = event.target;

      if (parent.classList.contains(strings.HEART_LOGO)) {
        event.preventDefault();
        const {id, year} = parent.dataset;
        const storedCard = localStorage.getItem(`${strings.CHROME_100}-${id}`);
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
    const childrens = section?.querySelectorAll(`.${strings.LIKE_COUNT}`);
    if (section !== undefined) {
      childrens.forEach((child, idx) => {
        const countLike = generateLikeCount(data[idx].likes);
        child.textContent = `${countLike}`;
        const likeItem = localStorage.getItem(
          `${strings.CHROME_100}-${data[idx].id}`
        );
        if (likeItem !== null) {
          child.previousSibling.previousSibling.classList.add(
            `${strings.LIKE}`
          );
        } else {
          child.previousSibling.previousSibling.classList.remove(
            `${strings.LIKE}`
          );
        }
      });
    }
  }
  // check the card exist on local storage or not
  checkExisis(year, key, parent) {
    runTransaction(this.cardsRef, post => {
      if (post !== null && post[year]) {
        post[year].forEach(item => {
          if (item.id === key.id) {
            if (item.likes === key.likes) {
              item.likes -= 1;
              parent.classList.remove('like');
              localStorage.removeItem(`${strings.CHROME_100}-${item.id}`);
            } else {
              item.likes += 1;
            }
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
        post[year].forEach(item => {
          if (item.id === parseInt(id)) {
            item.likes += 1;
            parent.classList.add(`${strings.LIKE}`);
            localStorage.setItem(
              `${strings.CHROME_100}-${item.id}`,
              JSON.stringify({...item})
            );
          }
        });
      }
      return post;
    });
  }
}

export default new Firebase();
