import React, { useRef, useState } from "react";
import "../App.css";
import { Link, json, useNavigate } from "react-router-dom";
import http from "../axios";
// IMG
import Email from "../img/email.svg";
import Password from "../img/password.svg";
import Open from "../img/openeye.svg";
import Close from "../img/closeeye.svg";

function Register() {
  // Ref
  const emailRef = useRef();
  const passwordRef = useRef();
  const formRef = useRef();
  const navigate = useNavigate();

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [butLoad, setButLoad] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function validatePassword(password) {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;
    if (regex.test(password)) {
      return true;
    } else {
      return false;
    }
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function validate() {
    // EMAIL
    if (!validateEmail(emailRef.current.value)) {
      setErrorEmail("Email xato");
      return false;
    } else {
      setErrorEmail("");
    }
    // PASSWORD
    if (!validatePassword(passwordRef.current.value)) {
      setErrorPassword("Password xato");
      return false;
    } else {
      setErrorPassword("");
    }

    return true;
  }
  function handleLogin(e) {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    setButLoad(true);
    http
      .post("/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        if (data.data.accessToken) {
          localStorage.setItem("token", data.data.accessToken);
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setButLoad(true);
      });
  }
  function togglePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="register-page flex items-center justify-center h-screen">
      <div className="w-full max-w-md bg-inherit rounded-lg shadow-md p-8 border-2 border-solid border-white backdrop-blur-md">
        <h2 className="text-5xl font-bold text-center text-white mb-12">
          Login Form
        </h2>
        <form ref={formRef}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-white font-bold mb-2">
              Email (Username)
              {errorEmail && (
                <p className="text-red-700 mb-[-5px]">{errorEmail}</p>
              )}
            </label>
            <div className="flex p-2 justify-between items-center w-full focus:outline-none border rounded-lg gap-1">
              <img src={Email} alt="rasm" width={30} />
              <input
                ref={emailRef}
                type="email"
                id="email"
                className="w-full px-3 py-2   bg-inherit text-white outline-none"
                placeholder="Enter email..."
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-white font-bold mb-2"
            >
              Password{" "}
              {errorPassword && (
                <p className="text-red-700 mb-[-5px]">{errorPassword}</p>
              )}
            </label>
            <div className="flex p-2 justify-between items-center w-full focus:outline-none border rounded-lg gap-1">
              <img src={Password} alt="rasm" width={30} />
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-3 py-2   bg-inherit text-white outline-none"
                placeholder="Enter password..."
                required
              />
              <button type="button" onClick={togglePassword}>
                {showPassword ? (
                  <img src={Open} alt="" width={30} />
                ) : (
                  <img src={Close} alt="" width={30} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white font-bold py-3 px-5 mt-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {butLoad ? "Loading" : "Login"}
          </button>
          <p className="text-white mt-4">
            Account yaratmoqchimisiz:{" "}
            <Link to="/register" className="text-blue-600 text-end">
              Registe page
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
