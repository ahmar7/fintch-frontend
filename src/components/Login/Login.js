import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { loginApi } from "../../Api/Service";
import MobileApp from "../../assets/img/app-fold-phone.png";
import { useSignIn, useIsAuthenticated, useAuthUser } from "react-auth-kit";
const Login = () => {
  const [isloading, setisloading] = useState(false);
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type1, settype1] = useState("password");

  const handleTogglePassword = () => {
    type1 === "password"
      ? settype1("text")
      : type1 === "text"
      ? settype1("password")
      : settype1("password");
  };
  const logIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.dismiss();
      return toast.error("Please fill both the required fields");
    }
    setisloading(true);
    try {
      let data = { email, password };

      const updateHeader = await loginApi(data);
      let newData = updateHeader;
      if (updateHeader.success === true) {
        newData = {
          success: updateHeader.success,
          token: updateHeader.token,
          user: {
            _id: updateHeader.user._id,
            address: updateHeader.user.address,
            city: updateHeader.user.city,
            country: updateHeader.user.country,
            email: updateHeader.user.email,
            kyc: updateHeader.user.kyc,
            lastName: updateHeader.user.lastName,
            note: updateHeader.user.note,
            phone: updateHeader.user.phone,
            postalCode: updateHeader.user.postalCode,
            role: updateHeader.user.role,
            status: updateHeader.user.status,

            verified: updateHeader.user.verified,
          },
        };
      }
      if (
        updateHeader.success &&
        signIn({
          token: updateHeader.token.token,
          expiresIn: 4317,
          tokenType: "Bearer",
          authState: newData,
          sameSite: false,
        })
      ) {
        toast.dismiss();
        toast.success(updateHeader.msg);
        if (updateHeader.user.role === "user") {
          window.location.href = "/dashboard";

          return;
        } else if (updateHeader.user.role === "admin") {
          window.location.href = "/admin/dashboard";
        }
      } else {
        toast.dismiss();
        toast.info(updateHeader.msg);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setEmail("");
      setPassword("");
      toast.dismiss();
      toast.error(error?.data?.msg || "Something went wrong");
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
    <div id="__nuxt" data-v-app className="dark ">
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
          <div className="flex min-h-screen bg-white">
            <div className=" user-bg   relative hidden w-0 flex-1 items-center justify-center lg:flex lg:w-50">
              <div className="mx-auto w-full h-full flex items-center justify-center max-w-4xl">
                <img className="max-w-xl " src={MobileApp} alt="" width="400" />
              </div>
            </div>
            <div className="relative user-bg flex flex-1 flex-col justify-center px-6 py-12 lg:w-50 lg:flex-none">
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
                  <h2 className=" text-muted-400 font-heading text-3xl font-medium mt-6">
                    {" "}
                    Welcome back.{" "}
                  </h2>
                  <p className="font-alt text-sm font-normal leading-normal leading-normal text-muted-400 mb-6">
                    Login with social media or your credentials{" "}
                  </p>
                  <div className="flex flex-wrap justify-between gap-4">
                    <button
                      data-v-71bb21a6
                      disabled
                      type="button"
                      className="is-button rounded is-button-default dark:bg-muted-700 text-muted-800 border-muted-300 dark:border-muted-600 nui-focus relative inline-flex grow items-center justify-center gap-2 rounded-xl border bg-white px-6 py-4 dark:text-white"
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
                        viewBox="0 0 256 262"
                      >
                        <path
                          fill="#4285F4"
                          d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                        ></path>
                        <path
                          fill="#34A853"
                          d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                        ></path>
                        <path
                          fill="#FBBC05"
                          d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                        ></path>
                        <path
                          fill="#EB4335"
                          d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                        ></path>
                      </svg>
                      <div>Login with Google</div>
                    </button>
                    <button
                      disabled
                      type="button"
                      className="disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-none false false text-muted-700 bg-white border border-muted-300 dark:text-white dark:bg-muted-700 dark:hover:bg-muted-600 dark:border-muted-600 hover:bg-muted-50 rounded-md h-10 w-10 p-2 nui-focus relative inline-flex items-center justify-center space-x-1 font-sans text-sm font-normal leading-5 no-underline outline-none transition-all duration-300 bg-muted-200 dark:bg-muted-700 hover:bg-muted-100 dark:hover:bg-muted-600 text-muted-600 dark:text-muted-400 nui-focus w-[calc(50%_-_0.5rem)] cursor-pointer rounded-xl px-5 py-4 text-center transition-colors duration-300 md:w-auto"
                    >
                      <svg
                        data-v-cd102a71
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        role="img"
                        className="icon mx-auto h-4 w-4"
                        width="1em"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M459.37 151.716c.325 4.548.325 9.097.325 13.645c0 138.72-105.583 298.558-298.558 298.558c-59.452 0-114.68-17.219-161.137-47.106c8.447.974 16.568 1.299 25.34 1.299c49.055 0 94.213-16.568 130.274-44.832c-46.132-.975-84.792-31.188-98.112-72.772c6.498.974 12.995 1.624 19.818 1.624c9.421 0 18.843-1.3 27.614-3.573c-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319c-28.264-18.843-46.781-51.005-46.781-87.391c0-19.492 5.197-37.36 14.294-52.954c51.655 63.675 129.3 105.258 216.365 109.807c-1.624-7.797-2.599-15.918-2.599-24.04c0-57.828 46.782-104.934 104.934-104.934c30.213 0 57.502 12.67 76.67 33.137c23.715-4.548 46.456-13.32 66.599-25.34c-7.798 24.366-24.366 44.833-46.132 57.827c21.117-2.273 41.584-8.122 60.426-16.243c-14.292 20.791-32.161 39.308-52.628 54.253"
                        ></path>
                      </svg>
                    </button>
                    <button
                      disabled
                      type="button"
                      className="disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-none false false text-muted-700 bg-white border border-muted-300 dark:text-white dark:bg-muted-700 dark:hover:bg-muted-600 dark:border-muted-600 hover:bg-muted-50 rounded-md h-10 w-10 p-2 nui-focus relative inline-flex items-center justify-center space-x-1 font-sans text-sm font-normal leading-5 no-underline outline-none transition-all duration-300 bg-muted-200 dark:bg-muted-700 hover:bg-muted-100 dark:hover:bg-muted-600 text-muted-600 dark:text-muted-400 nui-focus w-[calc(50%_-_0.5rem)] cursor-pointer rounded-xl px-5 py-4 text-center transition-colors duration-300 md:w-auto"
                    >
                      <svg
                        data-v-cd102a71
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        role="img"
                        className="icon mx-auto h-4 w-4"
                        width="1em"
                        height="1em"
                        viewBox="0 0 448 512"
                      >
                        <path
                          fill="currentColor"
                          d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3M447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2c-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3c94 0 111.28 61.9 111.28 142.3V448z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex-100 mt-5 flex items-center">
                    <hr className="border-muted-200 dark:border-muted-700 flex-auto border-t-2" />
                    <span className="text-muted-400 px-4 font-sans font-light">
                      {" "}
                      OR{" "}
                    </span>
                    <hr className="border-muted-200 dark:border-muted-700 flex-auto border-t-2" />
                  </div>
                </div>
                <div className="mt-6">
                  <div className="mt-5">
                    <form method="POST" className="mt-6">
                      <div className="space-y-4">
                        <div className="relative">
                          <label
                            className="nui-label w-full pb-1 text-[0.825rem]"
                            htmlFor="ninja-input-9"
                          >
                            Email address
                          </label>
                          <div className="group/nui-input relative">
                            <input
                              id="ninja-input-9"
                              type="email"
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-white font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 px-3 rounded-xl h-12"
                              placeholder="Email address"
                            />
                          </div>
                        </div>
                        <div className="relative">
                          <label
                            className="nui-label w-full pb-1 text-[0.825rem]"
                            htmlFor="ninja-input-10"
                          >
                            Password
                          </label>
                          <div className="group/nui-input relative">
                            <input
                              id="ninja-input-10"
                              type={type1}
                              value={password}
                              name="password"
                              onChange={(e) => setPassword(e.target.value)}
                              className="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-white font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 px-3 rounded-xl h-12"
                              placeholder="Password"
                            />
                            <button
                              type="button"
                              style={{ top: "4px", right: "4px" }}
                              onClick={handleTogglePassword}
                              className="leading-0 text-muted-400 peer-focus-within:text-primary-500 absolute    flex h-10 w-10 items-center justify-center text-center text-xl"
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
                            {/**/}
                            {/**/}
                            {/**/}
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <div className="relative inline-flex items-start gap-1 text-primary-500">
                          <div className="nui-focus group/nui-checkbox relative flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-md">
                            <input
                              id="ninja-input-11"
                              true-value="true"
                              false-value="false"
                              className="peer absolute z-20 h-5 w-5 cursor-pointer opacity-0"
                              type="checkbox"
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
                              htmlFor="ninja-input-11"
                              className="text-muted-400 ms-1 cursor-pointer select-none font-sans text-sm"
                            >
                              Trust for 60 days
                            </label>
                            {/**/}
                          </div>
                        </div>
                        <div className="text-xs leading-5">
                          <a
                            href="#"
                            className="text-primary-600 hover:text-primary-500 font-sans font-medium underline-offset-4 transition duration-150 ease-in-out hover:underline"
                          >
                            Forgot your password?{" "}
                          </a>
                        </div>
                      </div>
                      <div className="mt-6">
                        <div className="block w-full rounded-md shadow-sm">
                          <button
                            data-v-71bb21a6
                            disabled={isloading}
                            onClick={logIn}
                            className="is-button rounded-xl bg-primary-500 dark:bg-primary-500 hover:enabled:bg-primary-400 dark:hover:enabled:bg-primary-400 text-white hover:enabled:shadow-lg hover:enabled:shadow-primary-500/50 dark:hover:enabled:shadow-primary-800/20 focus-visible:outline-primary-400/70 focus-within:outline-primary-400/70 focus-visible:bg-primary-500 active:enabled:bg-primary-500 dark:focus-visible:outline-primary-400 dark:focus-within:outline-primary-400 dark:focus-visible:bg-primary-500 dark:active:enabled:bg-primary-500 !h-11 w-full"
                          >
                            {isloading ? (
                              <div
                                data-v-71bb21a6=""
                                class="nui-placeload animate-nui-placeload h-4 w-12 rounded"
                              ></div>
                            ) : (
                              "Sign in"
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                    <p className="text-muted-400 mt-4 flex justify-between font-sans text-xs leading-5">
                      <span>Don't have an account?</span>
                      <NavLink
                        to="/auth/signup"
                        className="text-primary-600 hover:text-primary-500 font-medium underline-offset-4 transition duration-150 ease-in-out hover:underline"
                      >
                        Sign up now{" "}
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

export default Login;
