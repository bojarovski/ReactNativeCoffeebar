import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import CustomInput from "@/components/CustomComponents/CustomInput";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { createCoffee } from "@/store/models/coffeeListSlice";
import { useNavigation } from "@react-navigation/native";

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
  const navigation = useNavigation();

  const handleCreate = () => {
    const body = {
      name: name,
      description: description,
      price: price,
    };
    dispatch(createCoffee({ body: body }));
    navigation.goBack();
  };
  // Define the type of your selected items

  return (
    <View style={styles.container}>
      <CustomInput type="default" onChangeText={nameText} label="Name" />

      <CustomInput
        type="default"
        onChangeText={descriptionText}
        label="Description"
      />
      <CustomInput type="decimal-pad" onChangeText={priceText} label="Price" />

      <Button mode="contained" onPress={handleCreate}>
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
