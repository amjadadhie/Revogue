import { useState, useEffect } from "react";
import { fs, app, auth } from "../../constants/firebaseConfig"; // Import konfigurasi Firestore
import { signInWithEmailAndPassword } from "@firebase/auth";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import { initializeApp } from "@firebase/app";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

const signIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        Alert.alert("Login Successful", `Welcome back, ${user.email}!`);
        // Disini Anda dapat menggunakan user.email untuk mendapatkan alamat email pengguna yang sedang login
      } else {
        Alert.alert("Login Failed", "Failed to get user information");
      }
    } catch (error) {
      Alert.alert("Login Failed");
    }
  };

  return (
    <LinearGradient
      colors={["#FFFFFF", "#6E6D6D"]}
      style={styles.background}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1.2 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Sign In Into Your Account</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>

        <Text style={styles.signInText}>
          Doesn't have an account?{" "}
          <Link href={"/signUp"} style={styles.signInLink}>
            Sign Up
          </Link>
        </Text>
      </View>
    </LinearGradient>
  );
};

export default signIn;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    paddingTop: 144,
    position: "relative",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 40,
    width: 176,
    color: "#000",
  },
  inputContainer: {
    flexDirection: "column",
    width: 310,
    marginHorizontal: "auto",
    marginTop: 50,
    gap: 14,
  },
  input: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    paddingVertical: 8,
    fontWeight: "regular",
    fontSize: 14,
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "column",
    marginTop: 56,
    alignItems: "center",
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#2B2A2A",
    borderRadius: 30, // Apply rounded corner
    width: 310,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
  },
  signInText: {
    color: "#000", // White color for the text
    textAlign: "center",
    marginTop: 28,
  },
  signInLink: {
    color: "#fff", // Black color for the link
    textDecorationLine: "underline", // Underline the link
  },
});
