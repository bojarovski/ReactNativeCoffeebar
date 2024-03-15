import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import CustomInput from "@/components/CustomComponents/CustomInput";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { createCoffee } from "@/store/models/coffeeListSlice";
import CustomMultiSelect from "@/components/CustomComponents/CustomMultiSelect";

export default function ModalScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const dispatch = useDispatch();

  const nameText = (text: string) => {
    setName(text);
  };

  const descriptionText = (text: string) => {
    setDescription(text);
  };

  const priceText = (text: string) => {
    setPrice(text);
  };

  const handleCreate = () => {
    console.log("Name:", name);
    console.log("Description:", description, price);
    const body = {
      name: name,
      description: description,
      price: price,
    };
    console.log(body, "FIRST");

    dispatch(createCoffee({ body: body }));
  };
  const [selectedItems, setSelectedItems] = React.useState<any[]>([]); // Define the type of your selected items
  const data = [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
    // Add more options as needed
  ];

  return (
    <View style={styles.container}>
      <CustomInput type="default" onChangeText={nameText} label="Name" />

      <CustomInput
        type="default"
        onChangeText={descriptionText}
        label="Description"
      />
      <CustomInput type="decimal-pad" onChangeText={priceText} label="Price" />
      <CustomMultiSelect
        placeholder="Select options"
        data={data}
        selected={selectedItems}
        setSelected={setSelectedItems}
      ></CustomMultiSelect>
      <Button icon="" mode="contained" onPress={handleCreate}>
        Create
      </Button>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
