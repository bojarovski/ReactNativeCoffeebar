import axios from "axios";
import _axios from "../../plugins/axios";
import { Ingredient } from "../models/ingrediantListSlice";
import { Alert } from "react-native";

type ResponseKind = "success" | "failure";

type NetworkResponse<T> = {
  kind: ResponseKind;
  body?: T;
};

export const fetchIngredients = async (): Promise<
  NetworkResponse<Ingredient[]>
> => {
  const response = await _axios.get("ingredients");

  if (response.data) {
    return {
      kind: "success",
      body: response.data,
    };
  } else {
    console.log("false");

    return {
      kind: "failure",
    };
  }
};

export const fetchIngredient = async (
  IngredientId: number
): Promise<NetworkResponse<Ingredient>> => {
  const response = await _axios.get(`ingredient/${IngredientId}/coffees`);

  if (response.data) {
    return {
      kind: "success",
      body: response.data,
    };
  } else {
    console.log("false");

    return {
      kind: "failure",
    };
  }
};

export const createIngredient = async (
  body: Ingredient
): Promise<NetworkResponse<Ingredient>> => {
  const response = await _axios.post("ingredients", body);

  if (response.data) {
    console.log("Created Ingredient is ", response.data);
    return {
      kind: "success",
      body: response.data,
    };
  } else {
    console.log("false");
    return {
      kind: "failure",
    };
  }
};
export const assignIngredientToCoffee = async (
  body: Ingredient
): Promise<NetworkResponse<Ingredient>> => {
  const response = await _axios.post("add/ingredient", body);

  if (!response) {
    return {
      kind: "failure",
    };
  } else {
    Alert.alert("Assigned Ingredient is succesfuly");
    console.log("Assigned Ingredient is ", response.data);
    return {
      kind: "success",
      body: response.data,
    };
  }
};
export const deleteIngredient = async (
  IngredientId: number
): Promise<NetworkResponse<Ingredient>> => {
  const response = await _axios.delete(`ingredients/${IngredientId}`);

  if (response.data) {
    return {
      kind: "success",
      body: response.data,
    };
  } else {
    console.log("false");

    return {
      kind: "failure",
    };
  }
};
