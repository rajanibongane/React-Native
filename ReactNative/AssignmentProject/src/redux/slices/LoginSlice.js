//imports
import { fetchAccounts, logOut } from "../apis/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SessionService from "../../shared/SessionService";
import { startLoading, stopLoading } from "./LoaderSlice";

const initialState = {
  email: "",
  user:"",
  token: "",
  role: "",
  empId:"",
};

/**
 * Login
 */

export const loginAccount = createAsyncThunk(
  "account/loginAccount",  
  async (params, thunkAPI) => {
    try {
      thunkAPI.dispatch(startLoading());
      const response = await fetchAccounts(params);
      await SessionService.setToken(response.data.accessToken);
      await SessionService.setUser(response.data.userData);
      thunkAPI.dispatch(stopLoading());
      return response.data;
    } catch (err) {
      thunkAPI.dispatch(stopLoading());
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

/**
 * Logout
 */

export const userLogout = createAsyncThunk(
  "account/userLogout",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(startLoading());
      const response = await logOut();
      SessionService.clearSession();
      thunkAPI.dispatch(stopLoading());
      return response.data;
    } catch (err) {
      thunkAPI.dispatch(stopLoading());
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

export const LoginSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  // extraReducers: {},
});

export default LoginSlice.reducer;



