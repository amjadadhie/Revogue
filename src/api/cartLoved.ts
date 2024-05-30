import { collection, getDocs, doc, getDoc, addDoc, onSnapshot } from 'firebase/firestore';
import { auth, fs } from '../constants/firebaseConfig'; // Pastikan Anda mengimpor auth dan fs dari file konfigurasi Firebase
import { Keranjang, Tandai } from '../type'; // Pastikan Anda mengimpor tipe Keranjang
import {
    updateDoc,
    query,
    where,
    deleteDoc,
  } from "@firebase/firestore"; // Import the 'collection' method from 'firebase/firestore'
import { useState, useEffect } from "react";

export async function readKeranjang(): Promise<Keranjang[]> {
    if (!auth.currentUser) {
        console.error('User not authenticated');
        return [];
    }

    const userEmail = auth.currentUser.email;
    if (!userEmail) {
        console.error('User email is not available');
        return [];
    }

    try {
        const currentUserDocRef = doc(fs, 'Pengguna', userEmail);
        const currentUserDocSnap = await getDoc(currentUserDocRef);

        if (currentUserDocSnap.exists()) {
            const keranjangCollectionRef = collection(currentUserDocRef, 'DaftarKeranjang');
            const keranjangQuerySnapshot = await getDocs(keranjangCollectionRef);

            const keranjangList: Keranjang[] = [];
            keranjangQuerySnapshot.forEach((keranjangDoc) => {
                const keranjangData = keranjangDoc.data() as Keranjang;
                keranjangList.push(keranjangData);
            });

            return keranjangList;
        } else {
            console.log('User document does not exist');
            return [];
        }
    } catch (error) {
        console.error('Error reading keranjang:', error);
        return [];
    }
}


export async function readTandai(): Promise<Tandai[] | void> {
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
            // Jika dokumen pengguna ada, coba mengambil daftar tandai pengguna
            const tandaiCollectionRef = collection(currentUserDocRef, 'DaftarTandai');
            const tandaiQuerySnapshot = await getDocs(tandaiCollectionRef);
            
            const tandaiList: Tandai[] = [];

            // Mendefinisikan array untuk menyimpan data tandai
            tandaiQuerySnapshot.forEach((tandaiDoc) => {
                const tandaiData = tandaiDoc.data() as Tandai;
                tandaiList.push(tandaiData);
                console.log('BarangID:', tandaiData.BarangID);
                console.log('---------------------------------');
            });

            return tandaiList; // Mengembalikan daftar tandai
        } else {
            console.log('User document does not exist');
        }
    } catch (error) {
        console.error('Error reading tandai:', error);
    }
}

export async function addKeranjang(BarangID: string, Harga: number) {
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
        // Membuat referensi koleksi 'DaftarKeranjang' di bawah dokumen pengguna yang sesuai dengan email
        const keranjangCollectionRef = collection(fs, 'Pengguna', userEmail, 'DaftarKeranjang');

        // Membuat query untuk mencari dokumen keranjang dengan BarangID yang sesuai
        const q = query(keranjangCollectionRef, where('BarangID', '==', BarangID));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Jika dokumen ditemukan, tambahkan jumlah dan perbarui subtotal
            const keranjangDocSnap = querySnapshot.docs[0];
            const keranjangDocRef = doc(fs, 'Pengguna', userEmail, 'DaftarKeranjang', keranjangDocSnap.id);

            const currentData = keranjangDocSnap.data();
            const newJumlah = currentData.Jumlah + 1;
            const newSubTotal = newJumlah * Harga;

            await updateDoc(keranjangDocRef, {
                Jumlah: newJumlah,
                SubTotal: newSubTotal
            });

            console.log('Barang updated in Keranjang successfully');
        } else {
            // Jika dokumen tidak ditemukan, tambahkan dokumen baru dengan Jumlah 1 dan SubTotal = Harga
            const keranjangData = {
                BarangID: BarangID,
                Jumlah: 1,
                SubTotal: Harga
            };

            await addDoc(keranjangCollectionRef, keranjangData);
            console.log('Barang added to Keranjang successfully');
        }
    } catch (error) {
        console.error('Error adding to Keranjang:', error);
    }
}

export async function addTandai(BarangID: string) {
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
      // Membuat referensi koleksi 'DaftarTandai' di bawah dokumen pengguna yang sesuai dengan email
      const tandaiCollectionRef = collection(fs, 'Pengguna', userEmail, 'DaftarTandai');
  
      // Data tanda yang akan ditambahkan
      const tandaiData = {
        BarangID: BarangID,
      };
  
      // Menambahkan dokumen baru ke koleksi 'DaftarTandai'
      await addDoc(tandaiCollectionRef, tandaiData);
      console.log('Barang added to tanda successfully');
    } catch (error) {
      console.error('Error adding tanda:', error);
    }
  }

  export async function editKeranjang(
    BarangID: string,
    Jumlah: number
  ): Promise<void> {
    try {
      // Membuat referensi dokumen keranjang berdasarkan BarangID
      const keranjangDocRef = doc(fs, 'Keranjang', BarangID);
  
      // Mengupdate dokumen keranjang dengan Jumlah yang baru
      await updateDoc(keranjangDocRef, { Jumlah });
      console.log('Jumlah barang dalam keranjang updated successfully');
    } catch (error) {
      console.error('Error updating jumlah barang dalam keranjang:', error);
    }
  }

  export async function deleteTandai(BarangID: string) {
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
      // Membuat referensi koleksi 'DaftarTandai' di bawah dokumen pengguna yang sesuai dengan email
      const tandaiCollectionRef = collection(fs, 'Pengguna', userEmail, 'DaftarTandai');
  
      // Membuat query untuk mencari dokumen tanda dengan BarangID yang sesuai
      const q = query(tandaiCollectionRef, where('BarangID', '==', BarangID));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        // Menghapus semua dokumen yang ditemukan dengan BarangID yang sesuai
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        console.log('Barang removed from tanda successfully');
      } else {
        console.log('No such document with the given BarangID');
      }
    } catch (error) {
      console.error('Error deleting tanda:', error);
    }
  }

  export async function reduceKeranjang(BarangID: string, Harga: number) {
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
        // Membuat referensi koleksi 'DaftarKeranjang' di bawah dokumen pengguna yang sesuai dengan email
        const keranjangCollectionRef = collection(fs, 'Pengguna', userEmail, 'DaftarKeranjang');

        // Membuat query untuk mencari dokumen keranjang dengan BarangID yang sesuai
        const q = query(keranjangCollectionRef, where('BarangID', '==', BarangID));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Jika dokumen ditemukan, kurangi jumlah dan perbarui subtotal
            const keranjangDocSnap = querySnapshot.docs[0];
            const keranjangDocRef = doc(fs, 'Pengguna', userEmail, 'DaftarKeranjang', keranjangDocSnap.id);

            const currentData = keranjangDocSnap.data();
            const newJumlah = currentData.Jumlah - 1;
            const newSubTotal = newJumlah * Harga;

            if (newJumlah > 0) {
                // Jika jumlah baru lebih dari 0, perbarui dokumen
                await updateDoc(keranjangDocRef, {
                    Jumlah: newJumlah,
                    SubTotal: newSubTotal
                });

                console.log('Jumlah barang berhasil dikurangi di Keranjang');
            } else {
                // Jika jumlah baru adalah 0 atau kurang, hapus dokumen
                await deleteDoc(keranjangDocRef);
                console.log('Barang dihapus dari Keranjang');
            }
        } else {
            console.log('No such document!');
        }
    } catch (error) {
        console.error('Error reducing keranjang:', error);
    }
}




