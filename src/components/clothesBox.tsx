import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Link, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import readAllBarang from "../api/BarangCRUD";
import { Barang } from "../type";

const ProductListItem = () => {
  const [products, setProducts] = useState<Barang[] | undefined>(undefined);
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

  if (!products) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.listContainer}>
      {products.map((barang) => (
        <Link key={barang.BarangID} href={`/${segments[0]}/menu/${barang.BarangID}`} asChild>
          <Pressable style={styles.container}>
            <Image source={{ uri: barang.Foto }} style={styles.image} />
            <Text style={styles.title}>{barang.NamaBarang}</Text>
            <Text style={styles.price}>Rp{barang.Harga}</Text>
          </Pressable>
        </Link>
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
  },
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: "48%",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    fontWeight: "bold",
  },
});
