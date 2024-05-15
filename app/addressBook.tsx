import { useState, useEffect } from "react";
import { fs, app, auth } from './firebaseConfig'; // Import konfigurasi Firestore
import { getFirestore, collection, addDoc, doc, setDoc } from "@firebase/firestore"; // Import the 'collection' method from 'firebase/firestore'

