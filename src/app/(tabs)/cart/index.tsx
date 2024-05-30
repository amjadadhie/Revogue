import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { Barang, Keranjang } from "@/src/type";
import { readKeranjang } from "@/src/api/cartLoved";
import { readBarangByID } from "@/src/api/BarangCRUD";
import ProductCart from "@/src/components/productCart";
import { useNavigation } from "@react-navigation/native";
import Button from "@/src/components/button";
import { router } from "expo-router";

export default function Cart() {
  const [keranjang, setKeranjang] = useState<Keranjang[]>([]);
  const [products, setProducts] = useState<Barang[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set()
  );
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataKeranjang = await readKeranjang();
        if (dataKeranjang && dataKeranjang.length > 0) {
          setKeranjang(dataKeranjang);

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

  const handleProductSelect = (productID: string) => {
    setSelectedProducts((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(productID)) {
        newSelected.delete(productID);
      } else {
        newSelected.add(productID);
      }
      return newSelected;
    });
  };

  const handleCheckout = () => {
    const selectedItems = products.filter((product) =>
      selectedProducts.has(product.BarangID)
    );
    const selectedKeranjangItems = keranjang.filter((item) =>
      selectedProducts.has(item.BarangID)
    );

    // Convert selected items to JSON strings for navigation
    const selectedItemsString = JSON.stringify(selectedItems);
    const selectedKeranjangItemsString = JSON.stringify(selectedKeranjangItems);

    // Navigate to the payment page
    router.push({
      pathname: "/cart/payment",
      params: {
        selectedItems: selectedItemsString,
        selectedKeranjangItems: selectedKeranjangItemsString,
      },
    });
  };

  return (
    <ScrollView style={styles.page}>
      <View style={styles.container1}>
        <Text style={styles.title}>My Cart</Text>
      </View>
      <View>
        {products.map((product) => {
          const correspondingKeranjang = keranjang.find(
            (item) => item.BarangID === product.BarangID
          );
          if (!correspondingKeranjang) {
            return null;
          }
          return (
            <View key={product.BarangID}>
              <ProductCart
                product={product}
                keranjang={correspondingKeranjang}
                isSelected={selectedProducts.has(product.BarangID)}
                onSelect={() => handleProductSelect(product.BarangID)}
              />
            </View>
          );
        })}
      </View>
      <Button
        text="Checkout"
        style={[
          styles.button,
          selectedProducts.size === 0 && styles.buttonDisabled,
        ]}
        onPress={handleCheckout}
        disabled={selectedProducts.size === 0}
      />
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
  button: {
    alignItems: "center",
    marginHorizontal: "auto",
    marginVertical: 40,
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 5,
  },
  buttonDisabled: {
    backgroundColor: "#888", // Change this to a lighter color to indicate disabled state
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
