import { useState, useEffect } from "react";
import { fs, app, auth  } from '../../constants/firebaseConfig'; // Import konfigurasi Firestore
import { signInWithEmailAndPassword } from "@firebase/auth"
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
import React from "react";

const signIn = () => {
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
      Alert.alert('Login Failed');
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

export default signIn;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    resizeMode: "cover", // or "stretch"
  },
  container: {
    flex: 1,
    justifyContent: "center", // Center the content vertically
  },
  centeredContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    marginBottom: 16,
    marginTop: 16,
    textAlign: "center",
    width: "69%",
    lineHeight: 20,
    color: "#000", // Default color for the text
  },
  whiteText: {
    color: "#fff", // White color for specific parts of the text
  },
  buttonContainer: {
    paddingBottom: 40, // Add padding to push the button to the bottom
    paddingHorizontal: 20,
    width: "100%", // Make the button span the full width
    position: "absolute", // Position the button at the bottom
    bottom: 40, // Position the button at the bottom
  },
  link: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#2B2A2A",
    color: "#fff",
    textAlign: "center",
    borderRadius: 20, // Apply rounded corners
  },
  icon: {
    marginRight: 100, // Add space between icon and text
  },
  signInText: {
    color: "#fff", // White color for the text
    textAlign: "center",
    marginTop: 20,
  },
  signInLink: {
    color: "#000", // Black color for the link
    textDecorationLine: "underline", // Underline the link
  },
});
