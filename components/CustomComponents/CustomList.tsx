import * as React from "react";
import { List } from "react-native-paper";
import { Coffee } from "@/store/models/coffeeListSlice";

interface Ingredient {
  name: string;
}

interface Props {
  items: Coffee[];
  apiCall: (id: number) => {}; // Callback function to call API
}

const CustomList: React.FC<Props> = ({ items, apiCall }) => {
  const onPress = async (item: Coffee) => {
    const res = await apiCall(item.id); // Wait for the API call to complete
    setSecondItem(res.payload.coffees);
  };

  const [secondItem, setSecondItem] = React.useState<Ingredient[]>([]);

  return (
    <List.Section>
      {items.map((item) => (
        <List.Accordion
          onPress={() => onPress(item)}
          description={item.description}
          key={item.id}
          title={item.name}
          id={item.id.toString()}
        >
          {secondItem &&
            secondItem.map((ingredient, index) => (
              <List.Item key={index} title={ingredient.name} />
            ))}
        </List.Accordion>
      ))}
    </List.Section>
  );
};

export default CustomList;
