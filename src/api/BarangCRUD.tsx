import { useState, useEffect } from "react";
import { fs, app, auth } from "../constants/firebaseConfig"; // Import konfigurasi Firestore
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  where,
} from "@firebase/firestore"; // Import the 'collection' method from 'firebase/firestore'

import { Barang } from "../type";

// Mengambil list semua barang yang ada di firestore

async function readAllBarang() {
  if (!auth.currentUser) {
    console.error("User not authenticated");
    return;
  }

  try {
    // Membuat referensi ke koleksi 'Barang'
    const barangCollectionRef = collection(fs, "Barang");

    // Mendapatkan semua dokumen dari koleksi 'Barang'
    const barangQuerySnapshot = await getDocs(barangCollectionRef);

    // Mendefinisikan array untuk menyimpan data barang
    const barangArray: Barang[] = [];

    // Mengiterasi dan mengonversi setiap dokumen menjadi tipe Barang
    barangQuerySnapshot.forEach((doc) => {
      const barangData = doc.data() as Barang; // Mengonversi data menjadi tipe Barang
      barangArray.push(barangData); // Menyimpan data barang dalam array
    });


    return barangArray;
  } catch (error) {
    console.error("Error reading barang:", error);
  }
}

export default readAllBarang;
// Contoh panggilan fungsi readAllBarang
//readAllBarang();

// membuat fungsi updateStok

async function updateStok(BarangID: string, Stok: number) {
  if (!auth.currentUser) {
    console.error("User not authenticated");
    return;
  }

  try {
    // Membuat referensi ke dokumen 'Barang' berdasarkan BarangID
    const barangDocRef = doc(fs, "Barang", BarangID);

    // Mengupdate stok barang
    await updateDoc(barangDocRef, {
      Stok: Stok,
    });

    console.log("Stok barang berhasil diupdate");
  } catch (error) {
    console.error("Error updating stok barang:", error);
  }
}
