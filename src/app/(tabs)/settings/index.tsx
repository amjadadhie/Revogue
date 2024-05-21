import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import SettingsButton from "@/src/components/settingButton"; // Adjust the import path as necessary
import { userSignOut } from "../../(auth)/signOut";
import { editFotoPengguna, readUser } from "@/src/api/UserCRUD";
import { auth } from "@/src/constants/firebaseConfig";

export default function SettingsPage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null); // State to hold user data

  const emailUser = auth.currentUser?.email as string;

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await readUser();
      setUserData(user);
    };

    fetchUserData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      // Update profile image state
      setProfileImage(result.assets[0].uri);

      // Call editFotoPengguna function with user's email and selected image file
      try {
        await editFotoPengguna(emailUser, result.assets[0].uri);
        console.log("User photo updated successfully");
      } catch (error) {
        console.error("Error updating user photo:", error);
      }
    }
  };

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        onPress: async () => {
          try {
            await userSignOut();
            // Navigate to sign-in page or perform any other necessary actions
          } catch (error) {
            console.error("Error signing out:", error);
          }
        },
        style: "destructive",
      },
    ]);
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
              userData && userData.Foto
                ? { uri: userData.Foto }
                : require("../../../../assets/icon.png")
            }
            style={styles.image}
          />
        </Pressable>
        <Text style={styles.body2} selectionColor={"#606060"}>
          Hi,
        </Text>
        <Text style={styles.body2}>
          {userData ? userData.Username : "Loading..."}
        </Text>
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
        source="../../../../assets/icon/log-out.svg"
        onPress={handleSignOut}
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
