import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Barang, Keranjang } from "@/src/type";

export default function PaymentPage() {
  const { selectedItems, selectedKeranjangItems } = useLocalSearchParams();

  // Parse the JSON strings back into objects
  const selectedItemsParsed: Barang[] = JSON.parse(selectedItems as string);
  const selectedKeranjangItemsParsed: Keranjang[] = JSON.parse(
    selectedKeranjangItems as string
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Page</Text>
      {/* Render the selected items and keranjang items */}
      <Text>Selected Items:</Text>
      {selectedItemsParsed.map((item) => (
        <Text key={item.BarangID}>{item.NamaBarang}</Text>
      ))}
      <Text>Selected Keranjang Items:</Text>
      {selectedKeranjangItemsParsed.map((item) => (
        <Text key={item.BarangID}>{item.BarangID}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
