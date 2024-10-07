import React, { useRef, useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import http from "../axios";
// IMG
import Age from "../img/age.svg";
import Email from "../img/email.svg";
import Name from "../img/name.svg";
import Names from "../img/names.svg";
import Password from "../img/password.svg";
import Close from "../img/closeeye.svg";
import Open from "../img/openeye.svg";

function Register() {
  // Ref
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const ageRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();
  const formRef = useRef();
  const navigate = useNavigate();

  const [errorFirst, setErrorFirst] = useState("");
  const [errorLast, setErrorLast] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorRePassword, setErrorRePassword] = useState("");
  const [butLoad, setButLoad] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

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
    // USERNAME
    if (firstNameRef.current.value.length < 3) {
      setErrorFirst("Username xato 3 ta sozdan koproq yozing");
      return false;
    } else {
      setErrorFirst("");
    }
    // LASTNAME
    if (lastNameRef.current.value.length < 3) {
      setErrorLast("Username xato 3 ta sozdan koproq yozing");
      return false;
    } else {
      setErrorLast("");
    }
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
    // REPASSWORD
    if (rePasswordRef.current.value != passwordRef.current.value) {
      setErrorRePassword("Qayta kiritilgan password xato");
      return false;
    } else {
      setErrorRePassword("");
    }
    return true;
  }
  function handeRegister(e) {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }
    const user = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      age: ageRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: rePasswordRef.current.value,
    };
    setButLoad(true);
    http
      .post("/register", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        if (
          data.data.message === "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi"
        ) {
          formRef.current.reset();
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setButLoad(false);
      });
  }
  function togglePassword() {
    setShowPassword(!showPassword);
  }
  function toggleRePassword() {
    setShowRePassword(!showRePassword);
  }
  return (
    <div className="register-page flex items-center justify-center h-screen">
      <div className="w-1/3  bg-inherit rounded-lg shadow-md p-8 border-2 border-solid border-white backdrop-blur-md">
        <h2 className="text-4xl font-bold text-center text-white mb-6">
          Registration Form
        </h2>
        <form ref={formRef}>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-white font-bold mb-2"
            >
              First Name
              {errorFirst && (
                <p className="text-red-700 mb-[-5px]">{errorFirst}</p>
              )}
            </label>

            <div className="flex p-2 justify-between items-center w-full focus:outline-none border rounded-lg gap-1">
              <img src={Name} alt="rasm" width={30} />
              <input
                ref={firstNameRef}
                type="text"
                id="firstName"
                className="w-full px-3 py-2   bg-inherit text-white outline-none"
                placeholder="Enter firstname..."
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-white font-bold mb-2"
            >
              Last Name{" "}
              {errorLast && (
                <p className="text-red-700 mb-[-5px]">{errorLast}</p>
              )}
            </label>
            <div className="flex p-2 justify-between items-center w-full focus:outline-none border rounded-lg gap-1">
              <img src={Names} alt="rasm" width={30} />
              <input
                ref={lastNameRef}
                type="text"
                id="lastName"
                className="w-full px-3 py-2   bg-inherit text-white outline-none"
                placeholder="Enter lastname..."
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="age" className="block text-white font-bold mb-2">
              Age
            </label>
            <div className="flex p-2 justify-between items-center w-full focus:outline-none border rounded-lg gap-1">
              <img src={Age} alt="rasm" width={30} />
              <input
                ref={ageRef}
                type="number"
                id="age"
                className="w-full px-3 py-2   bg-inherit text-white outline-none"
                placeholder="Enter age..."
                required
              />
            </div>
          </div>

          <div className="mb-4">
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

          <div className="mb-4">
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

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-white font-bold mb-2"
            >
              Confirm Password{" "}
              {errorRePassword && (
                <p className="text-red-700 mb-[-5px]">{errorRePassword}</p>
              )}
            </label>
            <div className="flex p-2 justify-between items-center w-full focus:outline-none border rounded-lg gap-1">
              <img src={Password} alt="rasm" width={30} />
              <input
                ref={rePasswordRef}
                type={showRePassword ? "text" : "password"}
                id="password"
                className="w-full px-3 py-2   bg-inherit text-white outline-none"
                placeholder="Enter RePassword..."
                required
              />
              <button type="button" onClick={toggleRePassword}>
                {showRePassword ? (
                  <img src={Open} alt="" width={30} />
                ) : (
                  <img src={Close} alt="" width={30} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={butLoad}
            onClick={handeRegister}
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none  focus:ring-2 focus:ring-blue-500"
          >
            {butLoad ? "Loading" : "Register"}
          </button>
          <p className="text-white mt-4">
            Sizda allaqachon hisob bormi:{" "}
            <Link to="/login" className="text-blue-600 text-end">
              Login page
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
