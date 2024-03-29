import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
};
export const userDataSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userDataSlice.actions;
export default userDataSlice.reducer;
