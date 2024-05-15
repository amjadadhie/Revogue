import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Button,
  Image,
} from "react-native";
import React from "react";
import { Link } from "expo-router";

const HomePage = () => {
  return (
    <ImageBackground
      source={require("../assets/home/image 1.png")} // Replace with your image path
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={require("../assets/home/AppIcon.png")} // Replace with your image path
          style={styles.Image}
        />
        <Text style={styles.title}>
          <Text style={styles.whiteText}>Empower Your</Text> Style{" "}
          <Text style={styles.whiteText}>Embrace</Text> Sustainability
        </Text>

        <View style={styles.buttonContainer}>
          <Link href={"/about"}>Sign Up With Email</Link>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // or "stretch"
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
  },
  Image: {
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
    marginTop: 20,
    width: "80%",
    paddingTop: 8,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2B2A2A",
    color: "#fff",
    
  },
});
