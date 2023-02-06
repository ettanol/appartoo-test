// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDweoh2Y-TDW_kn8eCftg0oPJatfID01Pk",
  authDomain: "appart-d3a79.firebaseapp.com",
  projectId: "appart-d3a79",
  storageBucket: "appart-d3a79.appspot.com",
  messagingSenderId: "407326484464",
  appId: "1:407326484464:web:f41d9214e76c54938d5f35",
  measurementId: "G-DJ087GZHDW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);