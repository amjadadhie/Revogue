import React, { useState } from "react";
import { StyleSheet, Image, Text, View, ScrollView } from "react-native";
import ProductListItem from "../../../components/clothesBox";

export default function favorite() {
  return (
    <ScrollView style={styles.page}>
      <View style={styles.container1}>
        <Text style={styles.title}>My Cart</Text>
      </View>
      <View style={styles.boxContainer}>
        <ProductListItem likedOnly={true} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 72,
    paddingBottom: 72,
    paddingRight: 26,
    paddingLeft: 26,
    backgroundColor: "#FAFAFA",
  },
  container1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  boxContainer: {
    marginTop: 8,
  },
});
