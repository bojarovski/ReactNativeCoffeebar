import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import CustomList from "@/components/CustomComponents/CustomList";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import CustomInput from "@/components/CustomComponents/CustomInput";

export default function TabTwoScreen() {
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <CustomInput
        label="Coffee Name"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <CustomInput
        label="Description"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <CustomInput
        label="Ingredience"
        value={text}
        onChangeText={(text) => setText(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
