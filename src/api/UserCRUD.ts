import { useState, useEffect } from "react";
import { auth, updatePassword, fs } from '../constants/firebaseConfig'; // Import konfigurasi Firestore
// import { getFirestore, collection, addDoc, doc, setDoc } from "@firebase/firestore"; // Import the 'collection' method from 'firebase/firestore'
// import { updatePassword } from '@firebase/auth';
import { Pengguna } from "../type";
import {
    addDoc,
    getDoc,
    updateDoc,
    getDocs,
    query,
    where,
    doc,
  } from "@firebase/firestore"; // Import the 'collection' method from 'firebase/firestore'


// change Password current user 

// const [userEmail, setUserEmail] = useState('');
// const [currentPassword, setCurrentPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmNewPassword, setConfirmNewPassword] = useState('');
const [error, setError] = useState('');


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


export async function editPengguna(
    Email: string,
    NamaPengguna: string,
    TanggalLahir: Date,
    JenisKelamin: string,
    NomorTelepon: string
): Promise<void> {
    if (!auth.currentUser) {
        console.error('User not authenticated');
        return;
    }

    try {
        // Membuat referensi dokumen pengguna berdasarkan email
        const penggunaDocRef = doc(fs, 'Pengguna', Email);

        // Data pengguna yang akan diupdate
        const updatedData: Pengguna = {
            Email: Email,
            NamaPengguna: NamaPengguna,
            TanggalLahir: TanggalLahir,
            JenisKelamin: JenisKelamin,
            NomorTelepon: NomorTelepon
        };

        // Mengupdate dokumen pengguna dengan data yang baru
        await updateDoc(penggunaDocRef, updatedData);
        console.log('User information updated successfully');
    } catch (error) {
        console.error('Error updating user information:', error);
    }
}
