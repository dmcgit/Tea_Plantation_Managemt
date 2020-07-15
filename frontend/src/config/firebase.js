import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBT3wUWTGQ4M8rpXXOvUYTwYqDC052KMC0",
    authDomain: "managemt-systm.firebaseapp.com",
    databaseURL: "https://managemt-systm.firebaseio.com",
    projectId: "managemt-systm",
    storageBucket: "managemt-systm.appspot.com",
    messagingSenderId: "943192217594",
    appId: "1:943192217594:web:47289a9fcf605c26d2f643"
  };
  
  firebase.initializeApp(config);
  const database = firebase.database();



  export default firebase;