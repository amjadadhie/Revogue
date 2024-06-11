import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";

interface AddressCardProps {
  addressTitle: string;
  street: string;
  detail: string;
  postalCode: string;
  onEditPress?: () => void;
  isSelected?: boolean;
  isEdit?: boolean;
}

const AddressCard: React.FC<AddressCardProps> = ({
  addressTitle,
  street,
  detail,
  postalCode,
  onEditPress,
  isSelected = false,
  isEdit = true,
}) => {
  return (
    <View style={[styles.cardContainer, isSelected && styles.selected]}>
      <View style={styles.cardHeader}>
        <Image
          source={require("../../assets/icon/map-pin.png")}
          style={styles.icon}
        />
        <Text style={styles.addressTitle}>{addressTitle}</Text>
        {isEdit && (
          <Pressable onPress={onEditPress} style={styles.editButton}>
            <Image
              source={require("../../assets/icon/edit.png")}
              style={styles.editIcon}
            />
          </Pressable>
        )}
      </View>
      <Text style={styles.addressDetail}>{street}</Text>
      <Text style={styles.addressDetail}>
        {detail}, {postalCode}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FAFAFA",
    padding: 16,
    marginBottom: 8,
    elevation: 3,
  },
  selected: {
    borderWidth: 2,
    borderColor: "#000",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  addressTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
  },
  editButton: {
    padding: 4,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  addressDetail: {
    fontSize: 14,
    color: "#606060",
    marginBottom: 4,
  },
});

export default AddressCard;
