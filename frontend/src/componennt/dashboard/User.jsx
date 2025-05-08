import { useDispatch, useSelector } from "react-redux";
import "./User.css";
import { getMe, removeUser } from "../../slice/authSlice";
import { useEffect } from "react";

function User() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { tasks } = useSelector((state) => state.task);

  useEffect(
    function () {
      if (!token || token === null) return;
      dispatch(getMe(token));

      return () => {
        dispatch(removeUser());
      };
    },
    [dispatch, token]
  );

  if (!user && user === null) {
    return;
  }

  const total = user.receviedTasks.length;

  const pending = user.receviedTasks.filter(
    (el) => el.status === "pending"
  ).length;

  const completed = user.receviedTasks.filter(
    (el) => el.status === "completed"
  ).length;

  const overdue = user.receviedTasks.filter((el) => {
    const now = new Date();
    const duedate = new Date(el.dueDate);
    return el.status !== "completed" && duedate < now;
  }).length;

  return (
    <div className="emp  p-3 mb-4 ">
      <h4 className="mb-3">User Details</h4>
      <div className="mb-1 emp-text">
        <strong>Name:</strong> {user.empName}
      </div>
      <div className="mb-2 emp-text">
        <strong>Email:</strong> {user.email}
      </div>
      <div className="mb-2 emp-text">
        <strong>Emp.ID:</strong> 21005
      </div>
      <div className="mb-2 emp-text">
        <strong>Designation:</strong> {user.designation}
      </div>
      <div className="mb-2 emp-text">
        <strong>Age:</strong> {user.age}
      </div>

      <hr className="my-3" />

      <h5 className="mb-2">Task Summary</h5>
      <ul>
        <li className="mb-1 emp-task-total">
          <strong>Total Tasks:</strong> {total}
        </li>
        <li className="mb-1 emp-task-total">
          <strong>Pending:</strong> {pending}
        </li>
        <li className="mb-1 emp-task-total">
          <strong>Completed:</strong> {completed}
        </li>
        <li className="mb-1 emp-task-total">
          <strong>Overdue:</strong> {overdue}
        </li>
      </ul>
    </div>
  );
}

export default User;
