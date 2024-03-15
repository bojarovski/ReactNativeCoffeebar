import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apiClient from "./apiEvent";

export type Login = {
  body: {
    email?: string;
    password?: string;
  };
};

export type User = {
  id?: number;
  name?: string;
  description?: string;
};

export type UserListState = {
  users: User[];
  user: User;
  addUser: User;
  sessionId: String;
};
export type Session = {
  sessionId?: string;
};
const initialState: UserListState = {
  users: [],
  user: {},
  addUser: {},
  sessionId: "",
};
// AUTH
export const createSession = createAsyncThunk<{ sessionId: string }, Login>(
  "createSession",
  async (body, { rejectWithValue }) => {
    if (
      body.body.email === "admin@admin.com" &&
      body.body.password === "123456"
    ) {
      console.log("Session Created");

      return { sessionId: "dasdsadasdasd" };
    } else {
      // Handle authentication failure
      return rejectWithValue("Authentication failed");
    }
  }
);

export const deleteSession = createAsyncThunk<{ sessionId: string }, Login>(
  "createSession",
  async (body) => {
    console.log(body);

    return { sessionId: "" };
  }
);
// APIS
export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  console.log("dasdasdasd213123123");
  const response = await apiClient.fetchUsers();

  if (response.kind === "success") {
    return {
      users: response.body ?? [],
    };
  } else {
    throw "Error fetching users";
  }
});

export const fetchUser = createAsyncThunk<{ user: User }, { eventId: number }>(
  "fetchUser",
  async ({ eventId }) => {
    const response = await apiClient.fetchUser(eventId);
    if (response.kind === "success") {
      return {
        user: response.body ?? {},
      };
    } else {
      throw "Error fetching users";
    }
  }
);

export const createUser = createAsyncThunk<{ addUser: User }, { body: User }>(
  "createUser",
  async ({ body }) => {
    const response = await apiClient.createUser(body);
    if (response.kind === "success") {
      return {
        addUser: response.body ?? {},
      };
    } else {
      throw "Error fetching users";
    }
  }
);

export const deleteUser = createAsyncThunk<
  { users: User },
  { eventId: number }
>("deleteUser", async ({ eventId }) => {
  const response = await apiClient.deleteUser(eventId);
  if (response.kind === "success") {
    return {
      users: response.body ?? {},
    };
  } else {
    throw "Error fetching users";
  }
});

const userListSlice = createSlice({
  name: "userList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createSession.fulfilled, (state, action) => {
      state.sessionId = action.payload.sessionId;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload.users;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.addUser = action.payload.addUser;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter((item) => {
        return item.id !== action.payload.users.id;
      });
    });
  },
});

export default userListSlice.reducer;
