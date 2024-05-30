import { fs, auth } from "../constants/firebaseConfig"; // Import konfigurasi Firestore
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "@firebase/firestore"; // Import the 'collection' method from 'firebase/firestore'
import { Alamat } from "../type";

// Mengambil list address akun yang sedang login (baca alamat)
export async function readAddress() {
  if (!auth.currentUser) {
    console.error("User not authenticated");
    return;
  }

  const userEmail = auth.currentUser.email;
  if (!userEmail) {
    console.error("User email is not available");
    return;
  }

  try {
    // Mengambil dokumen pengguna berdasarkan email
    const currentUserDocRef = doc(fs, "Pengguna", userEmail);
    const currentUserDocSnap = await getDoc(currentUserDocRef);

    if (currentUserDocSnap.exists()) {
      // Jika dokumen pengguna ada, coba mengambil alamat pengguna
      const addressCollectionRef = collection(
        currentUserDocRef,
        "AlamatPengguna"
      );
      const addressQuerySnapshot = await getDocs(addressCollectionRef);

      const addresses: Alamat[] = [];

      // Mendefinisikan array untuk menyimpan data alamat
      addressQuerySnapshot.forEach((addressDoc) => {
        const addressData = addressDoc.data() as Alamat;
        addresses.push(addressData);
        console.log("Nama Alamat:", addressData.NamaAlamat);
        console.log("Nama Jalan:", addressData.NamaJalan);
        console.log("Detail Alamat:", addressData.DetailAlamat);
        console.log("Kode Pos:", addressData.KodePos);
        console.log("---------------------------------");
      });

      return addresses; // Mengembalikan data alamat
    } else {
      console.log("User document does not exist");
    }
  } catch (error) {
    console.error("Error reading address:", error);
  }
}

export async function addAddress(
  NamaAlamat: string,
  NamaJalan: string,
  DetailAlamat: string,
  KodePos: string
): Promise<void> {
  if (!auth.currentUser) {
    console.error("User not authenticated");
    return;
  }

  const userEmail = auth.currentUser.email;
  if (!userEmail) {
    console.error("User email is not available");
    return;
  }

  try {
    // Membuat referensi koleksi 'AlamatPengguna' di bawah dokumen pengguna yang sesuai dengan email
    const addressCollectionRef = collection(
      fs,
      "Pengguna",
      userEmail,
      "AlamatPengguna"
    );

    // Data alamat yang akan ditambahkan
    const addressData = {
      NamaAlamat,
      NamaJalan,
      DetailAlamat,
      KodePos,
    };

    // Menambahkan dokumen baru ke koleksi 'AlamatPengguna'
    await addDoc(addressCollectionRef, addressData);
    console.log("Address added successfully");
  } catch (error) {
    console.error("Error adding address:", error);
  }
}

export async function editAddress(
  NamaAlamat: string,
  NamaAlamatBaru: string,
  NamaJalan: string,
  DetailAlamat: string,
  KodePos: string
): Promise<void> {
  if (!auth.currentUser) {
    console.error("User not authenticated");
    return;
  }

  const userEmail = auth.currentUser.email;
  if (!userEmail) {
    console.error("User email is not available");
    return;
  }

  try {
    // Membuat referensi koleksi 'AlamatPengguna' di bawah dokumen pengguna yang sesuai dengan email
    const addressCollectionRef = collection(
      fs,
      "Pengguna",
      userEmail,
      "AlamatPengguna"
    );

    // Membuat query untuk mencari dokumen alamat dengan NamaAlamat yang sesuai
    const q = query(
      addressCollectionRef,
      where("NamaAlamat", "==", NamaAlamat)
    );
    const querySnapshot = await getDocs(q);

    // Mengupdate dokumen alamat yang ditemukan
    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (doc) => {
        const addressDocRef = doc.ref;
        const newData = {
          NamaAlamat: NamaAlamatBaru,
          NamaJalan: NamaJalan,
          DetailAlamat: DetailAlamat,
          KodePos: KodePos,
        };

        await updateDoc(addressDocRef, newData);
        console.log("Address updated successfully");
      });
    } else {
      console.log("No address found with the specified Nama Alamat");
    }
  } catch (error) {
    console.error("Error updating address:", error);
  }
}

export async function deleteAddress(NamaAlamat: string): Promise<void> {
  if (!auth.currentUser) {
    console.error("User not authenticated");
    return;
  }

  const userEmail = auth.currentUser.email;
  if (!userEmail) {
    console.error("User email is not available");
    return;
  }

  try {
    // Membuat referensi koleksi 'AlamatPengguna' di bawah dokumen pengguna yang sesuai dengan email
    const addressCollectionRef = collection(
      fs,
      "Pengguna",
      userEmail,
      "AlamatPengguna"
    );

    // Membuat query untuk mencari dokumen alamat dengan NamaAlamat yang sesuai
    const q = query(
      addressCollectionRef,
      where("NamaAlamat", "==", NamaAlamat)
    );
    const querySnapshot = await getDocs(q);

    // Menghapus dokumen alamat yang ditemukan
    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        console.log("Address deleted successfully");
      });
    } else {
      console.log("No address found with the specified Nama Alamat");
    }
  } catch (error) {
    console.error("Error deleting address:", error);
  }
}
