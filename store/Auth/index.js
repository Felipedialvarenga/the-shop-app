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

    const data = await response.json();
    if (!response.ok) {
      const errorRes = data.error.message;
      let errorMsg;
      if (errorRes === "EMAIL_EXISTS") {
        errorMsg = "This email already exists!";
      }
      throw new Error(errorMsg);
    }

    return data;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCoBDZrf2vfbjXJWjiZOT0w6FJmTBaWkqA",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData, returnSecureToken: true }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      const errorRes = data.error.message;
      let errorMsg;
      if (errorRes === "EMAIL_NOT_FOUND") {
        errorMsg = "This email could not be found!";
      } else if (errorRes === "INVALID_PASSWORD") {
        errorMsg = "This password is not valid!";
      }
      throw new Error(errorMsg);
    }

    thunkAPI.dispatch(
      authenticate({ token: data.idToken, userId: data.localId })
    );

    return data;
  }
);

const initialState = {
  userId: null,
  token: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, { payload }) => {
      console.log("authenticated");
      state.token = payload.token;
      state.userId = payload.userId;
    },
  },
});

export const { authenticate } = AuthSlice.actions;