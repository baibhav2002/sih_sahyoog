"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { CgFeed } from "react-icons/cg";
import { IoIosNotifications } from "react-icons/io";
import { SiAuth0 } from "react-icons/si";
import { useRouter } from "next/navigation";
import { IoSettings } from "react-icons/io5";

const Sidebar = ({ toggler, setToggler }) => {
  const router = useRouter();
  const currentPath = usePathname();
  //
  return (
    <div
      className={
        toggler
          ? "w-full transition-all duration-300 left-0 top-0 md:w-[350px] bg-purple-50 shadow-md border-r h-screen fixed overflow-hidden z-[999]"
          : "w-0 transition-all duration-300 left-0 top-0 md:w-[0px] bg-purple-50 shadow-md border-r h-screen fixed overflow-hidden z-[999]"
      }
    >
      <div className="flex items-center space-x-5 p-5">
        <button
          onClick={() => {
            setToggler(false);
          }}
        >
          <AiOutlineMenu size={25} />
        </button>
        <div>
          <Link href={"/"}>
            <button className="text-3xl font-[600]">सहयोग</button>
          </Link>
        </div>
      </div>
      <div className="w-full p-5">
        <Link href={"/feeds"}>
          <button
            className={
              currentPath === "/feeds"
                ? "w-full space-x-4 p-3 hover:bg-purple-300 transition-all flex font-[300] rounded-md items-center bg-purple-200 mb-3"
                : "w-full space-x-4 p-3 hover:bg-purple-300 transition-all flex font-[300] rounded-md items-center mb-3"
            }
          >
            <span>
              <CgFeed size={32} />
            </span>
            <span className=" text-2xl">FEEDS</span>
          </button>
        </Link>
        <Link href={"/feeds"}>
          <button
            className={
              currentPath === "/approval-requests"
                ? "w-full space-x-4 p-3 hover:bg-purple-300 transition-all flex font-[300] rounded-md items-center bg-purple-200 mb-3"
                : "w-full space-x-4 p-3 hover:bg-purple-300 transition-all flex font-[300] rounded-md items-center mb-3"
            }
          >
            <span>
              <SiAuth0 size={27} />
            </span>
            <span className=" text-2xl">Approval Requests</span>
          </button>
        </Link>
        <Link href={"/notifications"}>
          <button
            className={
              currentPath === "/notifications"
                ? "w-full space-x-4 p-3 hover:bg-purple-300 transition-all flex font-[300] rounded-md items-center bg-purple-200 mb-3"
                : "w-full space-x-4 p-3 hover:bg-purple-300 transition-all flex font-[300] rounded-md items-center mb-3"
            }
          >
            <span>
              <IoIosNotifications size={34} />
            </span>
            <span className=" text-2xl">Notifications</span>
          </button>
        </Link>

        <div className="w-full left-0 p-5 absolute bottom-0">
          <button
            onClick={() => {
              router.push("/account/settings");
            }}
            className={
              currentPath === "/account/settings"
                ? "w-full space-x-4 p-3 hover:bg-purple-300 transition-all flex font-[300] rounded-md items-center bg-purple-200 mb-3"
                : "w-full space-x-4 p-3 hover:bg-purple-300 transition-all flex font-[300] rounded-md items-center mb-3"
            }
          >
            <span>
              <IoSettings size={34} />
            </span>
            <span className="text-2xl">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
