import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCCqPVCmrz5WYfdBcGjlP5ouIYEF2KBMD0",
  authDomain: "locally-stage.firebaseapp.com",
  projectId: "locally-stage",
  storageBucket: "locally-stage.appspot.com",
  messagingSenderId: "147063185191",
  appId: "1:147063185191:web:bdb7de725c221b87ff1302",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
