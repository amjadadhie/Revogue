import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  Modal,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import AddressCard from "@/src/components/address";
import { readAddress, editAddress, addAddress } from "@/src/api/addressBook";
import { Alamat } from "@/src/type";
import Button from "@/src/components/button";

const AddressModal = ({
  visible,
  onClose,
  address,
  onSave,
  isEditing,
}: any) => {
  const [editedAddress, setEditedAddress] = useState<Alamat>(
    address || { NamaAlamat: "", NamaJalan: "", DetailAlamat: "", KodePos: "" }
  );

  useEffect(() => {
    setEditedAddress(
      address || {
        NamaAlamat: "",
        NamaJalan: "",
        DetailAlamat: "",
        KodePos: "",
      }
    );
  }, [address]);

  const handleSave = () => {
    onSave(editedAddress);
    onClose();
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Entypo name="cross" size={24} color="black" />
          </Pressable>
          <Text style={styles.modalTitle}>
            {isEditing ? "Edit Address" : "Add Address"}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Address Title (Ex: Rumah, Kos)"
            value={editedAddress.NamaAlamat}
            onChangeText={(text) =>
              setEditedAddress({ ...editedAddress, NamaAlamat: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Street (Ex: JL.Kayu No.1)"
            value={editedAddress.NamaJalan}
            onChangeText={(text) =>
              setEditedAddress({ ...editedAddress, NamaJalan: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Detail (Ex: Kecamatan, Kabupaten)"
            value={editedAddress.DetailAlamat}
            onChangeText={(text) =>
              setEditedAddress({ ...editedAddress, DetailAlamat: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Postal Code (Ex: 40132)"
            value={editedAddress.KodePos}
            onChangeText={(text) =>
              setEditedAddress({ ...editedAddress, KodePos: text })
            }
          />
          <View style={styles.buttonContainer}>
            <Button text="Save" onPress={handleSave} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function AddressBook() {
  const [addresses, setAddresses] = useState<Alamat[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Alamat | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      const fetchedAddresses = await readAddress();
      setAddresses(fetchedAddresses || []);
    };

    fetchAddresses();
  }, []);

  const handleEditPress = (index: number) => {
    setSelectedAddress(addresses[index]);
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleAddPress = () => {
    setSelectedAddress(null);
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const handleSaveAddress = async (editedAddress: Alamat) => {
    if (isEditing && selectedAddress) {
      await editAddress(
        selectedAddress.NamaAlamat,
        editedAddress.NamaAlamat,
        editedAddress.NamaJalan,
        editedAddress.DetailAlamat,
        editedAddress.KodePos
      );
    } else {
      await addAddress(
        editedAddress.NamaAlamat,
        editedAddress.NamaJalan,
        editedAddress.DetailAlamat,
        editedAddress.KodePos
      );
    }

    const updatedAddresses = await readAddress();
    setAddresses(updatedAddresses || []);
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
        <Text style={styles.title}>Address Book</Text>
      </View>
      <View>
        {addresses.map((address, index) => (
          <AddressCard
            key={index}
            addressTitle={address.NamaAlamat}
            street={address.NamaJalan}
            detail={address.DetailAlamat}
            postalCode={address.KodePos}
            onEditPress={() => handleEditPress(index)}
          />
        ))}
      </View>
      <View style={styles.button}>
        <Button text="Add Address" onPress={handleAddPress} />
      </View>

      <AddressModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        address={selectedAddress}
        onSave={handleSaveAddress}
        isEditing={isEditing}
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
  chevronContainer: {
    position: "absolute",
    left: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    marginHorizontal: "auto",
    marginTop: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 10,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
});
