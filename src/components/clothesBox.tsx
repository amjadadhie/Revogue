import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Link, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import readAllBarang from "../api/BarangCRUD";
import { Barang } from "../type";

type ProductListItemProps = {
    product: Barang<'products'>;
  };

const ProductListItem = () => {
  const [products, setProducts] = useState<Barang[]>();
  const segments = useSegments();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const barangData = await readAllBarang(); // Panggil fungsi readAllBarang
        setProducts(barangData); // Simpan data barang ke dalam state
        console.log(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData(); // Panggil fungsi fetchData
  }, []);

  return (
    <Link href={`/${segments[0]}/menu/${products.BarangID}`} asChild>
      <Pressable style={styles.container}>
        <Image
          src={product.image}
          style={styles.image}
        />

        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: "50%",
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
