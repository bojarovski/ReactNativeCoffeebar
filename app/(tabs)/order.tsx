import { StyleSheet } from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import CustomList from "@/components/CustomComponents/CustomList";
import { TextInput } from "react-native-paper";
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
import { Button } from "react-native-paper";

export default function TabTwoScreen() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const ingredients = useSelector(
    (state: RootState) => state.ingredient.ingredients
  );
  const coffee = useSelector((state: RootState) => state.coffeeList.coffee);
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
  const handleSelectedCoffee = (selectedCoffee) => {
    setSelectedCoffee(selectedCoffee);
    dispatch(fetchCoffee({ coffeeId: selectedCoffee[0] })).then((res) => {
      const ingredientId = res.payload.Coffee.map(
        (ingredient) => ingredient.id
      );

      setSelectedEngrediants(ingredientId);
    });
  };
  const handleSelectedIngrediants = (selectedIngrediants) => {
    setSelectedEngrediants(selectedIngrediants);
  };
  useEffect(() => {}, [selectedEngerdiants]);
  const handleCreate = () => {
    const body = {
      coffee_id: selectedCoffee[0],
      ingredients_ids: selectedEngerdiants,
      quantity: 3,
    };
    dispatch(assignIngredientToCoffee({ body: body }));
  };
  return (
    <View style={styles.container}>
      <CustomMultiSelect
        placeholder="Select Coffee"
        data={coffees}
        selected={selectedCoffee}
        setSelected={handleSelectedCoffee}
      ></CustomMultiSelect>
      <CustomInput
        label="Description"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <CustomMultiSelect
        placeholder="Select Engerdiants"
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
