"use client";
import React, { useState } from "react";
import Link from "next/link";

const page = () => {
  const [loginType, setLoginType] = useState(null);
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-full relative grid place-items-center min-h-[80vh]">
      <div className="w-[90%] transition-all duration-500 md:w-[500px] relative overflow-hidden py-10 px-5 bg-white border shadow-md rounded-md flex items-center justify-center">
        <form className="w-full p-5 space-y-3">
          <div>
            <p className="text-center tracking-widest uppercase">
              Welcome back,
            </p>
            <p className="pb-4 font-[700] text-2xl md:text-4xl text-center">
              Login to continue
            </p>
          </div>
          <div className="pb-5 w-full">
            <select className="w-full bg-transparent  text-sm outline-none border rounded-md border-purple-300 focus:border-[#ab52ff]  p-3">
              <option value="null">Select User Type</option>
              <option value="college">College/University</option>
              <option value="student">Student</option>
            </select>
          </div>
          {loginType === "college" ? (
            <div className="space-y-5">
              <div className="relative w-full">
                <label
                  htmlFor="email"
                  className="absolute text-sm left-2 -top-[10.5px] bg-white"
                >
                  Registerd Email
                </label>
                <input
                  autoComplete="off"
                  type="email"
                  placeholder="abc@company.com"
                  className="w-full bg-transparent text-sm outline-none border rounded-md border-purple-300 focus:border-[#ab52ff]  p-3"
                />
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="full_name"
                  className="absolute text-sm left-2 -top-[10.5px] bg-white"
                >
                  Password
                </label>
                <input
                  autoComplete="new-password"
                  type="password"
                  placeholder="*************"
                  className="w-full bg-transparent text-sm outline-none border rounded-md border-purple-300 focus:border-[#ab52ff]  p-3"
                />
              </div>

              <div className="relative w-full">
                <button className="p-3 hover:bg-purple-800 transition-all rounded-md bg-purple-600 text-white w-full">
                  Login
                </button>
              </div>
            </div>
          ) : loginType === "student" ? (
            <div className="space-y-5">
              <div className="relative w-full">
                <label
                  htmlFor="mobile"
                  className="absolute text-sm left-2 -top-[10.5px] bg-white"
                >
                  Mobile Number
                </label>
                <input
                  autoComplete="off"
                  type="number"
                  placeholder="2345647598"
                  className="w-full bg-transparent text-sm outline-none border rounded-md border-purple-300 focus:border-[#ab52ff]  p-3"
                />
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="full_name"
                  className="absolute text-sm left-2 -top-[10.5px] bg-white"
                >
                  Password
                </label>
                <input
                  autoComplete="new-password"
                  type="password"
                  placeholder="*************"
                  className="w-full bg-transparent text-sm outline-none border rounded-md border-purple-300 focus:border-[#ab52ff]  p-3"
                />
              </div>

              <div className="relative w-full">
                <button className="p-3 hover:bg-purple-800 transition-all rounded-md bg-purple-600 text-white w-full">
                  Login
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          <div>
            <p className="text-center">
              Don't have an account?{" "}
              <Link className="underline text-purple-700" href={"/register"}>
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div
        className={
          loading
            ? "fixed z-[9999] flex items-center justify-center top-0 left-0 w-full h-screen bg-[#000b] backdrop-blur-xl transition-all duration-700"
            : "fixed z-[9999] flex items-center justify-center top-0 left-0 w-full h-screen bg-[#000b] backdrop-blur-xl invisible pointer-events-none transition-all duration-700"
        }
      ></div>
    </div>
  );
};

export default page;
