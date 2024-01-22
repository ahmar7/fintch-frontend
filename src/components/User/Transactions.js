import React, { useEffect, useState } from "react";
import searcH from "../../assets/img/placeholder-search-5.svg";
import { getUserCoinApi, getsignUserApi } from "../../Api/Service";
import Log from "../../assets/img/log.jpg";
import { useAuthUser } from "react-auth-kit";
import { Link, useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import SideBar from "../../layout/UserSidebar/SideBar";

import Truncate from "react-truncate-inside";
import UserHeader from "./UserHeader";
import axios from "axios";
const Transactions = () => {
  const [modal, setModal] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [UserTransactions, setUserTransactions] = useState([]);
  const [singleTransaction, setsingleTransaction] = useState();
  const [userDetail, setuserDetail] = useState({});
  const [liveBtc, setliveBtc] = useState(null);

  let { id } = useParams();

  let authUser = useAuthUser();
  let Navigate = useNavigate();
  const [Active, setActive] = useState(false);

  const [isUser, setIsUser] = useState({});
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
  const getTransactions = async () => {
    try {
      const response = await axios.get(
        "https://api.coindesk.com/v1/bpi/currentprice.json"
      );
      const allTransactions = await getUserCoinApi(id);
      if (response && allTransactions.success) {
        setUserTransactions(allTransactions.getCoin.transactions.reverse());
        let val = response.data.bpi.USD.rate.replace(/,/g, "");

        setliveBtc(val);
        return;
      } else {
        toast.dismiss();
        toast.error(allTransactions.msg);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error);
    } finally {
      setisLoading(false);
    }
  };
  let toggleModal = async (data) => {
    setModal(true);

    setsingleTransaction(data);
  };
  let toggleModalClose = () => {
    setModal(false);
  };

  //

  //

  let toggleBar = () => {
    if (Active === true) {
      setActive(false);
    } else {
      setActive(true);
    }
  };
  useEffect(() => {
    getsignUser();
    if (authUser().user.role === "admin") {
      Navigate("/admin/dashboard");
      return;
    } else if (authUser().user.role === "user") {
      setuserDetail(authUser().user);
      if (authUser().user._id != id) {
        Navigate("/dashboard");
      }
    }

    getTransactions();
    // getSignleUser();
  }, []);
  // Copy
  const [timer, setTimer] = useState(null);
  const [copyStatus, setCopyStatus] = useState(false);

  const handleCopyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopyStatus(true);

        // Reset the copy status after 2 seconds
        setTimeout(() => {
          setCopyStatus(false);
        }, 2000);
      })
      .catch(() => {
        setCopyStatus(false);

        // Reset the copy status after 2 seconds
        setTimeout(() => {
          setCopyStatus(false);
        }, 2000);
      });
  };

  // Copy
  return (
    <div className="dark user-bg">
      <div>
        <div className="  pb-20">
          <SideBar state={Active} toggle={toggleBar} />
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
          <div className="relative min-h-screen w-full fall overflow-x-hidden pe-4 transition-all duration-300 xl:px-10 lg:max-w-[calc(100%_-_250px)] lg:ms-[250px]">
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
            <div className="ptbg">
              <div>
                <div className="mb-6 flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
                  <div className="flex w-full items-center gap-4 sm:w-auto">
                    <div className="relative w-full sm:w-auto">
                      {/**/}
                      <div className="group/nui-input relative">
                        <input
                          id="ninja-input-31"
                          type="text"
                          className="nui-focus  placeholder:text-muted-300     dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-black font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 pe-4 ps-9 rounded-full"
                          placeholder="Filter Transactions..."
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
                            <g
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                            >
                              <circle cx={11} cy={11} r={8} />
                              <path d="m21 21l-4.3-4.3" />
                            </g>
                          </svg>
                        </div>
                        {/**/}
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-end gap-4 sm:w-auto" />
                </div>
                <div>
                  <div>
                    {/*  */}

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
                            Loading Transactions
                          </h4>
                          <p className="text-muted-400 font-sans text-sm">
                            Please wait while we load transactions.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="grid gap-4 grid-cols-1">
                          {UserTransactions &&
                            UserTransactions.map((Transaction, index) => (
                              <div key={index}>
                                <div className="line-bg3 relative w-full border bg-white transition-all duration-300 rounded-xl p-3">
                                  <div className="flex w-full items-center gap-2">
                                    {Transaction.type === "deposit" ? (
                                      <div className="relative inline-flex shrink-0 items-center justify-center outline-none h-12 w-12 nui-mask nui-mask-blob bg-success-100 text-success-400">
                                        <div className="flex h-full w-full items-center justify-center overflow-hidden text-center transition-all duration-300">
                                          <svg
                                            data-v-cd102a71
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            aria-hidden="true"
                                            role="img"
                                            className="icon"
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              fill="currentColor"
                                              d="M11 20V7.825l-5.6 5.6L4 12l8-8l8 8l-1.4 1.425l-5.6-5.6V20z"
                                            />
                                          </svg>
                                        </div>
                                      </div>
                                    ) : Transaction.type === "withdraw" ? (
                                      <div className="relative inline-flex shrink-0 items-center justify-center outline-none h-12 w-12 nui-mask nui-mask-blob bg-danger-100 text-danger-400">
                                        <div className="flex h-full w-full items-center justify-center overflow-hidden text-center transition-all duration-300">
                                          <svg
                                            data-v-cd102a71
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            aria-hidden="true"
                                            role="img"
                                            className="icon"
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              fill="currentColor"
                                              d="M11 4v12.175l-5.6-5.6L4 12l8 8l8-8l-1.4-1.425l-5.6 5.6V4z"
                                            />
                                          </svg>
                                        </div>
                                        {/**/}
                                        {/**/}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    <div>
                                      <p
                                        className="font-heading capitalize text-white text-sm font-medium leading-normal leading-normal"
                                        tag="h3"
                                      >
                                        {Transaction.trxName}{" "}
                                        <span className="text-muted-400 capitalize">
                                          ({Transaction.status})
                                        </span>
                                      </p>
                                      <p className="font-alt text-xs font-normal leading-normal leading-normal text-muted-400 mt-1">
                                        {Transaction.amount.toFixed(8)}{" "}
                                        <span className="text-muted-500">
                                          {`($${
                                            Transaction.trxName === "bitcoin"
                                              ? (
                                                  Transaction.amount * liveBtc
                                                ).toFixed(2)
                                              : Transaction.trxName ===
                                                "ethereum"
                                              ? (
                                                  Transaction.amount * 2241.86
                                                ).toFixed(2)
                                              : Transaction.trxName === "tether"
                                              ? Transaction.amount.toFixed(2)
                                              : (0).toFixed(2)
                                          })`}
                                        </span>
                                      </p>
                                      <p className="font-alt text-xs font-normal leading-normal leading-normal text-muted-400 md:hidden mt-1">
                                        At:{" "}
                                        {new Date(
                                          Transaction.createdAt
                                        ).toLocaleString()}
                                      </p>
                                    </div>
                                    <div className="ms-auto flex items-center gap-2">
                                      <p
                                        className="font-heading text-sm font-medium leading-normal leading-normal me-2 text-gray-500 hidden md:block"
                                        tag="h3"
                                      >
                                        At:{" "}
                                        {new Date(
                                          Transaction.createdAt
                                        ).toLocaleString()}
                                      </p>
                                      <button
                                        onClick={() => toggleModal(Transaction)}
                                        type="button"
                                        className="disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-none false false text-muted-700 bg-white border border-muted-300 dark:text-white dark:bg-muted-700 dark:hover:bg-muted-600 dark:border-muted-600 hover:bg-muted-50 rounded-md h-8 w-8 p-1 nui-focus relative inline-flex items-center justify-center space-x-1 font-sans text-sm font-normal leading-5 no-underline outline-none transition-all duration-300"
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
                                          <g
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                          >
                                            <path d="M1 12s4-8 11-8s11 8 11 8s-4 8-11 8s-11-8-11-8" />
                                            <circle cx={12} cy={12} r={3} />
                                          </g>
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                {/**/}
                              </div>
                            ))}
                        </div>
                        {UserTransactions.length === 0 ? (
                          <div>
                            <div>
                              <div className="flex min-h-[400px] items-center justify-center">
                                <div className="mx-auto w-full text-center max-w-xs">
                                  <div className="mx-auto max-w-xs">
                                    {/* <img
                                      className="block dark:hidden"
                                      src={searcH}
                                      alt="Placeholder image"
                                    />
                                    <img
                                      className="hidden dark:block"
                                      src={searcH}
                                      alt="Placeholder image"
                                    /> */}
                                  </div>
                                  <div className="mx-auto max-w-sm">
                                    <h4 className="font-heading text-xl font-medium leading-normal leading-normal text-muted-800 mb-1 mt-4 dark:text-white">
                                      No transactions found
                                    </h4>
                                    <p className="text-muted-400 font-sans text-sm">
                                      Try to change the filter or add a new
                                      transaction
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/**/}
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </div>
                  {/**/}
                </div>
              </div>
            </div>
            {/**/}
          </div>
        </div>
      </div>
      {modal && (
        <div>
          <div
            className="relative z-[9999]"
            id="headlessui-dialog-55"
            role="dialog"
            aria-modal="true"
            data-headlessui-state="open"
          >
            <div className="bg-lesf fixed inset-0" />
            <div className="fixed inset-0 overflow-x-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                {singleTransaction.by === "user" ? (
                  <div
                    id="headlessui-dialog-panel-58"
                    data-headlessui-state="open"
                    className="line-bg w-full   text-left align-middle shadow-xl transition-all rounded-lg max-w-2xl"
                  >
                    <div className="flex w-full items-center justify-between p-4 md:p-6">
                      <div className="lg:flex lg:items-center lg:justify-between">
                        <div className="min-w-0 flex-1">
                          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight dark:text-white">
                            Transaction Details
                          </h2>
                          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6"></div>
                        </div>
                        <div className="mt-5 flex lg:ml-4 lg:mt-0"></div>
                      </div>
                      <button
                        onClick={toggleModalClose}
                        type="button"
                        className="flex h-9 w-9 items-center justify-center transition-colors duration-300 disabled:opacity-30 hover:bg-muted-100 dark:hover:bg-muted-700 text-muted-700 dark:text-muted-50 rounded-full"
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-4 w-4 fill-current"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M18 6 6 18M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="p-4 md:p-6 overflow-auto">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-4 md:gap-y-8 sm:grid-cols-2 mb-3">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Transaction ID
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                            <a
                              onClick={() =>
                                handleCopyToClipboard(singleTransaction._id)
                              }
                              href="javascript:void(0)"
                              className="font-medium inline-flex align-center text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 text-xs"
                            >
                              <Truncate
                                text={singleTransaction._id}
                                offset={6}
                                width="100"
                              />
                              <svg
                                data-v-cd102a71
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                aria-hidden="true"
                                role="img"
                                className="icon w-5 h-5 inline-block -mt-1 ml-1"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                              >
                                <g
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                >
                                  <rect
                                    width={13}
                                    height={13}
                                    x={9}
                                    y={9}
                                    rx={2}
                                    ry={2}
                                  />
                                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </g>
                              </svg>
                            </a>
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            to
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                            <a
                              href="javascript:void(0)"
                              onClick={() =>
                                handleCopyToClipboard(singleTransaction.txId)
                              }
                              className="font-medium inline-flex align-center text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400"
                            >
                              <Truncate
                                text={singleTransaction.txId}
                                offset={6}
                                width="100"
                              />
                              <svg
                                data-v-cd102a71
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                aria-hidden="true"
                                role="img"
                                className="icon w-5 h-5 inline-block -mt-1 ml-1"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                              >
                                <g
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                >
                                  <rect
                                    width={13}
                                    height={13}
                                    x={9}
                                    y={9}
                                    rx={2}
                                    ry={2}
                                  />
                                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </g>
                              </svg>
                            </a>
                          </dd>
                        </div>

                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Timestamp
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                            {new Date(
                              singleTransaction.createdAt
                            ).toLocaleString()}
                          </dd>
                        </div>

                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Value
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                            <a
                              href="javascript:void(0)"
                              onClick={() =>
                                handleCopyToClipboard(
                                  singleTransaction.amount.toFixed(8)
                                )
                              }
                              className="font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400"
                            >
                              {singleTransaction.amount.toFixed(8)}{" "}
                              {`${
                                singleTransaction.trxName === "bitcoin"
                                  ? "BTC"
                                  : singleTransaction.trxName === "ethereum"
                                  ? "ETH"
                                  : singleTransaction.trxName === "tether"
                                  ? "USDT"
                                  : ""
                              }`}
                              {"   "}
                              <span className="text-gray-400">{`($${
                                singleTransaction.trxName === "bitcoin"
                                  ? (
                                      singleTransaction.amount * liveBtc
                                    ).toFixed(2)
                                  : singleTransaction.trxName === "ethereum"
                                  ? (
                                      singleTransaction.amount * 2241.86
                                    ).toFixed(2)
                                  : singleTransaction.trxName === "tether"
                                  ? singleTransaction.amount.toFixed(2)
                                  : (0).toFixed(2)
                              })`}</span>
                              <svg
                                data-v-cd102a71
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                aria-hidden="true"
                                role="img"
                                className="icon w-5 h-5 inline-block -mt-1 ml-2"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                              >
                                <g
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                >
                                  <rect
                                    width={13}
                                    height={13}
                                    x={9}
                                    y={9}
                                    rx={2}
                                    ry={2}
                                  />
                                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </g>
                              </svg>
                            </a>
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Status
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                            {singleTransaction.status === "pending" ? (
                              <>
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                                  Pending
                                </span>
                              </>
                            ) : singleTransaction.status === "completed" ? (
                              <>
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                                  Completed
                                </span>
                              </>
                            ) : singleTransaction.status === "failed" ? (
                              <>
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
                                  Failed
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="border-muted-300 dark:border-muted-700 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center border-l w-10">
                                  <svg
                                    data-v-cd102a71
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    aria-hidden="true"
                                    role="img"
                                    className="icon text-muted-400 transition-transform duration-300 h-4 w-4"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="none"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="m6 9l6 6l6-6"
                                    />
                                  </svg>
                                </span>
                              </>
                            )}
                            <span className="text-gray-400 dark:text-gray-500 ml-2">
                              {singleTransaction.note}
                            </span>

                            {/**/}
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <div className="flex w-full items-center gap-x-2 justify-end">
                      <div className="p-4 md:p-6">
                        <div className="flex gap-x-2">
                          <button
                            onClick={toggleModalClose}
                            data-v-71bb21a6
                            type="button"
                            className="is-button rounded is-button-default"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    id="headlessui-dialog-panel-58"
                    data-headlessui-state="open"
                    className="line-bg w-full   text-left align-middle shadow-xl transition-all rounded-lg max-w-2xl"
                  >
                    <div className="flex w-full items-center justify-between p-4 md:p-6">
                      <div className="lg:flex lg:items-center lg:justify-between">
                        <div className="min-w-0 flex-1">
                          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight dark:text-white">
                            Transaction Details
                          </h2>
                          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6"></div>
                        </div>
                        <div className="mt-5 flex lg:ml-4 lg:mt-0"></div>
                      </div>
                      <button
                        onClick={toggleModalClose}
                        type="button"
                        className="flex h-9 w-9 items-center justify-center transition-colors duration-300 disabled:opacity-30 hover:bg-muted-100 dark:hover:bg-muted-700 text-muted-700 dark:text-muted-50 rounded-full"
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-4 w-4 fill-current"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M18 6 6 18M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="p-4 md:p-6 overflow-auto">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-4 md:gap-y-8 sm:grid-cols-2 mb-3">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Transaction ID
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                            <a
                              onClick={() =>
                                handleCopyToClipboard(singleTransaction._id)
                              }
                              href="javascript:void(0)"
                              className="font-medium inline-flex align-center text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 text-xs"
                            >
                              <Truncate
                                text={singleTransaction._id}
                                offset={6}
                                width="100"
                              />
                              <svg
                                data-v-cd102a71
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                aria-hidden="true"
                                role="img"
                                className="icon w-5 h-5 inline-block -mt-1 ml-1"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                              >
                                <g
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                >
                                  <rect
                                    width={13}
                                    height={13}
                                    x={9}
                                    y={9}
                                    rx={2}
                                    ry={2}
                                  />
                                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </g>
                              </svg>
                            </a>
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Transaction Hash
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                            <a
                              onClick={() =>
                                handleCopyToClipboard(singleTransaction.txId)
                              }
                              href="javascript:void(0)"
                              className="font-medium text-gray-900  align-center inline-flex dark:text-white hover:text-gray-600 dark:hover:text-gray-400 text-xs"
                            >
                              {" "}
                              <Truncate
                                text={singleTransaction.txId}
                                offset={6}
                                width="100"
                              />
                              <svg
                                data-v-cd102a71
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                aria-hidden="true"
                                role="img"
                                className="icon w-5 h-5 inline-block -mt-1 ml-1"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                              >
                                <g
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                >
                                  <rect
                                    width={13}
                                    height={13}
                                    x={9}
                                    y={9}
                                    rx={2}
                                    ry={2}
                                  />
                                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </g>
                              </svg>
                            </a>
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Block
                          </dt>
                          <dd className="mt-1 inline-flex  align-center text-sm text-gray-900 dark:text-white">
                            <Truncate
                              text={singleTransaction.txId}
                              offset={6}
                              width="100"
                            />
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Timestamp
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                            {new Date(
                              singleTransaction.createdAt
                            ).toLocaleString()}
                          </dd>
                        </div>
                        {singleTransaction.fromAddress ? (
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              From
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                              <a
                                href="javascript:void(0)"
                                onClick={() =>
                                  handleCopyToClipboard(
                                    singleTransaction.fromAddress
                                  )
                                }
                                className="font-medium inline-flex text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400"
                              >
                                <Truncate
                                  text={singleTransaction.fromAddress}
                                  offset={6}
                                  width="100"
                                />
                                <svg
                                  data-v-cd102a71
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  aria-hidden="true"
                                  role="img"
                                  className="icon w-5 h-5 inline-block -mt-1 ml-1"
                                  width="1em"
                                  height="1em"
                                  viewBox="0 0 24 24"
                                >
                                  <g
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                  >
                                    <rect
                                      width={13}
                                      height={13}
                                      x={9}
                                      y={9}
                                      rx={2}
                                      ry={2}
                                    />
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                  </g>
                                </svg>
                              </a>
                            </dd>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            to
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                            <a
                              href="javascript:void(0)"
                              onClick={() =>
                                handleCopyToClipboard(singleTransaction.txId)
                              }
                              className="font-medium inline-flex align-center text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400"
                            >
                              <Truncate
                                text={singleTransaction.txId}
                                offset={6}
                                width="100"
                              />
                              <svg
                                data-v-cd102a71
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                aria-hidden="true"
                                role="img"
                                className="icon w-5 h-5 inline-block -mt-1 ml-1"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                              >
                                <g
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                >
                                  <rect
                                    width={13}
                                    height={13}
                                    x={9}
                                    y={9}
                                    rx={2}
                                    ry={2}
                                  />
                                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </g>
                              </svg>
                            </a>
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Value
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                            <a
                              href="javascript:void(0)"
                              onClick={() =>
                                handleCopyToClipboard(
                                  singleTransaction.amount.toFixed(8)
                                )
                              }
                              className="font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400"
                            >
                              {singleTransaction.amount.toFixed(8)}{" "}
                              {`${
                                singleTransaction.trxName === "bitcoin"
                                  ? "BTC"
                                  : singleTransaction.trxName === "ethereum"
                                  ? "ETH"
                                  : singleTransaction.trxName === "tether"
                                  ? "USDT"
                                  : ""
                              }`}
                              {"   "}
                              <span className="text-gray-400">{`($${
                                singleTransaction.trxName === "bitcoin"
                                  ? (
                                      singleTransaction.amount * liveBtc
                                    ).toFixed(2)
                                  : singleTransaction.trxName === "ethereum"
                                  ? (
                                      singleTransaction.amount * 2241.86
                                    ).toFixed(2)
                                  : singleTransaction.trxName === "tether"
                                  ? singleTransaction.amount.toFixed(2)
                                  : (0).toFixed(2)
                              })`}</span>
                              <svg
                                data-v-cd102a71
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                aria-hidden="true"
                                role="img"
                                className="icon w-5 h-5 inline-block -mt-1 ml-2"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                              >
                                <g
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                >
                                  <rect
                                    width={13}
                                    height={13}
                                    x={9}
                                    y={9}
                                    rx={2}
                                    ry={2}
                                  />
                                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </g>
                              </svg>
                            </a>
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Status
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                            {singleTransaction.status === "pending" ? (
                              <>
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                                  Pending
                                </span>
                              </>
                            ) : singleTransaction.status === "completed" ? (
                              <>
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                                  Completed
                                </span>
                              </>
                            ) : singleTransaction.status === "failed" ? (
                              <>
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
                                  Failed
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="border-muted-300 dark:border-muted-700 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center border-l w-10">
                                  <svg
                                    data-v-cd102a71
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    aria-hidden="true"
                                    role="img"
                                    className="icon text-muted-400 transition-transform duration-300 h-4 w-4"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="none"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="m6 9l6 6l6-6"
                                    />
                                  </svg>
                                </span>
                              </>
                            )}
                            <span className="text-gray-400 dark:text-gray-500 ml-2">
                              {singleTransaction.note}
                            </span>

                            {/**/}
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <div className="flex w-full items-center gap-x-2 justify-end">
                      <div className="p-4 md:p-6">
                        <div className="flex gap-x-2">
                          <button
                            onClick={toggleModalClose}
                            data-v-71bb21a6
                            type="button"
                            className="is-button rounded is-button-default"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
