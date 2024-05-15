// create home screen
import React from 'react';
import { View, Text } from 'react-native';
import { fs, app } from '../firebaseConfig'; // Import konfigurasi Firestore
import { getFirestore, collection, addDoc, doc, setDoc } from "@firebase/firestore"; // Import the 'collection' method from 'firebase/firestore'

const HomeScreen = () => {
    return (
        <View>
            <Text>Home Screen</Text>
        </View>
    );
};

export default HomeScreen;

const addRecord = async () => {
    try {
      await setDoc(doc(fs, "Pengguna", 'testing1@gmail.com'), {
        email: 'testing1@gmail.com',
        username: 'testing1',
      });
      alert('Record added!');
    } catch (error) {
      console.error("Error adding record: ", error);
    }
};

addRecord();

