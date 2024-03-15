import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import CustomList from "@/components/CustomComponents/CustomList";

export default function TabTwoScreen() {
  const items = [
    {
      id: 1,
      name: "Ingredient 1",
      ingredients: [
        { name: "Caffee 1" },
        { name: "Caffee 2" },
        { name: "Caffee 3" },
      ],
    },
    {
      id: 2,
      name: "Ingredient 2",
      ingredients: [
        { name: "Caffee A" },
        { name: "Caffee B" },
        { name: "Caffee C" },
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
