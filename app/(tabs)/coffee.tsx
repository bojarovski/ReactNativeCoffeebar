import { StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { List, MD3Colors } from "react-native-paper";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <List.AccordionGroup>
        <List.Accordion title="Accordion 1" id="1">
          <List.Item title="Item 1" />
        </List.Accordion>
      </List.AccordionGroup>
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
