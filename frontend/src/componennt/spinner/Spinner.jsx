import React from "react";
import "./Spinner.css";

function Spinner() {
  return (
    <div className="spinner">
      <div className="w-100">
        <div className="spinner-box d-flex align-items-center justify-content-center">
          <div
            class="spinner-border spinner-border-lg text-secondary"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
          <p className="loading ">loding...</p>
        </div>
      </div>
    </div>
  );
}

export default Spinner;
