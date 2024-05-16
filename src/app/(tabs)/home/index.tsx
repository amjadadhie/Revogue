import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProductListItem from "../../../components/clothesBox";

export default function HomePage() {
  return (
    <View style={styles.page}>
      <View style={styles.container1}>
        <Text style={styles.title}>Hi, User!</Text>
        <View style={styles.iconContainer}>
          <FontAwesome6 name="heart" size={24} color="black" />
          <MaterialCommunityIcons name="cart-outline" size={24} color="black" />
        </View>
      </View>
      <ProductListItem />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 72,
    paddingRight: 26,
    paddingLeft: 26,
  },
  container1: {
    position: "relative",
    flexDirection: "row",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "DM Sans",
    color: "#000",
  },
});
