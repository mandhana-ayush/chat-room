import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDqebVV7l_QBfma9ceiFWl5s8m8-NXiOK8",
  authDomain: "chat-app-new-4008b.firebaseapp.com",
  projectId: "chat-app-new-4008b",
  storageBucket: "chat-app-new-4008b.appspot.com",
  messagingSenderId: "861701484068",
  appId: "1:861701484068:web:38121e2b0049daccc4b2b1",
  measurementId: "G-LWFJZSGWBN"
};

firebase.initializeApp(firebaseConfig);

console.dir(firebase);

const auth = firebase.auth();


const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();


export {provider, auth};
export default db;