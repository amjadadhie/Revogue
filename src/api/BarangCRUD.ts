import { fs, auth, storage } from "../constants/firebaseConfig"; // Import konfigurasi Firestore
import { collection, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Barang } from "../type";
import {
  addDoc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  orderBy,
  limit,
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

export async function updateStok(BarangID: number, Stok: number) {
  if (!auth.currentUser) {
    console.error("User not authenticated");
    return;
  }

  try {
    // Membuat referensi ke dokumen 'Barang' berdasarkan BarangID
    const barangDocRef = doc(fs, "Barang", BarangID.toString());

    // Mengupdate stok barang
    await updateDoc(barangDocRef, {
      Stok: Stok,
    });

    console.log("Stok barang berhasil diupdate");
  } catch (error) {
    console.error("Error updating stok barang:", error);
  }
}

export async function readBarangByID(barangID: number | undefined) {
  if (!auth.currentUser) {
    console.error("User not authenticated");
    return null;
  }

  try {
    // Membuat query ke koleksi Barang berdasarkan BarangID
    const q = query(
      collection(fs, "Barang"),
      where("BarangID", "==", barangID)
    );

    // Mendapatkan dokumen barang dari query
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Mengambil dokumen pertama dari hasil query (jika ada beberapa dokumen dengan BarangID yang sama)
      const barangDocSnap = querySnapshot.docs[0];

      // Mengonversi data menjadi tipe Barang
      const barangData = barangDocSnap.data() as Barang;

      return barangData;
    } else {
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
  NamaBarang: string,
  Kategori: string,
  Harga: number,
  Foto: string, // Menggunakan string URL sebagai parameter untuk foto
  Deskripsi: string,
  Stok: number,
  NamaToko: string,
  EmailPengguna: string
): Promise<void> {
  try {
    // Mendapatkan referensi ke koleksi 'Barang'
    const barangCollectionRef = collection(fs, "Barang");

    // Mendapatkan BarangID terbaru dan menambahkannya dengan 1
    const latestBarangQuery = query(
      barangCollectionRef,
      orderBy("BarangID", "desc"),
      limit(1)
    );
    const latestBarangSnapshot = await getDocs(latestBarangQuery);

    let newBarangID = 1; // Default value if there are no documents
    if (!latestBarangSnapshot.empty) {
      const latestBarang = latestBarangSnapshot.docs[0].data();
      newBarangID = latestBarang.BarangID + 1;
    }

    // Data barang yang akan ditambahkan
    const newBarang = {
      BarangID: newBarangID,
      NamaBarang,
      Kategori,
      Harga,
      Foto, // URL gambar
      Deskripsi,
      Stok,
      NamaToko,
      EmailPengguna,
    };

    // Menambahkan dokumen baru ke koleksi 'Barang' dengan data barang baru
    await addDoc(barangCollectionRef, newBarang);

    console.log("Barang added successfully");
  } catch (error) {
    console.error("Error adding barang:", error);
  }
}

export async function editBarang(
  BarangID: number,
  NamaBarang: string,
  Kategori: string,
  Harga: number,
  Foto: string | null, // URL string of the new image or null if no image change
  Deskripsi: string,
  Stok: number,
  NamaToko: string,
  EmailPengguna: string
): Promise<void> {
  try {
    // Membuat referensi dokumen barang berdasarkan BarangID
    const barangDocRef = doc(fs, "Barang", BarangID.toString());

    // Mengambil data barang saat ini
    const barangDocSnap = await getDoc(barangDocRef);
    if (!barangDocSnap.exists()) {
      console.error("Barang tidak ditemukan");
      return;
    }

    // Data barang yang akan diupdate
    const updatedData: Partial<Barang> = {
      NamaBarang,
      Kategori,
      Harga,
      Deskripsi,
      Stok,
      NamaToko,
      EmailPengguna,
    };

    // Tambahkan URL gambar baru ke data yang diupdate jika diberikan
    if (Foto) {
      updatedData.Foto = Foto; // Menambahkan URL gambar baru ke data yang diupdate
    }

    // Mengupdate dokumen barang dengan data yang baru
    await updateDoc(barangDocRef, updatedData);
    console.log("Barang updated successfully");
  } catch (error) {
    console.error("Error updating barang:", error);
  }
}

export async function deleteBarang(BarangID: number): Promise<void> {
  try {
    // Mengonversi BarangID menjadi string untuk referensi dokumen
    const barangDocRef = doc(fs, "Barang", BarangID.toString());

    // Menghapus dokumen barang
    await deleteDoc(barangDocRef);
    console.log("Barang deleted successfully");
  } catch (error) {
    console.error("Error deleting barang:", error);
  }
}
