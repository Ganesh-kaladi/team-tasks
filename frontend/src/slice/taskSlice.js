import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout, removeUser } from "./authSlice";

export const assignTask = createAsyncThunk(
  "task/createTask",
  async function (data, thunkAPI) {
    try {
      const res = await axios.post(
        "https://team-tasks-backend.onrender.com/api/v1/tasks",
        data.formData,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const getTasks = createAsyncThunk(
  "task/getTask",
  async function (token, thunkAPI) {
    try {
      const res = await axios.get(
        "https://team-tasks-backend.onrender.com/api/v1/tasks/get-tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const getEmployeeTasks = createAsyncThunk(
  "task/getEmployeeTask",
  async function ({ token, id, statusQuery }, thunkAPI) {
    try {
      const res = await axios.get(
        `https://team-tasks-backend.onrender.com/api/v1/tasks/get-tasks/${id}?status=${statusQuery}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: {
    isLoadingTask: false,
    errorTask: null,
    tasks: null,
    taskMessage: "",
    empTask: null,
  },
  reducers: {
    clearTaskMessage(state, action) {
      state.taskMessage = "";
    },
    removeTask(state, action) {
      state.tasks = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(assignTask.pending, function (state, action) {
        state.isLoadingTask = true;
      })
      .addCase(assignTask.fulfilled, function (state, action) {
        state.taskMessage = action.payload.status;
        state.isLoadingTask = false;
      })
      .addCase(assignTask.rejected, function (state, action) {
        state.errorTask = action.payload;
        state.isLoadingTask = false;
      })

      //get tasks
      .addCase(getTasks.pending, function (state, action) {
        state.isLoadingTask = true;
      })
      .addCase(getTasks.fulfilled, function (state, action) {
        state.taskMessage = "";
        state.tasks = action.payload.data.tasks;
        state.isLoadingTask = false;
      })
      .addCase(getTasks.rejected, function (state, action) {
        state.errorTask = action.payload;
        state.isLoadingTask = false;
      })

      //get employee task
      .addCase(getEmployeeTasks.pending, function (state, action) {
        state.isLoadingTask = true;
      })
      .addCase(getEmployeeTasks.fulfilled, function (state, action) {
        state.taskMessage = "";
        state.empTask = action.payload.data.tasks;
        state.isLoadingTask = false;
      })
      .addCase(getEmployeeTasks.rejected, function (state, action) {
        state.errorTask = action.payload;
        state.isLoadingTask = false;
      })

      //remove user
      .addCase(logout.pending, function (state, action) {
        state.isLoadingTask = true;
      })
      .addCase(logout.fulfilled, function (state, action) {
        state.taskMessage = "";
        state.empTask = null;
        state.isLoadingTask = false;
      })
      .addCase(logout.rejected, function (state, action) {
        state.errorTask = action.payload;
        state.isLoadingTask = false;
      });
  },
});

export const { clearTaskMessage, removeTask } = taskSlice.actions;

export default taskSlice.reducer;
