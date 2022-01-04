import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const saveDataToStorage = (token, userId, expiryDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({ token, userId, expiryDate: expiryDate.toISOString() })
  );
};

let timer;

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

export const setLogoutTimer = createAsyncThunk(
  "auth/setLogoutTimer",
  (expirationTime, thunkAPI) => {
    timer = setTimeout(() => {
      thunkAPI.dispatch(logout());
    }, expirationTime);
  }
);

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

    const token = data.idToken;
    const userId = data.localId;
    thunkAPI.dispatch(
      authenticate({
        token,
        userId,
        expiryTime: parseInt(data.expiresIn) * 1000,
      })
    );
    const expiryDate = new Date(
      new Date().getTime() + parseInt(data.expiresIn) * 1000
    );
    saveDataToStorage(token, userId, expiryDate);

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

    const token = data.idToken;
    const userId = data.localId;
    thunkAPI.dispatch(
      authenticate({
        token,
        userId,
        expiryTime: parseInt(data.expiresIn) * 1000,
      })
    );
    const expiryDate = new Date(
      new Date().getTime() + parseInt(data.expiresIn) * 1000
    );
    saveDataToStorage(token, userId, expiryDate);

    return data;
  }
);

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  (authData, thunkAPI) => {
    thunkAPI.dispatch(setLogoutTimer(authData.expiryTime));
    thunkAPI.dispatch(
      authUser({ token: authData.token, userId: authData.userId })
    );
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
    authUser: (state, { payload }) => {
      state.token = payload.token;
      state.userId = payload.userId;
    },
    logout: (state) => {
      AsyncStorage.removeItem("userData");
      clearLogoutTimer();
      state.token = null;
      state.userId = null;
    },
  },
});

export const { authUser, logout } = AuthSlice.actions;
