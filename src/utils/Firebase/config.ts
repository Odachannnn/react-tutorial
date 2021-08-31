import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyArBPmgL8XnGklY5aB_i7mILOUKQIBug9E",
    authDomain: "react-bootcamp-41d44.firebaseapp.com",
    projectId: "react-bootcamp-41d44",
    storageBucket: "react-bootcamp-41d44.appspot.com",
    messagingSenderId: "590098834693",
    appId: "1:590098834693:web:3646ffc5b9a2fd33a2036c"
};

firebase.initializeApp(firebaseConfig);

export const fireAuth = firebase.auth();

export const storage = firebase.storage();

export default firebase;
