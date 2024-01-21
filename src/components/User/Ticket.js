import React, { useEffect, useState } from "react";
import SideBar from "../../layout/UserSidebar/SideBar";
import Log from "../../assets/img/log.jpg";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { getsignUserApi, sendTicketApi } from "../../Api/Service";
import { toast } from "react-toastify";
import UserHeader from "./UserHeader";
const Ticket = () => {
  const [Active, setActive] = useState(false);
  let toggleBar = () => {
    if (Active === true) {
      setActive(false);
    } else {
      setActive(true);
    }
  };
  //

  let authUser = useAuthUser();
  let Navigate = useNavigate();

  const [isUser, setIsUser] = useState({});
  const [isTicket, setisTicket] = useState(false);
  const [isDisable, setisDisable] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const getsignUser = async () => {
    try {
      const formData = new FormData();
      formData.append("id", authUser().user._id);
      const userCoins = await getsignUserApi(formData);

      if (userCoins.success) {
        setIsUser(userCoins.signleUser);

        return;
      } else {
        toast.dismiss();
        toast.error(userCoins.msg);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error);
    } finally {
    }
  };
  const sendTicket = async (e) => {
    try {
      setisDisable(true);
      let body = {
        id: authUser().user._id,
        title: title,
        description: description,
      };
      if (!title || !description) {
        toast.dismiss();
        toast.error("Both the fields are required");
        return;
      }
      const userCoins = await sendTicketApi(body);

      if (userCoins.success) {
        setisTicket(true);
        return;
      } else {
        toast.dismiss();
        toast.error(userCoins.msg);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error);
    } finally {
      setisDisable(false);
    }
  };

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
    <div className="dark">
      <div>
        <div className="bg-muted-100 dark:bg-muted-900 pb-20">
          <SideBar state={Active} toggle={toggleBar} />
          <div className="bg-muted-100 dark:bg-muted-900 relative min-h-screen w-full overflow-x-hidden px-4 transition-all duration-300 xl:px-10 lg:max-w-[calc(100%_-_280px)] lg:ms-[280px]">
            <div className="mx-auto w-full max-w-7xl">
              {/* <UserHeader /> */}
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
              <div
                className="nuxt-loading-indicator"
                style={{
                  position: "fixed",
                  top: "0px",
                  right: "0px",
                  left: "0px",
                  pointerEvents: "none",
                  width: "auto",
                  height: "3px",
                  opacity: 0,
                  background: "var(--color-primary-500)",
                  transform: "scaleX(0)",
                  transformOrigin: "left center",
                  transition:
                    "transform 0.1s ease 0s, height 0.4s ease 0s, opacity 0.4s ease 0s",
                  zIndex: 999999,
                }}
              ></div>
              <seokit />
              <form className="relative py-3 sm:mx-auto sm:max-w-xl">
                <div className="border-muted-200 dark:border-muted-700 dark:bg-muted-800 relative w-full border bg-white transition-all duration-300 rounded-xl relative px-4 py-10 sm:p-10 md:mx-0">
                  {isTicket ? (
                    <p className="text-white">
                      Your ticket was sent. You will be answered by one of our
                      representatives.
                    </p>
                  ) : (
                    <div className="mx-auto max-w-md">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary-500/20 text-primary-500 flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-sans text-2xl">
                          <svg
                            data-v-cd102a71
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            aria-hidden="true"
                            role="img"
                            className="icon"
                            width="1em"
                            height="1em"
                            viewBox="0 0 256 256"
                          >
                            <g fill="currentColor">
                              <path
                                d="M224 128a96 96 0 0 1-144.07 83.11l-37.39 12.47a8 8 0 0 1-10.12-10.12l12.47-37.39A96 96 0 1 1 224 128"
                                opacity=".2"
                              />
                              <path d="M128 24a104 104 0 0 0-91.82 152.88l-11.35 34.05a16 16 0 0 0 20.24 20.24l34.05-11.35A104 104 0 1 0 128 24m0 192a87.87 87.87 0 0 1-44.06-11.81a8 8 0 0 0-6.54-.67L40 216l12.47-37.4a8 8 0 0 0-.66-6.54A88 88 0 1 1 128 216"></path>
                            </g>
                          </svg>
                        </div>
                        <div className="block text-xl font-semibold text-gray-700 dark:text-gray-200">
                          <h3 className="font-heading text-lg font-medium leading-normal leading-normal">
                            Create New Ticket
                          </h3>
                          <p className="font-sans text-sm font-normal leading-normal leading-normal text-muted-400">
                            Fill in the form below to create a new ticket
                          </p>
                        </div>
                      </div>
                      <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        <div className="grid grid-cols-12 gap-4 py-8">
                          <div className="col-span-12">
                            <div className="relative">
                              <label
                                className="nui-label w-full pb-1 text-[0.825rem]"
                                htmlFor="ninja-input-5"
                              >
                                Ticket title
                              </label>
                              <div className="group/nui-input relative">
                                <input
                                  id="ninja-input-5"
                                  type="text"
                                  name="title"
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
                                  className="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-white font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 pe-4 ps-9 rounded-xl !h-11 !ps-11"
                                  placeholder="Example: I can't buy BTC with my credit card"
                                />
                                {/**/}
                                {/**/}
                                <div className="text-muted-400 group-focus-within/nui-input:text-primary-500 absolute start-0 top-0 flex items-center justify-center transition-colors duration-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-75 h-10 w-10 !h-11 !w-11">
                                  <svg
                                    data-v-cd102a71
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    aria-hidden="true"
                                    role="img"
                                    className="icon h-[1.15rem] w-[1.15rem]"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 256 256"
                                  >
                                    <g fill="currentColor">
                                      <path
                                        d="M224 128a96 96 0 0 1-144.07 83.11l-37.39 12.47a8 8 0 0 1-10.12-10.12l12.47-37.39A96 96 0 1 1 224 128"
                                        opacity=".2"
                                      />
                                      <path d="M128 24a104 104 0 0 0-91.82 152.88l-11.35 34.05a16 16 0 0 0 20.24 20.24l34.05-11.35A104 104 0 1 0 128 24m0 192a87.87 87.87 0 0 1-44.06-11.81a8 8 0 0 0-6.54-.67L40 216l12.47-37.4a8 8 0 0 0-.66-6.54A88 88 0 1 1 128 216"></path>
                                    </g>
                                  </svg>
                                </div>
                                {/**/}
                              </div>
                            </div>
                          </div>
                          <div className="col-span-12">
                            <div className="relative">
                              <label
                                htmlFor="ninja-input-6"
                                className="nui-label pb-1 text-[0.825rem]"
                              >
                                Long description
                              </label>
                              <div className="group/nui-textarea relative flex flex-col">
                                <textarea
                                  id="ninja-input-6"
                                  className="nui-focus border-muted-300 placeholder:text-muted-300 focus:border-muted-300 focus:shadow-muted-300/50 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 dark:focus:shadow-muted-800/50 peer w-full border bg-white font-sans transition-all duration-300 focus:shadow-lg disabled:cursor-not-allowed disabled:opacity-75 min-h-[2.5rem] text-sm leading-[1.6] rounded-xl resize-none p-2"
                                  placeholder="Example: I'm trying to buy BTC with my credit card but I'm getting an error message saying that my card is not supported. I've tried with 2 different cards and I'm getting the same error. Can you please help me?"
                                  rows={5}
                                  name="description"
                                  value={description}
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                  defaultValue={""}
                                />
                                {/**/}
                                {/**/}
                                {/**/}
                                {/**/}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 pt-4">
                          <button
                            onClick={sendTicket}
                            disabled={isDisable}
                            data-v-71bb21a6
                            type="button"
                            className="is-button rounded-xl bg-primary-500 dark:bg-primary-500 hover:enabled:bg-primary-400 dark:hover:enabled:bg-primary-400 text-white hover:enabled:shadow-lg hover:enabled:shadow-primary-500/50 dark:hover:enabled:shadow-primary-800/20 focus-visible:outline-primary-400/70 focus-within:outline-primary-400/70 focus-visible:bg-primary-500 active:enabled:bg-primary-500 dark:focus-visible:outline-primary-400 dark:focus-within:outline-primary-400 dark:focus-visible:bg-primary-500 dark:active:enabled:bg-primary-500 !h-12 w-full"
                          >
                            {isDisable ? (
                              <div>
                                <div className="nui-placeload animate-nui-placeload h-4 w-8 rounded mx-auto"></div>
                              </div>
                            ) : (
                              "Create"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </form>
              {/**/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
