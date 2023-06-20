//import * as firebase from "firebase";
import firebase from "firebase/compat/app";
//import "firebase/firestore";
import 'firebase/compat/storage'
import "firebase/compat/firestore";
import 'firebase/compat/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGqcv6XJ5qo5l0VRsJsK4jBFcHkAItvJI",
  authDomain: "vladimiruwu-e9170.firebaseapp.com",
  projectId: "vladimiruwu-e9170",
  storageBucket: "vladimiruwu-e9170.appspot.com",
  messagingSenderId: "564413740608",
  appId: "1:564413740608:web:a8aa9d18c2eebafde6d1a5",
};

  firebase.initializeApp(firebaseConfig);
  const firestore = firebase.firestore();
  const storage = firebase.storage();

export { firestore, storage, firebase as default };

//firebase.initializeApp(config);
//export default firebase.firestore();

