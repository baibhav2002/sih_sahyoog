"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = ({ params }) => {
  const { id } = params;
  const [Feed, setfeed] = useState([]);
  const getFeed = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_SERVER}/api/project/id/${id}`
      );
      const data = await response.json();
      setfeed(data);
      console.log(response, data);
    } catch (error) {
      console.log("error:", error);
      setfeed([]);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  console.log(Feed);
  return (
    <div className="w-full h-[88vh] flex overflow-hidden">
      <div className="lg:w-[70%] h-screen overflow-y-auto overflow-x-hidden p-5">
        <div className="flex space-x-3 items-start flex-col xl:flex-row ">
          <Image
            src={Feed?.image || "/images/college.jpg"}
            width={500}
            height={500}
            className="w-[500px] rounded-md shadow-md "
            alt="Project Image"
          />
          <div>
            <p className="font-[700] text-3xl pb-3">
              {Feed?.title || "Loading"}
            </p>
            <p className="text-sm">{Feed?.description || "Loading"}</p>
            <p className="text-indigo-600  py-3">
              <a
                target={"_blank"}
                referrerPolicy="no-referrer"
                href={
                  Feed?.links?.[0]?.source?.startsWith("https")
                    ? Feed?.links?.[0]?.source
                    : `https://${Feed?.links?.[0]?.source}`
                }
              >
                {Feed?.links?.[0]?.source}
              </a>
            </p>
          </div>
        </div>
        <div className="w-full pt-5 h-[60vh]">
          <object
            data={Feed?.projectFile}
            width="800"
            height="500"
            className="w-full "
          ></object>
        </div>
      </div>
      <div className="w-[30%] h-screen sticky right-0 top-0 border p-5 lg:block hidden">
        <p className="text-center font-[700] text-2xl uppercase">Comments</p>
        <div className="w-full h-[73vh] overflow-y-auto border-b mb-3">
          <div className="w-full border-b">
            <div className="flex items-center space-x-1 justify-start w-full ">
              <Image
                src={"/images/default.png"}
                width={500}
                height={500}
                className="w-[25px] rounded-full"
                alt=""
              />
              <p className="relative top-[1px] text-sm font-[600]">John Doe</p>
            </div>
            <div>
              <p className="text-xs py-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                consequuntur debitis accusamus at sequi nemo assumenda suscipit
                earum beatae, obcaecati vero laborum aut veniam perferendis
                maiores cum est ipsa nesciunt.
              </p>
              <div className="text-xs font-[600] flex items-center justify-between">
                <p>10:05 AM</p>
                <p>12/12/23</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <input
            type="text"
            placeholder="Commet Here "
            className="w-full p-3 border transition-all rounded-md outline-none border-purple-200 focus:border-purple-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
