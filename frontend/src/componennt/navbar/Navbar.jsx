import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slice/authSlice";
import Spinner from "../spinner/Spinner";

function Navbar() {
  const dispatch = useDispatch();
  const { isLoadingAuth, isAuthenticated, userName } = useSelector(
    (state) => state.auth
  );
  console.log(userName);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <>
      {isLoadingAuth && <Spinner />}
      <nav class="navbar navbar-dark bg-dark px-4">
        <div>
          <NavLink to="/" className="navbar-brand">
            Task Manager
          </NavLink>
        </div>
        <div>
          <span className="navbar-brand">
            <i>{userName === "" ? "" : userName}</i>
          </span>
          <NavLink
            to="/"
            className="navbar-brand"
            onClick={() => handleLogout()}
          >
            <i>{isAuthenticated ? "logout" : ""}</i>
          </NavLink>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
