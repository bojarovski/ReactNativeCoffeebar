import * as React from "react";
import { View, StyleSheet } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";

interface Props {
  placeholder: string;
  data: any[]; // Type according to your data structure
  selected: any[]; // Type according to your data structure
  setSelected: React.Dispatch<React.SetStateAction<any[]>>;
  style?: any; // Adjust type according to your styling needs
}

const CustomMultiSelect: React.FC<Props> = ({
  placeholder,
  data = [],
  selected,
  setSelected,
  style,
}) => (
  <View style={{ marginBottom: 23 }}>
    <MultiSelect
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
      activeColor={"#000"}
      itemTextStyle={{ color: "#fff" }}
      searchPlaceholder="Search..."
      value={selected}
      onChange={(item: any) => {
        setSelected(item);
      }}
      selectedStyle={styles.selectedStyle}
      containerStyle={styles.dropdownStyle}
    />
  </View>
);

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

export default CustomMultiSelect;
