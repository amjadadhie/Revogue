import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";

type FieldProps = {
  label: string;
  placeholder: string;
  onChange: (text: string) => void;
  isPassword?: boolean;
};

const Field: React.FC<FieldProps> = ({
  label,
  placeholder,
  onChange,
  isPassword = false,
}) => {
  const [secureText, setSecureText] = useState(isPassword);

  const toggleSecureText = () => {
    setSecureText(!secureText);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChange}
          placeholder={placeholder}
          secureTextEntry={secureText}
        />
        {isPassword && (
          <Pressable onPress={toggleSecureText} style={styles.icon}>
            <Feather
              name={secureText ? "eye-off" : "eye"}
              size={16}
              color="gray"
            />
          </Pressable>
        )}
      </View>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#9D9D9D",
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 12,
    color: "#4D4D4D",
    fontWeight: "400",
  },
  icon: {
    padding: 8,
  },
});

export default Field;
