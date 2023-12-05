//imports
import SessionService from "../../shared/SessionService";
import { postMenuData, fetchMenu, postMealEmployee} from "../apis/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { startLoading, stopLoading } from "./LoaderSlice";

const initialState = {
    getWeeklyMenu:"",
};

/**
 * Get menu
 */

export const getMenus = createAsyncThunk(
  "employee/getMenus",  
  async (params, thunkAPI) => {
    try {
      thunkAPI.dispatch(startLoading());
      const response = await fetchMenu();
      thunkAPI.dispatch(stopLoading());
      return response.data;
    } catch (err) {
      thunkAPI.dispatch(stopLoading());
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

/**
 * Post menu
 */

  export const postMenu = createAsyncThunk(
    "menu/postMenu",  
    async (params, thunkAPI) => {
      try {
        thunkAPI.dispatch(startLoading());
        const response = await postMenuData(params);
        thunkAPI.dispatch(stopLoading());
        return response.data;
      } catch (err) {
        thunkAPI.dispatch(stopLoading());
        return thunkAPI.rejectWithValue(err.response);
      }
    }
  );

  /**
 * Post employee menu
 */

  export const postEmployeeMenu = createAsyncThunk(
    "menu/postMenu",  
    async (params, thunkAPI) => {
      try {
        thunkAPI.dispatch(startLoading());
        const userData = await SessionService.getUser();
        const id = userData.empId;
        const response = await postMealEmployee(id,params);
        thunkAPI.dispatch(stopLoading());
        return response.data;
      } catch (err) {
        thunkAPI.dispatch(stopLoading());
        return thunkAPI.rejectWithValue(err.response);
      }
    }
  );

export const MenuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(getMenus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMenus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.getWeeklyMenu = action.payload; 
      })
      .addCase(getMenus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

    },
});

export default MenuSlice.reducer;



