import { fs, auth } from "../constants/firebaseConfig"; // Import Firestore and Auth configuration
import { collection, doc, addDoc, getDocs } from "firebase/firestore";
import { Pesanan } from "../type"; // Ensure this path is correct for your project

export async function addPesanan(
    NamaBarang: string,
    NamaToko: string,
    TotalHarga: number,
    JumlahBarang: number,
    StatusPesanan: string
): Promise<void> {
    if (!auth.currentUser) {
        console.error("User not authenticated");
        return;
    }

    try {
        const user = auth.currentUser;
        const userEmail = user.email;

        if (!userEmail) {
            console.error("User email is not available");
            return;
        }

        // Create a reference to the user's document
        const userDocRef = doc(fs, 'Pengguna', userEmail);
        
        // Create a reference to the 'Pesanan' sub-collection within the user's document
        const pesananCollectionRef = collection(userDocRef, 'Pesanan');

        // Create a new Pesanan object
        const newPesanan: Pesanan = {
            NamaBarang,
            NamaToko,
            TotalHarga,
            JumlahBarang,
            StatusPesanan,
        };

        // Add the new Pesanan to the 'Pesanan' sub-collection
        await addDoc(pesananCollectionRef, newPesanan);

        console.log('Pesanan added successfully');
    } catch (error) {
        console.error('Error adding Pesanan:', error);
    }
}

export async function readPesanan(): Promise<Pesanan[]> {
    if (!auth.currentUser) {
        console.error("User not authenticated");
        return [];
    }

    try {
        const user = auth.currentUser;
        const userEmail = user.email;

        if (!userEmail) {
            console.error("User email is not available");
            return [];
        }

        // Create a reference to the user's document
        const userDocRef = doc(fs, 'Pengguna', userEmail);
        
        // Create a reference to the 'Pesanan' sub-collection within the user's document
        const pesananCollectionRef = collection(userDocRef, 'Pesanan');

        // Fetch all documents from the 'Pesanan' sub-collection
        const pesananQuerySnapshot = await getDocs(pesananCollectionRef);

        // Initialize an array to store the fetched 'Pesanan' objects
        const pesananArray: Pesanan[] = [];

        // Iterate through each document and convert it to 'Pesanan' type
        pesananQuerySnapshot.forEach((doc) => {
            const pesananData = doc.data() as Pesanan; // Convert data to 'Pesanan' type
            pesananArray.push(pesananData); // Store data in the array
        });

        console.log('Pesanan fetched successfully:', pesananArray);

        return pesananArray;
    } catch (error) {
        console.error('Error fetching Pesanan:', error);
        return [];
    }
}