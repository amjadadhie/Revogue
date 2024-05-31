import { Text, View, StyleSheet, ImageBackground, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";

const LandingPage = () => {
  return (
    <ImageBackground
      source={require("../../assets/home/image 1.png")} // Replace with your image path
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.centeredContent}>
          <Image
            source={require("../../assets/home/AppIcon.png")} // Replace with your image path
          />
          <Text style={styles.title}>
            <Text style={styles.whiteText}>Empower Your</Text> Style{" "}
            <Text style={styles.whiteText}>Embrace</Text> Sustainability
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Link href={"/signIn"} style={styles.link}>
          {/* <Icon name="envelope" size={16} color="#fff" style={styles.icon} /> */}
          <Text>Sign In With Email</Text>
        </Link>
        <Text style={styles.signInText}>
          Doesn't have an account?{" "}
          <Link href={"/signUp"} style={styles.signInLink}>
            Sign Up
          </Link>
        </Text>
      </View>
    </ImageBackground>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // or "stretch"
    height: "auto",
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
