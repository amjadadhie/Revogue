import { useState, useEffect } from "react";
import { fs, app, auth } from './firebaseConfig'; // Import konfigurasi Firestore
import { getFirestore, collection, addDoc, doc, setDoc } from "@firebase/firestore"; // Import the 'collection' method from 'firebase/firestore'
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
    Alert,
  } from "react-native";
import React from "react";

const [userEmail, setUserEmail] = useState('');

const ProfileScreen = () => {
  
    useEffect(() => {
      // Memastikan bahwa currentUser tidak mungkin kosong sebelum memperbarui userEmail
      if (auth.currentUser) {
        setUserEmail(auth.currentUser.email || '');
      }
    }, []); // Efek hanya akan dijalankan sekali setelah komponen dipasang
}

const [tanggalLahir, setTanggalLahir] = useState('');
const [jenisKelamin, setJenisKelamin] = useState('');
const [nomorTelepon, setNomorTelepon] = useState('');

const currentUser = doc(fs, 'Pengguna/' + userEmail);

const editPengguna = async () => {
    try {
        const docData = {
            tanggalLahir: tanggalLahir,
            jenisKelamin: jenisKelamin,
            nomorTelepon: nomorTelepon,
        }
        await setDoc(currentUser, docData, {merge:true});
        alert('Record updated!');
    } catch (error) {
        console.error("Error updating record: ", error);
    }
}

// tar u buat kode nya di bawah ini, tinggal panggil function editPengguna rak

// contohnya 

{/* <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      /> */}