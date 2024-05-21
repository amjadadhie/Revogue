import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import SettingsButton from "@/src/components/settingButton"; // Adjust the import path as necessary

export default function SettingsPage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.container1}>
        <Text style={styles.title}>My Profile</Text>
      </View>
      <View style={styles.container2}>
        <Pressable onPress={pickImage}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require("../../../../assets/icon.png")
            }
            style={styles.image}
          />
        </Pressable>
        <Text style={styles.body2} selectionColor={"#606060"}>
          Hi,
        </Text>
        <Text style={styles.body2}>Raka Admiharfan</Text>
      </View>
      <SettingsButton
        href="/settings/userDetail"
        source="../../../../assets/icon/Article.svg"
        title="User Details"
      />
      <SettingsButton
        href="/settings/userDetail"
        source="../../../../assets/icon/lock.svg"
        title="Change Password"
      />
      <SettingsButton
        href="/settings/userDetail"
        source="../../../../assets/icon/map-pin.svg"
        title="Address Book"
      />
      <SettingsButton
        href="/settings/userDetail"
        source="../../../../assets/icon/Bag.svg"
        title="My Orders"
      />
      <SettingsButton
        href="/settings/userDetail"
        source="../../../../assets/icon/log-out.svg"
        title="Sign Out"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 24,
    paddingBottom: 72,
    backgroundColor: "#FAFAFA",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginTop: 20,
    marginBottom: 8,
  },
  container1: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderColor: "#D9D9D9",
    paddingBottom: 16,
  },
  container2: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  body2: {
    fontSize: 12,
  },
});
