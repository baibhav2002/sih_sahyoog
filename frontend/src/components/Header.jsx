"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { IoCreate } from "react-icons/io5";

const Header = ({ isAuthenticated }) => {
  const filters = [
    {
      name: "Keywords",
      options: [
        "Blockchain",
        "Cyber Security",
        "AI/ML",
        " IoT",
        "Web Development ",
        "Web3 ",
        "Data Science",
      ],
    },
    {
      name: "domains",
      options: [
        "Blockchain",
        "Cyber Security",
        "AI/ML",
        " IoT",
        "Web Development ",
        "Web3 ",
        "Data Science",
      ],
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full z-[999] sticky top-0 left-0 backdrop-blur-xl  px-5 md:px-10 py-5 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-5">
          <button>
            <AiOutlineMenu size={25} />
          </button>
          <div>
            <Link href={"/"}>
              <button className="text-3xl font-[600]">सहयोग</button>
            </Link>
          </div>
        </div>
        <div className="w-full md:block hidden">
          <button className="w-[50%] mx-auto relative cursor-default flex group">
            <span className="w-full flex items-center justify-end">
              <input
                type="text"
                placeholder="Search"
                className="rounded-md px-4 py-3 border w-full outline-none focus:border-purple-600"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <span className="absolute right-1 inline-block cursor-pointer p-2 rounded-full hover:bg-purple-200 transition-all duration-300">
                <AiOutlineSearch size={20} />
              </span>
            </span>
            <span className="absolute block top-12 group-focus-within:visible group-focus-within:pointer-events-auto invisible ease-linear pointer-events-none p-5 border shadow-md rounded-md w-full bg-white">
              {filters?.map((filter, index) => {
                return (
                  <span className="block pb-4" key={index}>
                    <span className="uppercase block text-start text-base pb-2">
                      <span className="font-[600]">{filter.name}</span>
                    </span>
                    <span className="flex flex-wrap items-center gap-2">
                      {filter.options?.map((option, index) => {
                        return (
                          <span
                            onClick={() => {
                              let isFilterAlreadyPresent =
                                searchTerm.includes(option);
                              if (!isFilterAlreadyPresent) {
                                setSearchTerm(
                                  searchTerm.trim() === ""
                                    ? option
                                    : searchTerm + ":" + option.trim()
                                );
                              }
                            }}
                            key={index}
                            className="bg-purple-100 inline-block cursor-pointer py-1 px-3 rounded-md"
                          >
                            {option}
                          </span>
                        );
                      })}
                    </span>
                  </span>
                );
              })}
            </span>
          </button>
        </div>
        {isAuthenticated ? (
          <div className="flex items-center space-x-2">
            <button className="relativetext-[#ff006a]">
              <IoCreate size={36} />
            </button>

            <Link href={"/college/notifications"}>
              <button className="relative top-1 text-[#000000]">
                <IoIosNotifications size={36} />
              </button>
            </Link>
            <Link href={"/account/profile"}>
              <button>
                <Image
                  src={"/images/profile.svg"}
                  width={50}
                  height={50}
                  className="rounded-full w-[32px] relative top-1 md:w-[56px]"
                />
              </button>
            </Link>
          </div>
        ) : (
          <Link href={"/login"}>
            <button className="bg-purple-600 text-base font-[600] text-white px-7 hover:bg-purple-800 transition-all py-2 rounded-full">
              Login
            </button>
          </Link>
        )}
      </div>
      <div className="w-full md:hidden">
        <button className="w-[100%] mt-3 mx-auto relative cursor-default flex group">
          <span className="w-full flex items-center justify-end">
            <input
              type="text"
              placeholder="Search"
              className="rounded-md px-4 py-3 border w-full outline-none focus:border-purple-600"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <span className="absolute right-1 inline-block cursor-pointer p-2 rounded-full hover:bg-purple-200 transition-all duration-300">
              <AiOutlineSearch size={20} />
            </span>
          </span>
          <span className="absolute block top-12 group-focus-within:visible group-focus-within:pointer-events-auto invisible ease-linear pointer-events-none p-5 border shadow-md rounded-md w-full bg-white">
            {filters?.map((filter, index) => {
              return (
                <span className="block pb-4" key={index}>
                  <span className="uppercase block text-start text-base pb-2">
                    <span className="font-[600]">{filter.name}</span>
                  </span>
                  <span className="flex flex-wrap items-center gap-2">
                    {filter.options?.map((option, index) => {
                      return (
                        <span
                          onClick={() => {
                            let isFilterAlreadyPresent =
                              searchTerm.includes(option);
                            if (!isFilterAlreadyPresent) {
                              setSearchTerm(
                                searchTerm.trim() === ""
                                  ? option
                                  : searchTerm + ":" + option.trim()
                              );
                            }
                          }}
                          key={index}
                          className="bg-purple-100 inline-block cursor-pointer py-1 px-3 rounded-md"
                        >
                          {option}
                        </span>
                      );
                    })}
                  </span>
                </span>
              );
            })}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;
