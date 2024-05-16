import { useState, useEffect } from "react";
import { fs, app, auth } from '../constants/firebaseConfig'; // Import konfigurasi Firestore
import { collection, addDoc, doc, getDoc, updateDoc, getDocs, query, where} from "@firebase/firestore"; // Import the 'collection' method from 'firebase/firestore'

// Mengambil list semua barang yang ada di firestore

async function readAllBarang(){
    if (!auth.currentUser){
        console.error('User not authenticated');
        return;
    }

    try {
        // Membuat referensi ke koleksi 'Barang'
        const barangCollectionRef = collection(fs, 'Barang');

        // Mendapatkan semua dokumen dari koleksi 'Barang'
        const barangQuerySnapshot = await getDocs(barangCollectionRef);

         // Mengiterasi dan mencetak data setiap dokumen
        barangQuerySnapshot.forEach((doc) => {
            const barangData = doc.data();
            console.log('ID Dokumen:', doc.id);
            console.log('BarangID:', barangData.BarangID);
            console.log('Nama Barang:', barangData.NamaBarang);
            console.log('Kategori:', barangData.Kategori);
            console.log('Harga:', barangData.Harga);
            console.log('Link Foto:', barangData.Foto);
            console.log('Deskripsi:', barangData.Deskripsi);
        });     

    }catch (error) {
        console.error('Error reading barang:', error);
    }
}

// Contoh panggilan fungsi readAllBarang
readAllBarang();

