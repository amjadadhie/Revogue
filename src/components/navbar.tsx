import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Link, useSegments } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";

const Navbar = () => {
  const segments = useSegments();

  // Explicitly type the 'route' parameter as a string
  const isActive = (route: string): boolean => {
    return segments.includes(route);
  };

  return (
    <View style={styles.navbar}>
      <Link href="/home" asChild>
        <Pressable>
          <Feather
            name="home"
            size={24}
            color={isActive("home") ? "black" : "#949494"}
          />
        </Pressable>
      </Link>
      <Link href="/favorite" asChild>
        <Pressable>
          <FontAwesome5
            name="heart"
            size={24}
            color={isActive("favorite") ? "black" : "#949494"}
          />
        </Pressable>
      </Link>
      <Link href="/cart" asChild>
        <Pressable>
          <Feather
            name="shopping-cart"
            size={24}
            color={isActive("cart") ? "black" : "#949494"}
          />
        </Pressable>
      </Link>
      <Link href="/settings" asChild>
        <Pressable>
          <Feather
            name="user"
            size={28}
            color={isActive("settings") ? "black" : "#949494"}
          />
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    alignItems: "center",
    height: 60,
    backgroundColor: "white",
    bottom: 0,
    borderColor: "#EAEAEA",
    borderTopWidth: 2,
    width: "100%",
  },
});

export default Navbar;
