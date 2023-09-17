import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const Cards = (props) => {
  const { feed } = props;

  return (
    // <center>
    <div className=" md:w-[50%] w-full p-5 group bg-[#f9cfff0a] backdrop-blur-2xl border-b border-[#d3d3d3] overflow-hidden rounded-xl">
      <div className="relative">
        <Image
          src={feed?.image || "/images/college.jpg"}
          width={330}
          height={200}
          className="w-full rounded-md"
          alt=""
        />
        <div className="absolute flex items-center justify-center w-full h-full top-0 left-0">
          <button className="text-xl bg-[#00000060] backdrop-blur-sm text-white px-4 py-1 rounded-full">
            20k views
          </button>
        </div>
      </div>
      <div className="mt-3">
        <p className="text-xl font-bold">{feed?.title}</p>
        <p className="text-xs font-light">{feed?.description}</p>
      </div>
      <div className="flex w-full mt-2 items-center justify-between">
        {/* don't remove */}
        {/* <button className="text-[#000] p-2 rounded-md text-sm">
          <AiOutlineLike size={30} className="inline" />
          <span className="relative top-1">29k</span>
        </button> */}
        <button className="text-[#ff17aa] p-2 rounded-md text-sm">
          <AiFillLike size={30} className="inline" />
          <span className="relative top-1">29k</span>
        </button>
        <Link href={`/feeds/${feed._id}`}>
          <button className="w-full text-white hover:bg-purple-800 transition-all bg-purple-700 p-2 rounded-md text-sm">
            Read More
          </button>
        </Link>
      </div>
    </div>
    // </center>
  );
};

export default Cards;
