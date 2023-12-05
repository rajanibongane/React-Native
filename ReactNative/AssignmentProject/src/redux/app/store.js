import { configureStore } from '@reduxjs/toolkit'
import LoaderReducer from "../slices/LoaderSlice"
import LoginReducer from "../slices/LoginSlice"
import EmployeeReducer from "../slices/EmployeeSlice"
import MenuReducer from "../slices/MenuSlice"

export const store = configureStore({
  reducer: {
     loader:LoaderReducer,
     account:LoginReducer,
     employee:EmployeeReducer,
     menus:MenuReducer,
  },
})

