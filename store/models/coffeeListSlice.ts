import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apiClient from "../Api/apiCoffee";

export type Coffee = {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
};

export type CoffeeListState = {
  coffees: Coffee[];
  coffee: Coffee;
  addCoffee: Coffee;
};

const initialState: CoffeeListState = {
  coffees: [],
  coffee: {},
  addCoffee: {},
};

// APIS
export const fetchCoffees = createAsyncThunk("fetchCoffees", async () => {
  const response = await apiClient.fetchCoffees();

  if (response.kind === "success") {
    return {
      coffees: response.body ?? [],
    };
  } else {
    throw "Error fetching Coffees";
  }
});

export const fetchCoffee = createAsyncThunk<
  { Coffee: Coffee },
  { coffeeId: number }
>("fetchCoffee", async ({ coffeeId }) => {
  const response = await apiClient.fetchCoffee(coffeeId);
  if (response.kind === "success") {
    return {
      Coffee: response.body ?? {},
    };
  } else {
    throw "Error fetching Coffees";
  }
});

export const createCoffee = createAsyncThunk<
  { addCoffee: Coffee },
  { body: Coffee }
>("createCoffee", async ({ body }) => {
  const response = await apiClient.createCoffee(body);
  if (response.kind === "success") {
    return {
      addCoffee: response.body ?? {},
    };
  } else {
    throw "Error fetching Coffees";
  }
});

export const deleteCoffee = createAsyncThunk<
  { Coffees: Coffee },
  { coffeeId: number }
>("deleteCoffee", async ({ coffeeId }) => {
  console.log(coffeeId);

  const response = await apiClient.deleteCoffee(coffeeId);
  if (response.kind === "success") {
    return {
      Coffees: response.body ?? {},
    };
  } else {
    throw "Error fetching Coffees";
  }
});

const coffeeList = createSlice({
  name: "coffeeList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCoffees.fulfilled, (state, action) => {
      state.coffees = action.payload.coffees;
    });
    builder.addCase(fetchCoffee.fulfilled, (state, action) => {
      state.coffee = action.payload.Coffee;
    });
    builder.addCase(createCoffee.fulfilled, (state, action) => {
      state.addCoffee = action.payload.addCoffee;
    });
  },
});

export default coffeeList.reducer;
