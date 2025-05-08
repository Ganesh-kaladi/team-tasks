import Footer from "./componennt/footer/Footer";
import Navbar from "./componennt/navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Routing from "./Routing";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./slice/authSlice";
import Spinner from "./componennt/spinner/Spinner";
import { Navigate, useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const { isLoadingTask } = useSelector((state) => state.task);
  const { isLoadingAuth } = useSelector((state) => state.auth);
  const { isLoadingUser } = useSelector((state) => state.users);

  const navigate = useNavigate();

  const [token, setToken] = useState(null);

  return (
    <>
      {isLoadingTask || isLoadingAuth || (isLoadingUser && <Spinner />)}
      <Navbar />
      <Routing />
      <Footer />
    </>
  );
}

export default App;
