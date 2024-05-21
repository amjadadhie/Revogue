import { collection, getDocs, doc, getDoc, addDoc } from 'firebase/firestore';
import { auth, fs } from '../constants/firebaseConfig'; // Pastikan Anda mengimpor auth dan fs dari file konfigurasi Firebase
import { Keranjang, Tandai } from '../type'; // Pastikan Anda mengimpor tipe Keranjang


export async function readKeranjang(): Promise<Keranjang[] | void> {
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
            // Jika dokumen pengguna ada, coba mengambil daftar keranjang pengguna
            const keranjangCollectionRef = collection(currentUserDocRef, 'DaftarKeranjang');
            const keranjangQuerySnapshot = await getDocs(keranjangCollectionRef);
            
            const keranjangList: Keranjang[] = [];

            // Mendefinisikan array untuk menyimpan data keranjang
            keranjangQuerySnapshot.forEach((keranjangDoc) => {
                const keranjangData = keranjangDoc.data() as Keranjang;
                keranjangList.push(keranjangData);
                console.log('BarangID:', keranjangData.BarangID);
                console.log('---------------------------------');
            });

            return keranjangList; // Mengembalikan daftar keranjang
        } else {
            console.log('User document does not exist');
        }
    } catch (error) {
        console.error('Error reading keranjang:', error);
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

export async function addKeranjang(BarangID: string) {
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

        // Data keranjang yang akan ditambahkan
        const keranjangData = { BarangID };

        // Menambahkan dokumen baru ke koleksi 'DaftarKeranjang'
        await addDoc(keranjangCollectionRef, keranjangData);
        console.log('Barang added to Keranjang successfully');
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
  


