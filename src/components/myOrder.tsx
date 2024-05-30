// src/components/ProductDetail.tsx
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

// Define an interface for the props
interface myOrderProps {
  image: string;
  name: string;
  brand: string;
  price: string;
  status: string;
  quantity: string;
  rating?: string; // rating is optional
}

const myOrder: React.FC<myOrderProps> = ({
  image,
  name,
  brand,
  price,
  status,
  quantity,
  rating,
}) => {
  return (
    <View style={styles.productContainer}>
      <Image source={{ uri: image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.productBrand}>{brand}</Text>
        <Text style={styles.productPrice}>{price}</Text>
        <Text style={styles.productStatus}>{status}</Text>
        <Text style={styles.productQuantity}>{quantity}</Text>
        {rating && <Text style={styles.productRating}>{rating}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9",
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productBrand: {
    fontSize: 14,
    color: "#666",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 4,
  },
  productStatus: {
    fontSize: 14,
    color: "#666",
  },
  productQuantity: {
    fontSize: 14,
    color: "#666",
  },
  productRating: {
    fontSize: 14,
    color: "#666",
  },
});

export default myOrder;
