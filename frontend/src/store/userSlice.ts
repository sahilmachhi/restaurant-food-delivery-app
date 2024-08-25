import { createSlice } from "@reduxjs/toolkit";

export interface user {
  isLoggedIn: boolean;
  user: { username: string } | null;
}

const initialState: user = {
  isLoggedIn: false,
  user: null,
};

export const userSlice = createSlice({
  name: "isLoggedIn",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    rmUser: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout, rmUser, setUser } = userSlice.actions;

export default userSlice.reducer;
