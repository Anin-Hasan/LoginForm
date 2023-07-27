import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row">
        <h1 className="text-9xl">4</h1>
        <h1 className="text-9xl text-red-600">0</h1>
        <h1 className="text-9xl">4</h1>
      </div>
      <button className="text-3xl  font-semibold text-white bg-blue-500 py-2 px-4 rounded-md animate-bounce duration-300 mt-10">
        <Link to="/">Login</Link>
      </button>
    </div>
  );
};

export default Error;
