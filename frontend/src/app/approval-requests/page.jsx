"use client";
import ApprovalCard from "@/components/ApprovalCard";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [data, setData] = useState([]);
  const token = getCookie("sambandh_token");
  //   console.log(token);
  const getALlApprovals = async () => {
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_HOST_SERVER}/api/project-request/all`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result.requests);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getALlApprovals();
  }, []);
  return (
    <div className="p-5">
      {data?.length > 0 ? (
        data?.map((item, index) => {
          return <ApprovalCard key={index} item={item} slno={index} />;
        })
      ) : (
        <p>No Request Here</p>
      )}
    </div>
  );
};

export default Page;
