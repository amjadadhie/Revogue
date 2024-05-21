import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Link, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { readAllBarang } from "../api/BarangCRUD";
import { Barang } from "../type";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { AntDesign } from "@expo/vector-icons";

const ProductListItem = () => {
  const [products, setProducts] = useState<Barang[] | undefined>(undefined);
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});
  const segments = useSegments();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const barangData = await readAllBarang();
        setProducts(barangData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const handleLike = (id: string) => {
    setLikedItems((prevLikedItems) => ({
      ...prevLikedItems,
      [id]: !prevLikedItems[id],
    }));
  };

  if (!products) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.listContainer}>
      {products.map((barang) => (
        <View style={styles.container} key={barang.BarangID}>
          <Pressable
            style={styles.likeIconContainer}
            onPress={() => handleLike(barang.BarangID)}
          >
            {likedItems[barang.BarangID] ? (
              <Image
                source={require("../../assets/home/heart-fill.png")}
                style={styles.heartIcon}
              />
            ) : (
              <Image
                source={require("../../assets/home/heart.png")}
                style={styles.heartIcon}
              />
            )}
          </Pressable>
          <Link href={`/${segments[0]}/home/${barang.BarangID}`} asChild>
            <Pressable>
              <Image source={{ uri: barang.Foto }} style={styles.image} />
              <Text style={styles.title}>{barang.NamaBarang}</Text>
              <Text style={styles.price}>Rp{barang.Harga}</Text>
            </Pressable>
          </Link>
        </View>
      ))}
    </View>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  container: {
    backgroundColor: "#FAFAFA",
    width: "50%", // Adjusting to slightly less than 50% to account for margin
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    position: "relative",
  },
  image: {
    aspectRatio: 1,
    width: "100%",
    height: 180,
    borderRadius: 10,
    borderColor: "#D4D4D4",
    borderWidth: 1,
  },
  likeIconContainer: {
    position: "absolute",
    top: 8,
    right: 18,
    zIndex: 1,
  },
  heartIcon: {
    height: 22,
    width: 22,
  },
  title: {
    fontSize: 14,
    marginVertical: 10,
    fontWeight: "600",
  },
  price: {
    fontSize: 12,
    color: "#555555",
    fontWeight: "500",
  },
});
