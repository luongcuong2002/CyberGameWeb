import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: "111",
    userName: null,
    userPublicName: null,
    avatar: null,
    role: null,
    amount: null,
    membershipClass: null,
    realName: null,
    dateOfBirth: null,
    gender: null,
    address: null,
    phoneNumber: null,
    email: null,
    amountOwed: null,
    sessionDisabled: null,
    createdDate: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.userPublicName = action.payload.userPublicName;
      state.avatar = action.payload.avatar;
      state.role = action.payload.role;
      state.amount = action.payload.amount;
      state.membershipClass = action.payload.membershipClass;
      state.realName = action.payload.realName;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.gender = action.payload.gender;
      state.address = action.payload.address;
      state.phoneNumber = action.payload.phoneNumber;
      state.email = action.payload.email;
      state.amountOwed = action.payload.amountOwed;
      state.sessionDisabled = action.payload.sessionDisabled;
      state.createdDate = action.payload.createdDate;
    },
    setUserNull: (state) => {
      state.userId = null;
      state.userName = null;
      state.userPublicName = null;
      state.avatar = null;
      state.role = null;
      state.amount = null;
      state.membershipClass = null;
      state.realName = null;
      state.dateOfBirth = null;
      state.gender = null;
      state.address = null;
      state.phoneNumber = null;
      state.email = null;
      state.amountOwed = null;
      state.sessionDisabled = null;
      state.createdDate = null;
    },
    setUserPublicName: (state, action) => {
      state.userPublicName = action.payload.userPublicName;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload.avatar;
    },
    setMoney: (state, action) => {
      state.amount = action.payload.amount;
    },
    setMembershipClass: (state, action) => {
      state.membershipClass = action.payload.membershipClass;
    },
    setRealName: (state, action) => {
      state.realName = action.payload.realName;
    },
    setDateOfBirth: (state, action) => {
      state.dateOfBirth = action.payload.dateOfBirth;
    },
    setGender: (state, action) => {
      state.gender = action.payload.gender;
    },
    setAddress: (state, action) => {
      state.address = action.payload.address;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload.phoneNumber;
    },
    setEmail: (state, action) => {
      state.email = action.payload.email;
    },
    setAmountOwed: (state, action) => {
      state.amountOwed = action.payload.amountOwed;
    },
    setSessionDisabled: (state, action) => {
      state.sessionDisabled = action.payload.sessionDisabled;
    },
    setCreatedDate: (state, action) => {
      state.createdDate = action.payload.createdDate;
    },
  },
});

export const {
  setUser,
  setUserNull,
  setUserPublicName,
  setAvatar,
  setMoney,
  setMembershipClass,
  setRealName,
  setDateOfBirth,
  setGender,
  setAddress,
  setPhoneNumber,
  setEmail,
  setAmountOwed,
  setSessionDisabled,
  setCreatedDate,
} = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
