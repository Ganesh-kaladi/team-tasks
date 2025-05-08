import React from "react";
import Sidebar from "./componennt/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./Main.css";

function Main() {
  return (
    <div className="main">
      <div className="container-main mt-4">
        <div className="row sidebar">
          <div className="col-md-4 col-xl-3">
            <h5>User Panel</h5>
            <Sidebar />
          </div>
          <div className="col-md-8 col-xl-9 main-content">
            <div className="w-100 ">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
