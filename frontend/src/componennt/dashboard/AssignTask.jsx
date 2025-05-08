import { useEffect, useState } from "react";
import TaskForm from "../../form/TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../slice/userSlice";
import Spinner from "../spinner/Spinner";
import { clearTaskMessage, getEmployeeTasks } from "../../slice/taskSlice";
import "./AssignTask.css";

function AssignTask() {
  const dispatch = useDispatch();
  const { usersDetails, isLoading } = useSelector((state) => state.users);
  const { token } = useSelector((state) => state.auth);

  useEffect(
    function () {
      dispatch(getAllUsers(token));
    },
    [token, dispatch]
  );
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="assign-task h-100">
        <div className="user">
          {usersDetails === "undefined" ||
            (usersDetails === null && (
              <p>please check your internet connection</p>
            ))}
          {usersDetails?.length > 0 &&
            usersDetails.map((el) => <UserList user={el} key={el._id} />)}
        </div>
      </div>
    </>
  );
}

export default AssignTask;

//------------------------------------------------------------------------
function UserList({ user }) {
  const { taskMessage, empTask, isLoadingTask } = useSelector(
    (state) => state.task
  );
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState({
    pending: false,
    overdue: false,
    task: false,
  });

  function handleOpen(e) {
    const { name } = e.target;

    if (name === "pending") {
      setOpen((cur) => ({
        ...cur,
        [name]: !cur[name],
        overdue: false,
        task: false,
      }));
    }

    if (name === "overdue") {
      setOpen((cur) => ({
        ...cur,
        pending: false,
        [name]: !cur[name],
        task: false,
      }));
    }

    if (name === "task") {
      setOpen((cur) => ({
        ...cur,
        pending: false,
        overdue: false,
        [name]: !cur[name],
      }));
    }
  }

  function handleRemoveTaskMessage() {
    dispatch(clearTaskMessage());
    setOpen((cur) => ({ ...cur, pending: false, overdue: false, task: false }));
  }
  let overdueList = [];

  if (empTask?.length > 0) {
  }
  overdueList = empTask?.filter((el) => {
    const now = new Date();
    const dueDate = new Date(el.dueDate);
    return el.status !== "completed" && dueDate < now;
  });
  return (
    <>
      <div className="row h-100 border bg-light mb-3">
        <div className="col-2 col-lg-2 p-3">
          <div className="image-container">
            <img src="/user/user-1.jpeg" className="w-100" alt="..." />
          </div>
        </div>
        <div className="assign-task-text col-4 col-lg-3">
          <div className="d-flex flex-column p-3 ">
            <span>Emp.ID:{user.empID}</span>
            <h4>{user.empName}</h4>
            <p>{user.designation}</p>
          </div>
        </div>
        <div className="assign-task-btn col-6 col-lg-7 align-self-center">
          <div className="assign-task-btn-container d-flex justify-content-end align-items-center p-3">
            <button
              className="btn btn-sm btn-outline-dark"
              name="pending"
              onClick={(e) => {
                handleOpen(e);
                if (open.overdue === false) {
                  dispatch(
                    getEmployeeTasks({
                      token,
                      id: user._id,
                      statusQuery: "pending",
                    })
                  );
                }
              }}
            >
              pending tasks
            </button>
            <button
              className="btn btn-sm btn-outline-dark"
              name="overdue"
              onClick={(e) => {
                handleOpen(e);
                if (open.overdue === false) {
                  dispatch(
                    getEmployeeTasks({ token, id: user._id, statusQuery: "" })
                  );
                }
              }}
            >
              overdue tasks
            </button>
            <button
              className="btn btn-sm btn-outline-dark"
              name="task"
              onClick={handleOpen}
            >
              assign tasks
            </button>
          </div>
        </div>
      </div>
      {open.task &&
        (taskMessage === "success" ? (
          <div className="p-2 bg-success d-flex justify-content-between align-items-center my-2 h-100">
            <p className="">Task assigned to {user.empName}</p>
            <button
              className="btn btn-outline-light btn-sm px-4 "
              onClick={handleRemoveTaskMessage}
            >
              ok
            </button>
          </div>
        ) : (
          <TaskForm assinedID={user._id} assignName={user.empName} />
        ))}
      {open.overdue && isLoadingTask && (
        <p className="text-muted fs-5 fw-bolder">Loading...</p>
      )}
      {!isLoadingTask &&
        open.overdue &&
        (overdueList?.length > 0 ? (
          overdueList?.map((el, i) => {
            return (
              <div key={i} className="assign-pending-text">
                <h6 className="assign-pending-text-title">{el.title}</h6>
                <p className="assign-pending-text-des">{el.description}</p>
                <span className="assign-pending-text-duedate">
                  {new Date(el.dueDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            );
          })
        ) : (
          <p className="bg-light p-2 text-primary border">No overdue tasks</p>
        ))}
      {open.pending && isLoadingTask && (
        <p className="text-muted fs-5 fw-bolder">Loading...</p>
      )}
      {!isLoadingTask &&
        open.pending &&
        (empTask?.length > 0 ? (
          empTask?.map((el, i) => {
            return (
              <div className="assign-pending-text" key={i}>
                <h6>{el.title}</h6>
                <p>{el.description}</p>
                <span>
                  {new Date(el.dueDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            );
          })
        ) : (
          <p className="bg-light p-2 text-primary border">No pending tasks</p>
        ))}
    </>
  );
}
