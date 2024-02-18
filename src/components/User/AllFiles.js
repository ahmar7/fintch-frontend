import React, { useEffect, useState } from "react";
import SideBar from "../../layout/UserSidebar/SideBar";
import Log from "../../assets/img/log.jpg";
import { getAllDataApi } from "../../Api/Service";
import {
  FileCard,
  FullScreen,
  ImagePreview,
  VideoPreview,
} from "@files-ui/react";
import { toast } from "react-toastify";
import { useAuthUser } from "react-auth-kit";
import { useNavigate, Link, NavLink } from "react-router-dom";
import UserHeader from "./UserHeader";
import axios from "axios";
const Allfiles = () => {
  const [Active, setActive] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [allFiles, setallFiles] = useState([]);
  const [imgSrc, setImgSrc] = React.useState(undefined);

  const handleSee = (imageSource) => {
    setImgSrc(imageSource);
  };
  const handleDownload = async (sinlgeFile) => {
    // Replace 'your-file-url' with the actual URL of your file
    const fileUrl = sinlgeFile.url;

    // Fetch the file content
    const response = await fetch(fileUrl);
    const fileContent = await response.blob();

    // Create a Blob with the desired content type (e.g., 'application/pdf')
    const blob = new Blob([fileContent], { type: sinlgeFile.type });

    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);

    // Set the download attribute with the desired file name (including extension)
    downloadLink.download = sinlgeFile.public_id;

    // Append the link to the body
    document.body.appendChild(downloadLink);

    // Trigger the click event to start the download
    downloadLink.click();

    // Remove the link from the body after download is initiated
    document.body.removeChild(downloadLink);
  };
  let toggleBar = () => {
    if (Active === true) {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  const authUser = useAuthUser();
  const Navigate = useNavigate();
  const getsignUser = async () => {
    try {
      const uploadFiles = await getAllDataApi(authUser().user._id);
      console.log("authUser().user.id: ", authUser().user._id);

      if (uploadFiles.success) {
        if (uploadFiles.allFiles && uploadFiles.allFiles.files) {
          setallFiles(uploadFiles.allFiles.files);
        } else {
          setallFiles(null);
        }
      } else {
        toast.error(uploadFiles.msg);
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error(error?.data?.msg || error?.message || "Something went wrong");
    } finally {
      setisLoading(false);
    }
  };
  //

  //

  useEffect(() => {
    getsignUser();
    if (authUser().user.role === "user") {
      return;
    } else if (authUser().user.role === "admin") {
      Navigate("/admin/dashboard");
      return;
    }
  }, []);

  return (
    <div className="dark user-bg">
      <div>
        <div className="pb-20">
          <SideBar state={Active} toggle={toggleBar} />{" "}
          <button
            onClick={toggleBar}
            type="button"
            className="flex for-mbl h-10 w-10 items-center justify-center mb- -ms-3 abspain"
          >
            <div className="relative h-5 w-5">
              <span className="bg-primary-500 absolute block h-0.5 w-full transition-all duration-300 top-0.5 top-0.5" />
              <span className="bg-primary-500 absolute top-1/2 block h-0.5 w-full max-w-[50%] transition-all duration-300" />
              <span className="bg-primary-500 absolute block h-0.5 w-full transition-all duration-300 bottom-0 bottom-0" />
            </div>
          </button>
          <div className=" relative min-h-screen w-full fall overflow-x-hidden pe-4 transition-all duration-300 xl:px-10 lg:max-w-[calc(100%_-_250px)] lg:ms-[250px]">
            <div className="mx-auto w-full max-w-7xl">
              {isLoading ? (
                <div className="mx-auto loading-pg w-full text-center max-w-xs">
                  <div className="mx-auto max-w-xs">
                    <svg
                      data-v-cd102a71
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      className="icon h-12 w-12 text-primary-500"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                        opacity=".25"
                      />
                      <path
                        fill="currentColor"
                        d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"
                      >
                        <animateTransform
                          attributeName="transform"
                          dur="0.75s"
                          repeatCount="indefinite"
                          type="rotate"
                          values="0 12 12;360 12 12"
                        />
                      </path>
                    </svg>
                  </div>
                  <div className="mx-auto max-w-sm">
                    <h4 className="font-heading text-xl font-medium leading-normal leading-normal text-muted-800 mb-1 mt-4 dark:text-white">
                      Loading files...
                    </h4>
                    <p className="text-muted-400 font-sans text-sm">
                      Please wait while we load the file.
                    </p>
                  </div>
                </div>
              ) : allFiles === null || !allFiles ? (
                <div className="mx-auto loading-pg w-full text-center max-w-xs">
                  <div className="mx-auto max-w-sm ">
                    <h4 className="font-heading text-xl font-medium leading-normal leading-normal text-muted-800 mb-1 mt-4 dark:text-white">
                      No documents found!
                    </h4>
                  </div>
                </div>
              ) : (
                <div className=" ptbg relative w-full    transition-all duration-300 ">
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <p
                        className="font-heading text-white  text-sm font-medium leading-normal leading-normal uppercase tracking-wider"
                        tag="h2"
                      >
                        documents
                      </p>
                    </div>
                  </div>
                  <div className="pt-6">
                    <div className="line-bgb topb3 relative w-full border bg-white transition-all duration-300 relative px-2 py-6 sm:py-4 top-px first:rounded-t-lg [&:not(:first-child)]:border-t-0">
                      <div className="flex  flex-col justify-between sm:flex-row sm:items-center">
                        <div className="image-row-container">
                          {allFiles &&
                            allFiles
                              .slice()
                              .reverse()
                              .map((sinlgeFile, index) => (
                                <div key={index} className="image-row">
                                  <FileCard
                                    id={index}
                                    name={sinlgeFile.name}
                                    type={sinlgeFile.type}
                                    info
                                    downloadUrl={sinlgeFile.url}
                                    onDownload={() =>
                                      handleDownload(sinlgeFile)
                                    }
                                    darkMode
                                    imageUrl={sinlgeFile.url}
                                    onSee={
                                      sinlgeFile.type.startsWith("image")
                                        ? handleSee
                                        : undefined
                                    }
                                    size={sinlgeFile.size}
                                  />
                                </div>
                              ))}
                        </div>
                      </div>
                    </div>
                    {/*  */}
                  </div>
                </div>
              )}
              {/**/}
            </div>
          </div>
        </div>
      </div>
      <FullScreen
        open={imgSrc !== undefined}
        onClose={() => setImgSrc(undefined)}
      >
        <ImagePreview src={imgSrc} />
      </FullScreen>
    </div>
  );
};

export default Allfiles;
