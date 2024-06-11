import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Barang, Keranjang } from "../type";
import AntDesign from "@expo/vector-icons/AntDesign";
import { addKeranjang, reduceKeranjang } from "../api/cartLoved";
import Checkbox from "expo-checkbox"; // Ensure this is correctly imported

interface ProductCartProps {
  product: Barang;
  keranjang: Keranjang;
  isSelected: boolean;
  onSelect: () => void;
}

export default function ProductCart({
  product,
  keranjang,
  isSelected,
  onSelect,
}: ProductCartProps) {
  const [quantity, setQuantity] = useState(keranjang.Jumlah);

  const incrementQuantity = async () => {
    setQuantity(quantity + 1);
    await addKeranjang(keranjang.BarangID, keranjang.SubTotal);
  };

  const decrementQuantity = async () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      await reduceKeranjang(keranjang.BarangID, keranjang.SubTotal);
    }
  };

  // Calculate price based on quantity
  const price = product.Harga * quantity;

  return (
    <View style={styles.productContainer}>
      <Checkbox value={isSelected} onValueChange={onSelect} color={"black"} />
      <Image source={{ uri: product.Foto }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.productName}>{product.NamaBarang}</Text>
        <Text style={styles.productBrand}>{product.NamaToko}</Text>
        <Text style={styles.productPrice}>
          {`Rp${(product.Harga * quantity).toLocaleString()}`}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.quantityContainer}>
          <Pressable onPress={decrementQuantity}>
            <AntDesign name="minuscircle" size={24} color="black" />
          </Pressable>
          <Text style={styles.quantity}>{quantity}</Text>
          <Pressable onPress={incrementQuantity}>
            <AntDesign name="pluscircle" size={24} color="black" />
          </Pressable>
        </View>
        <Pressable onPress={() => {}} style={styles.removeButton}>
          <AntDesign name="close" size={18} color="black" />
        </Pressable>
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
    width: 134,
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
    color: "black",
  },
});
