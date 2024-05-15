import { useState, useEffect } from "react";
import { fs, app, auth  } from './firebaseConfig'; // Import konfigurasi Firestore
import { signInWithEmailAndPassword } from "@firebase/auth";



import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { initializeApp } from "@firebase/app";
// import {
//   Auth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
// } from "@firebase/auth";
import React from "react";

interface InputSignInProps{
    email: string,
    setEmail: (email: string) => void,
    password: string,
    setPassword: (password: string) => void,
    isLogin: boolean,
    setIsLogin: (isLogin: boolean) => void,
    handleLogin: () => void
}
  
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user) {
        Alert.alert('Login Successful', `Welcome back, ${user.email}!`);
        // Disini Anda dapat menggunakan user.email untuk mendapatkan alamat email pengguna yang sedang login
      } else {
        Alert.alert('Login Failed', 'Failed to get user information');
      }
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Login;


