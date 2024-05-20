import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../../../components/button";
import { Barang } from "../../../type";
import { readBarangByID } from "../../../api/BarangCRUD";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const halfScreenHeight = screenHeight / 2.1;
  const [product, setProduct] = useState<Barang | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const barangData = (await readBarangByID(id)) as Barang;
        setProduct(barangData);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!product) {
    return <Text>No product found.</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Link href={"/home"}>
          <Entypo name="chevron-left" size={28} color="black" />
        </Link>
        <View style={styles.iconContainer2}>
          <FontAwesome6 name="heart" size={24} color="black" />
          <MaterialCommunityIcons name="cart-outline" size={24} color="black" />
        </View>
      </View>
      <Image
        source={{ uri: product.Foto }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={[styles.descriptionBox, { height: halfScreenHeight }]}>
        <View style={styles.judulHarga}>
          <Text style={styles.judul}>{product.NamaBarang}</Text>
          <Text style={styles.harga}>{product.Harga}</Text>
        </View>
        <Text style={styles.toko}>{product.NamaToko}</Text>
        <View style={styles.descriptioContainer}>
          <Text style={styles.judul2}>Description</Text>
          <Text style={styles.descriptionText}>{product.Deskripsi}</Text>
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
    height: 500,
    position: "absolute",
    top: 0,
    zIndex: 1,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    zIndex: 2,
  },
  iconContainer2: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
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
