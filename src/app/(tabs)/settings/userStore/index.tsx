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
  Image,
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
import * as ImagePicker from "expo-image-picker";

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
    Kategori: string;
    Harga: number;
    Foto: string;
    Deskripsi: string;
    Stok: number;
    NamaToko: string;
    EmailPengguna: string;
  }) => void;
}) => {
  const [namaBarang, setNamaBarang] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState<number>();
  const [stok, setStok] = useState<number>();
  const [kategori, setKategori] = useState("");
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    if (userData) {
      setNamaBarang(userData.NamaBarang || "");
      setDeskripsi(userData.Deskripsi || "");
      setHarga(userData.Harga || 0);
      setStok(userData.Stok || 0);
      setKategori(userData.Kategori || "");
    }
  }, [userData]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      // Update profile image state
      setImage(result.assets[0].uri);
    }
  };

  const handleAdd = () => {
    const product = {
      NamaBarang: namaBarang,
      Deskripsi: deskripsi,
      Harga: harga,
      Stok: stok,
      Kategori: kategori,
      Foto: image,
      NamaToko: userData.NamaToko,
      EmailPengguna: userData.Email,
    };
    onSave(product);
    onClose();
  };

  return (
    <Modal
      animationType="none"
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
          <Pressable onPress={pickImage} style={styles.imageContainer}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Text style={styles.imageText}>Input your image</Text>
            )}
          </Pressable>
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
          <TextInput
            style={styles.input}
            placeholder="Kategori"
            value={kategori}
            onChangeText={setKategori}
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
    Harga: number;
    Stok: number;
    Kategori: string;
    Image: string;
    NamaToko: string;
    EmailPengguna: string;
  }) => {
    console.log("Product saved:", product);
  
    if (!userData) {
      Alert.alert("Error", "User data is not loaded yet.");
      return;
    }
  
    try {
      // Call the addBarang function with the product details
      await addBarang(
        product.NamaBarang,
        product.Kategori,
        product.Harga,
        product.Image, // Assuming this is the URL of the image
        product.Deskripsi,
        product.Stok,
        userData.NamaToko,
        userData.Email
      );
  
      console.log("Product saved successfully");
      Alert.alert("Success", "Product added successfully.");
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
  image: { aspectRatio: 1, width: 180, height: 140 },
  imageContainer: {
    width: 200,
    height: 160,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "auto",
    marginBottom: 20,
    borderRadius: 10,
  },
  imageText: {
    textAlign: "center",
    fontSize: 16,
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
