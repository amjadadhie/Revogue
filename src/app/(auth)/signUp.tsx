import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import { getFirestore, doc, setDoc } from "@firebase/firestore";
import { auth, fs } from "../../constants/firebaseConfig"; // Pastikan import ini benar
import { Link, Redirect, router } from "expo-router";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState('');

  const addRecord = async () => {
    try {
      await setDoc(doc(fs, "Pengguna", email), {
        email: email,
        username: username,
      });
      alert("Akun Berhasil Dibuat!");
      router.push("/signIn");
    } catch (error) {
      console.error("Error! : ", error);
    }
  };

  const handleSignUp = async () => {
      try {
        if(password !== confirmPassword){
          setError('Password baru dan konfirmasi password baru tidak sama');
          Alert.alert("Password tidak sama");
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        addRecord();
    } catch (error) {
      Alert.alert("Sign Up Failed");
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
        <Text style={styles.title}>Create Your Account</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Create</Text>
        </Pressable>

        <Text style={styles.signInText}>
          Already have an account?{" "}
          <Link href={"/signIn"} style={styles.signInLink}>
            Sign In
          </Link>
        </Text>
      </View>
    </LinearGradient>
  );
};

export default SignUp;

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
