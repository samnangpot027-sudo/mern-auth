import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import OAuth from "../components/OAuth";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({});
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErr(false);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setErr(true);
        return;
      }
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setErr(true);
    }
  };
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="flex justify-center items-center text-2xl font-bold text-slate-700 mt-15 mb-5">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full p-3 mb-3 rounded-md border-[1px] border-slate-300 outline-slate-400 text-slate-700"
          type="text"
          id="username"
          placeholder="username"
          onChange={handleChange}
        />
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
          {loading ? "Loading.." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <p>
        Already have an account?
        <span className="pl-2">
          <Link className="text-blue-600" to="/signin">
            Sign In
          </Link>
        </span>
      </p>
      <p className="text-red-500 mt-5">{err && "Something went wrong!"}</p>
    </div>
  );
};

export default Signup;
