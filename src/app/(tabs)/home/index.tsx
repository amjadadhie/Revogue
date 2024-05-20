import React, { useState } from "react";
import { StyleSheet, Image, Text, View, ScrollView } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import ProductListItem from "../../../components/clothesBox";
import TypeFilter from "../../../components/clothesType";

export default function HomePage() {
  const [filter, setFilter] = useState("");

  const handleFilter = (type: string) => {
    setFilter(type);
  };

  return (
    <ScrollView style={styles.page}>
      <View style={styles.container1}>
        <Text style={styles.title}>Hi, User!</Text>

        <View style={styles.iconContainer}>
          <FontAwesome6 name="heart" size={24} color="black" />
          <Feather name="shopping-cart" size={24} color="black" />
        </View>
      </View>
      <View style={styles.typeContainer}>
        <TypeFilter
          imageSource={require("../../../../assets/home/kaos.png")}
          onPress={() => handleFilter("Clothes")}
          text="Clothes"
        />
        <TypeFilter
          imageSource={require("../../../../assets/home/celana.png")}
          onPress={() => handleFilter("Clothes")}
          text="Pants"
        />
        <TypeFilter
          imageSource={require("../../../../assets/home/tas.png")}
          onPress={() => handleFilter("Clothes")}
          text="Bags"
        />
        <TypeFilter
          imageSource={require("../../../../assets/home/sepatu.png")}
          onPress={() => handleFilter("Clothes")}
          text="Shoes"
        />
      </View>
      <View style={styles.boxContainer}>
        <Text style={styles.title3}>Our Products</Text>
        <ProductListItem />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 72,
    paddingRight: 26,
    paddingLeft: 26,
    backgroundColor: "#FAFAFA",
  },
  container1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  title3: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  typeContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-around",
    gap: 28,
  },
  boxContainer: {
    marginTop: 38,
  },
});
