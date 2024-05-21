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
const [newPassword, setNewPassword] = useState('');
const [confirmNewPassword, setConfirmNewPassword] = useState('');
const [error, setError] = useState('');

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
    file: File | null, // Menggunakan file sebagai parameter untuk upload gambar
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

        // useEffect(() => {
        //     const fetchData = async () => {
        //       try {
        //        const User: Pengguna = await readUser() as Pengguna;
        //        const namaToko: string = User.NamaToko;
        //       } catch (error) {
        //         console.error("Error fetching data:", error);
        //       }
        //     };
        
        //     fetchData();
        //   }, []);

        // Data pengguna yang akan diupdate
        let Foto = '';
    if (file) {
      const storageRef = ref(storage, `Pengguna/${Email}/${file.name}`);
      await uploadBytes(storageRef, file);
      Foto = await getDownloadURL(storageRef);
    }

    // Data pengguna yang akan diupdate
    const updatedData: Pengguna = {
      Email: Email,
      NamaPengguna: NamaPengguna,
      TanggalLahir: TanggalLahir,
      JenisKelamin: JenisKelamin,
      NomorTelepon: NomorTelepon,
      NamaToko: NamaToko,
      Foto: Foto, // Gunakan URL gambar yang diunggah
    };

        // Mengupdate dokumen pengguna dengan data yang baru
        await updateDoc(penggunaDocRef, updatedData);
        console.log('User information updated successfully');
    } catch (error) {
        console.error('Error updating user information:', error);
    }
}
