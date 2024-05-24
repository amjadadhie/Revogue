import React, { useEffect, useState } from "react";
import { StyleSheet, Image, Text, View, ScrollView } from "react-native";
import ProductCart from "@/src/components/productCart";
import { Barang, Keranjang } from "@/src/type";
import { readKeranjang } from "@/src/api/cartLoved";
import { readBarangByID } from "@/src/api/BarangCRUD";

export default function Favorite() {
  const [keranjang, setKeranjang] = useState<Keranjang[]>([]);
  const [products, setProducts] = useState<Barang[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataKeranjang = await readKeranjang();
        if (dataKeranjang && dataKeranjang.length > 0) {
          setKeranjang(dataKeranjang);

          // Fetch product data based on BarangIDs in keranjang
          const productPromises = dataKeranjang.map(async (item) => {
            const product = await readBarangByID(item.BarangID);
            return product;
          });

          const productData = await Promise.all(productPromises);
          setProducts(
            productData.filter((product) => product !== null) as Barang[]
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.page}>
      <View style={styles.container1}>
        <Text style={styles.title}>My Cart</Text>
      </View>
      <View style={styles.boxContainer}>
        {products.map((product) => (
          <ProductCart key={product.BarangID} product={product} />
        ))}
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
  boxContainer: {},
});
