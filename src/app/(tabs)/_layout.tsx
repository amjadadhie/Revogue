import React from "react";
import { View, StyleSheet } from "react-native";
import { Slot } from "expo-router";
import Navbar from "../../components/navbar"; // Adjust the import path as necessary

const Layout = () => {
  return (
    <View style={styles.container}>
      <Slot />
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Layout;
