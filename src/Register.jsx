import { useRef, useState, useEffect } from "react";
import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firabse";

// import axios from "./api/axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const REGISTER_URL = "/register";
const Register = () => {
  const userRef = useRef();
  // const errRef = useRef();
  const passRef = useRef();

  const [disabled, setDisabled] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState("");

  const [fullName, setFullName] = useState("");

  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   console.log("fullname:", fullName.length);
  // }, [fullName]);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    // console.log(result);
    // console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    // console.log(result);
    // console.log(pwd);
    setValidPwd(result);
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  useEffect(() => {
    if (!validName || !validPwd || !validMatch) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }

    // console.log("disabled", disabled);
  }, [validName, validMatch, validPwd]);

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

  const [pop, setPop] = useState(false);
  const navigate = useNavigate();
  const [errorPop, setErrorPop] = useState(false);
  const [invalidPop, setInvalidPop] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, fullName, pwd)
      .then((userCredential) => {
        console.log(userCredential);

        setPop(true);
        setErrorPop(false);
        setInvalidPop(false);

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setErrorPop(true);
          setInvalidPop(false);
          setPop(false);
        }
        if (error.code === "auth/invalid-email") {
          setInvalidPop(true);
          setPop(false);
          setErrorPop(false);
        }
        console.log(error.code);
        // setPop(false);
        // setErrorPop(false);
        // setInvalidPop(false);
      });
  };

  return (
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
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={
                  fullName.length > 0
                    ? "h-5 w-5 text-green-500"
                    : "text-red-600"
                }
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                name=""
                id=""
                placeholder="Email"
              />
            </div>

            {/* UserName */}

            <div
              className={
                "flex items-center border-2 py-2 px-3 rounded-2xl mb-4"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={
                  validName === true ? "h-5 w-5 text-green-500" : "text-red-600"
                }
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
                className="pl-2 outline-none border-none"
                ref={userRef}
                onChange={(e) => setUser(e.target.value)}
                type="text"
                name=""
                id=""
                placeholder="Username"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
            </div>
            <p
              className={
                userFocus && user && !validName
                  ? "text-xs rounded-xl bg-black text-white relative mb-4 p-2 bottom-[-0px]"
                  : "absolute left-[-999px]"
              }
            >
              4 to 24 characters.
              <br />
              Must begin with a letter. <br />
              Letters,numbers,underscores,hypens allowed.
            </p>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 w-64">
              <span></span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={
                  validPwd === true ? "h-5 w-5 text-green-500" : "text-red-600"
                }
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                ref={passRef}
                className="pl-2 outline-none border-none"
                onChange={(e) => setPwd(e.target.value)}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                type="password"
                name=""
                id=""
                placeholder="Password"
              />
              <span>
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
              </span>
            </div>
            <p
              className={
                pwdFocus && pwd && !validPwd
                  ? "w-64 text-xs rounded-xl bg-black text-white relative mb-4 p-2 bottom-[-0px] duration-300"
                  : "absolute left-[-999px]"
              }
            >
              8 to 24 characters.
              <br />
              Must be include uppercase, lowercase and letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>.
            </p>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={
                  validMatch === true
                    ? "h-5 w-5 text-green-500"
                    : "text-red-600"
                }
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                onChange={(e) => setMatchPwd(e.target.value)}
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                type="password"
                name=""
                id=""
                placeholder="Confirm Password"
              />
            </div>
            <p
              className={
                matchFocus && matchPwd && !validMatch
                  ? "text-xs rounded-xl bg-black text-white relative mb-2 mt-4 p-2 bottom-[-0px] duration-300"
                  : "absolute left-[-999px]"
              }
            >
              Password does not matched.
            </p>
            <button
              disabled={disabled}
              type="submit"
              className={
                disabled === true
                  ? "block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 opacity-30"
                  : "block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 opacity-100"
              }
            >
              Sign Up
            </button>
            <div className="flex items-center flex-col">
              <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
                Forgot Password ?
              </span>
              {/* ----------------------------------------------------------------------------------- */}
              <Link
                className="text-sm ml-2 hover:text-blue-500 cursor-pointer"
                to="/login"
              >
                Already have account?
              </Link>
            </div>
            {/* popup */}
            <div
              className={
                pop === !true
                  ? "relative bottom-[999px] bg-green-500 text-white p-4 rounded-md bg-opacity-90 shadow-md "
                  : "relative bottom-[550px] bg-green-500 text-white p-4 rounded-md bg-opacity-90 shadow-md duration-300"
              }
            >
              <div className="flex gap-1 items-center justify-center">
                {/* <div>
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
                </div> */}
                <h1 className="font-semibold">Register Sucessful</h1>
              </div>
            </div>
            <div
              className={
                errorPop === !true
                  ? "relative bottom-[999px] bg-red-500 text-white p-4 rounded-md bg-opacity-90 shadow-md "
                  : "relative bottom-[550px] bg-red-500 text-white p-4 rounded-md bg-opacity-90 shadow-md duration-300"
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
                <h1 className="font-semibold">Email already in use. </h1>
              </div>
            </div>
            <div
              className={
                invalidPop === !true
                  ? "relative bottom-[999px] bg-red-500 text-white p-4 rounded-md bg-opacity-90 shadow-md "
                  : "relative bottom-[600px] bg-red-500 text-white p-4 rounded-md bg-opacity-90 shadow-md duration-300"
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
                <h1 className="font-semibold">Invalid email </h1>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
