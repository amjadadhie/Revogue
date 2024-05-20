import { useState, useEffect } from "react";
import { auth, updatePassword } from '../constants/firebaseConfig'; // Import konfigurasi Firestore
// import { getFirestore, collection, addDoc, doc, setDoc } from "@firebase/firestore"; // Import the 'collection' method from 'firebase/firestore'
// import { updatePassword } from '@firebase/auth';

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

// change Password current user 

// const [userEmail, setUserEmail] = useState('');
// const [currentPassword, setCurrentPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmNewPassword, setConfirmNewPassword] = useState('');
const [error, setError] = useState('');

// const ProfileScreen = () => {
  
//     useEffect(() => {
//       // Memastikan bahwa currentUser tidak mungkin kosong sebelum memperbarui userEmail
//       if (auth.currentUser) {
//         setUserEmail(auth.currentUser.email || '');
//       }
//     }, []); // Efek hanya akan dijalankan sekali setelah komponen dipasang
// }

// const currentUser = doc(fs, 'Pengguna/' + userEmail);

export const changePassword = async () => {
    if(newPassword !== confirmNewPassword){
        setError('Password baru dan konfirmasi password baru tidak sama');
        return;
    }
    try {
        if (auth.currentUser) {
            await updatePassword(auth.currentUser, newPassword);
            alert('Password updated!');
        }
    } catch (error) {
        console.error("Error updating password: ", error);
    }
}

// tar u buat kode nya di bawah ini, tinggal panggil function changePassword rak