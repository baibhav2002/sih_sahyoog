import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { getCookie } from "cookies-next";
import {
  AiOutlineClose,
  AiOutlineCloudUpload,
  AiOutlineLink,
} from "react-icons/ai";
import { IoMdCloseCircle } from "react-icons/io";
import toast from "react-hot-toast";
import { ImSpinner } from "react-icons/im";

const Editor = ({
  editorToggler,
  setEditorToggler,
  pdfPreviewerToggler,
  setPdfPreviewerToggler,
  pdfSrc,
  setPdfSrc,
}) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [urls, setUrls] = useState("");
  const [users, setUsers] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [contributors, setContributors] = useState([]);

  const [authorSearch, setAuthorSearch] = useState("");
  const [contributorSearch, setContributorSearch] = useState("");

  const [imageSrc, setImageSrc] = useState("");
  const [isPersonal, setIsPersonal] = useState(true);
  const [loading, setLoading] = useState(false);

  const pdfRef = useRef(null);
  const openBrowsePDF = async () => {
    await pdfRef.current.click();
  };

  function previewPDF(event) {
    var input = event.target;
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        setPdfSrc(e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
      setPdfPreviewerToggler(true);
    }
  }

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
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  const getUsers = async (e) => {
    await fetch(`${process.env.NEXT_PUBLIC_HOST_SERVER}/api/students`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUsers(data);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getUsers();
  }, []);

  const token = getCookie("sambandh_token");
  const [isStudent, setIsStudent] = useState(false);
  const [isCollege, setIsCollege] = useState(false);
  useEffect(() => {
    const data = JSON.parse(
      decodeURI(
        getCookie("sambandh_institute_data") ||
          getCookie("sambandh_student_data") ||
          "{}"
      )
    );
    const role = data?.roles?.[0] || "";
    if (role === "ROLE_STUDENT") {
      setIsStudent(true);
    } else if (role === "ROLE_INSTITUTE") {
      setIsCollege(true);
    }
  }, []);

  const createPost = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (
        title === "" ||
        description === "" ||
        urls === "" ||
        authors === "" ||
        imageSrc === "" ||
        pdfSrc === ""
      ) {
        alert("Please fill all the fields");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_SERVER}/api/institute/project/create-project`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify({
            topic: title,
            title,
            description,
            links: [
              {
                source: urls,
              },
            ],
            authors,
            contributors,
            category: searchTerm,
            image: imageSrc,
            projectFile: pdfSrc,
          }),
        }
      );
      const data = await response.json();
      // console.log(response, data);

      if (response.status === 200) {
        window.location.href = `/feeds/${data.id}`;
        toast.success(data.message);
        return;
      }
      toast(data.message, {
        icon: "⚠️",
      });
    } catch (error) {
      console.log("login page error:", error);
    } finally {
      setLoading(false);
    }
  };
  const createPostStudent = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (
        title === "" ||
        description === "" ||
        urls === "" ||
        authors === "" ||
        imageSrc === "" ||
        pdfSrc === ""
      ) {
        alert("Please fill all the fields");
        return;
      }
      //api/student/project/create-project
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_SERVER}/api/student/project/create-project`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify({
            topic: title,
            title: title,
            description: description,
            links: [
              {
                source: urls,
              },
            ],
            authors: authors,
            contributors: contributors,
            category: searchTerm,
            image: imageSrc,
            projectFile: pdfSrc,
            personal: isPersonal,
          }),
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        window.location.href = `/feeds/${data.id}`;
        toast.success(data.message);
        return;
      }
      toast(data.message, {
        icon: "⚠️",
      });
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };
  // console.log(isPersonal);

  return (
    <div
      className={
        editorToggler
          ? "w-full transition-all duration-300 right-0 top-0 md:w-[500px] bg-purple-50 shadow-md border-r h-screen fixed overflow-hidden z-[999]"
          : "w-0 transition-all duration-300 right-0 top-0 md:w-[0px] bg-purple-50 shadow-md border-r h-screen fixed overflow-hidden z-[999]"
      }
    >
      <div className="w-full flex items-center justify-between p-5 ">
        <p className="text-2xl font-[700]">Create A Post</p>
        <button
          onClick={() => {
            setEditorToggler(false);
            setPdfPreviewerToggler(false);
          }}
          className="p-1"
        >
          <AiOutlineClose size={30} />
        </button>
      </div>
      <div className="w-full space-y-4 p-5 h-[90vh] overflow-y-auto overflow-x-hidden">
        <input
          ref={imageRef}
          type="file"
          className="bg-transparent hidden"
          name="image"
          id="image"
          onChange={(e) => {
            // console.log(e.target.files[0]);
            previewImage(e);
          }}
          accept=".png, .jpg, .jpeg"
        />
        {imageSrc === "" ? (
          <button
            onClick={(e) => {
              openBrowseImage();
            }}
            className="w-full cursor-pointer border border-purple-200 h-[230px] bg-purple-100 rounded-xl flex items-center justify-center"
          >
            <AiOutlineCloudUpload
              size={100}
              color="pink"
              className="animate-pulse"
            />
          </button>
        ) : (
          <Image
            src={imageSrc}
            width={500}
            height={500}
            className="w-[200px] cursor-pointer rounded-md shadow-md mx-auto"
            alt=""
            onClick={(e) => {
              openBrowseImage();
            }}
          />
        )}
        <input
          type="text"
          className="w-full px-4 py-2 outline-none bg-transparent border-b border-purple-200 focus:border-purple-500"
          placeholder="Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          type="text"
          className="w-full px-4 py-2 h-[15vh] outline-none bg-transparent border-b border-purple-200 focus:border-purple-500"
          placeholder="Desription"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <div className="relative w-full flex items-center">
          <span className="inline-block cursor-pointer p-2 rounded-full hover:bg-purple-200 transition-all duration-300">
            <AiOutlineLink size={20} />
          </span>
          <input
            type="url"
            className="w-full px-4 py-2 outline-none bg-transparent border-b border-purple-200 focus:border-purple-500"
            placeholder="Add external links related to the project"
            inputMode="url"
            onChange={(e) => {
              setUrls(e.target.value);
            }}
          />
        </div>
        <div className="w-full md:block  ">
          <button className="w-[100%] mx-auto relative cursor-default flex group">
            <span className="w-full flex items-center justify-end">
              <input
                type="text"
                placeholder="Choose project category"
                className="rounded-md px-4 py-3 border w-full outline-none focus:border-purple-600"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              {/* <span className="absolute right-1 inline-block cursor-pointer p-2 rounded-full hover:bg-purple-200 transition-all duration-300"></span> */}
            </span>
            <span className=" absolute block -top-[270px] group-focus-within:visible group-focus-within:pointer-events-auto invisible ease-linear pointer-events-none p-5 border shadow-md rounded-md w-full bg-white">
              {filters?.map((filter, index) => {
                return (
                  <span className="block pb-4 " key={index}>
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
                                    : searchTerm.trim() + ":" + option.trim()
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

        {authors?.length > 0 && (
          <div
            id="authors-container"
            className={
              "flex items-center bg-purple-200 rounded-md p-3 flex-wrap w-full gap-1"
            }
          >
            {authors?.map((author, index) => {
              return (
                <div
                  key={index}
                  className="px-3 flex items-center space-x-1 py-1 rounded-md bg-purple-600 text-white"
                >
                  <span>@{author?.name}</span>
                  <span
                    onClick={() => {
                      authors?.splice(index);
                      setAuthors(authors);
                      router.refresh();
                    }}
                    className="text-white text-xl cursor-pointer"
                  >
                    <IoMdCloseCircle />
                  </span>
                </div>
              );
            })}
          </div>
        )}

        <div className="w-full md:block  ">
          <button className="w-[100%] mx-auto relative cursor-default flex group">
            <span className="w-full flex items-center justify-end">
              <input
                type="text"
                placeholder="Authors i.e. @Chinmaya_Sa OR m:1234567899"
                className="rounded-md px-4 py-3 border w-full outline-none focus:border-purple-600"
                value={authorSearch}
                onChange={(e) => {
                  setAuthorSearch(e.target.value);
                }}
              />
              {/* <span className="absolute right-1 inline-block cursor-pointer p-2 rounded-full hover:bg-purple-200 transition-all duration-300"></span> */}
            </span>
            <span className=" absolute z-[999] block top-12 group-focus-within:visible group-focus-within:pointer-events-auto invisible ease-linear pointer-events-none p-2 border shadow-md rounded-md w-full bg-white">
              {users?.map((user, index) => {
                let name = user.name.replace(" ", "_");
                if (
                  user?.name
                    ?.toLowerCase()
                    ?.trim()
                    ?.includes(
                      authorSearch?.replace("@", "")?.toLowerCase()?.trim()
                    ) ||
                  user?.mobile
                    ?.toLowerCase()
                    ?.trim()
                    ?.includes(authorSearch?.toLowerCase()?.trim())
                )
                  return (
                    <span
                      className="py-4 px-3 rounded-md cursor-pointer hover:bg-purple-100 border-b flex items-center justify-between"
                      key={index}
                      onClick={() => {
                        // const authorsContainer =
                        //   document.querySelector("#authors-container");
                        // if (!!!x?.find((item) => item?._id === user?._id)) {
                        //   x.push(user);
                        //   const childNode = document.createElement("div");
                        //   childNode.innerHTML = `<span>user?.name</span>`;
                        //   childNode.className =
                        //     "px-3 py-1 rounded-md bg-purple-600 text-white";
                        //   if (authorsContainer) {
                        //     authorsContainer.appendChild(childNode);
                        //   }
                        // }
                        if (
                          !!!contributors?.find(
                            (item) => item?._id === user?._id
                          ) &&
                          !!!authors?.find((item) => item?._id === user?._id)
                        ) {
                          authors.push(user);
                          setAuthors(authors);
                          router.refresh();
                        }
                      }}
                    >
                      <span>@{user?.name?.replace(" ", "_")}</span>
                      <span>{user?.mobile}</span>
                    </span>
                  );
              })}
            </span>
          </button>
        </div>

        {/* // contributors */}
        {contributors?.length > 0 && (
          <div
            id="contributors-container"
            className={
              "flex items-center bg-purple-200 rounded-md p-3 flex-wrap w-full gap-1"
            }
          >
            {contributors?.map((author, index) => {
              return (
                <div
                  key={index}
                  className="px-3 flex items-center space-x-1 py-1 rounded-md bg-purple-600 text-white"
                >
                  <span>@{author?.name}</span>
                  <span
                    onClick={() => {
                      contributors?.splice(index);
                      setContributors(contributors);
                      router.refresh();
                    }}
                    className="text-white text-xl cursor-pointer"
                  >
                    <IoMdCloseCircle />
                  </span>
                </div>
              );
            })}
          </div>
        )}

        <div className="w-full md:block  ">
          <button className="w-[100%] mx-auto relative cursor-default flex group">
            <span className="w-full flex items-center justify-end">
              <input
                type="text"
                placeholder="Contributors i.e. @Chinmaya_Sa OR m:1234567899"
                className="rounded-md px-4 py-3 border w-full outline-none focus:border-purple-600"
                value={contributorSearch}
                onChange={(e) => {
                  setContributorSearch(e.target.value);
                }}
              />
              {/* <span className="absolute right-1 inline-block cursor-pointer p-2 rounded-full hover:bg-purple-200 transition-all duration-300"></span> */}
            </span>
            <span className=" absolute z-[999] block top-12 group-focus-within:visible group-focus-within:pointer-events-auto invisible ease-linear pointer-events-none p-2 border shadow-md rounded-md w-full bg-white">
              {users?.map((user, index) => {
                if (
                  user?.name
                    ?.toLowerCase()
                    ?.trim()
                    ?.includes(
                      contributorSearch?.replace("@", "")?.toLowerCase()?.trim()
                    ) ||
                  user?.mobile
                    ?.toLowerCase()
                    ?.trim()
                    ?.includes(contributorSearch?.toLowerCase()?.trim())
                )
                  return (
                    <span
                      className="py-4 px-3 rounded-md cursor-pointer hover:bg-purple-100 border-b flex items-center justify-between"
                      key={index}
                      onClick={() => {
                        // const contributorsContainer =
                        //   document.querySelector("#contributors-container");
                        // if (!!!x?.find((item) => item?._id === user?._id)) {
                        //   x.push(user);
                        //   const childNode = document.createElement("div");
                        //   childNode.innerHTML = `<span>user?.name</span>`;
                        //   childNode.className =
                        //     "px-3 py-1 rounded-md bg-purple-600 text-white";
                        //   if (contributorsContainer) {
                        //     contributorsContainer.appendChild(childNode);
                        //   }
                        // }
                        if (
                          !!!contributors?.find(
                            (item) => item?._id === user?._id
                          ) &&
                          !!!authors?.find((item) => item?._id === user?._id)
                        ) {
                          contributors.push(user);
                          setContributors(contributors);
                          router.refresh();
                          setContributorSearch("@");
                        }
                      }}
                    >
                      <span>@{user?.name?.replace(" ", "_")}</span>
                      <span>{user?.mobile}</span>
                    </span>
                  );
              })}
            </span>
          </button>
        </div>

        <button
          onClick={() => {
            openBrowsePDF();
          }}
          className="w-full p-2 cursor-pointer border  border-purple-200 bg-purple-100 rounded-md flex items-center justify-center "
        >
          Upload Project Files i.e. .pdf, .doc, .txt
        </button>
        <input
          ref={pdfRef}
          type="file"
          className="bg-transparent hidden"
          name="image"
          id="image"
          onChange={(e) => {
            previewPDF(e);
          }}
          accept=".pdf, .txt, .doc"
        />
        <div className={"md:hidden h-auto pb-6 space-y-2"}>
          {pdfSrc !== "" && <p>File Preview:</p>}
          <object
            data={pdfSrc || ""}
            width="800"
            height="500"
            className="w-full h-full"
          ></object>
        </div>
        {isStudent && (
          <div className="flex items-center space-x-2 justify-center">
            <input
              type="checkbox"
              className=""
              onChange={(e) => {
                setIsPersonal(!isPersonal);
              }}
              checked={!isPersonal}
            />
            <span>Want to collaborate with your college?</span>
          </div>
        )}
        <div>
          <button
            onClick={(e) => {
              if (isCollege) {
                createPost(e);
              } else if (isStudent) {
                createPostStudent(e);
              }
            }}
            className="p-3 w-full bg-purple-600 hover:bg-purple-800 transition-all text-white rounded-md"
          >
            Create
          </button>
        </div>
      </div>
      <div
        className={
          loading
            ? "absolute z-[9999] flex items-center justify-center top-0 left-0 w-full h-screen bg-[#000b] backdrop-blur-sm transition-all duration-700"
            : "absolute z-[9999] flex items-center justify-center top-0 left-0 w-full h-screen bg-[#000b] backdrop-blur-sm invisible pointer-events-none transition-all duration-700"
        }
      >
        <ImSpinner className="animate-spin" size={60} color="#fff" />
      </div>
    </div>
  );
};

export default Editor;
