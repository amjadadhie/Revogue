import React, { useState } from "react";
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

const CheckoutPage = () => {
  const { selectedItems, selectedKeranjangItems } = useLocalSearchParams();
  const [paymentType, setPaymentType] = useState("bank-transfer");

  // Parse the JSON strings back into objects
  const selectedItemsParsed: Barang[] = selectedItems
    ? JSON.parse(selectedItems as string)
    : [];
  const selectedKeranjangItemsParsed: Keranjang[] = selectedKeranjangItems
    ? JSON.parse(selectedKeranjangItems as string)
    : [];

  const handlePayment = async () => {
    // Check if selectedKeranjangItemsParsed is defined and not empty
    if (selectedKeranjangItemsParsed.length === 0) {
      Alert.alert("Error", "No items selected for checkout.");
      return;
    }

    // Calculate total amount
    const deliveryFee = 12000;
    const totalAmount = selectedKeranjangItemsParsed.reduce(
      (total, item) => total + item.SubTotal,
      deliveryFee
    );

    // Mock API call to the backend to create an order
    const orderDetails = {
      deliveryAddress: {
        name: "User Name",
        phone: "081312345678",
        address: "Tubagus Ismail XVI Street",
        city: "Dago, Coblong, Kota Bandung",
        province: "Jawa Barat",
        zipCode: "40134",
      },
      items: selectedItemsParsed.map((item) => ({
        name: item.NamaBarang,
        price: item.Harga,
        quantity: selectedKeranjangItemsParsed.find(
          (keranjangItem) => keranjangItem.BarangID === item.BarangID
        )?.Jumlah,
      })),
      paymentType: paymentType,
      deliveryFee: deliveryFee,
      totalAmount: totalAmount,
    };

    try {
      const response = await fetch("https://your-backend-api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const result = await response.json();
      if (paymentType !== "cash-on-delivery") {
        // Redirect to payment gateway or handle payment process here
        await handlePaymentGateway(result.orderId, result.totalAmount);
      } else {
        Alert.alert(
          "Order placed successfully",
          "Your order has been placed successfully!"
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "An unexpected error occurred");
      }
    }
  };

  const handlePaymentGateway = async (orderId: string, amount: number) => {
    // Mock implementation of payment gateway integration
    try {
      // Redirect to payment gateway or open payment modal here
      Alert.alert(
        "Payment Successful",
        `Order ${orderId} has been paid successfully!`
      );
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Payment Failed", error.message);
      } else {
        Alert.alert("Payment Failed", "An unexpected error occurred");
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

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Delivery Address</Text>
        <Text>User Name | 081312345678</Text>
        <Text>Tubagus Ismail XVI Street</Text>
        <Text>Dago, Coblong, Kota Bandung, Jawa Barat, 40134</Text>
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
        <Text style={styles.sectionHeader}>Delivery Options</Text>
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginVertical: 20,
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
