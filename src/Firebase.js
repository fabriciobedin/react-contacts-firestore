import * as firebase from 'firebase';

const settings = { timestampsInSnapshots: true };

const firebaseConfig = {
  apiKey: "AIzaSyACTFCGKWy1u-uQytgF_DH4Pdq0VwKtl-A",
  authDomain: "react-contacts-firestore.firebaseapp.com",
  databaseURL: "https://react-contacts-firestore.firebaseio.com",
  projectId: "react-contacts-firestore",
  storageBucket: "react-contacts-firestore.appspot.com",
  messagingSenderId: "1041900550734",
  appId: "1:1041900550734:web:f3af122fb8f4cd633be11f",
  measurementId: "G-P6HRB2BZJS"
};
firebase.initializeApp(firebaseConfig);

firebase.firestore().settings(settings);

export default firebase;