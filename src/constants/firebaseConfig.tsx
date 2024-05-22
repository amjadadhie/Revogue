import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, updatePassword, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAebuVJZ3pCXOhmc1vlkhz24kORBCChvQ8",
  authDomain: "revogue-4f36f.firebaseapp.com",
  databaseURL: "https://revogue-4f36f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "revogue-4f36f",
  storageBucket: "revogue-4f36f.appspot.com",
  messagingSenderId: "960511554500",
  appId: "1:960511554500:web:2ecc062e8656dba4feaa91",
  measurementId: "G-NCDEV0RC44",
};

const app = initializeApp(firebaseConfig);
const fs= getFirestore(app);
const auth = initializeAuth(app);
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage)})
const storage = getStorage(app);

export { fs, app, auth, updatePassword, storage };