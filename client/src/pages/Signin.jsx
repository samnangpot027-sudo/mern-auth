import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
const Signin = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="flex justify-center items-center text-2xl font-bold text-slate-700 mt-15 mb-5">
        Sign In
      </h1>
      <form action="" className="">
        <input
          className="w-full p-3 mb-3 rounded-md border-[1px] border-slate-300 outline-slate-400 text-slate-700"
          type="email"
          placeholder="email"
        />
        <div className="w-full relative items-center">
          <input
            className="w-full p-3 mb-3 rounded-md border-[1px] border-slate-300 outline-slate-400 text-slate-700"
            type={show ? "text" : "password"}
            placeholder="password"
          />
          <div
            onClick={() => setShow(!show)}
            className=" absolute top-[22%]  right-3 cursor-pointer p-1 text-[1rem]"
          >
            {show ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        </div>
      </form>
      <button className="bg-blue-600 w-full p-3 rounded-md text-white mb-3">
        <Link>Log In</Link>
      </button>
      <p>
        Don't have an account?{" "}
        <span className="pl-2">
          <Link className="text-blue-600" to="/signup">
            Sign Up
          </Link>
        </span>
      </p>
    </div>
  );
};

export default Signin;
