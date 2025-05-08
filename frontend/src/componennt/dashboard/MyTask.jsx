import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, removeTask } from "../../slice/taskSlice";
import "./MyTask.css";

function MyTask() {
  const [view, setView] = useState(null);
  const { tasks } = useSelector((state) => state.task);
  const { token, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  function handleViewbtn(id) {
    setView((cur) => (cur === id ? null : id));
  }
  useEffect(
    function () {
      if (token) {
        dispatch(getTasks(token));
      }

      return () => {
        dispatch(removeTask());
      };
    },
    [dispatch, token]
  );
  return (
    <div className="">
      {tasks?.length > 0 &&
        tasks.map((el, i) => {
          return (
            <>
              <div className="my-task row border p-3 mb-2" key={i}>
                <div className="my-task-title col-12 col-lg-4">
                  <h6>{el.title}</h6>
                </div>
                <div className="my-task-assign col-12 col-lg-3">
                  <span>{el.assignByID.empName}</span>
                </div>
                <div className=" my-task-date col-12 col-lg-2">
                  <span>
                    {new Date(el.dueDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="my-task-view col-12 col-lg-3">
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => handleViewbtn(el._id)}
                  >
                    view details
                  </button>
                </div>
              </div>
              {view === el._id && (
                <div className="">
                  <div className="text">
                    <div className="title text-box">
                      <span className="task-field">Task:</span>
                      <p>{el.title}</p>
                    </div>
                    <div className="description text-box">
                      <span className="task-field">Description:</span>
                      <p>{el.description}</p>
                    </div>
                    <div className="dueDate text-box">
                      <span className="task-field">Due Date:</span>
                      <p>{el.dueDate}</p>
                    </div>
                    <div className="title text-box">
                      <span className="task-field">Priority:</span>
                      <p>{el.priority}</p>
                    </div>

                    <div className="status text-box">
                      <span className="task-field">Status:</span>
                      <p>{el.status}</p>
                    </div>
                    <div className="assignByID text-box">
                      <span className="task-field">Given By:</span>
                      <p>
                        <span className="fw-bolder">
                          {el.assignByID.empName}
                        </span>
                        ({el.assignByID.designation})
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        })}
    </div>
  );
}

export default MyTask;
