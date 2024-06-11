import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { auth, fs } from '../constants/firebaseConfig'; // Import konfigurasi Firestore
import { Pengguna } from "../type";
import {
  runTransaction, writeBatch, doc, collection, query, where, getDocs, getDoc, updateDoc
  } from "@firebase/firestore"; // Import the 'collection' method from 'firebase/firestore'


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

export async function gantiPassword(
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
  NamaPengguna: string | null,
  JenisKelamin: string | null,
  NomorTelepon: string | null
): Promise<void> {
  if (!auth.currentUser) {
    console.error('User not authenticated');
    return;
  }

  try {
    const penggunaDocRef = doc(fs, 'Pengguna', Email);

    await runTransaction(fs, async (transaction) => {
      const penggunaDoc = await transaction.get(penggunaDocRef);
      if (!penggunaDoc.exists()) {
        throw new Error('User document does not exist');
      }

      const penggunaData = penggunaDoc.data() as Pengguna;
      const updatedData: Partial<Pengguna> = {};

      if (NamaPengguna !== null && NamaPengguna !== penggunaData.NamaPengguna) {
        updatedData.NamaPengguna = NamaPengguna;
      }
      if (JenisKelamin !== null && JenisKelamin !== penggunaData.JenisKelamin) {
        updatedData.JenisKelamin = JenisKelamin;
      }
      if (NomorTelepon !== null && NomorTelepon !== penggunaData.NomorTelepon) {
        updatedData.NomorTelepon = NomorTelepon;
      }
      if (NamaToko !== null && NamaToko !== penggunaData.NamaToko) {
        updatedData.NamaToko = NamaToko;

        const barangQuery = query(collection(fs, 'Barang'), where('NamaToko', '==', penggunaData.NamaToko));
        const barangDocs = await getDocs(barangQuery);

        const batch = writeBatch(fs);
        barangDocs.forEach((barangDoc) => {
          batch.update(barangDoc.ref, { NamaToko: NamaToko });
        });

        await batch.commit();
      }

      if (Object.keys(updatedData).length > 0) {
        transaction.update(penggunaDocRef, updatedData);
        console.log('User information updated successfully');
      } else {
        console.log('No changes detected');
      }
    });
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
