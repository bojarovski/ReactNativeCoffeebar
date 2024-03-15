import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userListSlice from "./models/eventListSlice";
import coffeeListSlice from "./models/coffeeListSlice";

const rootReducer = combineReducers({
  userList: userListSlice,
  coffeeList: coffeeListSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
