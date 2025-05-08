import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/loginUser",
  async function (formData, thunkAPI) {
    try {
      const res = await axios.post(
        "https://team-tasks-backend.onrender.com/api/v1/auth/login",
        formData
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logoutUser",
  async function (thunkAPI) {
    try {
      const res = await axios.get("https://team-tasks-backend.onrender.com/api/v1/auth/logout");
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const getMe = createAsyncThunk(
  "auth/getme",
  async function (token, thunkAPI) {
    try {
      const res = await axios.get("https://team-tasks-backend.onrender.com/api/v1/auth/get-me", {
        headers: {
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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isLoadingAuth: false,
    errorAuth: null,
    user: null,
    message: null,
    token: localStorage.getItem("token") || null,
    userName: "",
  },
  reducers: {
    removeUser(state, action) {
      state.isLoadingAuth = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, function (state, action) {
        state.isLoadingAuth = true;
      })
      .addCase(login.fulfilled, function (state, action) {
        state.isAuthenticated = true;
        state.isLoadingAuth = false;
        state.message = null;
        state.errorAuth = null;
        const { token, empName, user } = action.payload;
        if (token !== undefined) {
          state.token = token;
          localStorage.setItem("token", token);
        }
        state.user = user || null;
        state.userName = empName || "";
      })
      .addCase(login.rejected, function (state, action) {
        state.isLoadingAuth = false;
        state.errorAuth = action;
      })

      //logout logic
      .addCase(logout.pending, function (state, action) {
        state.isLoadingAuth = true;
      })
      .addCase(logout.fulfilled, function (state, action) {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoadingAuth = false;
        state.message = action.payload;
        state.token = null;
        localStorage.removeItem("token");
        state.userName = "";
      })
      .addCase(logout.rejected, function (state, action) {
        state.isLoadingAuth = false;
        state.errorAuth = action;
      })

      //get me

      .addCase(getMe.pending, function (state, action) {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, function (state, action) {
        state.user = action.payload.data.user;
        state.isLoading = false;
      })
      .addCase(getMe.rejected, function (state, action) {
        state.isLoading = false;
        state.errorAuth = action.payload;
      });
  },
});

export const { removeUser } = authSlice.actions;

export default authSlice.reducer;
