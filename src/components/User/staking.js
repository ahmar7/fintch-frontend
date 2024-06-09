import React, { useEffect, useState } from "react";
import SideBar from "../../layout/UserSidebar/SideBar";
import Log from "../../assets/img/log.jpg";
import "./staking.css";
import {
  createUserTransactionApi,
  getCoinsUserApi,
  getsignUserApi,
} from "../../Api/Service";
import { toast } from "react-toastify";
import { useAuthUser } from "react-auth-kit";
import { useNavigate, Link, NavLink } from "react-router-dom";
import UserHeader from "./UserHeader";
import axios from "axios";
const Staking = () => {
  const [Active, setActive] = useState(false);
  const [stakingModal, setstakingModal] = useState(false);
  let toggleBar = () => {
    if (Active === true) {
      setActive(false);
    } else {
      setActive(true);
    }
  };
  let toggleStaking = () => {
    if (stakingModal === true) {
      setstakingModal(false);
    } else {
      setstakingModal(true);
    }
  };

  const authUser = useAuthUser();
  const Navigate = useNavigate();
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
  // withdraw

  return (
    <>
      <div className="dark user-bg sta">
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
                {/* COntent */}

                <div className=" ptbg relative w-full    transition-all duration-300 ">
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <p
                        className="font-heading text-white  text-sm font-medium leading-normal leading-normal uppercase tracking-wider"
                        tag="h2"
                      >
                        Stake Plans
                      </p>
                    </div>
                  </div>
                  {/*  */}
                  <div className="MuiStack-root css-jddaxh">
                    <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-4 css-1tz8m30">
                      <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6 MuiGrid-grid-md-4 css-i9p3im">
                        <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-l43idd">
                          <div className="MuiCardContent-root css-1dzn5ey">
                            <div className="MuiStack-root css-jelo4q">
                              <div className="MuiAvatar-root MuiAvatar-circular css-1m3w9oh">
                                <img
                                  src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/btc.png"
                                  className="MuiAvatar-img css-1hy9t21"
                                />
                              </div>
                              <h6 className="MuiTypography-root MuiTypography-h6 css-ow70wi">
                                Bitcoin Stake
                              </h6>
                            </div>
                            <p className="MuiTypography-root MuiTypography-body2 css-1jorj1k">
                              DURATION
                            </p>
                            <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2 css-krtfz2">
                              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 MuiGrid-grid-md-6 css-kdq3hv">
                                <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-qy35p">
                                  <span className="MuiTypography-root MuiTypography-caption css-50upxb">
                                    30 Days
                                  </span>
                                </div>
                              </div>
                              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 MuiGrid-grid-md-6 css-kdq3hv">
                                <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-18xyzlx">
                                  <span className="MuiTypography-root MuiTypography-caption css-50upxb">
                                    60 Days
                                  </span>
                                </div>
                              </div>
                              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 MuiGrid-grid-md-6 css-kdq3hv">
                                <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-18xyzlx">
                                  <span className="MuiTypography-root MuiTypography-caption css-50upxb">
                                    90 Days
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="MuiStack-root css-9npne8">
                              <span className="MuiTypography-root MuiTypography-caption css-1canfvu">
                                Rate
                              </span>
                              <span className="MuiTypography-root MuiTypography-caption css-dbb9ax">
                                2.70%
                              </span>
                            </div>
                            <div className="MuiStack-root css-j0iiqq">
                              <span className="MuiTypography-root MuiTypography-caption css-1canfvu">
                                Min Value
                              </span>
                              <span className="MuiTypography-root MuiTypography-caption css-dbb9ax">
                                0.0117769844 BTC
                              </span>
                            </div>
                            <div className="MuiStack-root css-j0iiqq">
                              <span className="MuiTypography-root MuiTypography-caption css-1canfvu">
                                Max Value
                              </span>
                              <span className="MuiTypography-root MuiTypography-caption css-dbb9ax">
                                2.2376270413 BTC
                              </span>
                            </div>
                            <button
                              className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-1j9kn1e"
                              tabIndex={0}
                              type="button"
                            >
                              Stake
                              <span className="MuiTouchRipple-root css-w0pj6f" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6 MuiGrid-grid-md-4 css-i9p3im">
                        <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-l43idd">
                          <div className="MuiCardContent-root css-1dzn5ey">
                            <div className="MuiStack-root css-jelo4q">
                              <div className="MuiAvatar-root MuiAvatar-circular css-1m3w9oh">
                                <img
                                  src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png"
                                  className="MuiAvatar-img css-1hy9t21"
                                />
                              </div>
                              <h6 className="MuiTypography-root MuiTypography-h6 css-ow70wi">
                                Ethereum Stake
                              </h6>
                            </div>
                            <p className="MuiTypography-root MuiTypography-body2 css-1jorj1k">
                              DURATION
                            </p>
                            <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2 css-krtfz2">
                              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 MuiGrid-grid-md-6 css-kdq3hv">
                                <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-qy35p">
                                  <span className="MuiTypography-root MuiTypography-caption css-50upxb">
                                    30 Days
                                  </span>
                                </div>
                              </div>
                              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 MuiGrid-grid-md-6 css-kdq3hv">
                                <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-18xyzlx">
                                  <span className="MuiTypography-root MuiTypography-caption css-50upxb">
                                    60 Days
                                  </span>
                                </div>
                              </div>
                              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 MuiGrid-grid-md-6 css-kdq3hv">
                                <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-18xyzlx">
                                  <span className="MuiTypography-root MuiTypography-caption css-50upxb">
                                    90 Days
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="MuiStack-root css-9npne8">
                              <span className="MuiTypography-root MuiTypography-caption css-1canfvu">
                                Rate
                              </span>
                              <span className="MuiTypography-root MuiTypography-caption css-dbb9ax">
                                2.70%
                              </span>
                            </div>
                            <div className="MuiStack-root css-j0iiqq">
                              <span className="MuiTypography-root MuiTypography-caption css-1canfvu">
                                Min Value
                              </span>
                              <span className="MuiTypography-root MuiTypography-caption css-dbb9ax">
                                0.1969969781 ETH
                              </span>
                            </div>
                            <div className="MuiStack-root css-j0iiqq">
                              <span className="MuiTypography-root MuiTypography-caption css-1canfvu">
                                Max Value
                              </span>
                              <span className="MuiTypography-root MuiTypography-caption css-dbb9ax">
                                37.4294258326 ETH
                              </span>
                            </div>
                            <button
                              className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-1j9kn1e"
                              tabIndex={0}
                              type="button"
                            >
                              Stake
                              <span className="MuiTouchRipple-root css-w0pj6f" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6 MuiGrid-grid-md-4 css-i9p3im">
                        <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-l43idd">
                          <div className="MuiCardContent-root css-1dzn5ey">
                            <div className="MuiStack-root css-jelo4q">
                              <div className="MuiAvatar-root MuiAvatar-circular css-1m3w9oh">
                                <img
                                  src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/usdt.png"
                                  className="MuiAvatar-img css-1hy9t21"
                                />
                              </div>
                              <h6 className="MuiTypography-root MuiTypography-h6 css-ow70wi">
                                Tether USDT Stake
                              </h6>
                            </div>
                            <p className="MuiTypography-root MuiTypography-body2 css-1jorj1k">
                              DURATION
                            </p>
                            <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2 css-krtfz2">
                              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 MuiGrid-grid-md-6 css-kdq3hv">
                                <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-qy35p">
                                  <span className="MuiTypography-root MuiTypography-caption css-50upxb">
                                    30 Days
                                  </span>
                                </div>
                              </div>
                              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 MuiGrid-grid-md-6 css-kdq3hv">
                                <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-18xyzlx">
                                  <span className="MuiTypography-root MuiTypography-caption css-50upxb">
                                    60 Days
                                  </span>
                                </div>
                              </div>
                              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 MuiGrid-grid-md-6 css-kdq3hv">
                                <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-18xyzlx">
                                  <span className="MuiTypography-root MuiTypography-caption css-50upxb">
                                    90 Days
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="MuiStack-root css-9npne8">
                              <span className="MuiTypography-root MuiTypography-caption css-1canfvu">
                                Rate
                              </span>
                              <span className="MuiTypography-root MuiTypography-caption css-dbb9ax">
                                2.70%
                              </span>
                            </div>
                            <div className="MuiStack-root css-j0iiqq">
                              <span className="MuiTypography-root MuiTypography-caption css-1canfvu">
                                Min Value
                              </span>
                              <span className="MuiTypography-root MuiTypography-caption css-dbb9ax">
                                500.3001801081 USDT
                              </span>
                            </div>
                            <div className="MuiStack-root css-j0iiqq">
                              <span className="MuiTypography-root MuiTypography-caption css-1canfvu">
                                Max Value
                              </span>
                              <span className="MuiTypography-root MuiTypography-caption css-dbb9ax">
                                95057.0342205320 USDT
                              </span>
                            </div>
                            <button
                              onClick={toggleStaking}
                              className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-1j9kn1e"
                              tabIndex={0}
                              type="button"
                            >
                              Stake
                              <span className="MuiTouchRipple-root css-w0pj6f" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*  */}
                </div>

                {/**/}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      {stakingModal && (
        <div
          role="presentation"
          className="MuiDialog-root MuiModal-root css-126xj0f"
        >
          <div
            aria-hidden="true"
            className="MuiBackdrop-root MuiModal-backdrop css-1p6v7w1"
            style={{
              opacity: 1,
              transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            }}
          />
          <div tabIndex={0} data-testid="sentinelStart" />
          <div
            className="MuiDialog-container MuiDialog-scrollPaper css-ekeie0"
            role="presentation"
            tabIndex={-1}
            style={{
              opacity: 1,
              transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            }}
          >
            <div
              className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation24 MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm MuiDialog-paperFullWidth css-maa7c0"
              role="dialog"
              aria-labelledby=":r2:"
            >
              <h2
                className="MuiTypography-root MuiTypography-h6 MuiDialogTitle-root css-19d9fw5"
                id=":r2:"
              >
                Stake BTC
                <button
                  className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-inqsmp"
                  tabIndex={0}
                  type="button"
                >
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="CloseIcon"
                  >
                    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                  <span className="MuiTouchRipple-root css-w0pj6f" />
                </button>
              </h2>
              <div className="MuiDialogContent-root css-z83ub">
                <form>
                  <div className="MuiStack-root css-36lwkk">
                    <div className="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-1lnu8xy">
                      <label
                        className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined css-58zb7v"
                        data-shrink="false"
                        htmlFor=":r3:"
                        id=":r3:-label"
                      >
                        Locked Amount
                      </label>
                      <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-1a4ax0g">
                        <input
                          aria-invalid="false"
                          aria-describedby=":r3:-helper-text"
                          id=":r3:"
                          name="amount"
                          type="text"
                          className="MuiInputBase-input MuiOutlinedInput-input css-f0guyy"
                        />
                        <fieldset
                          aria-hidden="true"
                          className="MuiOutlinedInput-notchedOutline css-100o8dq"
                        >
                          <legend className="css-yjsfm1">
                            <span>Locked Amount</span>
                          </legend>
                        </fieldset>
                      </div>
                      <p
                        className="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-126giv0"
                        id=":r3:-helper-text"
                      >
                        Total Balance 0.00000000 BTC
                      </p>
                    </div>
                    <div className="MuiStack-root css-9npne8">
                      <span className="MuiTypography-root MuiTypography-caption css-1canfvu">
                        Rate
                      </span>
                      <span className="MuiTypography-root MuiTypography-caption css-dbb9ax">
                        11%
                      </span>
                    </div>
                    <div className="MuiStack-root css-j0iiqq">
                      <span className="MuiTypography-root MuiTypography-caption css-1canfvu">
                        Min Value
                      </span>
                      <span className="MuiTypography-root MuiTypography-caption css-dbb9ax">
                        0.0117769844 BTC
                      </span>
                    </div>
                    <div className="MuiStack-root css-j0iiqq">
                      <span className="MuiTypography-root MuiTypography-caption css-1canfvu">
                        Max Value
                      </span>
                      <span className="MuiTypography-root MuiTypography-caption css-dbb9ax">
                        2.2376270413 BTC
                      </span>
                    </div>
                    <div className="MuiStack-root css-j0iiqq">
                      <span className="MuiTypography-root MuiTypography-caption css-1canfvu">
                        Est. Interest
                      </span>
                      <span className="MuiTypography-root MuiTypography-caption css-dbb9ax">
                        0 BTC
                      </span>
                    </div>
                    <button
                      className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-1j9kn1e"
                      tabIndex={0}
                      type="button"
                    >
                      Stake
                      <span className="MuiTouchRipple-root css-w0pj6f" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div tabIndex={0} data-testid="sentinelEnd" />
        </div>
      )}
    </>
  );
};

export default Staking;
