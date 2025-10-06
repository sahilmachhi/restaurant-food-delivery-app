import { createSlice } from "@reduxjs/toolkit";

export interface user {
  isLoggedIn: boolean;
  user: { username: string } | null;
  isLoading: boolean;
}

const initialState: user = {
  isLoggedIn: false,
  user: null,
  isLoading: true
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
    loadingDone: (state) => {
      state.isLoading = false
    },
    loadingStart: (state) => {
      state.isLoading = true
    }
  },
});

export const { login, logout, rmUser, setUser, loadingDone, loadingStart } = userSlice.actions;

export default userSlice.reducer;
