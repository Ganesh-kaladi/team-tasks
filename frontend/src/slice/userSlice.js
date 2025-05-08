import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout, removeUser } from "./authSlice";

export const getAllUsers = createAsyncThunk(
  "users/allUsers",
  async function (token, thunkAPI) {
    try {
      const res = await axios.get("https://team-tasks-backend.onrender.com/api/v1/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    usersDetails: null,
    isLoadingUser: false,
    errorUser: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, function (state, action) {
        state.isLoadingUser = true;
      })
      .addCase(getAllUsers.fulfilled, function (state, action) {
        state.usersDetails = action.payload.data.user;
        state.isLoadingUser = false;
      })
      .addCase(getAllUsers.rejected, function (state, action) {
        state.errorUser = action.payload;
        state.isLoadingUser = false;
      })

      //
      .addCase(logout.pending, function (state, action) {
        state.isLoadingUser = true;
      })
      .addCase(logout.fulfilled, function (state, action) {
        state.usersDetails = null;
        state.isLoadingUser = false;
      })
      .addCase(logout.rejected, function (state, action) {
        state.errorUser = action.payload;
        state.isLoadingUser = false;
      });
  },
});

// export const {} = userSlice.actions;

export default userSlice.reducer;
