"use client";

import Cards from "@/components/college/Cards";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [Feeds, setfeeds] = useState([]);
  const getFeeds = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_SERVER}/api/project/search?limit=10`
      );
      const data = await response.json();
      setfeeds(data);
      console.log(response, data);
    } catch (error) {
      console.log("error:", error);
      setfeeds([]);
    }
  };
  useEffect(() => {
    getFeeds();
  }, []);
  return (
    <div className="w-full md:px-10 py-5 px-5 ">
      {/* <div className="text-3xl font-bold uppercase mb-5 text-center">FEED</div> */}
      <div className="flex items-center justify-center flex-col">
        {Feeds && Feeds.map((feed) => <Cards key={feed._id} feed={feed} />)}
      </div>
    </div>
  );
};

export default Page;
