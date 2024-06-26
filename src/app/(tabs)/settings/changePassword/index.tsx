import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import Field from "@/src/components/field";
import { readUser, editPengguna } from "@/src/api/UserCRUD";
import DateField from "@/src/components/datePicker";
import Button from "@/src/components/button";
import RNPickerSelect from "react-native-picker-select";
import { gantiPassword } from "@/src/api/UserCRUD";

export default function changePassword() {
  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await readUser();
      setUserData(user);
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    if (userData.Password != currentPassword) {
      Alert.alert("Error", "User data is not loaded yet.");
      return;
    }

    try {
      await gantiPassword(currentPassword, newPassword,confirmPassword);
      Alert.alert("Success", "User password updated successfully.");
    } catch (error) {
      console.error("Error updating user password:", error);
      Alert.alert("Error", "Failed to update user password.");
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.container1}>
        <Pressable
          style={styles.chevronContainer}
          onPress={() => router.back()}
        >
          <Entypo name="chevron-left" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>Change Password</Text>
      </View>
      <View style={styles.form}>
        <Field
          label="Current Password"
          onChange={(value) => setcurrentPassword(value)}
          placeholder={"Current Password"}
          isPassword={true}
        />
        <Field
          label="New Password"
          onChange={(value) => setNewPassword(value)}
          placeholder={"New Password"}
          isPassword={true}
        />
        <Field
          label="Confirm Password"
          onChange={(value) => setConfirmPassword(value)}
          placeholder={"Confirm Password"}
          isPassword={true}
        />
      </View>
      <Button
        text="Change Password"
        style={styles.button}
        onPress={handleUpdate}
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
});
