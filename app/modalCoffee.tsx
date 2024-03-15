import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import CustomInput from "@/components/CustomComponents/CustomInput";
import { Button } from "react-native-paper";

export default function ModalScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const nameText = (text: string) => {
    setName(text);
  };

  const descriptionText = (text: string) => {
    setDescription(text);
  };

  const handleCreate = () => {
    console.log("Name:", name);
    console.log("Description:", description);
  };

  return (
    <View style={styles.container}>
      <CustomInput onChangeText={nameText} label="Name" />
      <CustomInput onChangeText={descriptionText} label="Description" />
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
