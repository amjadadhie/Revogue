import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Barang } from "../type";
import AntDesign from "@expo/vector-icons/AntDesign";

interface ProductCartProps {
  product: Barang;
}

export default function ProductCart({ product }: ProductCartProps) {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.productContainer}>
      <Image source={{ uri: product.Foto }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.productName}>{product.NamaBarang}</Text>
        <Text style={styles.productBrand}>{product.NamaToko}</Text>
        <Text style={styles.productPrice}>
          {`Rp${product.Harga.toLocaleString()}`}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decrementQuantity}>
            <AntDesign name="minuscircle" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={incrementQuantity}>
            <AntDesign name="pluscircle" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => {}} style={styles.removeButton}>
          <AntDesign name="close" size={18} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 10,
    marginTop: 32,
  },
  image: {
    width: 72,
    height: 72,
    marginRight: 10,
  },
  details: {
    flexDirection: "column",
    gap: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productBrand: {
    fontSize: 14,
    color: "#767676",
    fontWeight: "500",
  },
  productPrice: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  quantityContainer: {
    flexDirection: "row",
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  removeButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  removeButtonText: {
    fontSize: 18,
    color: "#black",
  },
});
