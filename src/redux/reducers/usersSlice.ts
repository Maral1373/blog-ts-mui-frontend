import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const result = await fetch(
        `${API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );
      if (!result.ok || result.status !== 200)
        throw new Error("response was not OK");
      const data = await result.json();
      console.log("register", data);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!result.ok || result.status !== 200)
        throw new Error("response was not OK");
      const data = await result.json();
      console.log("login", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const result = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!result.ok || result.status !== 200)
        throw new Error("response was not OK");
      const data = await result.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loggedInUser: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.loggedInUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loggedInUser = action.payload;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
export const { logoutUser } = usersSlice.actions;
