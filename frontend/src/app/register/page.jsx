"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
// import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const Page = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [toggleForm, setToggleForm] = useState(false);
  const [popup, setPopup] = useState(false);
  const [optToggler, setOptToggler] = useState(false);
  const [mobileToggler, setMobileToggler] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const router = useRouter();

  const [studentData, setStudentData] = useState({
    mobile: "",
    password: "",
    regdNo: "",
    name: "",
    referred: "",
    email: "",
  });
  const [spocData, setSpocData] = useState({
    name: "",
    email: "",
    mobile: "",
    empId: "",
    photo: "",
  });
  const [collegeData, setCollegeData] = useState({
    email: "",
    password: "",
    name: "",
    aisheCode: "",
    address: "",
    spoc: spocData,
  });

  // ? image
  const imageRef = useRef(null);
  const openBrowseImage = async () => {
    await imageRef.current.click();
  };

  function previewImage(event) {
    var input = event.target;
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        setImageSrc(e.target.result);
        setSpocData({ ...spocData, photo: e.target.result });
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  const studentRegister = async (e) => {
    e.preventDefault();
  };
  const collegeRegister = async (e) => {
    e.preventDefault();
    try {
      setCollegeData({ ...collegeData, spoc: spocData });
      console.log(spocData, collegeData);
      const response = await fetch(
        `https://a271-115-242-248-226.ngrok-free.app/api/institute/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(collegeData),
        }
      );
      const data = await response.json();
      console.log(response, data);
      if (response.status === 301 || response.status === 200) {
        console.log(collegeData.email);
        const otpResponse = await fetch(
          `https://a271-115-242-248-226.ngrok-free.app/api/institute/auth/send-otp`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: collegeData.email,
            }),
          }
        );
        const otpData = await otpResponse.json();
        console.log(otpResponse.status, otpData);
        alert("OTP sent to your inbox");
        setOptToggler(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      const otpResponse = await fetch(
        `https://a271-115-242-248-226.ngrok-free.app/api/institute/auth/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: collegeData.email,
            otp: otpCode,
          }),
        }
      );
      const otpData = await otpResponse.json();
      console.log(otpResponse.status, otpData);
      if (otpData?.token) {
        setCookie("sambandh_token", otpData?.token);
        router.push("/feeds");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full relative grid place-items-center min-h-[80vh]">
      <div className="w-[95%] transition-all duration-500 md:w-[50%] relative overflow-hidden  bg-white border shadow-md rounded-md flex items-center justify-center">
        <div
          className={
            !mobileToggler ? "md:w-1/2 md:block" : "md:w-1/2 hidden md:block"
          }
        >
          <form onSubmit={studentRegister} className="w-full p-5 space-y-3">
            <div>
              <p className="text-center tracking-widest uppercase">hi there,</p>
              <p className="font-[700] text-2xl md:text-4xl text-center">
                Create a Student account
              </p>
            </div>
            <div className="relative w-full">
              <label
                htmlFor="user_name"
                className="absolute text-sm left-2 -top-[10.5px] bg-white"
              >
                Full name
              </label>
              <input
                autoComplete="off"
                type="text"
                placeholder="i.e.John doe"
                className="w-full bg-transparent text-sm outline-none border rounded-md border-purple-300 focus:border-[#ab52ff]  p-3"
              />
            </div>
            <div className="relative w-full">
              <label
                htmlFor="email"
                className="absolute text-sm left-2 -top-[10.5px] bg-white"
              >
                Email Address
              </label>
              <input
                autoComplete="off"
                type="email"
                placeholder="johndoe@company.com"
                className="w-full bg-transparent text-sm outline-none border rounded-md border-purple-300 focus:border-[#ab52ff]  p-3"
              />
            </div>
            <div className="relative w-full">
              <label
                htmlFor="phone"
                className="absolute text-sm left-2 -top-[10.5px] bg-white"
              >
                Mobile Number
              </label>
              <input
                autoComplete="off"
                type="number"
                placeholder="XXXXXXXXX"
                className="w-full bg-transparent text-sm outline-none border rounded-md border-purple-300 focus:border-[#ab52ff]  p-3"
              />
            </div>
            <div className="relative w-full">
              <label
                htmlFor="referal"
                className="absolute text-sm left-2 -top-[10.5px] bg-white"
              >
                Referal Code
              </label>
              <input
                autoComplete="off"
                type="text"
                placeholder="***********"
                className="w-full bg-transparent text-sm outline-none border rounded-md border-purple-300 focus:border-[#ab52ff]  p-3"
              />
            </div>
            <div className="relative w-full">
              <label
                htmlFor="full_name"
                className="absolute text-sm left-2 -top-[10.5px] bg-white"
              >
                Create Password
              </label>
              <input
                autoComplete="new-password"
                type="password"
                placeholder="xxxxxxxxxxxxx"
                className="w-full bg-transparent text-sm outline-none border rounded-md border-purple-300 focus:border-[#ab52ff]  p-3"
              />
            </div>
            <div className="relative w-full">
              <label
                htmlFor="full_name"
                className="absolute text-sm left-2 -top-[10.5px] bg-white"
              >
                Confirm Password
              </label>
              <input
                autoComplete="new-password"
                type="password"
                placeholder="xxxxxxxxxxxxx"
                className="w-full bg-transparent text-sm outline-none border rounded-md border-purple-300 focus:border-[#ab52ff]  p-3"
              />
            </div>
            <div className="relative w-full">
              <button className="p-3 hover:bg-purple-800 transition-all rounded-md bg-purple-600 text-white w-full">
                Register
              </button>
            </div>
            <div>
              <p className="text-center">
                Already have an account?{" "}
                <Link className="underline text-purple-700" href={"/login"}>
                  Login
                </Link>
              </p>
              <p className="text-center">
                <button
                  onClick={() => {
                    setToggleForm(true);
                  }}
                  className=" text-purple-700 md:inline-block hidden pt-3"
                >
                  Join as Institute
                </button>
                {/* mobile */}
                <button
                  onClick={() => {
                    setMobileToggler(true);
                  }}
                  className=" text-purple-700 md:hidden"
                >
                  Join as Institute
                </button>
              </p>
            </div>
          </form>
        </div>
        <div
          className={
            mobileToggler ? "md:w-1/2 md:block" : "md:w-1/2 hidden md:block"
          }
        >
          {optToggler ? (
            <form
              onSubmit={studentRegister}
              className="w-full relative py-10 md:px-5 space-y-3"
            >
              <div>
                <p className="font-[700] text-2xl pb-4 md:text-4xl text-center">
                  OTP has been send
                </p>
              </div>

              <div className="relative w-full">
                <label
                  htmlFor="otp"
                  className="absolute font-bold text-sm left-2 -top-[10.5px] bg-white"
                >
                  OTP CODE
                </label>
                <input
                  autoComplete="off"
                  type="number"
                  placeholder="123456"
                  className="w-full bg-transparent text-sm outline-none border rounded-md border-purple-300 focus:border-[#ab52ff]  p-3"
                  onChange={(e) => {
                    setOtpCode(e.target.value);
                  }}
                  value={otpCode}
                />
              </div>

              <div className="relative w-full">
                <button
                  onClick={(e) => {
                    sendOtp(e);
                  }}
                  className="p-3 hover:bg-green-800 transition-all rounded-md bg-green-600 text-white w-full"
                >
                  Verify
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={studentRegister} className="w-full p-5 space-y-3">
              <div>
                <p className="text-center tracking-widest uppercase">
                  hi there,
                </p>
                <p className="font-[700] text-2xl md:text-4xl text-center">
                  Create A College Account
                </p>
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="full_name"
                  className="absolute text-sm left-2 -top-[10.5px] bg-white"
                >
                  AISHE Code
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder="X12345"
                  className="w-full bg-transparent text-sm outline-none border rounded-md border-purple-300 focus:border-[#ab52ff]  p-3"
                  onChange={(e) => {
                    setCollegeData({
                      ...collegeData,
                      aisheCode: e.target.value,
                    });
                  }}
                  value={collegeData.aisheCode}
                />
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="college_name"
                  className="absolute text-sm left-2 -top-[10.5px] bg-white"
                >
                  College/University Name
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder="xyz college "
                  className="w-full bg-transparent text-sm outline-none border rounded-md border-purple-300 focus:border-[#ab52ff]  p-3"
                  onChange={(e) => {
                    setCollegeData({
                      ...collegeData,
                      name: e.target.value,
                    });
                  }}
                  value={collegeData.name}
                />
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="college_name"
                  className="absolute text-sm left-2 -top-[10.5px] bg-white"
                >
                  Address
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder="at xyz po: abc "
                  className="w-full bg-transparent text-sm outline-none border rounded-md border-purple-300 focus:border-[#ab52ff]  p-3"
                  onChange={(e) => {
                    setCollegeData({
                      ...collegeData,
                      address: e.target.value,
                    });
                  }}
                  value={collegeData.address}
                />
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="email"
                  className="absolute text-sm left-2 -top-[10.5px] bg-white"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  autoComplete="off"
                  placeholder="johndoe@company.com"
                  className="w-full bg-transparent text-sm outline-none border rounded-md border-purple-300 focus:border-[#ab52ff]  p-3"
                  onChange={(e) => {
                    setCollegeData({
                      ...collegeData,
                      email: e.target.value,
                    });
                  }}
                  value={collegeData.email}
                />
              </div>

              <div className="relative w-full">
                <label
                  htmlFor="full_name"
                  className="absolute text-sm left-2 -top-[10.5px] bg-white"
                >
                  Create Password
                </label>
                <input
                  type="password"
                  autoComplete="new-password"
                  placeholder="xxxxxxxxxxxxx"
                  className="w-full bg-transparent text-sm outline-none border rounded-md border-purple-300 focus:border-[#ab52ff]  p-3"
                  onChange={(e) => {
                    setCollegeData({
                      ...collegeData,
                      password: e.target.value,
                    });
                  }}
                  value={collegeData.password}
                />
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="full_name"
                  className="absolute text-sm left-2 -top-[10.5px] bg-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  autoComplete="new-password"
                  placeholder="xxxxxxxxxxxxx"
                  className="w-full bg-transparent text-sm outline-none border rounded-md border-purple-300 focus:border-[#ab52ff]  p-3"
                />
              </div>
              <div className="relative w-full">
                <button
                  onClick={() => {
                    setPopup(true);
                  }}
                  className="p-3 hover:bg-purple-800 transition-all rounded-md bg-black text-white w-full"
                >
                  Add SPOC Details
                </button>
              </div>
              <div className="relative w-full">
                <button
                  onClick={(e) => {
                    collegeRegister(e);
                  }}
                  className="p-3 hover:bg-purple-800 transition-all rounded-md bg-purple-600 text-white w-full"
                >
                  Register
                </button>
              </div>
              <div>
                <p className="text-center">
                  Already have an account?{" "}
                  <Link className="underline text-purple-700" href={"/login"}>
                    Login
                  </Link>
                </p>
                <p className="text-center">
                  <button
                    onClick={() => {
                      setToggleForm(false);
                    }}
                    className=" text-purple-700 md:inline-block hidden pt-3"
                  >
                    Join as Student
                  </button>
                  {/* mobile */}
                  <button
                    onClick={() => {
                      setMobileToggler(false);
                    }}
                    className=" text-purple-700 md:hidden"
                  >
                    Join as student
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>

        <Image
          src={"/images/img1.jpg"}
          className={
            toggleForm
              ? "md:block hidden w-1/2 absolute h-full left-0 top-0 transition-all translate-x-[0%] duration-500"
              : "md:block hidden w-1/2 absolute h-full left-0 top-0 transition-all translate-x-[100%] duration-500"
          }
          alt=""
          width={400}
          height={400}
        />
      </div>
      <div
        onClick={() => {
          setPopup(false);
        }}
        className={
          popup
            ? "fixed z-[9999] top-0 left-0 w-full h-screen backdrop-blur-xl transition-all duration-700"
            : "fixed z-[9999] top-0 left-0 w-full h-screen backdrop-blur-xl invisible pointer-events-none transition-all duration-700"
        }
      ></div>
      <form
        onSubmit={studentRegister}
        className={
          popup
            ? "p-5 md:p-10 fixed w-[90%] top-1/2 -translate-y-1/2 z-[99999] md:w-[400px] space-y-3 rounded-xl border border-[#e3e3e3] bg-white transition-all duration-1000"
            : "p-5 md:p-10 fixed w-[90%] top-1/2 -translate-y-1/2 z-[99999] md:w-[400px] space-y-3 rounded-xl border border-[#e3e3e3] bg-white invisible pointer-events-none transition-all opacity-0 duration-1000"
        }
      >
        <div>
          <p className="text-center tracking-widest uppercase">hi there,</p>
          <p className="font-[700] text-4xl text-center">SPOC</p>
        </div>
        <p className="text-center tracking-widest">Upload profile picture</p>
        <div
          className="cursor-pointer rounded-full  mx-auto group w-[150px] shadow-md h-[150px] relative overflow-hidden"
          onClick={openBrowseImage}
        >
          <div className="group-hover:scale-100 absolute w-full h-full scale-0 transition-all top-1/2 left-1/2 rounded-full duration-500 -translate-x-1/2 -translate-y-1/2 bg-[#0000008f] z-[999] flex items-center justify-center">
            <AiOutlineCloudUpload className="text-white text-5xl animate-pulse" />
          </div>
          <input
            ref={imageRef}
            type="file"
            className="bg-transparent hidden"
            name="image"
            id="image"
            onChange={(e) => {
              previewImage(e);
            }}
            accept=".jpg, .png, .jpeg"
          />
          <div>
            <Image
              src={imageSrc !== "" ? imageSrc : "/images/default.png"}
              width={150}
              height={150}
              alt=""
              className="w-full scale-125"
            />
          </div>
        </div>
        <div className="relative w-full">
          <label
            htmlFor="full_name"
            className="absolute text-sm left-2 -top-[10.5px] bg-white"
          >
            Name of the Employee
          </label>
          <input
            autoComplete="off"
            type="text"
            placeholder="i.e. john doe"
            className="w-full bg-transparent text-sm outline-none border rounded-md border-purple-300 focus:border-[#ab52ff]  p-3"
            onChange={(e) => {
              setSpocData({
                ...spocData,
                name: e.target.value,
              });
            }}
            value={spocData.name}
          />
        </div>
        <div className="relative w-full">
          <label
            htmlFor="full_name"
            className="absolute text-sm left-2 -top-[10.5px] bg-white"
          >
            Email Address
          </label>
          <input
            autoComplete="off"
            type="email"
            placeholder="johndoe@company.com"
            className="w-full bg-transparent text-sm outline-none border rounded-md border-purple-300 focus:border-[#ab52ff]  p-3"
            onChange={(e) => {
              setSpocData({
                ...spocData,
                email: e.target.value,
              });
            }}
            value={spocData.email}
          />
        </div>
        <div className="relative w-full">
          <label
            htmlFor="full_name"
            className="absolute text-sm left-2 -top-[10.5px] bg-white"
          >
            Mobile Number
          </label>
          <input
            autoComplete="off"
            type="number"
            placeholder="XXXXXXXXXX"
            className="w-full bg-transparent text-sm outline-none border rounded-md border-purple-300 focus:border-[#ab52ff]  p-3"
            onChange={(e) => {
              setSpocData({
                ...spocData,
                mobile: e.target.value,
              });
            }}
            value={spocData.mobile}
          />
        </div>
        <div className="relative w-full">
          <label
            htmlFor="full_name"
            className="absolute text-sm left-2 -top-[10.5px] bg-white"
          >
            Employee ID
          </label>
          <input
            autoComplete="off"
            type="text"
            placeholder="***********"
            className="w-full bg-transparent text-sm outline-none border rounded-md border-purple-300 focus:border-[#ab52ff]  p-3"
            onChange={(e) => {
              setSpocData({
                ...spocData,
                empId: e.target.value,
              });
            }}
            value={spocData.empId}
          />
        </div>

        <div className="relative w-full text-center">
          <button
            onClick={() => {
              setCollegeData({ ...collegeData, spoc: spocData });
              setPopup(false);
            }}
            className="p-3 mb-3 hover:bg-purple-800 transition-all rounded-md bg-purple-600 text-white w-full"
          >
            Add
          </button>
          <button
            onClick={() => {
              setPopup(false);
            }}
            className="underline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
