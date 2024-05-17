import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
import Button from "../../../components/button";

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const router = useRouter();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const halfScreenHeight = screenHeight / 2.1;

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/home/tes.png")}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={[styles.descriptionBox, { height: halfScreenHeight }]}>
        <View style={styles.judulHarga}>
          <Text style={styles.judul}>Judul</Text>
          <Text style={styles.harga}>Harga</Text>
        </View>
        <Text style={styles.toko}>Toko</Text>
        <View style={styles.descriptioContainer}>
          <Text style={styles.judul2}>Description</Text>
          <Text style={styles.descriptionText}>
            Introducing our latest creation, the "Elegance in Motion" dress.
            Crafted with meticulous attention to detail, this exquisite garment
            epitomizes sophistication and style.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button text="Add To Cart" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAFA",
    flex: 1,
  },
  image: {
    width: "100%",
    height: 600,
  },
  descriptionBox: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: 2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 42,
    paddingBottom: 12,
  },
  judulHarga: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  judul: {
    fontSize: 20,
    fontWeight: "bold",
  },
  harga: {
    fontSize: 16,
    color: "#797979",
    fontWeight: "500",
  },
  toko: {
    marginTop: 4,
    fontSize: 12,
    color: "#616161",
    fontWeight: "500",
  },
  descriptioContainer: {
    flexDirection: "column",
    marginTop: 40,
    textAlign: "left",
    gap: 6,
    maxHeight: 88,
  },
  judul2: {
    fontSize: 16,
    fontWeight: "700",
  },
  descriptionText: {
    fontSize: 12,
    color: "#454545",
    textAlign: "justify",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 40,
  },
});

export default ProductDetailsScreen;
