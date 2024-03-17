import * as React from "react";
import { Button, List, Menu, PaperProvider } from "react-native-paper";
import { Coffee } from "@/store/models/coffeeListSlice";
import { TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchIngredient } from "../../store/models/ingrediantListSlice";
import { fetchCoffee } from "../../store/models/coffeeListSlice";
interface Ingredient {
  name: string;
}

interface Props {
  items: Coffee[];
  deleteApi: (id: number) => void;
  type: String;
}

const CustomList: React.FC<Props> = ({ items, deleteApi, type }) => {
  const dispatch = useDispatch();
  const [openItemId, setOpenItemId] = React.useState<number | null>(null);
  const [ingredients, setIngredients] = React.useState<{
    [key: number]: Ingredient[];
  }>({});
  const [operationInProgress, setOperationInProgress] =
    React.useState<boolean>(false); // State to track operation status

  const onPress = async (item: Coffee) => {
    if (operationInProgress) return; // If operation in progress, prevent further clicks
    setOperationInProgress(true); // Set operation in progress
    if (openItemId === item.id) {
      setOpenItemId(null); // Close the accordion if it's already open
      setOperationInProgress(false); // Reset operation status
    } else {
      setOpenItemId(item.id);
      try {
        if (type === "ingredient") {
          dispatch(fetchIngredient({ IngredientId: item.id })).then(
            (res: any) => {
              if (res.payload) {
                setSecondItem(res.payload.ingredientById);
              } else {
                setSecondItem([]);
              }
            }
          );
        } else if (type === "coffee") {
          dispatch(fetchCoffee({ coffeeId: item.id })).then((res: any) => {
            if (res.payload) {
              setSecondItem(res.payload.Coffee);
            } else {
              setSecondItem([]);
            }
          });
        }
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      } finally {
        setOperationInProgress(false); // Reset operation status after API call completes
      }
    }
  };

  const deleteItem = async (id: number) => {
    if (operationInProgress) return; // If operation in progress, prevent further clicks
    setOperationInProgress(true); // Set operation in progress
    try {
      await deleteApi(id);
      // After deletion, remove the ingredients from state
      setIngredients((prevIngredients) => {
        const updatedIngredients = { ...prevIngredients };
        delete updatedIngredients[id];
        return updatedIngredients;
      });
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setOperationInProgress(false); // Reset operation status after deletion completes
    }
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
            expanded={openItemId === item.id} // Control the expansion state
          >
            {openItemId === item.id &&
              secondItem?.map((ingredient, index) => (
                <List.Item key={index} title={ingredient.name} />
              ))}
            {openItemId === item.id && (
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
            )}
          </List.Accordion>
        ))}
      </List.Section>
    </>
  );
};

export default CustomList;
