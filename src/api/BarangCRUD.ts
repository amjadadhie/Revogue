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

export async function readAllBarang() {
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

// Contoh panggilan fungsi readAllBarang
//readAllBarang();

// membuat fungsi updateStok

export async function updateStok(BarangID: string, Stok: number) {
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

export async function readBarangByID(
  barangID: string | undefined
){
  if (!auth.currentUser) {
    console.error("User not authenticated");
    return null;
  }

  try {
    // Membuat referensi ke dokumen barang berdasarkan BarangID
    const barangDocRef = doc(fs, "Barang", String(barangID));

    // Mendapatkan dokumen barang dari referensi
    const barangDocSnap = await getDoc(barangDocRef);
    console.log("asu");

    if (barangDocSnap.exists()) {
      // Mengonversi data menjadi tipe Barang
      const barangData = barangDocSnap.data() as Barang;
      console.log(barangData);

      return barangData;
    } else {
      console.log("No such document! kontol");
      return null;
    }
  } catch (error) {
    console.error("Error reading barang by ID:", error);
    return null;
  }
}

// contoh panggil
// FlanelJokowi = readBarangByID("b001");

// filter barang by harga

export async function filterBarangByHarga(
  minHarga: number,
  maxHarga: number
): Promise<Barang[]> {
  if (!auth.currentUser) {
    console.error("User not authenticated");
    return [];
  }

  try {
    // Membuat referensi ke koleksi 'Barang'
    const barangCollectionRef = collection(fs, "Barang");

    // Membuat query untuk memfilter barang berdasarkan rentang harga
    const q = query(
      barangCollectionRef,
      where("Harga", ">=", minHarga),
      where("Harga", "<=", maxHarga)
    );

    // Mendapatkan dokumen yang memenuhi kriteria query
    const querySnapshot = await getDocs(q);

    // Mendefinisikan array untuk menyimpan data barang yang sesuai
    const filteredBarangArray: Barang[] = [];

    // Mengiterasi dan mengonversi setiap dokumen menjadi tipe Barang
    querySnapshot.forEach((doc) => {
      const barangData = doc.data() as Barang; // Mengonversi data menjadi tipe Barang
      filteredBarangArray.push(barangData); // Menyimpan data barang dalam array
    });

    return filteredBarangArray;
  } catch (error) {
    console.error("Error filtering barang by harga:", error);
    return [];
  }
}
// ini fungsi returnnya mirip sama readAllBarang

export async function searchBarangByName(
  namaBarang: string
): Promise<Barang[]> {
  if (!auth.currentUser) {
    console.error("User not authenticated");
    return [];
  }

  try {
    // Membuat referensi ke koleksi 'Barang'
    const barangCollectionRef = collection(fs, "Barang");

    // Membuat query untuk mencari barang berdasarkan nama
    const q = query(barangCollectionRef, where("NamaBarang", "==", namaBarang));

    // Mendapatkan dokumen yang memenuhi kriteria query
    const querySnapshot = await getDocs(q);

    // Mendefinisikan array untuk menyimpan data barang yang sesuai
    const searchResults: Barang[] = [];

    // Mengiterasi dan mengonversi setiap dokumen menjadi tipe Barang
    querySnapshot.forEach((doc) => {
      const barangData = doc.data() as Barang; // Mengonversi data menjadi tipe Barang
      searchResults.push(barangData); // Menyimpan data barang dalam array
    });

    return searchResults;
  } catch (error) {
    console.error("Error searching barang by name:", error);
    return [];
  }
}
