"use client";
import { setCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [popup, setPopup] = useState(false);
  const router = useRouter();
  const logout = () => {
    setCookie("sambandh_token", "");
    setCookie("sambandh_institute_data", "");
    setCookie("sambandh_student_data", "");
    window.location.href = "/login";
    setPopup(false);
  };
  const [sambandh_data, setsambandh_data] = useState(null);

  useEffect(() => {
    if (getCookie("sambandh_student_data")?.trim()?.length > 0) {
      setsambandh_data(
        JSON.parse(decodeURI(getCookie("sambandh_student_data")?.trim()))
      );
    } else if (getCookie("sambandh_institute_data")?.trim()?.length > 0) {
      setsambandh_data(
        JSON.parse(decodeURI(getCookie("sambandh_institute_data")?.trim()))
      );
    }
  }, []);

  return (
    <div className="p-16 flex items-center justify-center flex-col w-full min-h-[80vh]">
      <div className="p-8 bg-white shadow mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
              <p className="font-bold text-gray-700 text-xl">220</p>
              <p className="text-gray-400">Likes</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">10</p>
              <p className="text-gray-400">Posts</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">89</p>
              <p className="text-gray-400">Comments</p>
            </div>
          </div>
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="md:space-x-8 md:space-y-0 space-y-2 spa flex md:flex-row flex-col justify-between mt-32 md:mt-0 md:justify-center">
            <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Edit
            </button>
            <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Message
            </button>
            <button
              onClick={() => {
                setPopup(true);
              }}
              className="text-white py-2 px-4 uppercase rounded bg-red-700 hover:bg-red-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="mt-20 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-gray-700">
            {sambandh_data?.name}
          </h1>
          <p className="mt-2 text-gray-500">{sambandh_data?.email}</p>
          <p
            onClick={() => {
              navigator.clipboard.writeText(sambandh_data?.referral);
              toast.success("Referral Code Copied to clipboard");
            }}
            className="mt-2 text-gray-500 font-[600] cursor-pointer"
          >
            {sambandh_data?.referral?.length > 0
              ? "Referral Code: " + sambandh_data?.referral
              : ""}
          </p>
        </div>
        <div className="mt-12 flex flex-col justify-center">
          <p className="text-gray-600 md:text-3xl text-xl text-center font-[800] lg:px-16">
            FEEDS
          </p>
          <div></div>
          <button className="text-indigo-500 py-2 px-4  font-medium mt-4">
            Show more
          </button>
        </div>
      </div>
      <div
        onClick={() => {
          setPopup(false);
        }}
        className={
          popup
            ? "fixed z-[9999] top-0 left-0 w-full h-screen backdrop-blur-xl ease-linear transition-all duration-1000"
            : "fixed z-[9999] top-0 left-0 w-full h-screen backdrop-blur-xl ease-linear opacity-0 pointer-events-none transition-all duration-1000"
        }
      ></div>
      <div
        className={
          popup
            ? "fixed z-[9999] w-[90%] transition-all md:w-[400px] shadow-md border p-5 rounded-md bg-white  duration-1000"
            : "fixed z-[9999] w-[90%] transition-all md:w-[400px] shadow-md border p-5 rounded-md bg-white pointer-events-none opacity-0 duration-1000"
        }
      >
        <p className="text-center text-xl font-[600] md:text-2xl">
          Are Sure You Want To Logout?
        </p>
        <div className="flex items-center w-full justify-between mt-4">
          <button
            onClick={() => {
              setPopup(false);
            }}
            className="bg-[#000] text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={logout}
            className="bg-[#ff3103] text-white px-4 py-2 rounded-md"
          >
            Sure
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
