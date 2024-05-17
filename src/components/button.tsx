import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { forwardRef } from "react";
import React from "react";

type ButtonProps = {
  text: string;
  style?: ViewStyle; // Add style prop to the ButtonProps type
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  ({ text, style, ...pressableProps }, ref) => {
    return (
      <Pressable
        ref={ref}
        {...pressableProps}
        style={[styles.container, style]}
      >
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#2B2A2A",
    color: "#fff",
    textAlign: "center",
    alignItems: "center",
    borderRadius: 20,
    width: 270, // Default width
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});

export default Button;
