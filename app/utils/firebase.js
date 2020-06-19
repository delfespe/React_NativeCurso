import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC2uInZSGC0wcQxWLcf3SO50agnfNGkQVE",
  authDomain: "tenedores-60e31.firebaseapp.com",
  databaseURL: "https://tenedores-60e31.firebaseio.com",
  projectId: "tenedores-60e31",
  storageBucket: "tenedores-60e31.appspot.com",
  messagingSenderId: "716914455653",
  appId: "1:716914455653:web:88ff256a454f4a2e83828c",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
