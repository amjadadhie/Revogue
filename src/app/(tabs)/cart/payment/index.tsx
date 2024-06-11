import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Barang, Keranjang } from "@/src/type";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { readUser } from "@/src/api/UserCRUD";
import { readAddress } from "@/src/api/addressBook";
import { Alamat } from "@/src/type";
import AddressCard from "@/src/components/address";
import { addPesanan } from "@/src/api/Order";
import { deleteKeranjang } from "@/src/api/cartLoved";

const CheckoutPage = () => {
  const { selectedItems, selectedKeranjangItems } = useLocalSearchParams();
  const [paymentType, setPaymentType] = useState("bank-transfer");
  const [userData, setUserData] = useState<any>(null);
  const [addresses, setAddresses] = useState<Alamat[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Alamat | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await readUser();
      setUserData(user);
    };

    fetchUserData();

    const fetchAddresses = async () => {
      const fetchedAddresses = await readAddress();
      setAddresses(fetchedAddresses || []);
      if (fetchedAddresses && fetchedAddresses.length > 0) {
        setSelectedAddress(fetchedAddresses[0]); // Default to the first address
      }
    };

    fetchAddresses();
  }, []);

  // Parse the JSON strings back into objects
  const selectedItemsParsed: Barang[] = selectedItems
    ? JSON.parse(selectedItems as string)
    : [];
  const selectedKeranjangItemsParsed: Keranjang[] = selectedKeranjangItems
    ? JSON.parse(selectedKeranjangItems as string)
    : [];

    const handlePayment = async () => {
      if (selectedKeranjangItemsParsed.length === 0) {
        Alert.alert("Error", "No items selected for checkout.");
        return;
      }
    
      if (!selectedAddress) {
        Alert.alert("Error", "Please select a delivery address.");
        return;
      }
    
      const deliveryFee = 12000;
      const totalAmount = selectedKeranjangItemsParsed.reduce(
        (total, item) => total + item.SubTotal,
        deliveryFee
      );
    
      try {
        for (const item of selectedKeranjangItemsParsed) {
          const barang = selectedItemsParsed.find(
            (barangItem) => barangItem.BarangID === item.BarangID
          );
    
          if (barang) {
            await addPesanan(
              barang.NamaBarang,
              barang.NamaToko,
              item.SubTotal,
              item.Jumlah,
              "Pending"
            );
    
            // Call deleteKeranjang function to remove the item from the cart
            await deleteKeranjang(item.BarangID);
          }
        }
    
        Alert.alert(
          "Order placed successfully",
          "Your order has been placed successfully!"
        );
    
        router.push("/cart");
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert("Error", error.message);
        } else {
          Alert.alert("Error", "An unexpected error occurred");
        }
      }
    };
    

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container1}>
        <Pressable
          style={styles.chevronContainer}
          onPress={() => router.back()}
        >
          <Entypo name="chevron-left" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>Checkout</Text>
      </View>

      <View style={styles.section1}>
        <Text style={styles.sectionHeader}>Delivery Address</Text>
        <View>
          {addresses.map((address, index) => (
            <Pressable key={index} onPress={() => setSelectedAddress(address)}>
              <AddressCard
                addressTitle={address.NamaAlamat}
                street={address.NamaJalan}
                detail={address.DetailAlamat}
                postalCode={address.KodePos}
                isSelected={selectedAddress?.NamaAlamat === address.NamaAlamat}
                isEdit={false}
              />
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>My Item</Text>
        <View style={styles.itemContainer}>
          {selectedItemsParsed.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text>{item.NamaBarang}</Text>
              <Text>{`Qty: ${
                selectedKeranjangItemsParsed.find(
                  (keranjangItem) => keranjangItem.BarangID === item.BarangID
                )?.Jumlah
              }`}</Text>
              <Text>{`Price: Rp${item.Harga.toLocaleString()}`}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Payment Type</Text>
        <Pressable onPress={() => setPaymentType("bank-transfer")}>
          <Text
            style={
              paymentType === "bank-transfer"
                ? styles.selected
                : styles.unselected
            }
          >
            Bank Transfer
          </Text>
        </Pressable>
        <Pressable onPress={() => setPaymentType("credit-card")}>
          <Text
            style={
              paymentType === "credit-card"
                ? styles.selected
                : styles.unselected
            }
          >
            Credit Card
          </Text>
        </Pressable>
        <Pressable onPress={() => setPaymentType("cash-on-delivery")}>
          <Text
            style={
              paymentType === "cash-on-delivery"
                ? styles.selected
                : styles.unselected
            }
          >
            Cash On Delivery
          </Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text>Standard Delivery Rp12.000</Text>
        <Text style={styles.deliveryInfo}>
          Delivered on or before Friday 3 May 2024
        </Text>
        <Text style={styles.deliveryInfo}>
          No delivery on Public Holidays. You may be contacted by our carrier
          partner via SMS and/or email regarding location.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.summaryText}>
          Sub-Total:{" "}
          <Text>
            Rp
            {selectedKeranjangItemsParsed
              .reduce((total, item) => total + item.SubTotal, 0)
              .toLocaleString()}
          </Text>
        </Text>
        <Text style={styles.summaryText}>
          Delivery: <Text>Rp12.000</Text>
        </Text>
        <Text style={styles.summaryText}>
          Total To Pay:{" "}
          <Text>
            Rp
            {(
              selectedKeranjangItemsParsed.reduce(
                (total, item) => total + item.SubTotal,
                0
              ) + 12000
            ).toLocaleString()}
          </Text>
        </Text>
      </View>

      <Pressable style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Buy Now</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 80,
    backgroundColor: "#f7f7f7",
  },
  container1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderColor: "#D9D9D9",
    paddingBottom: 16,
    position: "relative",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  chevronContainer: {
    position: "absolute",
    left: 12,
  },
  section: {
    marginVertical: 20,
  },
  section1: {
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  item: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  selected: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  unselected: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  deliveryInfo: {
    fontSize: 12,
    color: "#555",
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CheckoutPage;
