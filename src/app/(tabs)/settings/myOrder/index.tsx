import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { readPesanan } from "@/src/api/Order";
import { Pesanan } from "@/src/type";
import { readBarangByID } from "@/src/api/BarangCRUD";
import { router } from "expo-router";

const MyOrder = () => {
  const [pesanan, setPesanan] = useState<Pesanan[]>([]);
  const [barangDetails, setBarangDetails] = useState<any[]>([]);

  useEffect(() => {
    const fetchPesanan = async () => {
      try {
        const fetchedPesanan = await readPesanan();
        setPesanan(fetchedPesanan);

        const fetchedBarangDetails = await Promise.all(
          fetchedPesanan.map(async (item) => {
            if (!item.BarangID) {
              console.error("BarangID is undefined for item:", item);
              return null;
            }

            const barang = await readBarangByID(item.BarangID);
            return { ...item, barang };
          })
        );

        setBarangDetails(
          fetchedBarangDetails.filter((detail) => detail !== null)
        );
      } catch (error) {
        Alert.alert("Error", "Failed to fetch orders.");
      }
    };

    fetchPesanan();
  }, []);

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Pressable
          style={styles.chevronContainer}
          onPress={() => router.back()}
        >
          <Entypo name="chevron-left" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>My Order</Text>
      </View>
      <ScrollView>
        {barangDetails.map((order, index) => (
          <View key={index} style={styles.orderItem}>
            {order.barang && (
              <Image
                source={{ uri: order.barang.imageURL }}
                style={styles.image}
              />
            )}
            <View style={styles.details}>
              <Text style={styles.name}>{order.NamaBarang}</Text>
              <Text style={styles.brand}>{order.NamaToko}</Text>
              <Text
                style={styles.price}
              >{`Rp${order.TotalHarga.toLocaleString()}`}</Text>
              <Text style={styles.status}>{order.StatusPesanan}</Text>
              <Text
                style={styles.quantity}
              >{`Qty: ${order.JumlahBarang}`}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9",
    paddingVertical: 16,
  },
  chevronContainer: {
    position: "absolute",
    left: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  orderItem: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  brand: {
    fontSize: 14,
    color: "#888",
  },
  price: {
    fontSize: 14,
    color: "#000",
  },
  status: {
    fontSize: 12,
    color: "#00f",
  },
  quantity: {
    fontSize: 12,
    color: "#555",
  },
});

export default MyOrder;
