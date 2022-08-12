import firebase from 'firebase/app';
//import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC7gLhvrBxU8Q6fQ8VU2a9ve3EwSw_jJrc",
    authDomain: "agmanager-d266e.firebaseapp.com",
    projectId: "agmanager-d266e",
    storageBucket: "agmanager-d266e.appspot.com",
    messagingSenderId: "189115312248",
    appId: "1:189115312248:web:208761a04223d246bd658d"
  };
  
  // Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
