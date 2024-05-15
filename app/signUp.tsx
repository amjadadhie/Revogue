import { useState, useEffect } from "react";
import { fs, app } from './firebaseConfig'; // Import konfigurasi Firestore

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { initializeApp } from "@firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";
import { getFirestore, collection, addDoc, doc, setDoc } from "@firebase/firestore"; // Import the 'collection' method from 'firebase/firestore'
import React from "react";

interface InputSignUpProps{
    email: string,
    setEmail: (email: string) => void,
    username: string,
    setUsername: (username: string) => void,
    password: string,
    setPassword: (password: string) => void,
    isLogin: boolean,
    setIsLogin: (isLogin: boolean) => void,
    handleAuthentication: () => void
  }
  
  const SignUp = ({
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    isLogin,
    setIsLogin,
    handleAuthentication,
  }: InputSignUpProps) => {
    const addRecord = async () => {
        try {
          await setDoc(doc(fs, "Pengguna", email), {
            email: email,
            username: username,
          });
          alert('Record added!');
        } catch (error) {
          console.error("Error adding record: ", error);
        }
    };

    return (
        
        // START CODE HERE
        <View>
          
        </View>
        // END CODE HERE
    )
}


