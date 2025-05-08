import { Navigate, Route, Routes } from "react-router-dom";
import Main from "./Main";
import AssignTask from "./componennt/dashboard/AssignTask";
import MyTask from "./componennt/dashboard/MyTask";
import User from "./componennt/dashboard/User";
import OverDueTask from "./componennt/dashboard/OverDueTask";
import LoginForm from "./form/LoginForm";
import ProtectedRoute from "./ProtectedRoute";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate replace to="my-task" />} />
        <Route path="my-task" element={<MyTask />} />
        <Route path="assign-task" element={<AssignTask />} />
        <Route path="overdue-task" element={<OverDueTask />} />
        <Route path="user" element={<User />} />
      </Route>
    </Routes>
  );
}

export default Routing;
