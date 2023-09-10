import { createSlice } from "@reduxjs/toolkit";
import ROLE from "../enums/role.enum";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: "CUONG",
    name: "Nguyen Cuong",
    role: ROLE.admin,
    avatar: null,
    hasVerified: false,
    money: 20000,
  },
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.avatar = action.payload.avatar;
      state.hasVerified = action.payload.hasVerified;
      state.money = action.payload.money;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setMoney: (state, action) => {
      state.money = action.payload;
    },
    setHasVerified: (state, action) => {
      state.hasVerified = action.payload;
    },
  },
});

export const {
  setUser,
  setUserId,
  setName,
  setAvatar,
  setRole,
  setMoney,
  setHasVerified,
} = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
