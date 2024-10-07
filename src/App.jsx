import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    } else {
      if (!location.pathname.includes("register")) {
        navigate("/login");
      }
    }
  }, [navigate]);
  function PriviteRoute({ isAuth, children }) {
    if (!isAuth) {
      navigate("/login");
    }
    return children;
  }
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PriviteRoute isAuth={!!token}>
              <Home />
            </PriviteRoute>
          }
        ></Route>
        <Route
          path="/books/:id"
          element={
            <PriviteRoute isAuth={!!token}>
              <Details />
            </PriviteRoute>
          }
        ></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
