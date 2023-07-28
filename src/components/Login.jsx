import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firabse";
import userContex from "./ContexState";

const Login = () => {
  const passRef = useRef();
  const passBox = useRef();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [wrongPass, setWrongPass] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [noUser, setNoUser] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  function showPass(e) {
    e.preventDefault();
    if (showPassword === false) {
      setShowPassword(true);
      passRef.current.type = "text";
    } else {
      setShowPassword(false);
      passRef.current.type = "password";
    }
  }

  const contex = useContext(userContex);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // console.log(userCredential);
        contex.setState(true);
        navigate("/scs");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          setInvalidEmail(true);
          setWrongPass(false);
          setNoUser(false);
        }
        if (error.code === "auth/wrong-password") {
          setInvalidEmail(false);
          setWrongPass(true);
          setNoUser(false);
        }
        if (error.code === "auth/user-not-found") {
          setInvalidEmail(false);
          setWrongPass(false);
          setNoUser(true);
        }
      });
  };

  return (
    <div>
      <div>
        <div className="h-screen md:flex">
          <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700  justify-around items-center hidden">
            <div>
              <div>
                <h1 className="text-red-600 font-semibold">
                  Please Do Not Share Any Important Credential.
                </h1>
                <h1 className=" text-white mb-4">
                  Create an account with random email and password. Then login.
                </h1>
              </div>
              <h1 className="text-white font-bold text-4xl font-sans">
                GoFinance
              </h1>
              <p className="text-white mt-1">
                The most popular peer to peer lending at SEA
              </p>
              <button
                type="submit"
                className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
              >
                Read More
              </button>
            </div>
            <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          </div>
          <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
            <form className="bg-white" onSubmit={handleSubmit}>
              <h1 className="text-gray-800 font-bold text-2xl mb-1">
                Hello Again!
              </h1>
              <p className="text-sm font-normal text-gray-600 mb-7">
                Welcome Back
              </p>
              {/* Email */}
              <div
                className={
                  "flex items-center border-2 py-2 px-3 rounded-2xl mb-4"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-2 outline-none border-none"
                  type="text"
                  name=""
                  id=""
                  placeholder="Email"
                />
              </div>
              <div
                className={
                  wrongPass === !true
                    ? "flex items-center border-2 py-2 px-3 rounded-2xl mb-4 w-72"
                    : "flex items-center border-2 py-2 px-3 rounded-2xl mb-4 w-72 border-rose-500 duration-300"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex">
                  <input
                    onChange={(e) => setPass(e.target.value)}
                    ref={passRef}
                    className="pl-2 outline-none border-none"
                    type="password"
                    name=""
                    id=""
                    placeholder="Password"
                  />

                  <button onClick={(e) => showPass(e)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={
                        showPassword === true
                          ? "w-5 h-5 text-green-600"
                          : " w-5 h-5 text-gray-300"
                      }
                    >
                      <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                      <path
                        fillRule="evenodd"
                        d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 opacity-100"
              >
                Login
              </button>
              <div className="flex items-center flex-col">
                <Link to="/error">
                  <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
                    Forgot Password ?
                  </span>
                </Link>
                {/* ----------------------------------------------------------------------------------- */}
                <Link
                  className="text-sm ml-2 hover:text-blue-500 cursor-pointer"
                  to="/register"
                >
                  Don't have account?
                </Link>
              </div>
              {/* popup */}
              <div
                className={
                  wrongPass === !true
                    ? "relative bottom-[999px] bg-red-500 text-white p-4 rounded-md bg-opacity-90 shadow-md "
                    : "relative bottom-[450px] bg-red-500 text-white p-4 rounded-md bg-opacity-90 shadow-md duration-300"
                }
              >
                <div className="flex gap-1 items-center justify-center">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  <h1 className="font-semibold">Wrong Password</h1>
                </div>
              </div>
              <div
                className={
                  invalidEmail === !true
                    ? "relative bottom-[999px] bg-red-500 text-white p-4 rounded-md bg-opacity-90 shadow-md "
                    : "relative bottom-[500px] bg-red-500 text-white p-4 rounded-md bg-opacity-90 shadow-md duration-300"
                }
              >
                <div className="flex gap-1 items-center justify-center">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  <h1 className="font-semibold">Invalid Email</h1>
                </div>
              </div>
              <div
                className={
                  noUser === !true
                    ? "relative bottom-[999px] bg-red-500 text-white p-4 rounded-md bg-opacity-90 shadow-md "
                    : "relative bottom-[500px] bg-red-500 text-white p-4 rounded-md bg-opacity-90 shadow-md duration-300"
                }
              >
                <div className="flex gap-1 items-center justify-center">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  <h1 className="font-semibold">No Account Found</h1>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
