import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAIe3dfnYOhK9GEcm1CUB5yyi2l15iaemc",
    authDomain: "real-final-project-ddd.firebaseapp.com",
    projectId: "real-final-project-ddd",
    storageBucket: "real-final-project-ddd.appspot.com",
    messagingSenderId: "920665587480",
    appId: "1:920665587480:web:8d9c1520410defa8b1e86d",
    measurementId: "G-84M0RDVZPV"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();