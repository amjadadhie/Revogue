import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Link, useSegments } from "expo-router";
import { readAllBarang } from "../api/BarangCRUD";
import { readUser } from "../api/UserCRUD"; // Import readUser to get user data
import { Barang } from "../type";

interface ProductListItemProps {
  searchQuery?: string;
  userStoreName?: boolean;
}

const ProductListItem: React.FC<ProductListItemProps> = ({
  searchQuery = "",
  userStoreName = false,
}) => {
  const [products, setProducts] = useState<Barang[] | undefined>(undefined);
  const [userData, setUserData] = useState<any>(null); // State to store user data
  const segments = useSegments();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const barangData = await readAllBarang();
        setProducts(barangData);

        const user = await readUser();
        setUserData(user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!products || !userData) {
    return <Text>Loading...</Text>;
  }

  let filteredProducts = products.filter((barang) =>
    barang.NamaBarang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter products by user's store name
  filteredProducts = filteredProducts.filter(
    (barang) => barang.NamaToko === userData.NamaToko
  );

  return (
    <View style={styles.listContainer}>
      {filteredProducts.map((barang) => (
        <View style={styles.container} key={barang.BarangID}>
          <Link href={`/${segments[0]}/home/${barang.BarangID}`} asChild>
            <Pressable>
              <Image source={{ uri: barang.Foto }} style={styles.image} />
              <Text style={styles.title}>{barang.NamaBarang}</Text>
              <Text style={styles.price}>Rp{barang.Harga}</Text>
            </Pressable>
          </Link>
        </View>
      ))}
    </View>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  container: {
    backgroundColor: "#FAFAFA",
    width: "50%", // Adjusting to slightly less than 50% to account for margin
    marginVertical: 10,
    borderRadius: 10,
    position: "relative",
    alignItems: "center",
  },
  image: {
    aspectRatio: 1,
    width: "90%",
    height: "auto",
    borderRadius: 10,
    borderColor: "#D4D4D4",
    borderWidth: 1,
  },
  title: {
    fontSize: 14,
    marginVertical: 10,
    fontWeight: "600",
  },
  price: {
    fontSize: 12,
    color: "#555555",
    fontWeight: "500",
  },
});
