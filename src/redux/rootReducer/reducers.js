import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Slice/Slice";
export const rootReducer = combineReducers({
  authReducer,
});
