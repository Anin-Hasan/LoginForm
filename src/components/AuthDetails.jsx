import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firabse";
import { Link, useNavigate } from "react-router-dom";
import Error from "./Error";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const navigate = useNavigate();

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("signOut Succesfull");
        navigate("/login");
      })
      .catch((e) => console.log(e));
  };

  //signIn successfull popup
  //SignOut button
  //put some animations

  return (
    <div>
      {authUser ? (
        <>
          <div className="flex items-center flex-col m-20">
            {/* <p>{`Signed In as ${authUser.email}`}</p> */}
            <h1 className="text-5xl font-semibold text-green-600 drop-shadow-md text-center animate-bounce">
              Sign in Successful
            </h1>
            <button
              className="text-2xl mt-10 font-semibold bg-red-500 text-white py-4 px-4 rounded-md text-center shadow-md hover:scale-105 duration-300"
              onClick={userSignOut}
            >
              Sign Out
            </button>
          </div>
        </>
      ) : (
        <>
          <Error />
        </>
      )}
    </div>
  );
};

export default AuthDetails;
