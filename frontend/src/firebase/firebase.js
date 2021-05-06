import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqxtULUkJQt1xkm-2s8FM9oonp02xw7uo",
  authDomain: "project-uas-749b6.firebaseapp.com",
  databaseURL: "https://project-uas-749b6-default-rtdb.firebaseio.com",
  projectId: "project-uas-749b6",
  storageBucket: "project-uas-749b6.appspot.com",
  messagingSenderId: "1071814959299",
  appId: "1:1071814959299:web:9e074c791613f692e2c276",
  measurementId: "G-H9TYWGJ8LH",
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;
