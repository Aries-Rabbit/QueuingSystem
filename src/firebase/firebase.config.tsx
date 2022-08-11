import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDCyVeN20IfTDcopBixPezFWa_cdo0VrUw",
  authDomain: "fir-firebase-111c2.firebaseapp.com",
  databaseURL: "https://fir-firebase-111c2-default-rtdb.firebaseio.com",
  projectId: "fir-firebase-111c2",
  storageBucket: "fir-firebase-111c2.appspot.com",
  messagingSenderId: "909774758150",
  appId: "1:909774758150:web:b12873dbb1e503d178be87",
  measurementId: "G-HE684EZYDR"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyBGR0-hxOGsJ3aFMermb0r-Xc3N9ITnnpI",
//   authDomain: "queuing-system-764cf.firebaseapp.com",
//   databaseURL: "https://queuing-system-764cf-default-rtdb.firebaseio.com",
//   projectId: "queuing-system-764cf",
//   storageBucket: "queuing-system-764cf.appspot.com",
//   messagingSenderId: "530892877455",
//   appId: "1:530892877455:web:c3938323b9fbce760c4afa",
//   measurementId: "G-H41ZN1MMVD"
// };




// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);