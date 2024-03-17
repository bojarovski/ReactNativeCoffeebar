import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  placeholder: string;
  data: any[]; // Type according to your data structure
  selected: any[]; // Type according to your data structure
  setSelected: React.Dispatch<React.SetStateAction<any[]>>;
  style?: any; // Adjust type according to your styling needs
}

const CustomDropdown: React.FC<Props> = ({
  placeholder,
  data,
  selected,
  setSelected,
  style,
}) => {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  return (
    <View>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, style]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        search
        data={data}
        labelField="name"
        valueField="id"
        placeholder={placeholder}
        activeColor={"#665a6f"}
        itemTextStyle={{ color: "#fff" }}
        searchPlaceholder="Search..."
        value={selected}
        onChange={(item: any) => {
          setSelected(item);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? "blue" : "black"}
            name="Safety"
            size={20}
          />
        )}
        containerStyle={styles.dropdownStyle}
      />
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  dropdown: {
    marginHorizontal: 6,
    marginTop: 5,
    borderWidth: 1.5,
    height: 45,
    borderColor: "#665a6f",
  },
  dropdownStyle: {
    borderBottomWidth: 0.2,
    height: 200,
    backgroundColor: "#665a6f",
    borderColor: "#665a6f",
    elevation: 2,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.45,
    shadowRadius: 2,
  },
  placeholderStyle: {
    fontSize: 16,
    marginHorizontal: "3%",
    color: "#665a6f",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#fff",
  },
  iconStyle: {
    width: 20,
    height: 20,
    margin: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderWidth: 0,
    color: "#fff",
  },
  selectedStyle: {
    borderRadius: 5,
    backgroundColor: "#663399",
    borderColor: "#663399",
    borderWidth: 2,
  },
});
