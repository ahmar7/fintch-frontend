import logo_300x57_1 from "../../assets/img/Logo.png";
import log from "../../assets/img/log.jpg";
import React, { useEffect, useState } from "react";
import SideBar from "../../layout/UserSidebar/SideBar";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  getCoinsApi,
  getCoinsUserApi,
  getsignUserApi,
  sendEmailCodeApi,
  verifySingleUserApi,
} from "../../Api/Service";
import chartGuy from "../../assets/img/chart-guy.svg";
import { toast } from "react-toastify";
const Kyc = () => {
  let SignOut = useSignOut();
  const authUser = useAuthUser();
  const Navigate = useNavigate();
  const [slide1, setSlide1] = useState();
  const [slide2, setSlide2] = useState();
  const [isLoading, setisLoading] = useState(true);
  const [isDisable, setisDisable] = useState(false);
  const [isDisable2, setisDisable2] = useState(false);
  const [verificationCodeSent, setverificationCodeSent] = useState(false);
  const [dataNew, setdataNew] = useState(false);
  const [newSlider1, setNewSlider1] = useState();
  const [newSlider2, setNewSlider2] = useState();
  const [isUser, setIsUser] = useState(true);
  const [emailValue, setemailValue] = useState("");
  const [optValue, setoptValue] = useState("");
  const [isEmail, setisEmail] = useState(false);
  const [isCode, setisCode] = useState(false);
  const [isDoc, setIsDoc] = useState(true);
  const [randomCode, setRandomCode] = useState(null);

  function generateRandomCode() {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let changeBanner1 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      const fileSize = file.size;

      const maxSize = 3 * 1024 * 1024;

      if (fileSize > maxSize) {
        setNewSlider1("");
        setSlide1(""); // Clear the input field
        toast.error(
          "File size exceeds 3MB limit. Please choose a smaller file."
        );
        return;
      }
      reader.onloadend = () => {
        // reader.result contains the base64 representation of the image
        setNewSlider1(reader.result);
        setSlide1(URL.createObjectURL(file));
      };

      // Read the file as data URL
      reader.readAsDataURL(file);
    } else {
      setNewSlider1("");
      setSlide1("");
    }
  };
  let changeBanner2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      const fileSize = file.size;

      // Limit file size to
      const maxSize = 3 * 1024 * 1024;
      if (fileSize > maxSize) {
        toast.error(
          "File size exceeds 3MB limit. Please choose a smaller file."
        );
        setNewSlider2("");
        setSlide2(""); // Clear the input field
        return;
      }
      reader.onloadend = () => {
        // reader.result contains the base64 representation of the image
        setNewSlider2(reader.result);
        setSlide2(URL.createObjectURL(file));
      };

      // Read the file as data URL
      reader.readAsDataURL(file);
    } else {
      setNewSlider2("");
      setSlide2("");
    }
  };
  const getsignUser = async () => {
    try {
      const formData = new FormData();
      formData.append("id", authUser().user._id);
      const userCoins = await getsignUserApi(formData);

      if (userCoins.success) {
        setIsUser(userCoins.signleUser);
        if (userCoins.signleUser.submitDoc.status === "completed") {
          Navigate("/dashboard");
          return;
        }
        setisLoading(false);
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
  const verifyUser = async () => {
    try {
      if (!newSlider1 || !newSlider2) {
        toast.dismiss();
        toast.info("Please upload both the documents");
        return;
      }
      setisDisable(true);
      const formData = new FormData();
      formData.append("cnic", newSlider1);
      formData.append("id", isUser._id);
      formData.append("bill", newSlider2);

      const updateHeader = await verifySingleUserApi(formData);

      if (updateHeader.success) {
        setIsDoc(false);
        toast.dismiss();
        toast.success(updateHeader.msg);
        setTimeout(() => {
          Navigate("/dashboard");
        }, 100);
      } else {
        toast.dismiss();
        toast.error(updateHeader.msg);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error?.data?.msg || error?.message || "Something went wrong");
    } finally {
      setisDisable(false);
    }
  };
  let sendEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isValidEmail = emailRegex.test(emailValue);
    if (emailValue === "") {
      return toast.error("Please enter your email");
    }
    if (!isValidEmail) {
      return toast.error("Enter email in correct format");
    }

    const newCode = generateRandomCode();
    setRandomCode(newCode);
    try {
      let id = authUser().user._id;
      let body = { email: emailValue, id, code: newCode };

      setisDisable(true);
      const sendEmail = await sendEmailCodeApi(body);
      if (sendEmail.success) {
        toast.dismiss();

        toast.success(sendEmail.msg);
        setisCode(true);
        setisEmail(false);
        setIsDoc(false);
      } else {
        toast.dismiss();
        toast.error(sendEmail.msg);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error?.data?.msg || error?.message || "Something went wrong");
    } finally {
      setisDisable(false);
    }
  };
  let reSend = async () => {
    const newCode = generateRandomCode();
    setRandomCode(newCode);
    try {
      let id = authUser().user._id;
      let body = { email: emailValue, id, code: newCode };

      setisDisable2(true);

      setdataNew(true);
      const sendEmail = await sendEmailCodeApi(body);
      if (sendEmail.success) {
        toast.dismiss();

        setverificationCodeSent(true);
      } else {
        toast.dismiss();
        toast.error(sendEmail.msg);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error?.data?.msg || error?.message || "Something went wrong");
    } finally {
      setisDisable2(false);
    }
  };
  //

  //
  let verifyCode = () => {
    if (optValue === "") {
      return toast.info(
        "Please enter the One-Time Passcode (OTP) that has been sent to your email address."
      );
    }
    setisDisable(true);
    setTimeout(() => {
      if (optValue.toString() === randomCode.toString()) {
        toast.success("Otp verified successfully");
        setisCode(false);
        setisEmail(false);
        setIsDoc(true);
        setisDisable(false);
      } else {
        toast.error("Incorrect  One-Time Passcode (OTP) , please try again ");
        setisDisable(false);
      }
    }, 2000);
  };
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
    <div>
      {!isLoading && (
        <div className="dark user-bg min-h-screen">
          <div>
            <tairosidebarlayout
              toolbar="false"
              sidebar="false"
              className=" min-h-screen w-full"
            >
              <div className="absolute start-0 top-0 h-16 w-full ">
                <div className="relative flex h-16 w-full items-center justify-between px-4">
                  <div className="flex items-center">
                    <a
                      href="#"
                      className="border-muted-200 dark:border-muted-700 flex   items-center justify-center border-r pe-6"
                    >
                      <img src={logo_300x57_1} />
                    </a>
                    <div className="hidden items-center gap-2 ps-6 font-sans sm:flex">
                      <p className="text-muted-500 dark:text-muted-400"> </p>
                      <h2 className="text-muted-800 font-semibold dark:text-white">
                        Kyc Verification
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-4">
                    <div className="group inline-flex items-center justify-center text-right">
                      <div
                        data-headlessui-state
                        className="relative h-10 w-10 text-left"
                      >
                        <button
                          className="group-hover:ring-primary-500 dark:ring-offset-muted-800 inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-transparent transition-all duration-300 group-hover:ring-offset-4"
                          id="headlessui-menu-button-82"
                          aria-haspopup="menu"
                          aria-expanded="false"
                          type="button"
                        >
                          <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-full">
                            <img
                              src={log}
                              className="max-w-full rounded-full object-cover shadow-sm dark:border-transparent"
                              alt=""
                            />
                          </div>
                        </button>
                        {/**/}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 z-10 w-full">
                    <div
                      role="progressbar"
                      aria-valuenow="16.666666666666664"
                      aria-valuemax={100}
                      className="bg-muted-200 dark:bg-muted-700 relative w-full overflow-hidden h-1 rounded-full"
                    >
                      <div
                        className="absolute start-0 top-0 h-full transition-all duration-300 bg-primary-500 rounded-full"
                        style={{
                          width: isEmail
                            ? "0%"
                            : isCode
                            ? "33%"
                            : isDoc
                            ? "66%"
                            : "100%",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pb-32 pt-24">
                <div className="px-4 py-8">
                  <div className="mb-10 text-center">
                    <p
                      className="font-heading text-2xl font-semibold leading-normal leading-normal text-muted-800 dark:text-white"
                      tag="h1"
                    >
                      <span>
                        To complete the KYC process, please follow these steps:
                      </span>
                    </p>
                    <p className="font-alt text-sm font-normal leading-normal leading-normal text-muted-500 dark:text-muted-400">
                      <span>
                        Add an extra layer of security to your account
                      </span>
                    </p>
                  </div>
                  <div className="mx-auto w-full">
                    <div className="w-full text-center">
                      {isEmail && (
                        <div>
                          {" "}
                          <p className="text-muted-400 font-heading text-base font-medium leading-normal leading-normal">
                            Please enter your email address to receive a
                            verification code
                          </p>
                          <div className="group/nui-input w-200 relative">
                            <input
                              id="ninja-input-10"
                              type="email"
                              name="email"
                              value={emailValue}
                              onChange={(e) => setemailValue(e.target.value)}
                              className="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-white font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 px-3 rounded-xl h-12"
                              placeholder="Email address"
                            />
                          </div>
                          <div className="mx-auto mx-auto flex flex-col items-center">
                            <button
                              disabled={isDisable}
                              type="button"
                              onClick={sendEmail}
                              className="text-center btn is-button rounded-xl bg-primary-500 dark:bg-primary-500 hover:enabled:bg-primary-400 dark:hover:enabled:bg-primary-400 text-white hover:enabled:shadow-lg hover:enabled:shadow-primary-500/50 dark:hover:enabled:shadow-primary-800/20 focus-visible:outline-primary-400/70 focus-within:outline-primary-400/70 focus-visible:bg-primary-500 active:enabled:bg-primary-500 dark:focus-visible:outline-primary-400 dark:focus-within:outline-primary-400 dark:focus-visible:bg-primary-500 dark:active:enabled:bg-primary-500 nope wen w-48"
                            >
                              {isDisable ? (
                                <div>
                                  <div className="nui-placeload animate-nui-placeload h-4 w-8 rounded mx-auto"></div>
                                </div>
                              ) : (
                                "Continue"
                              )}
                            </button>

                            {isDisable ? (
                              ""
                            ) : (
                              <div className="mx-auto flex flex-col mt-2 items-center">
                                <Link
                                  to="/dashboard"
                                  data-v-71bb21a6
                                  className="is-button  rounded-xl text-white   hover:enabled:bg-primary-400 dark:hover:enabled:bg-primary-400 dss hover:enabled:shadow-lg hover:enabled:shadow-primary-500/50 dark:hover:enabled:shadow-primary-800/20 focus-visible:outline-primary-400/70 focus-within:outline-primary-400/70 focus-visible:bg-primary-500 active:enabled:bg-primary-500 dark:focus-visible:outline-primary-400 dark:focus-within:outline-primary-400 dark:focus-visible:bg-primary-500 dark:active:enabled:bg-primary-500  wen"
                                >
                                  Skip
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {isCode && (
                        <div>
                          {" "}
                          <p className="text-muted-400 font-heading text-base font-medium leading-normal leading-normal">
                            Please type the code you received to your email
                            address
                          </p>
                          <div className="group/nui-input w-200 relative">
                            <input
                              id="ninja-input-10"
                              type="number"
                              onKeyDown={(e) =>
                                [
                                  "ArrowUp",
                                  "ArrowDown",
                                  "e",
                                  "E",
                                  "+",
                                  "-",
                                  "*",
                                  "",
                                ].includes(e.key) && e.preventDefault()
                              }
                              value={optValue}
                              onChange={(e) => setoptValue(e.target.value)}
                              className="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-white font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 px-3 rounded-xl h-12"
                            />
                          </div>
                          {verificationCodeSent ? null : dataNew ? (
                            <p className="text-muted-400 mt-2 font-heading text-base font-medium leading-normal">
                              Sending...
                            </p>
                          ) : (
                            <p className="text-muted-400 mt-2 font-heading text-base font-medium leading-normal">
                              Didn't receive the verification code?{" "}
                              <span
                                onClick={reSend}
                                className="cursor-pointer text-underline"
                              >
                                Resend code
                              </span>
                            </p>
                          )}
                          {verificationCodeSent ? (
                            <p className="text-muted-400 mt-2 font-heading text-base font-medium leading-normal">
                              Verification code has been sent!
                            </p>
                          ) : (
                            ""
                          )}
                          {isDisable2 ? (
                            ""
                          ) : (
                            <div className="mx-auto mx-auto flex flex-col items-center">
                              <button
                                disabled={isDisable}
                                type="button"
                                onClick={verifyCode}
                                className="text-center btn is-button rounded-xl bg-primary-500 dark:bg-primary-500 hover:enabled:bg-primary-400 dark:hover:enabled:bg-primary-400 text-white hover:enabled:shadow-lg hover:enabled:shadow-primary-500/50 dark:hover:enabled:shadow-primary-800/20 focus-visible:outline-primary-400/70 focus-within:outline-primary-400/70 focus-visible:bg-primary-500 active:enabled:bg-primary-500 dark:focus-visible:outline-primary-400 dark:focus-within:outline-primary-400 dark:focus-visible:bg-primary-500 dark:active:enabled:bg-primary-500 nope wen w-48"
                              >
                                {isDisable ? (
                                  <div>
                                    <div className="nui-placeload animate-nui-placeload h-4 w-8 rounded mx-auto"></div>
                                  </div>
                                ) : (
                                  "Continue"
                                )}
                              </button>

                              {isDisable ? (
                                ""
                              ) : (
                                <div className="mx-auto flex flex-col mt-2 items-center">
                                  <Link
                                    to="/dashboard"
                                    data-v-71bb21a6
                                    className="is-button  rounded-xl text-white   hover:enabled:bg-primary-400 dark:hover:enabled:bg-primary-400 dss hover:enabled:shadow-lg hover:enabled:shadow-primary-500/50 dark:hover:enabled:shadow-primary-800/20 focus-visible:outline-primary-400/70 focus-within:outline-primary-400/70 focus-visible:bg-primary-500 active:enabled:bg-primary-500 dark:focus-visible:outline-primary-400 dark:focus-within:outline-primary-400 dark:focus-visible:bg-primary-500 dark:active:enabled:bg-primary-500  wen"
                                  >
                                    Skip
                                  </Link>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                      {isDoc && (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            verifyUser();
                          }}
                          noValidate
                        >
                          {" "}
                          <div className="w-full">
                            <div className="mx-auto mb-8 grid max-w-4xl gap-6 sm:grid-cols-2">
                              <div className="group/nui-radio-headless relative">
                                <div className="relative">
                                  <div className="line-bg relative w-full border bg-white transition-all duration-300 rounded-xl peer-checked:!border-primary-500 relative border-2 p-8    peer-checked:opacity-100 peer-checked:grayscale-0 peer-checked:[&_.child]:!opacity-100">
                                    <div className="flex flex-col text-center">
                                      <p className="text-muted-400 font-heading text-base font-medium leading-normal leading-normal">
                                        Upload ID
                                      </p>
                                      <p className="font-alt text-xs font-normal leading-snug text-muted-500 dark:text-muted-400">
                                        Please upload a clear image of a valid
                                        government-issued identification
                                        document (e.g., passport, national ID,
                                        or driver's license).
                                      </p>
                                      <p className="font-alt text-xs font-bold mt-2 leading-snug text-white">
                                        *max size should be 3MB
                                      </p>
                                    </div>
                                    <div className="child absolute end-2 top-3 opacity-0">
                                      <svg
                                        data-v-cd102a71
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        aria-hidden="true"
                                        role="img"
                                        className="icon text-primary-500 h-7 w-7"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 256 256"
                                      >
                                        <g fill="currentColor">
                                          <path
                                            d="M224 128a96 96 0 1 1-96-96a96 96 0 0 1 96 96"
                                            opacity=".2"
                                          />
                                          <path d="M173.66 98.34a8 8 0 0 1 0 11.32l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 0M232 128A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88" />
                                        </g>
                                      </svg>
                                    </div>

                                    <img
                                      className="logo-to-show"
                                      src={slide1}
                                      alt=""
                                    />
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={changeBanner1}
                                      className="peer absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
                                    />
                                    <div className="mx-auto mx-auto flex flex-col items-center">
                                      {" "}
                                      <button className="text-center btn is-button rounded-xl bg-primary-500 dark:bg-primary-500 hover:enabled:bg-primary-400 dark:hover:enabled:bg-primary-400 text-white hover:enabled:shadow-lg hover:enabled:shadow-primary-500/50 dark:hover:enabled:shadow-primary-800/20 focus-visible:outline-primary-400/70 focus-within:outline-primary-400/70 focus-visible:bg-primary-500 active:enabled:bg-primary-500 dark:focus-visible:outline-primary-400 dark:focus-within:outline-primary-400 dark:focus-visible:bg-primary-500 dark:active:enabled:bg-primary-500 nope w-48">
                                        Upload
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="group/nui-radio-headless relative">
                                <div className="relative">
                                  <input
                                    onChange={changeBanner2}
                                    type="file"
                                    accept="image/*"
                                    className="peer absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
                                  />
                                  <div className="line-bg relative w-full border bg-white transition-all duration-300 rounded-xl peer-checked:!border-primary-500 relative border-2 p-8    peer-checked:opacity-100 peer-checked: -0 peer-checked:[&_.child]:!opacity-100">
                                    <div className="flex flex-col text-center">
                                      <p className="dark:text-muted-400 font-heading text-base font-medium leading-normal leading-normal">
                                        Upload Utility Bill
                                      </p>
                                      <p className="font-alt text-xs font-normal leading-snug text-muted-500 dark:text-muted-400">
                                        Please upload a clear image of a recent
                                        utility bill (e.g., electricity, water,
                                        or gas bill) in your name.
                                      </p>
                                      <p className=" text-white font-bold text-xs font-normal leading-snug mt-2">
                                        *max size should be 3MB
                                      </p>
                                    </div>
                                    <div className="child absolute end-2 top-3 opacity-0">
                                      <svg
                                        data-v-cd102a71
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        aria-hidden="true"
                                        role="img"
                                        className="icon text-primary-500 h-7 w-7"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 256 256"
                                      >
                                        <g fill="currentColor">
                                          <path
                                            d="M224 128a96 96 0 1 1-96-96a96 96 0 0 1 96 96"
                                            opacity=".2"
                                          />
                                          <path d="M173.66 98.34a8 8 0 0 1 0 11.32l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 0M232 128A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88" />
                                        </g>
                                      </svg>
                                    </div>
                                    <img
                                      className="logo-to-show2"
                                      src={slide2}
                                      alt=""
                                    />
                                    <div className="mx-auto mx-auto flex flex-col items-center">
                                      {" "}
                                      <button className="text-center  btn is-button rounded-xl bg-primary-500 dark:bg-primary-500 hover:enabled:bg-primary-400 dark:hover:enabled:bg-primary-400 text-white hover:enabled:shadow-lg hover:enabled:shadow-primary-500/50 dark:hover:enabled:shadow-primary-800/20 focus-visible:outline-primary-400/70 focus-within:outline-primary-400/70 focus-visible:bg-primary-500 active:enabled:bg-primary-500 dark:focus-visible:outline-primary-400 dark:focus-within:outline-primary-400 dark:focus-visible:bg-primary-500 dark:active:enabled:bg-primary-500 nope w-48">
                                        Upload
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="mx-auto flex flex-col items-center">
                              <button
                                data-v-71bb21a6
                                className="is-button rounded-xl bg-primary-500 dark:bg-primary-500 hover:enabled:bg-primary-400 dark:hover:enabled:bg-primary-400 text-white hover:enabled:shadow-lg hover:enabled:shadow-primary-500/50 dark:hover:enabled:shadow-primary-800/20 focus-visible:outline-primary-400/70 focus-within:outline-primary-400/70 focus-visible:bg-primary-500 active:enabled:bg-primary-500 dark:focus-visible:outline-primary-400 dark:focus-within:outline-primary-400 dark:focus-visible:bg-primary-500 dark:active:enabled:bg-primary-500 !h-12 w-48"
                                disabled={isDisable}
                              >
                                {isDisable ? (
                                  <div>
                                    <div className="nui-placeload animate-nui-placeload h-4 w-8 rounded mx-auto"></div>
                                  </div>
                                ) : (
                                  "Continue"
                                )}
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <prompt
                when={true}
                message="Are you sure you want to leave? You need to restart the process of KYC after."
              />
            </tairosidebarlayout>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kyc;
