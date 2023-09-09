import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    name: null,
    role: null,
    avatar: null,
    money: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.avatar = action.payload.avatar;
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
  },
});

export const { setUser, setUserId, setName, setAvatar, setRole, setMoney } =
  userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
