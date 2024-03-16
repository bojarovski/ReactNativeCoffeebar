import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apiClient from "../Api/apiIngediant";

export type Ingredient = {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
};

export type IngredientListState = {
  ingredients: Ingredient[];
  ingredient: Ingredient;
  addIngredient: Ingredient;
};

const initialState: IngredientListState = {
  ingredients: [],
  ingredient: {},
  addIngredient: {},
};

// APIS
export const fetchIngredients = createAsyncThunk(
  "fetchIngredients",
  async () => {
    const response = await apiClient.fetchIngredients();

    if (response.kind === "success") {
      return {
        Ingredients: response.body ?? [],
      };
    } else {
      throw "Error fetching Ingredients";
    }
  }
);

export const fetchIngredient = createAsyncThunk<
  { Ingredient: Ingredient },
  { IngredientId: number }
>("fetchIngredient", async ({ IngredientId }) => {
  const response = await apiClient.fetchIngredient(IngredientId);
  if (response.kind === "success") {
    return {
      Ingredient: response.body ?? {},
    };
  } else {
    throw "Error fetching Ingredients";
  }
});

export const createIngredient = createAsyncThunk<
  { addIngredient: Ingredient },
  { body: Ingredient }
>("createIngredient", async ({ body }) => {
  const response = await apiClient.createIngredient(body);
  if (response.kind === "success") {
    return {
      addIngredient: response.body ?? {},
    };
  } else {
    throw "Error fetching Ingredients";
  }
});

export const deleteIngredient = createAsyncThunk<
  { Ingredients: Ingredient },
  { IngredientId: number }
>("deleteIngredient", async ({ IngredientId }) => {
  const response = await apiClient.deleteIngredient(IngredientId);
  if (response.kind === "success") {
    return {
      Ingredients: response.body ?? {},
    };
  } else {
    throw "Error fetching Ingredients";
  }
});

const ingredientList = createSlice({
  name: "ingredientList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload.Ingredients;
    });
    builder.addCase(fetchIngredient.fulfilled, (state, action) => {
      state.ingredient = action.payload.Ingredient;
    });
    builder.addCase(createIngredient.fulfilled, (state, action) => {
      state.addIngredient = action.payload.addIngredient;
    });
  },
});

export default ingredientList.reducer;
