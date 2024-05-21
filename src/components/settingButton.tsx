import React from "react";
import { View, StyleSheet, Pressable, Image, Text } from "react-native";
import { Link } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";

interface SettingsButtonProps {
  href?: string;
  source: string; // This will be a URI string now
  title: string;
  onPress?: () => void;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({
  href = "/",
  source,
  title,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <Link href={href} asChild>
        <Pressable style={styles.linkContainer}>
          <Image source={{ uri: source }} style={styles.icon} />
          <Text>{title}</Text>
          <View style={styles.chevronContainer}>
            <Entypo name="chevron-right" size={24} color="black" />
          </View>
        </Pressable>
      </Link>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderColor: "#E7E7E7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // To space out the items properly
    paddingHorizontal: 16, // Add padding for spacing
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 8, // Add margin to separate icon and text
  },
  chevronContainer: {
    marginLeft: "auto", // Push chevron to the end
  },
});

export default SettingsButton;
