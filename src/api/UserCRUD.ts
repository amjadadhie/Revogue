import { useState, useEffect } from "react";
import { auth, updatePassword, fs, storage } from '../constants/firebaseConfig'; // Import konfigurasi Firestore
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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


export async function readUser(): Promise<Pengguna | null> {
    if (!auth.currentUser) {
        console.error('User not authenticated');
        return null;
    }

    const userEmail = auth.currentUser.email;
    if (!userEmail) {
        console.error('User email is not available');
        return null;
    }

    try {
        // Membuat referensi dokumen pengguna berdasarkan email
        const userDocRef = doc(fs, 'Pengguna', userEmail);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            // Mengambil data pengguna dari dokumen
            const userData = userDocSnap.data() as Pengguna;
            return userData;
        } else {
            console.log('No such document!');
            return null;
        }
    } catch (error) {
        console.error('Error reading user:', error);
        return null;
    }
}

export const changePassword = async () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
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
    NamaToko: string,
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
  
      // Data pengguna yang akan diupdate tanpa mengubah foto
      const updatedData: Partial<Pengguna> = {
        NamaPengguna,
        TanggalLahir,
        JenisKelamin,
        NomorTelepon,
        NamaToko,
      };
  
      // Mengupdate dokumen pengguna dengan data yang baru
      await updateDoc(penggunaDocRef, updatedData);
      console.log('User information updated successfully');
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  }

  export async function editFotoPengguna(Email: string, fotoUrl: string): Promise<void> {
    if (!auth.currentUser) {
      console.error('User not authenticated');
      return;
    }
  
    try {
      // Membuat referensi dokumen pengguna berdasarkan email
      const penggunaDocRef = doc(fs, 'Pengguna', Email);
  
      // Data pengguna yang akan diupdate dengan URL foto baru
      const updatedData: Partial<Pengguna> = {
        Foto: fotoUrl
      };
  
      // Mengupdate dokumen pengguna dengan foto yang baru
      await updateDoc(penggunaDocRef, updatedData);
      console.log('User photo updated successfully');
    } catch (error) {
      console.error('Error updating user photo:', error);
    }
  }
