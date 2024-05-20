import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Link, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { readAllBarang } from "../api/BarangCRUD";
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
        <Link
          key={barang.BarangID}
          href={`/${segments[0]}/home/${barang.BarangID}`}
          asChild
        >
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
    marginTop: 10,
  },
  container: {
    backgroundColor: "#FAFAFA",
    width: "50%", // Adjusting to slightly less than 50% to account for margin
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  image: {
    aspectRatio: 1,
    width: "100%",
    height: "auto",
    borderRadius: 10,
    borderColor: "#D4D4D4",
    borderWidth: 1,
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
