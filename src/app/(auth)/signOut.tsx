import { auth } from "../../constants/firebaseConfig"; // Import konfigurasi Firestore
import { signOut } from "@firebase/auth";

export async function userSignOut(): Promise<void> {
    try {
        await signOut(auth);
        console.log('User signed out successfully');
    } catch (error) {
        console.error('Error signing out:', error);
    }
}