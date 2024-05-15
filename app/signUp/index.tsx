import { useState, useEffect } from "react";

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
import React from "react";

const firebaseConfig = {
  apiKey: "AIzaSyAebuVJZ3pCXOhmc1vlkhz24kORBCChvQ8",
  authDomain: "revogue-4f36f.firebaseapp.com",
  databaseURL:
    "https://revogue-4f36f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "revogue-4f36f",
  storageBucket: "revogue-4f36f.appspot.com",
  messagingSenderId: "960511554500",
  appId: "1:960511554500:web:2ecc062e8656dba4feaa91",
  measurementId: "G-NCDEV0RC44",
};

const app = initializeApp(firebaseConfig);

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
    return (
        // START CODE HERE
      <View></View>
        // END CODE HERE
    );
}


