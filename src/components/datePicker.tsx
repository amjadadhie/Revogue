import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

type DateFieldProps = {
  label: string;
  value: Date
  onChange: (date: Date) => void;
};

const DateField: React.FC<DateFieldProps> = ({
  label,
  value,
  onChange,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable onPress={() => setShowPicker(true)}>
        <Text style={styles.dateText}>{value.toDateString()}</Text>
      </Pressable>
      {showPicker && (
        <DateTimePicker
          mode="date"
          display="default"
          value={value}
          onChange={handleDateChange}
        />
      )}
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
  dateText: {
    height: 40,
    borderColor: "#9D9D9D",
    borderBottomWidth: 1,
    fontSize: 12,
    color: "#4D4D4D",
    fontWeight: "400",
    lineHeight: 40,
  },
});

export default DateField;
