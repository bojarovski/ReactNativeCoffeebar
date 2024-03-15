import * as React from "react";
import { Button, List, Menu, PaperProvider } from "react-native-paper";
import { Coffee } from "@/store/models/coffeeListSlice";
import { View } from "react-native";

interface Ingredient {
  name: string;
}

interface Props {
  items: Coffee[];
  apiCall: (id: number) => Promise<void>; // Corrected type to Promise<void>
  deleteApi: (id: number) => Promise<void>; // Corrected type to Promise<void>
}

const CustomList: React.FC<Props> = ({ items, apiCall, deleteApi }) => {
  const onPress = async (item: Coffee) => {
    const res = await apiCall(item.id);
    setSecondItem(res.payload.coffees);
  };
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const deleteItem = async (id: number) => {
    console.log("dasdasdsa");

    await deleteApi(id);
  };

  const [secondItem, setSecondItem] = React.useState<Ingredient[]>([]);

  return (
    <>
      <List.Section>
        {items.map((item) => (
          <List.Accordion
            onPress={() => onPress(item)}
            description={item.description}
            key={item.id}
            title={item.name}
            onLongPress={openMenu}
            id={item.id.toString()}
          >
            {secondItem.map((ingredient, index) => (
              <List.Item key={index} title={ingredient.name} />
            ))}
            <List.Item
              titleStyle={{
                borderWidth: 1,
                borderColor: "#ff5733",
                backgroundColor: "#FF5733", // Change background color of the button
                textAlign: "center",
                height: 30, // Center the text horizontally
                marginHorizontal: 10, // Add margin on both sides
                borderRadius: 10, // Add border radius to create rounded corners
              }}
              title="Delete"
            />
          </List.Accordion>
        ))}
      </List.Section>
    </>
  );
};

export default CustomList;
