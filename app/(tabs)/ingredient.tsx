import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View } from "@/components/Themed";
import CustomList from "@/components/CustomComponents/CustomList";
import {
  deleteIngredient,
  fetchIngredients,
} from "../../store/models/ingrediantListSlice";
import { useFocusEffect } from "expo-router";
import { RootState } from "@/store/store";

export default function TabOneScreen() {
  const dispatch = useDispatch();
  const ingredient = useSelector(
    (state: RootState) => state.ingredient.ingredients
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchIngredients());
    }, [dispatch])
  );

  const deleteApi = (id: number) => {
    dispatch(deleteIngredient({ IngredientId: id })).then(() => {
      dispatch(fetchIngredients());
    });
  };
  return (
    <ScrollView style={styles.container}>
      <CustomList
        deleteApi={deleteApi}
        items={ingredient}
        type={"ingredient"}
      ></CustomList>
    </ScrollView>
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
