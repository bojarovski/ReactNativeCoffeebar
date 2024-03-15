import * as React from "react";
import { View, Text } from "react-native";
import { List } from "react-native-paper";

interface Ingredient {
  name: string;
}

interface Item {
  id: number;
  name: string;
  ingredients: Ingredient[];
}

interface Props {
  items: Item[];
  expand?: boolean; // Making expand prop optional
}

const CustomList: React.FC<Props> = ({ items, expand }) => (
  <List.AccordionGroup>
    {items.map((item) => (
      <List.Accordion key={item.id} title={item.name} id={item.id.toString()}>
        {expand && // Only render if expand prop is true
          item.ingredients.map((ingredient, index) => (
            <List.Item key={index} title={ingredient.name} />
          ))}
      </List.Accordion>
    ))}
  </List.AccordionGroup>
);

export default CustomList;
