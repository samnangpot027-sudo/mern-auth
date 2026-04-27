import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

const Signin = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  console.log(loading, error);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="flex justify-center items-center text-2xl font-bold text-slate-700 mt-15 mb-5">
        Sign In
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full p-3 mb-3 rounded-md border-[1px] border-slate-300 outline-slate-400 text-slate-700"
          type="email"
          id="email"
          placeholder="email"
          onChange={handleChange}
        />
        <div className="w-full relative items-center">
          <input
            className="w-full p-3 mb-3 rounded-md border-[1px] border-slate-300 outline-slate-400 text-slate-700"
            type={show ? "text" : "password"}
            id="password"
            placeholder="password"
            onChange={handleChange}
          />
          <div
            onClick={() => setShow(!show)}
            className=" absolute top-[22%]  right-3 cursor-pointer p-1 text-[1rem]"
          >
            {show ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        </div>
        <button
          disabled={loading}
          className="bg-slate-700 hover:opacity-95 disabled:opacity-80 uppercase w-full p-3 rounded-md text-white mb-3 cursor-pointer"
        >
          {loading ? "Loading.." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <p>
        Don't have an account?
        <span className="pl-2">
          <Link className="text-blue-600" to="/signup">
            Sign Up
          </Link>
        </span>
      </p>
      <p className="text-red-500 mt-5">
        {error ? error.message || "Something went wrong!" : ""}
      </p>
    </div>
  );
};

export default Signin;
