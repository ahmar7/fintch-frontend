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
  const [isEmail, setisEmail] = useState(true);
  const [isCode, setisCode] = useState(false);
  const [isDoc, setIsDoc] = useState(false);
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
                      <svg
                        width={224}
                        height={24}
                        viewBox="0 0 224 24"
                        fill="none"
                        className="Header__BlockchainLogo-ra9ecu-7  "
                      >
                        <g clipPath="url(#a)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M139.92 3.879a2.028 2.028 0 0 1 1.163-1.954 2.026 2.026 0 1 1 .862 3.859 1.968 1.968 0 0 1-1.853-1.158 1.969 1.969 0 0 1-.172-.747zm.15 3.645h3.735v13.5h-3.735v-13.5zm-99.87-4.5H33v18h7.71c4.035 0 6.195-2.115 6.195-4.98a4.17 4.17 0 0 0-3.96-4.365v-.18a3.84 3.84 0 0 0 3.255-3.87c0-2.685-2.025-4.605-6-4.605zm2.145 5.22c0 1.425-1.215 2.28-2.715 2.28l-2.88.045v-4.5h2.94c1.695 0 2.655.75 2.655 2.175zm.555 7.395c0 1.35-.87 2.235-3 2.235h-3.15v-4.77h3.15a2.626 2.626 0 0 1 3 2.535zm5.85 5.385h3.795l-.06-18H48.75v18zm5.76-6.705c0-4.185 2.55-6.975 6.645-6.975s6.645 2.79 6.645 6.975-2.55 6.96-6.645 6.96-6.645-2.79-6.645-6.96zm9.48-.008c-.002-2.35-.977-4.087-2.82-4.087-1.845 0-2.865 1.74-2.865 4.095 0 2.355.975 4.08 2.865 4.08 1.888 0 2.818-1.736 2.82-4.088zm11.85-6.967c-4.095 0-6.63 2.835-6.63 6.975 0 4.11 2.49 6.96 6.63 6.96 3.555 0 5.82-2.1 6-5.205H78.3a2.4 2.4 0 0 1-2.445 2.25c-1.755 0-2.88-1.545-2.88-4.05s1.14-4.005 2.88-4.005a2.4 2.4 0 0 1 2.445 2.25h3.54c-.12-3.12-2.475-5.175-6-5.175zm7.965-4.32h3.75v9.615h.195l4.335-5.115h4.29l-5.01 5.85 5.265 7.65h-4.38l-3.69-5.445-1.005 1.155v4.29h-3.75v-18zm19.44 4.32c-4.095 0-6.63 2.835-6.63 6.975 0 4.11 2.49 6.96 6.66 6.96 3.57 0 5.82-2.1 6-5.205h-3.525a2.414 2.414 0 0 1-2.46 2.25c-1.755 0-2.88-1.545-2.88-4.05s1.14-4.005 2.88-4.005a2.417 2.417 0 0 1 2.46 2.25h3.495c-.105-3.12-2.475-5.175-6-5.175zm11.715 13.68h-3.735v-18h3.63v6.885h.165a3.985 3.985 0 0 1 4.035-2.565c2.805 0 4.665 1.92 4.665 5.085v8.595h-3.75v-7.935a2.299 2.299 0 0 0-.577-1.882 2.292 2.292 0 0 0-1.823-.743 2.523 2.523 0 0 0-2.485 1.7 2.51 2.51 0 0 0-.125 1.06v7.8zm15.66-7.935c-2.67.255-5.07 1.17-5.07 4.17 0 2.67 1.905 4.02 4.485 4.02a4.141 4.141 0 0 0 3.945-2.13h.105v1.875h3.555v-9.12c0-3.225-2.73-4.575-5.73-4.575-3.24 0-5.355 1.545-5.88 4.005l3.465.285a2.25 2.25 0 0 1 2.4-1.5c1.275 0 1.995.645 1.995 1.755 0 .885-.915.99-3.27 1.215zm3.3 1.605v1.5a2.599 2.599 0 0 1-.891 1.805 2.591 2.591 0 0 1-1.914.625c-1.155 0-1.98-.525-1.98-1.575 0-1.05.87-1.575 2.19-1.755a9.189 9.189 0 0 0 2.595-.6zm12.33 6.33h3.81l-.06-7.8a2.473 2.473 0 0 1 2.55-2.76 2.31 2.31 0 0 1 2.4 2.625v7.935h3.75v-8.595c0-3.15-1.845-5.085-4.665-5.085a4.112 4.112 0 0 0-4.065 2.565h-.15V7.524h-3.57v13.5z"
                            fill="white"
                          />
                          <path
                            opacity=".6"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M199.95 7.524h-3.57l-.015 13.5h3.75v-8.1a2.268 2.268 0 0 1 1.292-2.276 2.26 2.26 0 0 1 .898-.214 1.977 1.977 0 0 1 1.959 1.339c.091.268.124.554.096.836v8.415h3.63v-8.25a2.114 2.114 0 0 1 2.175-2.34 2.01 2.01 0 0 1 2.085 2.25v8.34H216v-9a4.366 4.366 0 0 0-8.25-2.115h-.21a3.57 3.57 0 0 0-3.675-2.565 3.778 3.778 0 0 0-3.75 2.565h-.165V7.524zm-26.25-.18c-4.095 0-6.615 2.835-6.615 6.975 0 4.11 2.475 6.96 6.69 6.96 3.57 0 5.835-2.1 6-5.205h-3.525a2.414 2.414 0 0 1-2.46 2.25c-1.74 0-2.88-1.545-2.88-4.05s1.14-4.005 2.88-4.005a2.417 2.417 0 0 1 2.46 2.25h3.45c-.105-3.12-2.475-5.175-6-5.175zm-11.83 10.315a2.102 2.102 0 0 0 1.48 3.59 2.1 2.1 0 1 0-1.48-3.59zm19.27-3.34c0-4.185 2.55-6.975 6.645-6.975s6.63 2.79 6.63 6.975-2.535 6.96-6.63 6.96-6.645-2.79-6.645-6.96zm9.48-.007c-.002-2.352-.977-4.088-2.82-4.088-1.845 0-2.865 1.74-2.865 4.095 0 2.355.975 4.08 2.865 4.08 1.888 0 2.818-1.736 2.82-4.087z"
                            fill="white"
                          />
                          <path
                            d="M2.054 8.722.959 9.817a3.12 3.12 0 0 0 0 4.5l8.821 8.909c.21.214.452.391.72.525V12.952l-8.446-4.23z"
                            fill="#3D89F5"
                          />
                          <path
                            d="m21.947 8.722 1.095 1.095a3.12 3.12 0 0 1 0 4.5l-8.822 8.909c-.21.214-.452.391-.72.525V12.952l8.447-4.23z"
                            fill="#1656B9"
                          />
                          <path
                            d="M19.828 6.487 14.308.952a3.134 3.134 0 0 0-4.5 0L4.273 6.487l7.755 3.87 7.8-3.87z"
                            fill="#85B5F8"
                          />
                        </g>
                      </svg>
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
