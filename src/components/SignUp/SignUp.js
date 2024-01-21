import React, { useEffect, useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { loginApi, registerApi } from "../../Api/Service";

import MobileApp from "../../assets/img/app-fold-phone.png";
import { useSignIn, useIsAuthenticated, useAuthUser } from "react-auth-kit";

const SignUp = () => {
  const [isloading, setisloading] = useState(false);
  const [verifyP, setverifyP] = useState(false);
  const [chkbx, setchkbx] = useState(false);
  const [msg, setMsg] = useState("");
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const navigate = useNavigate();
  const [type2, settype2] = useState("password");
  const [type1, settype1] = useState("password");

  const handleTogglePassword = () => {
    type1 === "password"
      ? settype1("text")
      : type1 === "text"
      ? settype1("password")
      : settype1("password");
  };
  const handleTogglePassword1 = () => {
    type2 === "password"
      ? settype2("text")
      : type2 === "text"
      ? settype2("password")
      : settype2("password");
  };
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    note: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    cpassword: "",
  });
  let handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUserData({ ...userData, [name]: value });

    if (userData.password.length > 6) {
      setverifyP(true);
    } else if (userData.password.length < 8) {
      setverifyP(false);
    }
  };
  let toggleagree = (e) => {
    if (e.target.checked === true) {
      setchkbx(true);
    } else if (e.target.checked === false) {
      setchkbx(false);
    }
  };

  const Register = async (e) => {
    e.preventDefault();

    setisloading(true);
    try {
      if (
        !chkbx ||
        !userData.firstName ||
        !userData.lastName ||
        !userData.email ||
        !userData.password ||
        !userData.phone ||
        !userData.address ||
        !userData.city ||
        !userData.country ||
        !userData.postalCode ||
        !userData.cpassword
      ) {
        toast.dismiss();
        toast.error("All the fields are required");
        return;
      }
      if (userData.password != userData.cpassword) {
        toast.dismiss();
        toast.error("Password and confirm password doesn't match");
        return;
      }
      let data = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        address: userData.address,
        city: userData.city,
        country: userData.country,
        postalCode: userData.postalCode,
      };

      const updateHeader = await registerApi(data);

      if (updateHeader.success) {
        toast.dismiss();
        toast.info(updateHeader.msg);
        navigate("/auth/login");
      } else {
        toast.dismiss();
        toast.error(updateHeader.msg);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error?.data?.msg || error?.message || "Something went wrong");
    } finally {
      setisloading(false);
    }
  };
  useEffect(() => {
    if (isAuthenticated() && authUser().user.role === "user") {
      navigate("/dashboard");
      return;
    } else if (isAuthenticated() && authUser().user.role === "admin") {
      navigate("/admin/dashboard");
    }
  }, []);
  return (
    <div id="__nuxt" className="dark">
      <div>
        <div>
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
          <div className="dark:bg-muted-800 flex min-h-screen bg-white">
            <div className="user-bg   relative hidden w-0 flex-1 items-center justify-center lg:flex lg:w-50">
              <div className="mx-auto w-full h-full flex items-center justify-center max-w-4xl">
                <img className="max-w-xl " src={MobileApp} alt="" width="400" />
              </div>
            </div>
            <div className="relative  user-bg flex flex-1 flex-col justify-center px-6 py-12 lg:w-50 lg:flex-none">
              <div className=" relative mb:mx-auto w-full max-w-sm ">
                <div className="flex w-full items-center justify-between">
                  <NavLink
                    to="/"
                    className="text-muted-400 hover:text-primary-500 flex items-center gap-2 font-sans font-medium transition-colors duration-300"
                  >
                    <svg
                      data-v-cd102a71
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      className="icon h-5 w-5"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m1.027 11.993l4.235 4.25L6.68 14.83l-1.821-1.828L22.974 13v-2l-18.12.002L6.69 9.174L5.277 7.757z"
                      ></path>
                    </svg>
                    <span>Back to Home</span>
                  </NavLink>
                </div>
                <div>
                  <h2 className="text-muted-400 font-heading txts font-medium mt-6">
                    {" "}
                    Create Your Blockchain.com Account
                  </h2>
                  <p className="font-alt text-sm font-normal leading-normal leading-normal text-muted-400 mb-6">
                    Get Started For Free by Signing Up Now.
                  </p>
                </div>
                <div className="mt-6">
                  <div className="mt-5">
                    <form method="POST" action className="mt-6" noValidate>
                      <div className="space-y-4">
                        <div className="relative">
                          <label
                            className="nui-label w-full pb-1 text-[0.825rem]"
                            htmlFor="ninja-input-12"
                          >
                            First Name
                          </label>
                          <div className="group/nui-input relative">
                            <input
                              id="ninja-input-12"
                              onChange={handleInput}
                              value={userData.firstName}
                              name="firstName"
                              className="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-white font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 pe-4 ps-9 rounded-xl"
                              placeholder="Ex: John "
                            />
                            {/**/}
                            {/**/}
                            <div className="text-muted-400 group-focus-within/nui-input:text-primary-500 absolute start-0 top-0 flex items-center justify-center transition-colors duration-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-75 h-10 w-10">
                              <svg
                                data-v-cd102a71
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                aria-hidden="true"
                                role="img"
                                className="icon h-[1.15rem] w-[1.15rem]"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="currentColor"
                                  d="M5.85 17.1q1.275-.975 2.85-1.537T12 15q1.725 0 3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4Q8.675 4 6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5q0-1.475 1.013-2.488T12 6q1.475 0 2.488 1.013T15.5 9.5q0 1.475-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"
                                ></path>
                              </svg>
                            </div>
                            {/**/}
                          </div>
                        </div>
                        <div className="relative">
                          <label
                            className="nui-label w-full pb-1 text-[0.825rem]"
                            htmlFor="ninja-input-12"
                          >
                            Last Name
                          </label>
                          <div className="group/nui-input relative">
                            <input
                              id="ninja-input-12"
                              onChange={handleInput}
                              value={userData.lastName}
                              name="lastName"
                              className="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-white font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 pe-4 ps-9 rounded-xl"
                              placeholder="Ex: Doe"
                            />
                            {/**/}
                            {/**/}
                            <div className="text-muted-400 group-focus-within/nui-input:text-primary-500 absolute start-0 top-0 flex items-center justify-center transition-colors duration-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-75 h-10 w-10">
                              <svg
                                data-v-cd102a71
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                aria-hidden="true"
                                role="img"
                                className="icon h-[1.15rem] w-[1.15rem]"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="currentColor"
                                  d="M5.85 17.1q1.275-.975 2.85-1.537T12 15q1.725 0 3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4Q8.675 4 6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5q0-1.475 1.013-2.488T12 6q1.475 0 2.488 1.013T15.5 9.5q0 1.475-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"
                                ></path>
                              </svg>
                            </div>
                            {/**/}
                          </div>
                        </div>
                        <div className="relative">
                          <label
                            className="nui-label w-full pb-1 text-[0.825rem]"
                            htmlFor="ninja-input-14"
                          >
                            Email address
                          </label>
                          <div className="group/nui-input relative">
                            <input
                              id="ninja-input-14"
                              type="email"
                              onChange={handleInput}
                              value={userData.email}
                              name="email"
                              className="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-white font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 pe-4 ps-9 rounded-xl"
                              placeholder="Ex: johndoe@company.com"
                            />
                            {/**/}
                            {/**/}
                            <div className="text-muted-400 group-focus-within/nui-input:text-primary-500 absolute start-0 top-0 flex items-center justify-center transition-colors duration-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-75 h-10 w-10">
                              <svg
                                data-v-cd102a71
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                aria-hidden="true"
                                role="img"
                                className="icon h-[1.15rem] w-[1.15rem]"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="currentColor"
                                  d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12v1.45q0 1.475-1.012 2.513T18.5 17q-.875 0-1.65-.375t-1.3-1.075q-.725.725-1.638 1.088T12 17q-2.075 0-3.537-1.463T7 12q0-2.075 1.463-3.537T12 7q2.075 0 3.538 1.463T17 12v1.45q0 .65.425 1.1T18.5 15q.65 0 1.075-.45t.425-1.1V12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20h5v2zm0-7q1.25 0 2.125-.875T15 12q0-1.25-.875-2.125T12 9q-1.25 0-2.125.875T9 12q0 1.25.875 2.125T12 15"
                                ></path>
                              </svg>
                            </div>
                            {/**/}
                          </div>
                        </div>
                        <div className="relative">
                          <label
                            className="nui-label w-full pb-1 text-[0.825rem]"
                            htmlFor="ninja-input-12"
                          >
                            Phone
                          </label>
                          <div className="group/nui-input relative">
                            <input
                              id="ninja-input-12"
                              onChange={handleInput}
                              type="number"
                              onFocus={() => (window.onwheel = () => false)} // Disable scrolling on focus
                              onBlur={() => (window.onwheel = null)}
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
                              value={userData.phone}
                              name="phone"
                              className="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-white font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 pe-4 ps-9 rounded-xl"
                              placeholder="Ex: 1 234 5678"
                            />
                            {/**/}
                            {/**/}
                            <div className="text-muted-400 group-focus-within/nui-input:text-primary-500 absolute start-0 top-0 flex items-center justify-center transition-colors duration-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-75 h-10 w-10">
                              <svg
                                width="1em"
                                height="1em"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="currentColor"
                                  d="M21.384,17.752a2.108,2.108,0,0,1-.522,3.359,7.543,7.543,0,0,1-5.476.642C10.5,20.523,3.477,13.5,2.247,8.614a7.543,7.543,0,0,1,.642-5.476,2.108,2.108,0,0,1,3.359-.522L8.333,4.7a2.094,2.094,0,0,1,.445,2.328A3.877,3.877,0,0,1,8,8.2c-2.384,2.384,5.417,10.185,7.8,7.8a3.877,3.877,0,0,1,1.173-.781,2.092,2.092,0,0,1,2.328.445Z"
                                />
                              </svg>
                            </div>
                            {/**/}
                          </div>
                        </div>
                        <div className="relative">
                          <label
                            className="nui-label w-full pb-1 text-[0.825rem]"
                            htmlFor="ninja-input-15"
                          >
                            Password
                          </label>
                          <div className="group/nui-input relative">
                            <input
                              id="ninja-input-15"
                              type={type1}
                              onChange={handleInput}
                              value={userData.password}
                              name="password"
                              className="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-white font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 pe-4 ps-9 rounded-xl"
                              placeholder="********"
                            />
                            {/**/}
                            {/**/}
                            <div className="text-muted-400 group-focus-within/nui-input:text-primary-500 absolute start-0 top-0 flex items-center justify-center transition-colors duration-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-75 h-10 w-10">
                              <svg
                                data-v-cd102a71
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                aria-hidden="true"
                                role="img"
                                className="icon h-[1.15rem] w-[1.15rem]"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="currentColor"
                                  d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1q2.075 0 3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm0-2h12V10H6zm6-3q.825 0 1.413-.587T14 15q0-.825-.587-1.412T12 13q-.825 0-1.412.588T10 15q0 .825.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3q-1.25 0-2.125.875T9 6zM6 20V10z"
                                ></path>
                              </svg>
                            </div>
                            <button
                              type="button"
                              onClick={handleTogglePassword}
                              className="leading-0 text-muted-400 peer-focus-within:text-primary-500 absolute right-0 top-0 flex h-10 w-10 items-center justify-center text-center text-xl"
                            >
                              {type1 === "password" ? (
                                <div
                                  className="relative flex h-full w-full items-center justify-center"
                                  data-tooltip="Hide password"
                                >
                                  <svg
                                    data-v-cd102a71
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    aria-hidden="true"
                                    role="img"
                                    className="icon h-5 w-5"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54zM12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.79 11.79 0 0 1-4 5.19l-1.42-1.43A9.862 9.862 0 0 0 20.82 12A9.821 9.821 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.821 9.821 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13"
                                    />
                                  </svg>
                                </div>
                              ) : (
                                <div
                                  className="relative flex h-full w-full items-center justify-center"
                                  data-tooltip="Show password"
                                >
                                  <svg
                                    data-v-cd102a71
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    aria-hidden="true"
                                    role="img"
                                    className="icon h-5 w-5"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0"
                                    />
                                  </svg>
                                </div>
                              )}
                            </button>
                            {/**/}
                          </div>
                        </div>
                        <div className="relative">
                          <label
                            className="nui-label w-full pb-1 text-[0.825rem]"
                            htmlFor="ninja-input-15"
                          >
                            Confirm password
                          </label>
                          <div className="group/nui-input relative">
                            <input
                              id="ninja-input-15"
                              type={type2}
                              onChange={handleInput}
                              value={userData.cpassword}
                              name="cpassword"
                              className="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-white font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 pe-4 ps-9 rounded-xl"
                              placeholder="********"
                            />
                            {/**/}
                            {/**/}
                            <div className="text-muted-400 group-focus-within/nui-input:text-primary-500 absolute start-0 top-0 flex items-center justify-center transition-colors duration-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-75 h-10 w-10">
                              <svg
                                data-v-cd102a71
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                aria-hidden="true"
                                role="img"
                                className="icon h-[1.15rem] w-[1.15rem]"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="currentColor"
                                  d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1q2.075 0 3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm0-2h12V10H6zm6-3q.825 0 1.413-.587T14 15q0-.825-.587-1.412T12 13q-.825 0-1.412.588T10 15q0 .825.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3q-1.25 0-2.125.875T9 6zM6 20V10z"
                                ></path>
                              </svg>
                            </div>
                            <button
                              type="button"
                              onClick={handleTogglePassword1}
                              className="leading-0 text-muted-400 peer-focus-within:text-primary-500 absolute right-0 top-0 flex h-10 w-10 items-center justify-center text-center text-xl"
                            >
                              {type2 === "password" ? (
                                <div
                                  className="relative flex h-full w-full items-center justify-center"
                                  data-tooltip="Hide password"
                                >
                                  <svg
                                    data-v-cd102a71
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    aria-hidden="true"
                                    role="img"
                                    className="icon h-5 w-5"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54zM12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.79 11.79 0 0 1-4 5.19l-1.42-1.43A9.862 9.862 0 0 0 20.82 12A9.821 9.821 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.821 9.821 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13"
                                    />
                                  </svg>
                                </div>
                              ) : (
                                <div
                                  className="relative flex h-full w-full items-center justify-center"
                                  data-tooltip="Show password"
                                >
                                  <svg
                                    data-v-cd102a71
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    aria-hidden="true"
                                    role="img"
                                    className="icon h-5 w-5"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0"
                                    />
                                  </svg>
                                </div>
                              )}
                            </button>

                            {/**/}
                          </div>
                        </div>
                        <div className="group/password-strength relative cursor-pointer">
                          <div className="border-muted-200 dark:border-muted-700 shadow-muted-300/30 dark:shadow-muted-800/20 dark:bg-muted-800 pointer-events-none absolute left-0 top-4 z-20 rounded-lg border bg-white p-6 opacity-0 shadow-xl transition-opacity duration-300 group-hover/password-strength:pointer-events-auto group-hover/password-strength:opacity-100">
                            <ul className="flex flex-col gap-4">
                              <li className="flex items-center justify-between gap-6">
                                <span className="grow text-xs dark:text-slate-400 dark:text-slate-350 font-semibold">
                                  Contains minimum 8 characters
                                </span>
                                <span className="w-7">
                                  <svg
                                    data-v-cd102a71
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    aria-hidden="true"
                                    role="img"
                                    className="icon text-danger-400 dark:text-danger-500 h-4 w-4"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 512 512"
                                  >
                                    <path
                                      fill="none"
                                      stroke="currentColor"
                                      strokeMiterlimit={10}
                                      strokeWidth={32}
                                      d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z"
                                    ></path>
                                    <path
                                      fill="none"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={32}
                                      d="M320 320L192 192m0 128l128-128"
                                    />
                                  </svg>
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="-mx-1 flex">
                            <div className="w-1/5 px-1">
                              <div
                                className={
                                  verifyP
                                    ? "h-2 rounded-xl transition-colors bg-success-500"
                                    : "h-2 rounded-xl transition-colors bg-danger-500"
                                }
                                data-tooltip=" minimum 8 characters"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="relative">
                          <label className="nui-label w-full pb-1 text-[0.825rem]">
                            Country
                          </label>
                          <div className="group/nui-input relative">
                            <input
                              type="text"
                              onChange={handleInput}
                              value={userData.country}
                              name="country"
                              className="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-white font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 pe-4 ps-9 rounded-xl"
                              placeholder="Your Coutry"
                            />
                            {/**/}
                            {/**/}
                            <div className="text-muted-400 group-focus-within/nui-input:text-primary-500 absolute start-0 top-0 flex items-center justify-center transition-colors duration-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-75 h-10 w-10">
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
                                    d="M128 24a80 80 0 0 0-80 80c0 72 80 128 80 128s80-56 80-128a80 80 0 0 0-80-80m0 112a32 32 0 1 1 32-32a32 32 0 0 1-32 32"
                                    opacity=".2"
                                  />
                                  <path d="M128 64a40 40 0 1 0 40 40a40 40 0 0 0-40-40m0 64a24 24 0 1 1 24-24a24 24 0 0 1-24 24m0-112a88.1 88.1 0 0 0-88 88c0 31.4 14.51 64.68 42 96.25a254.19 254.19 0 0 0 41.45 38.3a8 8 0 0 0 9.18 0a254.19 254.19 0 0 0 41.37-38.3c27.45-31.57 42-64.85 42-96.25a88.1 88.1 0 0 0-88-88m0 206c-16.53-13-72-60.75-72-118a72 72 0 0 1 144 0c0 57.23-55.47 105-72 118" />
                                </g>
                              </svg>
                            </div>

                            {/**/}
                          </div>
                        </div>
                        <div className="relative">
                          <label className="nui-label w-full pb-1 text-[0.825rem]">
                            Postal Code
                          </label>
                          <div className="group/nui-input relative">
                            <input
                              type="text"
                              onChange={handleInput}
                              value={userData.postalCode}
                              name="postalCode"
                              className="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-white font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 pe-4 ps-9 rounded-xl"
                              placeholder="Your Postal Code"
                            />
                            {/**/}
                            {/**/}
                            <div className="text-muted-400 group-focus-within/nui-input:text-primary-500 absolute start-0 top-0 flex items-center justify-center transition-colors duration-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-75 h-10 w-10">
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
                                    d="M128 24a80 80 0 0 0-80 80c0 72 80 128 80 128s80-56 80-128a80 80 0 0 0-80-80m0 112a32 32 0 1 1 32-32a32 32 0 0 1-32 32"
                                    opacity=".2"
                                  />
                                  <path d="M128 64a40 40 0 1 0 40 40a40 40 0 0 0-40-40m0 64a24 24 0 1 1 24-24a24 24 0 0 1-24 24m0-112a88.1 88.1 0 0 0-88 88c0 31.4 14.51 64.68 42 96.25a254.19 254.19 0 0 0 41.45 38.3a8 8 0 0 0 9.18 0a254.19 254.19 0 0 0 41.37-38.3c27.45-31.57 42-64.85 42-96.25a88.1 88.1 0 0 0-88-88m0 206c-16.53-13-72-60.75-72-118a72 72 0 0 1 144 0c0 57.23-55.47 105-72 118" />
                                </g>
                              </svg>
                            </div>

                            {/**/}
                          </div>
                        </div>
                        <div className="relative">
                          <label className="nui-label w-full pb-1 text-[0.825rem]">
                            City
                          </label>
                          <div className="group/nui-input relative">
                            <input
                              type="text"
                              onChange={handleInput}
                              value={userData.city}
                              name="city"
                              className="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-white font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 pe-4 ps-9 rounded-xl"
                              placeholder="Your City"
                            />
                            {/**/}
                            {/**/}
                            <div className="text-muted-400 group-focus-within/nui-input:text-primary-500 absolute start-0 top-0 flex items-center justify-center transition-colors duration-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-75 h-10 w-10">
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
                                    d="M128 24a80 80 0 0 0-80 80c0 72 80 128 80 128s80-56 80-128a80 80 0 0 0-80-80m0 112a32 32 0 1 1 32-32a32 32 0 0 1-32 32"
                                    opacity=".2"
                                  />
                                  <path d="M128 64a40 40 0 1 0 40 40a40 40 0 0 0-40-40m0 64a24 24 0 1 1 24-24a24 24 0 0 1-24 24m0-112a88.1 88.1 0 0 0-88 88c0 31.4 14.51 64.68 42 96.25a254.19 254.19 0 0 0 41.45 38.3a8 8 0 0 0 9.18 0a254.19 254.19 0 0 0 41.37-38.3c27.45-31.57 42-64.85 42-96.25a88.1 88.1 0 0 0-88-88m0 206c-16.53-13-72-60.75-72-118a72 72 0 0 1 144 0c0 57.23-55.47 105-72 118" />
                                </g>
                              </svg>
                            </div>

                            {/**/}
                          </div>
                        </div>
                        <div className="relative">
                          <label className="nui-label w-full pb-1 text-[0.825rem]">
                            Address
                          </label>
                          <div className="group/nui-input relative">
                            <input
                              type="text"
                              onChange={handleInput}
                              value={userData.address}
                              name="address"
                              className="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-white font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 pe-4 ps-9 rounded-xl"
                              placeholder="Your Address"
                            />
                            {/**/}
                            {/**/}
                            <div className="text-muted-400 group-focus-within/nui-input:text-primary-500 absolute start-0 top-0 flex items-center justify-center transition-colors duration-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-75 h-10 w-10">
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
                                    d="M128 24a80 80 0 0 0-80 80c0 72 80 128 80 128s80-56 80-128a80 80 0 0 0-80-80m0 112a32 32 0 1 1 32-32a32 32 0 0 1-32 32"
                                    opacity=".2"
                                  />
                                  <path d="M128 64a40 40 0 1 0 40 40a40 40 0 0 0-40-40m0 64a24 24 0 1 1 24-24a24 24 0 0 1-24 24m0-112a88.1 88.1 0 0 0-88 88c0 31.4 14.51 64.68 42 96.25a254.19 254.19 0 0 0 41.45 38.3a8 8 0 0 0 9.18 0a254.19 254.19 0 0 0 41.37-38.3c27.45-31.57 42-64.85 42-96.25a88.1 88.1 0 0 0-88-88m0 206c-16.53-13-72-60.75-72-118a72 72 0 0 1 144 0c0 57.23-55.47 105-72 118" />
                                </g>
                              </svg>
                            </div>

                            {/**/}
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <div className="relative inline-flex items-start gap-1 text-primary-500">
                          <div className="nui-focus group/nui-checkbox relative flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-md">
                            <input
                              id="ninja-input-16"
                              className="peer absolute z-20 h-5 w-5 cursor-pointer opacity-0"
                              type="checkbox"
                              onClick={toggleagree}
                              name="checkbox"
                            />
                            <div className="border-muted-400 dark:border-muted-700 dark:bg-muted-700 absolute start-0 top-0 z-0 h-full w-full border-2 bg-white peer-checked:border-current peer-indeterminate:border-current peer-checked:dark:border-current peer-indeterminate:dark:border-current rounded-md"></div>
                            <svg
                              aria-hidden="true"
                              viewBox="0 0 17 12"
                              className="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-checked:translate-y-0 peer-checked:opacity-100 peer-indeterminate:!translate-y-6"
                            >
                              <path
                                fill="currentColor"
                                d="M16.576.414a1.386 1.386 0 0 1 0 1.996l-9.404 9.176A1.461 1.461 0 0 1 6.149 12c-.37 0-.74-.139-1.023-.414L.424 6.998a1.386 1.386 0 0 1 0-1.996 1.47 1.47 0 0 1 2.046 0l3.68 3.59L14.53.414a1.47 1.47 0 0 1 2.046 0z"
                              ></path>
                            </svg>
                            <svg
                              aria-hidden="true"
                              viewBox="0 0 24 24"
                              className="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-indeterminate:translate-y-0 peer-indeterminate:opacity-100"
                            >
                              <path
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={4}
                                d="M2 12h20"
                              />
                            </svg>
                          </div>
                          <div className="inline-flex flex-col">
                            <label
                              htmlFor="ninja-input-16"
                              className="text-muted-400 ms-1 cursor-pointer select-none font-sans text-sm"
                            >
                              I Agree to the Terms &amp; Conditions
                            </label>
                            {/**/}
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <div className="block w-full rounded-md shadow-sm">
                          <button
                            onClick={Register}
                            data-v-71bb21a6
                            disabled={isloading}
                            type="submit"
                            className="is-button rounded-xl bg-primary-500 dark:bg-primary-500 hover:enabled:bg-primary-400 dark:hover:enabled:bg-primary-400 text-white hover:enabled:shadow-lg hover:enabled:shadow-primary-500/50 dark:hover:enabled:shadow-primary-800/20 focus-visible:outline-primary-400/70 focus-within:outline-primary-400/70 focus-visible:bg-primary-500 active:enabled:bg-primary-500 dark:focus-visible:outline-primary-400 dark:focus-within:outline-primary-400 dark:focus-visible:bg-primary-500 dark:active:enabled:bg-primary-500 !h-11 w-full"
                          >
                            {isloading ? (
                              <div>
                                <div className="nui-placeload animate-nui-placeload h-4 w-8 rounded mx-auto"></div>
                              </div>
                            ) : (
                              "Create Account"
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                    <p className="text-muted-400 mt-4 flex justify-between font-sans text-xs leading-5">
                      <span>Already have a Blockchain.com Account? </span>
                      <NavLink
                        to="/auth/login"
                        className="text-primary-600 hover:text-primary-500 font-medium underline-offset-4 transition duration-150 ease-in-out hover:underline"
                      >
                        Login here{" "}
                      </NavLink>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
