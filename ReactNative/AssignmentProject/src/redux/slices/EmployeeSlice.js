//imports
import { fetchAllEmployees, fetchEmployee, fetchMealEmployee, fetchMonthlyMealEmployee, postMealEmployee } from "../apis/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { startLoading, stopLoading } from "./LoaderSlice";

const initialState = {
    allEmployees:"",
    mealEmployee:"",
    emp:"",
    loading:"",
    status:false
};

/**
 * Get all employees
 */

export const getAllEmployees = createAsyncThunk(
  "employee/getAllEmployees",  
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(startLoading());
      const response = await fetchAllEmployees();
      thunkAPI.dispatch(stopLoading());
      return response.data;

    } catch (err) {
      thunkAPI.dispatch(stopLoading());
      return thunkAPI.rejectWithValue(err.response.data);
    }

  }
);

/**
 * Get employee
 */

export const getEmployee = createAsyncThunk(
  "employee/getEmployee",  
  async (params, thunkAPI) => {
    try {
      thunkAPI.dispatch(startLoading());
      const response = await fetchEmployee(params);
      thunkAPI.dispatch(stopLoading());
      return response.data;

    } catch (err) {
      thunkAPI.dispatch(stopLoading());
        return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);


/**
 * Get monthly meal of employees
 */

export const getMonthlyMealEmployee = createAsyncThunk(
  "employee/getMonthlyMealEmployee",
  async ( params , thunkAPI) => {
    try {
      thunkAPI.dispatch(startLoading());
      const response = await fetchMonthlyMealEmployee(params);
      thunkAPI.dispatch(stopLoading());
      return response.data;
    } catch (err) {
      thunkAPI.dispatch(stopLoading());
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

/**
 * Add meal of employees
 */

export const addMealEmployee = createAsyncThunk(
  "employee/postMealEmployee",  
  async (params, thunkAPI) => {
    try {
      thunkAPI.dispatch(startLoading());
      const response = 
      await postMealEmployee(id,params);
      thunkAPI.dispatch(stopLoading());
      return response.data;

    } catch (err) {
      thunkAPI.dispatch(stopLoading());
        return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const EmployeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAllEmployees.pending, (state) => {
          state.status = "loading";
        })
        .addCase(getAllEmployees.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.allEmployees = action.payload; 
        })
        .addCase(getAllEmployees.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })
        .addCase(getEmployee.pending, (state) => {
          state.status = "loading";
        })
        .addCase(getEmployee.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.emp = action.payload; 
        })
        .addCase(getEmployee.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })

        .addCase(getMonthlyMealEmployee.pending, (state) => {
          state.status = "loading";
        })
        .addCase(getMonthlyMealEmployee.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.mealEmployee = action.payload; 
        })
        .addCase(getMonthlyMealEmployee.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })
    },
});

export default EmployeeSlice.reducer;



