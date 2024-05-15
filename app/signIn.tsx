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
import React from "react";

interface InputSignInProps{
    email: string,
    setEmail: (email: string) => void,
    password: string,
    setPassword: (password: string) => void,
    isLogin: boolean,
    setIsLogin: (isLogin: boolean) => void,
    handleAuthentication: () => void
  }
  
  const SignIn = ({
    email,
    setEmail,
    password,
    setPassword,
    isLogin,
    setIsLogin,
    handleAuthentication,
  }: InputSignInProps) => {
    return (
        // START CODE HERE
        <View>
          
        </View>
        // END CODE HERE
    );
}


