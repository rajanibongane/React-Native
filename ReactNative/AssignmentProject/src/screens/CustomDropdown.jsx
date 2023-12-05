//imports
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { COLOR } from "../shared/Constants";

const CustomDropdown = ({ options, selectedOption, onSelect }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSelect = (option) => {
    onSelect(option);
    toggleDropdown();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={toggleDropdown}
        style={styles.selectedOptionContainer}
      >
        <Text style={styles.selectedOptionText}>{selectedOption}</Text>
      </TouchableOpacity>
      {dropdownVisible && (
        <View style={styles.dropdown}>
          <FlatList
            data={options}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item)}>
                <Text style={styles.optionItem}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 1,
    width: 100,
  },
  selectedOptionContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLOR.black,
    borderRadius: 4,
  },
  selectedOptionText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  dropdown: {
    position: "absolute",
    top: 45,
    width: 100,
    backgroundColor: COLOR.white,
    borderWidth: 1,
    borderColor: COLOR.gray,
    borderRadius: 4,
    elevation: 5,
  },
  optionItem: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.gray,
  },
});

export default CustomDropdown;
