import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert, ScrollView } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import Field from "@/src/components/field";
import { readUser, editPengguna } from "@/src/api/UserCRUD";
import DateField from "@/src/components/datePicker";
import Button from "@/src/components/button";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from '@react-navigation/native';

export default function UserStore() {
    const [toko, setToko] = useState("");
    const [userData, setUserData] = useState<any>(null);


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
                userData.Nama,
                userData.TanggalLahir,
                userData.JenisKelamin,
                userData.NomorHP
            );
            Alert.alert("Success", "User information updated successfully.");
        } catch (error) {
            console.error("Error updating user information:", error);
            Alert.alert("Error", "Failed to update user information.");
        }
    }
    if (!userData) {
      // Return loading indicator or empty view while user data is being fetched
      return <View style={styles.loading}><Text>Loading...</Text></View>;
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
                  <Button text="Add Store" onPress={handleAddStore} style={styles.button} />
              </View>
          </View>
      );
  } else {
      return (
          <ScrollView style={styles.page}>
              <View style={styles.container1}>
                  <Text style={styles.title}>Your Products</Text>
              </View>
              <View style={styles.boxContainer}>
                  {/* isi dengan data produk */}
                  <Text>Product 1</Text>
                  <Text>Product 2</Text>
                  {/* Anda dapat mengganti dengan komponen atau data produk nyata */}
              </View>
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
      },
      loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
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
  }
  });