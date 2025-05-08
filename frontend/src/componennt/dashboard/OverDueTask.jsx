import { useDispatch, useSelector } from "react-redux";
import "./OverDueTask.css";
import { getTasks, removeTask } from "../../slice/taskSlice";
import { useEffect } from "react";

function OverDueTask() {
  const { tasks } = useSelector((state) => state.task);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(
    function () {
      if (!token || token === null || token === undefined) return;
      dispatch(getTasks(token));
      return () => {
        dispatch(removeTask());
      };
    },
    [dispatch, token]
  );

  if (!tasks) {
    return;
  }

  const overdue = tasks.filter((el) => {
    const now = new Date();
    const duedate = new Date(el.dueDate);
    return el.status !== "completed" && duedate < now;
  });

  return (
    <div className="overdue ">
      <div className="">
        {overdue?.length > 0 ? (
          overdue?.map((el) => {
            return (
              <div className="p-3 bg-light text-muted d-flex overdue-text">
                <h6 className="over-title">{el.title}</h6>
                <span className="d-block over-des">{el.description}</span>
                <span className="d-block over-given">
                  {el.assignByID.empName}
                </span>
                <span className="d-block over-duedate text-danger">
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
          <p>
            No over due Tasks. <b>Great Work..</b>
          </p>
        )}
      </div>
    </div>
  );
}

export default OverDueTask;
