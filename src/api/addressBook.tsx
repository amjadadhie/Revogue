import { useState, useEffect } from "react";
import { fs, app, auth } from '../constants/firebaseConfig'; // Import konfigurasi Firestore
import { collection, addDoc, doc, getDoc, updateDoc, getDocs, query, where} from "@firebase/firestore"; // Import the 'collection' method from 'firebase/firestore'

// Mengambil list address akun yang sedang login (baca alamat)
async function readAddress() {
    if (!auth.currentUser) {
        console.error('User not authenticated');
        return;
    }

    const userEmail = auth.currentUser.email;
    if (!userEmail) {
        console.error('User email is not available');
        return;
    }

    try {
        // Mengambil dokumen pengguna berdasarkan email

        const currentUserDocRef = doc(fs, 'Pengguna', userEmail);
        const currentUserDocSnap = await getDoc(currentUserDocRef);

        if (currentUserDocSnap.exists()) {
            // Jika dokumen pengguna ada, coba mengambil alamat pengguna
            const addressCollectionRef = collection(currentUserDocRef, 'AlamatPengguna'); // Use the 'collection' method to create a reference to the 'AlamatPengguna' collection
            const addressQuerySnapshot = await getDocs(addressCollectionRef); // Use the 'getDocs' function to retrieve the documents from the collection
            
            // testing print di console
            addressQuerySnapshot.forEach((addressDoc) => {
                const addressData = addressDoc.data();
                console.log('Nama Alamat:', addressData.NamaAlamat);
                console.log('Nama Jalan:', addressData.NamaJalan);
                console.log('Detail Alamat:', addressData.DetailAlamat);
                console.log('Kode Pos:', addressData.KodePos);
                console.log('---------------------------------');
            });
        }
        console.log('User document does not exist');
        }
     catch (error) {
        console.error('Error reading address:', error);
    }
}

// Contoh panggilan fungsi readAddress
readAddress();


// buat fungsi addAddress (tambah alamat)

async function addAddress(NamaAlamat: string, NamaJalan: string, DetailAlamat: string, KodePos: string) {
    if (!auth.currentUser) {
        console.error('User not authenticated');
        return;
    }

    const userEmail = auth.currentUser.email;
    if (!userEmail) {
        console.error('User email is not available');
        return;
    }

    try {
        // Membuat referensi koleksi 'AlamatPengguna' di bawah dokumen pengguna yang sesuai dengan email
        const addressCollectionRef = collection(fs, 'Pengguna', userEmail, 'AlamatPengguna');

        // Data alamat yang akan ditambahkan
        const addressData = {
            NamaAlamat: NamaAlamat,
            NamaJalan: NamaJalan,
            DetailAlamat: DetailAlamat,
            KodePos: KodePos
        };

        // Menambahkan dokumen baru ke koleksi 'AlamatPengguna'
        await addDoc(addressCollectionRef, addressData);
        console.log('Address added successfully');
    } catch (error) {
        console.error('Error adding address:', error);
    }
}

// Contoh panggilan fungsi addAddress
addAddress('Rumah', 'Jalan ABC', '123', '12345');


// fungsi editAddress (edit alamat yang ingin diedit)

async function editAddress(NamaAlamat: string, NamaAlamatBaru: string, NamaJalan: string, DetailAlamat: string, KodePos: string ) {
    if (!auth.currentUser) {
        console.error('User not authenticated');
        return;
    }

    const userEmail = auth.currentUser.email;
    if (!userEmail) {
        console.error('User email is not available');
        return;
    }

    try {
        // Membuat referensi koleksi 'AlamatPengguna' di bawah dokumen pengguna yang sesuai dengan email
        const addressCollectionRef = collection(fs, 'Pengguna', userEmail, 'AlamatPengguna');

        // Membuat query untuk mencari dokumen alamat dengan namaAlamat yang sesuai
        const q = query(addressCollectionRef, where('NamaAlamat', '==', NamaAlamat));
        const querySnapshot = await getDocs(q);

        // Mengupdate dokumen alamat yang ditemukan
        querySnapshot.forEach(async (doc) => {
            const addressDocRef = doc.ref;
            const newData = {
                NamaAlamat: NamaAlamatBaru,
                NamaJalan: NamaJalan,
                DetailAlamat: DetailAlamat,
                KodePos: KodePos
            };

            await updateDoc(addressDocRef, newData);
            console.log('Address updated successfully');
        });

    } catch (error) {
        console.error('Error updating address:', error);
    }
}

// Contoh panggilan fungsi editAddress untuk mengedit alamat dengan namaAlamat 'Rumah'
editAddress('Rumah Lama','Rumah Baru','Jalan XYZ','Dago, Bandung', '67890');


