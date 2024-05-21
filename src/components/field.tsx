import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

type FieldProps = {
  label: string;
  placeholder: string;
  onChange: (text: string) => void;
};

const Field: React.FC<FieldProps> = ({ label, placeholder, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "black",
  },
  input: {
    height: 40,
    borderColor: "#9D9D9D",
    borderBottomWidth: 1,
    fontSize: 12,
    color: "#4D4D4D",
    fontWeight: "400",
  },
});

export default Field;
