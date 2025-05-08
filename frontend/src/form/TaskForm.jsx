import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignTask } from "../slice/taskSlice";
import "./TaskForm.css";

const TaskForm = ({ assinedID, assignName }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [formDataValue, setFormDataValue] = useState({
    title: "",
    description: "",
    priority: "",
  });

  const [date, setDate] = useState({ dueDate: "" });
  function handleDateFormate(e) {
    setDate({ ...date, dueDate: e.target.value });
  }

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataValue((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formDataValue.title.trim()) newErrors.title = "Title is required";
    if (!formDataValue.description.trim())
      newErrors.description = "Description is required";
    if (!date.dueDate) newErrors.dueDate = "Due date is required";
    if (!formDataValue.priority) newErrors.priority = "Priority is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const formData = new FormData();
      formData.append("title", formDataValue.title);
      formData.append("description", formDataValue.description);
      formData.append("priority", formDataValue.priority);
      formData.append("dueDate", date.dueDate);
      formData.append("assignedForName", assignName);
      formData.append("assignedForID", assinedID);
      const data = { formData, token };
      dispatch(assignTask(data));
    }
  };

  return (
    <div className="task-form mt-4 mb-2">
      <h3>Add New Task</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div className="task-form-input-container mb-3">
          <label className="form-label task-form-label">Title</label>
          <input
            type="text"
            className={`form-control ${
              errors.title ? "is-invalid" : ""
            } task-form-input`}
            name="title"
            value={formDataValue.title}
            onChange={handleChange}
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label task-form-label">Description</label>
          <textarea
            className={`form-control ${
              errors.description ? "is-invalid" : ""
            } task-form-input`}
            name="description"
            rows="2"
            value={formDataValue.description}
            onChange={handleChange}
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label task-form-label">Due Date</label>
          <input
            type="date"
            className={`form-control ${
              errors.dueDate ? "is-invalid" : ""
            } task-form-input`}
            name="dueDate"
            value={date.dueDate}
            onChange={handleDateFormate}
          />
          {errors.dueDate && (
            <div className="invalid-feedback">{errors.dueDate}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label task-form-label">Priority</label>
          <select
            className={`form-select ${
              errors.priority ? "is-invalid" : ""
            } task-form-input`}
            name="priority"
            value={formDataValue.priority}
            onChange={handleChange}
          >
            <option value="">-- Select Priority --</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <div className="invalid-feedback">{errors.priority}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary task-form-btn">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
