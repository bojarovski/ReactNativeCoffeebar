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
  ingredientById: Ingredient[];
  ingredient: Ingredient;
  addIngredient: Ingredient;
};

const initialState: IngredientListState = {
  ingredients: [],
  ingredientById: [],
  ingredient: {},
  addIngredient: {},
  assignIngredient: [],
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
  { ingredientById: Ingredient },
  { IngredientId: number }
>("fetchIngredient", async ({ IngredientId }) => {
  const response = await apiClient.fetchIngredient(IngredientId);

  if (response.kind === "success") {
    return {
      ingredientById: response.body ?? [],
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
export const assignIngredientToCoffee = createAsyncThunk<
  { assignIngredient: Ingredient },
  { body: Ingredient }
>("assignIngredientToCoffee", async ({ body }) => {
  console.log("body", body);

  const response = await apiClient.assignIngredientToCoffee(body);
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
      state.ingredientById = action.payload.ingredientById;
    });
    builder.addCase(createIngredient.fulfilled, (state, action) => {
      state.addIngredient = action.payload.addIngredient;
    });
    builder.addCase(assignIngredientToCoffee.fulfilled, (state, action) => {
      state.assignIngredient = action.payload.assignIngredient;
    });
  },
});

export default ingredientList.reducer;
