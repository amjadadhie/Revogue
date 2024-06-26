import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import Field from "@/src/components/field";
import { readUser, editPengguna } from "@/src/api/UserCRUD";
import DateField from "@/src/components/datePicker";
import Button from "@/src/components/button";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import ProductListItem from "../../../../components/clothesBoxStore";
import { addBarang } from "@/src/api/BarangCRUD";

const ProductModal = ({
  visible,
  onClose,
  userData,
  onSave,
}: {
  visible: boolean;
  onClose: () => void;
  userData: any;
  onSave: (product: {
    NamaBarang: string;
    Deskripsi: string;
    Harga: string;
    Stok: string;
  }) => void;
}) => {
  const [namaBarang, setNamaBarang] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");

  useEffect(() => {
    if (userData) {
      setNamaBarang(userData.NamaBarang || "");
      setDeskripsi(userData.Deskripsi || "");
      setHarga(userData.Harga || "");
      setStok(userData.Stok || "");
    }
  }, [userData]);

  const handleAdd = () => {
    const product = {
      NamaBarang: namaBarang,
      Deskripsi: deskripsi,
      Harga: harga,
      Stok: stok,
    };
    onSave(product);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Entypo name="cross" size={24} color="black" />
          </Pressable>
          <Text style={styles.modalTitle}>Add Your New Product</Text>

          <TextInput
            style={styles.input}
            placeholder="Nama Barang"
            value={namaBarang}
            onChangeText={setNamaBarang}
          />
          <TextInput
            style={styles.input}
            placeholder="Deskripsi"
            value={deskripsi}
            onChangeText={setDeskripsi}
          />
          <TextInput
            style={styles.input}
            placeholder="Harga"
            value={harga}
            onChangeText={setHarga}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Stok"
            value={stok}
            onChangeText={setStok}
            keyboardType="numeric"
          />

          <View style={styles.buttonContainer}>
            <Button text="Add" onPress={handleAdd} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function UserStore() {
  const [toko, setToko] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await readUser();
      setUserData(user);
    };

    fetchUserData();
  }, []);

  const handleAddStore = async () => {
    if (!userData) {
      Alert.alert("Error", "User data is not loaded yet.");
      return;
    }

    try {
      await editPengguna(
        userData.Email,
        toko,
        userData.NamaPengguna,
        userData.JenisKelamin,
        userData.NomorTelepon
      );
      Alert.alert("Success", "User information updated successfully.");
      router.push("/settings");
    } catch (error) {
      console.error("Error updating user information:", error);
      Alert.alert("Error", "Failed to update user information.");
    }
  };
  const handleAddProduct = async (product: {
    NamaBarang: string;
    Deskripsi: string;
    Harga: string;
    Stok: string;
  }) => {
    // Implementasi untuk menyimpan produk
    console.log("Product saved:", product);
    if (!userData) {
      Alert.alert("Error", "User data is not loaded yet.");
      return;
    }
    // Implementasi untuk menyimpan produk
    try {
      // Panggil fungsi untuk menyimpan produk
      // await addBarang(userData.Email,
      //       product.NamaBarang,
      //       product.Deskripsi,
      //       product.Harga,
      //       product.Stok,
      //       userData.NamaToko,
      //       userData.FotoToko,

      console.log("Product saved successfully");
    } catch (error) {
      console.error("Error saving product:", error);
      Alert.alert("Error", "Failed to save product.");
    }
  };

  if (!userData) {
    // Return loading indicator or empty view while user data is being fetched
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }
  // if user.namatoko == null
  if (userData.NamaToko == null) {
    return (
      <View style={styles.page}>
        <View style={styles.container1}>
          <Pressable
            style={styles.chevronContainer}
            onPress={() => router.back()}
          >
            <Entypo name="chevron-left" size={24} color="black" />
          </Pressable>
          <Text style={styles.title}>Add Store</Text>
        </View>
        <View style={styles.form}>
          <Field
            label="Store Name"
            onChange={(value) => setToko(value)}
            placeholder={"Store Name"}
          />
          <Button
            text="Add Store"
            onPress={handleAddStore}
            style={styles.button}
          />
        </View>
      </View>
    );
  } else {
    return (
      <ScrollView style={styles.page}>
        <View style={styles.container1}>
          <Pressable
            style={styles.chevronContainer}
            onPress={() => router.back()}
          >
            <Entypo name="chevron-left" size={24} color="black" />
          </Pressable>
          <Text style={styles.title}>Your Products</Text>
        </View>
        <View style={styles.boxContainer}>
          <ProductListItem userStoreName={userData.NamaToko} />
        </View>
        <Button
          text="Add Product"
          onPress={() => setIsModalVisible(true)}
          style={styles.addButton}
        />
        <ProductModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          userData={userData}
          onSave={handleAddProduct}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 24,
    paddingBottom: 72,
    backgroundColor: "#FAFAFA",
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
  form: {
    flexDirection: "column",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 10,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    marginTop: 48,
    marginHorizontal: "auto",
  },
  boxContainer: {
    marginTop: 8,
    position: "relative",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    position: "relative",
    marginHorizontal: "auto",
    marginVertical: 40,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 10,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "column",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  boxContainer: {
    marginTop: 8,
  },
});
