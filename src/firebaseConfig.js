import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCalDwo0weYn1l8GSc2WzRMdhnEi7PVATA",
    authDomain: "devs-united-834e1.firebaseapp.com",
    projectId: "devs-united-834e1",
    storageBucket: "devs-united-834e1.appspot.com",
    messagingSenderId: "1000155230616",
    appId: "1:1000155230616:web:241d812d00f6005ad73bed"
};

//initialize firebase
firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();
export default firebase;