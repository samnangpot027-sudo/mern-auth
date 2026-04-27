import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Headers = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold">Auth App</h1>
        <ul className="flex gap-4 items-center">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/about">About</Link>
          </li>

          <li>
            {currentUser ? (
              <Link to="/profile">
                <img
                  src={currentUser.profilePicture}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Headers;
