import { useState, useEffect } from "react";
import { fs, auth, storage } from "../constants/firebaseConfig"; // Import konfigurasi Firestore
import { collection, doc, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Barang } from "../type";
import {
  addDoc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "@firebase/firestore"; // Import the 'collection' method from 'firebase/firestore'

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
    // Membuat query ke koleksi Barang berdasarkan BarangID
    const q = query(collection(fs, "Barang"), where("BarangID", "==", barangID));

    // Mendapatkan dokumen barang dari query
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Mengambil dokumen pertama dari hasil query (jika ada beberapa dokumen dengan BarangID yang sama)
      const barangDocSnap = querySnapshot.docs[0];

      // Mengonversi data menjadi tipe Barang
      const barangData = barangDocSnap.data() as Barang;

      return barangData;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error reading barang by ID:", error);
    return null;
  }
}

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

export async function addBarang(
  BarangID: string,
  NamaBarang: string,
  Kategori: string,
  Harga: number,
  file: File, // Menggunakan file sebagai parameter untuk upload gambar
  Deskripsi: string,
  Stok: number,
  NamaToko: string,
  EmailPengguna: string,
): Promise<void> {
  try {
    // Membuat referensi koleksi 'Barang'
    const barangCollectionRef = collection(fs, 'Barang');

    // Upload gambar ke Firebase Storage
    const storageRef = ref(storage, `Barang/${BarangID}/${file.name}`);
    await uploadBytes(storageRef, file);
    const Foto = await getDownloadURL(storageRef);

    // Data barang yang akan ditambahkan
    const newBarang: Barang = {
      BarangID,
      NamaBarang,
      Kategori,
      Harga,
      Foto, // URL gambar yang diunggah
      Deskripsi,
      Stok,
      NamaToko,
      EmailPengguna,
    };

    // Menambahkan dokumen baru ke koleksi 'Barang' dengan data barang baru
    await addDoc(barangCollectionRef, newBarang);

    console.log('Barang added successfully');
  } catch (error) {
    console.error('Error adding barang:', error);
  }
}

export async function editBarang(
  BarangID: string,
  NamaBarang: string,
  Kategori: string,
  Harga: number,
  file: File | null, // File gambar baru atau null jika tidak ada perubahan gambar
  Deskripsi: string,
  Stok: number,
  NamaToko: string,
  EmailPengguna: string,
): Promise<void> {
  try {
    // Membuat referensi dokumen barang berdasarkan BarangID
    const barangDocRef = doc(fs, 'Barang', BarangID);

    // Mengambil data barang saat ini
    const barangDocSnap = await getDoc(barangDocRef);
    if (!barangDocSnap.exists()) {
      console.error('Barang tidak ditemukan');
      return;
    }

    // Data barang yang akan diupdate
    let updatedData: Partial<Barang> = {
      NamaBarang,
      Kategori,
      Harga,
      Deskripsi,
      Stok,
      NamaToko,
      EmailPengguna,
    };

    // Upload gambar baru jika diberikan
    if (file) {
      const storageRef = ref(storage, `Barang/${BarangID}/${file.name}`);
      await uploadBytes(storageRef, file);
      const Foto = await getDownloadURL(storageRef);
      updatedData = { ...updatedData, Foto }; // Menambahkan URL gambar baru ke data yang diupdate
    }

    // Mengupdate dokumen barang dengan data yang baru
    await updateDoc(barangDocRef, updatedData);
    console.log('Barang updated successfully');
  } catch (error) {
    console.error('Error updating barang:', error);
  }
}

export async function deleteBarang(BarangID: string): Promise<void> {
  try {
    // Membuat referensi dokumen barang berdasarkan BarangID
    const barangDocRef = doc(fs, 'Barang', BarangID);

    // Menghapus dokumen barang
    await deleteDoc(barangDocRef);
    console.log('Barang deleted successfully');
  } catch (error) {
    console.error('Error deleting barang:', error);
  }
}