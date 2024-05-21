import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import Field from "@/src/components/field";
import { readUser } from "@/src/api/UserCRUD";
import DateField from "@/src/components/datePicker";
import Button from "@/src/components/button";

export default function UserDetail() {
  const [name, setName] = useState("");
  const [nomorHP, setNomorHP] = useState("");
  const [date, setDate] = useState<Date>(new Date()); // Provide a default value

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await readUser();
      setUserData(user);
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.page}>
      <View style={styles.container1}>
        <Pressable
          style={styles.chevronContainer}
          onPress={() => router.back()}
        >
          <Entypo name="chevron-left" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>User Detail</Text>
      </View>
      <View style={styles.form}>
        <Field
          label="Name"
          onChange={setName}
          placeholder={userData ? userData.NamaPengguna : "Name"}
        />
        <Field
          label="Phone Number"
          onChange={setNomorHP}
          placeholder={userData ? userData.NomorHP : "Phone Number"}
        />
        <DateField label="Date Of Birth" value={date} onChange={setDate} />
      </View>
      <Button text="Save Change" style={styles.button} />
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
  button: {
    marginTop: 48,
    marginHorizontal: "auto",
  },
});
