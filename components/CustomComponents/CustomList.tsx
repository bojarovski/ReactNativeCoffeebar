import * as React from "react";
import { Button, List, Menu, PaperProvider } from "react-native-paper";
import { Coffee } from "@/store/models/coffeeListSlice";
import { TouchableOpacity, View } from "react-native";

interface Ingredient {
  name: string;
}

interface Props {
  items: Coffee[];
  apiCall: (id: number) => {}; // Corrected type to Promise<void>
  deleteApi: (id: number) => void; // Corrected type to Promise<void>
}

const CustomList: React.FC<Props> = ({ items, apiCall, deleteApi }) => {
  const onPress = async (item: Coffee) => {
    const res = await apiCall(item.id);
    setSecondItem(res);
  };

  const deleteItem = async (id: number) => {
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
            id={item.id.toString()}
          >
            {secondItem.map((ingredient, index) => (
              <List.Item key={index} title={ingredient.name} />
            ))}
            <TouchableOpacity
              onPress={() => deleteItem(item.id)} // Handle deletion here
              style={{
                backgroundColor: "#FF5733",
                alignItems: "center",
                paddingVertical: 5,
                marginHorizontal: 10,
                borderRadius: 10,
              }}
            >
              <List.Item
                titleStyle={{
                  color: "#fff",
                  textAlign: "center",
                }}
                title="Delete"
              />
            </TouchableOpacity>
          </List.Accordion>
        ))}
      </List.Section>
    </>
  );
};

export default CustomList;
