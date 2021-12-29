import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCoBDZrf2vfbjXJWjiZOT0w6FJmTBaWkqA",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData, returnSecureToken: true }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();
    console.log(data);
  }
);

const initialState = {
  user: "",
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {},
});
