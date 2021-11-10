import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  /* YOUR FIREBASE CONFIG HERE */
};

if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

let auth = firebase.auth();
let db = firebase.firestore();

export { auth, db };
