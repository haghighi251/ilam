import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { Iuser } from "../../utils/types";
import type { RootState } from "./store";

// Define the initial state using its data type
const initialState: Iuser = {
  user: {
    user_id: undefined,
    mobile: undefined,
    isDriver: undefined,
    uniqueCode: undefined,
  },
  isLoggedIn: false,
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    actionLogin: (
      state: Draft<any>,
      action: PayloadAction<Iuser>
    ): Draft<any> => {
      return (state = action.payload);
    },
    actionLogout: (state: Draft<any>): Draft<any> => {
      return (state = {
        user: {
          user_id: undefined,
          mobile: undefined,
          isDriver: undefined,
          uniqueCode: undefined,
        },
        isLoggedIn: false,
      });
    },
  },
});

export const { actionLogin, actionLogout } = userReducer.actions;
export const user = (state: RootState) => state;

export default userReducer.reducer;
