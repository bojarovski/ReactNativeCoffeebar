import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View } from "@/components/Themed";
import CustomList from "@/components/CustomComponents/CustomList";
import { deleteCoffee, fetchCoffees } from "../../store/models/coffeeListSlice";
import { useFocusEffect } from "expo-router";
import { RootState } from "@/store/store";

export default function TabOneScreen() {
  const dispatch = useDispatch();
  const coffees = useSelector((state: RootState) => state.coffeeList.coffees);
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchCoffees());
    }, [dispatch])
  );
  const apiCall = (id: number) => {
    return dispatch(fetchCoffees());
  };
  const deleteApi = (id: number) => {
    dispatch(deleteCoffee({ coffeeId: id })).then(() => {
      dispatch(fetchCoffees());
    });
  };
  return (
    <ScrollView style={styles.container}>
      <CustomList
        deleteApi={deleteApi}
        items={coffees}
        apiCall={apiCall}
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
