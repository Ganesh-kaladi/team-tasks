import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar__nav">
      <ul className="nav nav-pills flex-column pe-5">
        <li className="py-3">
          <NavLink to="my-task" className="nav-link text-dark p-3 rounded-0">
            <i class="fas fa-tachometer-alt me-2"></i> My Tasks
          </NavLink>
        </li>
        <li className="py-3">
          <NavLink
            to="assign-task"
            className="nav-link text-dark p-3 rounded-0"
          >
            <i class="fas fa-calendar-alt me-2"></i> assign task
          </NavLink>
        </li>
        <li className="py-3">
          <NavLink
            to="overdue-task"
            className="nav-link text-dark p-3 rounded-0 "
          >
            <i class="fas fa-users me-2"></i>Overdue Tasks
          </NavLink>
        </li>
        <li className="py-3">
          <NavLink to="user" className="nav-link text-dark p-3 rounded-0 ">
            <i class="fas fa-users me-2"></i> User
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
