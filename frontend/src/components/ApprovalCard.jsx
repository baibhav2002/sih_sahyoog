"use client";

import React from "react";

const ApprovalCard = ({ item, slno }) => {
  return (
    <div className="bg-white md:w-[50%] p-5 rounded-xl shadow-md border mx-auto mb-5">
      <div className="pt-5 pl-5 pr-5 flex justify-between">
        <div className="font-bold text-lg">#{slno + 1}</div>
        <div className="bg-purple-600 text-white p-1 rounded-md">New</div>
      </div>
      <div className="pt-5 pl-5 pr-5">
        <div>
          <span className="font-bold">Title:</span>
          {" " + item?.data?.title}
        </div>
      </div>

      {/* <div className="pt-5 pl-5 pr-5">
        <span className="font-bold">Description:</span>
        {" " + item?.data?.description}
      </div> */}

      <div className="p-5 text-slate-800 hover:text-black">
        <span className="font-normal">Sender: @</span>
        <span
          onClick={() => {
            alert("User Profile");
          }}
          className="hover:cursor-pointer"
        >
          {item?.senderName} ({item?.senderMobile})
        </span>
        <div>
          <span className="font-bold">Date:</span>{" "}
          {new Date(item?.date)?.toDateString()}{" "}
          <span className="font-bold">Time:</span>{" "}
          {new Date(item?.date)?.toLocaleTimeString()}
        </div>
      </div>

      <div className="flex justify-end space-x-2 pr-3">
        <button
          onClick={() => {
            alert("View the project");
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          View
        </button>

        <button
          onClick={() => {
            alert("Accept");
          }}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Accept
        </button>

        <button
          onClick={() => {
            alert("delete");
          }}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ApprovalCard;
