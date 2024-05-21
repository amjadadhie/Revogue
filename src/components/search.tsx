// components/SearchBar.tsx
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <View style={styles.container}>
      <Feather name="search" size={24} color="black" />
      <TextInput
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 26,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: "#D4D4D4",
    borderWidth: 1,
    borderRadius: 10,
    gap: 12,
  },
});

export default SearchBar;
