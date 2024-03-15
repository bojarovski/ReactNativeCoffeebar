import { StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { List, MD3Colors } from "react-native-paper";
import CustomList from "@/components/CustomComponents/CustomList";

export default function TabOneScreen() {
  const items = [
    {
      id: 1,
      name: "Caffee1",
      ingredients: [
        { name: "Ingredient 1" },
        { name: "Ingredient 2" },
        { name: "Ingredient 3" },
      ],
    },
    {
      id: 2,
      name: "Caffee 2",
      ingredients: [
        { name: "Ingredient A" },
        { name: "Ingredient B" },
        { name: "Ingredient C" },
      ],
    },
  ];
  return (
    <View style={styles.container}>
      <CustomList items={items} expand={true}></CustomList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
