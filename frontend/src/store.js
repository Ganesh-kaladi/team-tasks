import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slice/authSlice";
import usersReducer from "./slice/userSlice";
import taskReducer from "./slice/taskSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    task: taskReducer,
  },
});

export default store;
