import { Link, useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../../../components/button";
import { Barang } from "../../../type";
import { readBarangByID } from "../../../api/BarangCRUD";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import {
  addKeranjang,
  addTandai,
  deleteTandai,
  readTandai,
} from "@/src/api/cartLoved"; // Update the path

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const halfScreenHeight = screenHeight / 2.1;
  const [product, setProduct] = useState<Barang | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const barangData = (await readBarangByID(id)) as Barang;
        setProduct(barangData);

        const tandaiData = await readTandai();
        if (tandaiData) {
          const likedItemsMap = tandaiData.reduce((acc, item) => {
            acc[item.BarangID] = true;
            return acc;
          }, {} as { [key: string]: boolean });
          setLikedItems(likedItemsMap);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleLike = async (id: string) => {
    try {
      if (likedItems[id]) {
        await deleteTandai(id);
      } else {
        await addTandai(id);
      }
      setLikedItems((prevLikedItems) => ({
        ...prevLikedItems,
        [id]: !prevLikedItems[id],
      }));
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddToCart = async () => {
    try {
      if (id) {
        // Ensure id is defined
        await addKeranjang(id, product?.Harga || 0);
        toggleModal();
        router.push("/cart");
        console.log(`Product: ${product?.NamaBarang}, Quantity: ${quantity}`);
      } else {
        console.error("Error: Product ID is undefined.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!product) {
    return <Text>No product found.</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Pressable onPress={() => router.back()}>
          <Entypo name="chevron-left" size={28} color="black" />
        </Pressable>
        <View style={styles.iconContainer2}>
          <Pressable onPress={() => handleLike(product.BarangID)}>
            {likedItems[product.BarangID] ? (
              <Image
                source={require("../../../../assets/home/heart-fill.png")}
                style={styles.heartIcon}
              />
            ) : (
              <Image
                source={require("../../../../assets/home/heart.png")}
                style={styles.heartIcon}
              />
            )}
          </Pressable>
          <Link href={"/cart"}>
            <MaterialCommunityIcons
              name="cart-outline"
              size={24}
              color="black"
            />
          </Link>
        </View>
      </View>
      <Image
        source={{ uri: product.Foto }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={[styles.descriptionBox, { height: halfScreenHeight }]}>
        <View style={styles.judulHarga}>
          <Text style={styles.judul}>{product.NamaBarang}</Text>
          <Text style={styles.harga}>Rp.{product.Harga}</Text>
        </View>
        <Text style={styles.toko}>{product.NamaToko}</Text>
        <View style={styles.descriptioContainer}>
          <Text style={styles.judul2}>Description</Text>
          <Text style={styles.descriptionText}>{product.Deskripsi}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text="Add To Cart"
            onPress={handleAddToCart}
            style={{ width: 340 }}
          />
        </View>
      </View>

      {/* <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <Pressable style={styles.closeButton} onPress={toggleModal}>
            <Text>X</Text>
          </Pressable>
          <Text style={styles.modalTitle}>Select Quantity</Text>
          <View style={styles.quantityContainer}>
            <Pressable onPress={handleDecrement} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </Pressable>
            <TextInput
              style={styles.quantityInput}
              keyboardType="numeric"
              value={quantity.toString()}
              onChangeText={(text) => setQuantity(Number(text))}
            />
            <Pressable onPress={handleIncrement} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </Pressable>
          </View>
          <Button text="Confirm" onPress={handleAddToCart} />
        </View>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAFA",
    flex: 1,
  },
  image: {
    width: "100%",
    height: 500,
    position: "absolute",
    top: 0,
    zIndex: 1,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    zIndex: 2,
  },
  heartIcon: {
    height: 24,
    width: 24,
  },
  iconContainer2: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  descriptionBox: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: 2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 42,
    paddingBottom: 12,
  },
  judulHarga: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  judul: {
    fontSize: 20,
    fontWeight: "bold",
  },
  harga: {
    fontSize: 16,
    color: "#797979",
    fontWeight: "500",
  },
  toko: {
    marginTop: 4,
    fontSize: 12,
    color: "#616161",
    fontWeight: "500",
  },
  descriptioContainer: {
    flexDirection: "column",
    marginTop: 40,
    textAlign: "left",
    gap: 6,
    maxHeight: 88,
  },
  judul2: {
    fontSize: 16,
    fontWeight: "700",
  },
  descriptionText: {
    fontSize: 12,
    color: "#454545",
    textAlign: "justify",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
    gap: 24,
  },
  buyContainer: {
    backgroundColor: "#2B2A2A",
    color: "#fff",
    textAlign: "center",
    alignItems: "center",
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  addText: {
    color: "white",
    fontSize: 24,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: "center",
    position: "relative", // Add this line
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
    position: "relative", // Add this line
  },
  quantityButton: {
    backgroundColor: "#2B2A2A",
    borderRadius: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "relative", // Add this line
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    position: "relative", // Add this line
  },
  quantityInput: {
    width: 60,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 2,
    borderRadius: 5,
    textAlign: "center",
    marginHorizontal: 10,
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 20,
  },
});

export default ProductDetailsScreen;
