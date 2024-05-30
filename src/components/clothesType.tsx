import React from "react";
import {
  StyleSheet,
  Pressable,
  Image,
  ImageSourcePropType,
  Text,
  View,
} from "react-native";

interface FilterButtonProps {
  imageSource: ImageSourcePropType;
  onPress: () => void;
  text: string;
}

const TypeFilter: React.FC<FilterButtonProps> = ({
  imageSource,
  onPress,
  text,
}) => {
  return (
    <View>
      <Pressable onPress={onPress} style={styles.filterButton}>
        <Image source={imageSource} style={styles.filterImage} />
      </Pressable>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

export default TypeFilter;

const styles = StyleSheet.create({
  filterButton: {
    width: 55,
    height: 55,
    borderRadius: 30,
    borderColor: "#E3E3E3",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
  },
  filterImage: {
    width: 30,
    height: 30,
  },
  textContainer: {
    marginTop: 6,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  text: { fontSize: 12, color: "#555555" },
});
