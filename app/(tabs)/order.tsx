import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "@/components/CustomComponents/CustomInput";
import CustomMultiSelect from "@/components/CustomComponents/CustomMultiSelect";
import { RootState } from "@/store/store";
import {
  fetchIngredients,
  assignIngredientToCoffee,
} from "../../store/models/ingrediantListSlice";
import { fetchCoffees, fetchCoffee } from "../../store/models/coffeeListSlice";
import { Button, Divider, Text } from "react-native-paper";
import CustomDropdown from "@/components/CustomComponents/CutomDropDown";

export default function TabTwoScreen() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const ingredients = useSelector(
    (state: RootState) => state.ingredient.ingredients
  );
  const coffees = useSelector((state: RootState) => state.coffeeList.coffees);
  const [selectedCoffee, setSelectedCoffee] = React.useState<any[]>([]);
  const [selectedEngerdiants, setSelectedEngrediants] = React.useState<any[]>(
    []
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchIngredients());
    }, [dispatch])
  );
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchCoffees());
    }, [dispatch])
  );

  const handleSelectedCoffee = (selectedCoffee: any) => {
    setText(selectedCoffee.description);

    if (selectedCoffee) {
      setSelectedCoffee(selectedCoffee);
    } else {
      setSelectedCoffee([]);
    }

    dispatch(fetchCoffee({ coffeeId: selectedCoffee.id })).then((res: any) => {
      const ingredientId = res.payload?.Coffee.map(
        (ingredient: any) => ingredient.id
      );
      if (ingredientId) {
        setSelectedEngrediants(ingredientId);
      } else {
        setSelectedEngrediants([]);
      }
    });
  };
  const handleSelectedIngrediants = (selectedIngrediants: any) => {
    setSelectedEngrediants(selectedIngrediants);
  };
  useEffect(() => {}, [selectedEngerdiants]);
  const handleCreate = () => {
    const body = {
      coffee_id: selectedCoffee.id,
      ingredient_ids: selectedEngerdiants,
      quantity: 3,
    };

    dispatch(assignIngredientToCoffee({ body: body }));
  };
  return (
    <View style={styles.container}>
      <CustomDropdown
        placeholder="Select Coffee"
        data={coffees}
        selected={selectedCoffee}
        setSelected={handleSelectedCoffee}
      ></CustomDropdown>
      <Text style={{ margin: 3 }}>Description: {text}</Text>
      <Divider style={{ margin: 3 }} />
      <CustomMultiSelect
        placeholder="Select Ingerdiants"
        data={ingredients}
        selected={selectedEngerdiants}
        setSelected={handleSelectedIngrediants}
      ></CustomMultiSelect>
      <Button mode="contained" onPress={handleCreate}>
        Create
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
