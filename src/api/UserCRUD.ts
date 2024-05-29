import { useState, useEffect } from "react";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { auth, fs } from '../constants/firebaseConfig'; // Import konfigurasi Firestore
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

export async function gantiPassword (
  currentPassword: string,
  newPassword: string,
  confirmNewPassword: string,
): Promise<void> {
    
  if (!auth.currentUser) {
    console.error("User not authenticated");
    return;
  }

  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(user.email!, currentPassword);

  try {
    // Re-authenticate the user with the current password
    await reauthenticateWithCredential(user, credential);
    if(newPassword !== confirmNewPassword){
      console.error("New password does not match");      
      return;
  }
    // If re-authentication is successful, update the password
    await updatePassword(user, newPassword);
    console.log('Password updated successfully!');
    } catch (error) {
        console.error("Error updating password: ", error);
    }
}

export async function editPengguna(
    Email: string,
    NamaToko: string | null,
    NamaPengguna: string| null,
    TanggalLahir: Date| null,
    JenisKelamin: string| null,
    NomorTelepon: string| null,
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
