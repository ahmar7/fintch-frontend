import React, { useEffect, useState } from "react";
import SideBar from "../../layout/UserSidebar/SideBar";
import "./staking.css";
import {
  getsignUserApi,
  getCoinsUserApi,
  createUserTransactionApi,
} from "../../Api/Service";
import { toast } from "react-toastify";
import { useAuthUser } from "react-auth-kit";
import { useNavigate, Link, NavLink } from "react-router-dom";
import axios from "axios";

const Staking = () => {
  const [activeDurationBtc, setActiveDurationBtc] = useState(30);
  const [activeDurationEth, setActiveDurationEth] = useState(30);
  const [activeDurationUsdt, setActiveDurationUsdt] = useState(30);
  const [isLoading, setisLoading] = useState(true);
  const [isDisable, setisDisable] = useState(false);
  const [liveBtc, setliveBtc] = useState(null);

  const [btcBalance, setbtcBalance] = useState(0);
  const [UserData, setUserData] = useState(true);
  const [fractionBalance, setfractionBalance] = useState("00");
  const [ethBalance, setethBalance] = useState(0);
  const [usdtBalance, setusdtBalance] = useState(0);

  const activeBtc = (duration) => {
    setActiveDurationBtc(duration);
  };
  const activeEth = (duration) => {
    setActiveDurationEth(duration);
  };
  const activeUsdt = (duration) => {
    setActiveDurationUsdt(duration);
  };

  const getCoins = async (data) => {
    let id = data._id;
    try {
      const response = await axios.get(
        "https://api.coindesk.com/v1/bpi/currentprice.json"
      );
      const userCoins = await getCoinsUserApi(id);

      if (response && userCoins.success) {
        setUserData(userCoins.getCoin);
        // setUserTransactions;
        let val = response.data.bpi.USD.rate.replace(/,/g, "");
        console.log("val: ", val);
        setliveBtc(val);
        console.log("userCoins.success: ", userCoins.success);
        setisLoading(false);
        // tx
        const btc = userCoins.getCoin.transactions.filter((transaction) =>
          transaction.trxName.includes("bitcoin")
        );
        const btccomplete = btc.filter((transaction) =>
          transaction.status.includes("completed")
        );
        let btcCount = 0;
        let btcValueAdded = 0;
        for (let i = 0; i < btccomplete.length; i++) {
          const element = btccomplete[i];
          btcCount = element.amount;
          btcValueAdded += btcCount;
        }
        setbtcBalance(btcValueAdded);
        console.log("btcValueAdded: ", btcValueAdded);
        // tx
        // tx
        const eth = userCoins.getCoin.transactions.filter((transaction) =>
          transaction.trxName.includes("ethereum")
        );
        const ethcomplete = eth.filter((transaction) =>
          transaction.status.includes("completed")
        );
        let ethCount = 0;
        let ethValueAdded = 0;
        for (let i = 0; i < ethcomplete.length; i++) {
          const element = ethcomplete[i];
          ethCount = element.amount;
          ethValueAdded += ethCount;
        }
        setethBalance(ethValueAdded);
        console.log("ethValueAdded: ", ethValueAdded);
        // tx
        // tx
        const usdt = userCoins.getCoin.transactions.filter((transaction) =>
          transaction.trxName.includes("tether")
        );
        const usdtcomplete = usdt.filter((transaction) =>
          transaction.status.includes("completed")
        );
        let usdtCount = 0;
        let usdtValueAdded = 0;
        for (let i = 0; i < usdtcomplete.length; i++) {
          const element = usdtcomplete[i];
          usdtCount = element.amount;
          usdtValueAdded += usdtCount;
        }
        setusdtBalance(usdtValueAdded);
        // tx

        const totalValue = (
          btcValueAdded * liveBtc +
          ethValueAdded * 2241.86 +
          usdtValueAdded
        ).toFixed(2);

        //
        const [integerPart, fractionalPart] = totalValue.split(".");

        const formattedTotalValue = parseFloat(integerPart).toLocaleString(
          "en-US",
          {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }
        );

        //
        setfractionBalance(fractionalPart);
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
  const [Active, setActive] = useState(false);
  const [stakingModal, setstakingModal] = useState(false);
  let toggleBar = () => {
    if (Active === true) {
      setActive(false);
    } else {
      setActive(true);
    }
  };
  const [currentCrypto, setCurrentCrypto] = useState(null);
  let toggleStaking = (cryptoType) => {
    if (stakingModal === true) {
      setstakingModal(false);

      setCurrentCrypto(null);
      setAmount("");
    } else {
      setstakingModal(true);

      setCurrentCrypto(cryptoType);
    }
  };

  const authUser = useAuthUser();
  const Navigate = useNavigate();
  const [isUser, setIsUser] = useState({});
  const getsignUser = async () => {
    try {
      const formData = new FormData();
      formData.append("id", authUser().user._id);
      console.log("authUser().user: ", authUser().user);
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
    getCoins(authUser().user);
    getsignUser();
    if (authUser().user.role === "user") {
      return;
    } else if (authUser().user.role === "admin") {
      Navigate("/admin/dashboard");
      return;
    }
  }, []);
  // withdraw
  const handleAmountChange = (e, cryptoName) => {
    const value = e.target.value;

    console.log("e: ", cryptoName);

    // Allow empty value (when all digits are removed)
    if (value === "") {
      setAmount("");
      return;
    }

    // Parse the value to a number
    const numericValue = parseFloat(value);
    if (cryptoName === "bitcoin") {
      if (!isNaN(numericValue)) {
        // If value exceeds btcBalance, set it to btcBalance
        if (numericValue > btcBalance) {
          setAmount(btcBalance.toString());
        } else {
          setAmount(value);
        }
      }
      return;
    }
    if (cryptoName === "ethereum") {
      if (!isNaN(numericValue)) {
        // If value exceeds btcBalance, set it to btcBalance
        if (numericValue > ethBalance) {
          setAmount(ethBalance.toString());
        } else {
          setAmount(value);
        }
      }
      return;
    }
    if (cryptoName === "tether") {
      if (!isNaN(numericValue)) {
        // If value exceeds btcBalance, set it to btcBalance
        if (numericValue > usdtBalance) {
          setAmount(usdtBalance.toString());
        } else {
          setAmount(value);
        }
      }
      return;
    }
    // Check if the value is a valid number
  };
  const [amount, setAmount] = useState("");
  const [estInterest, setEstInterest] = useState(0);
  useEffect(() => {
    calculateEstInterest();
  }, [amount, activeDurationBtc]);

  const calculateEstInterest = () => {
    const rate = activeDurationBtc;
    const interest = (amount * rate) / 100;
    const total = amount + interest;
    setEstInterest(parseFloat(total));
  };
  const [estInterestEth, setEstInterestEth] = useState(0);
  useEffect(() => {
    calculateEstInterestEth();
  }, [amount, activeDurationBtc]);

  const calculateEstInterestEth = () => {
    const rate = activeDurationBtc;
    const interest = (amount * rate) / 100;
    const total = amount + interest;
    setEstInterestEth(parseFloat(total));
  };
  const [estInterestUsdt, setEstInterestUsdt] = useState(0);
  useEffect(() => {
    calculateEstInterestUsdt();
  }, [amount, activeDurationBtc]);

  const calculateEstInterestUsdt = () => {
    const rate = activeDurationBtc;
    const interest = (amount * rate) / 100;
    const total = amount + interest;
    setEstInterestUsdt(parseFloat(total));
  };

  const confirmTransaction = async (depositName) => {
    let e = "crypto";
    if (amount.trim() === "") {
      toast.error("Amount cannot be empty");
      return false;
    }

    // Parse the input to a floating-point number
    const parsedAmount = parseFloat(amount);

    // Check if the parsed amount is not a number
    if (isNaN(parsedAmount)) {
      toast.error("Invalid amount");
      return false;
    }

    // Check if the amount is zero
    if (parsedAmount === 0) {
      toast.error("Amount cannot be zero");
      return false;
    }

    // Check if the amount is negative
    if (parsedAmount < 0) {
      toast.error("Amount cannot be negative");
      return false;
    }

    try {
      setisDisable(true);
      let body;
      if (e == "crypto") {
        body = {
          trxName: depositName,
          amount: -parsedAmount,
          txId: "staking amount",
          e: e,
          status: "completed",
        };
        if (!body.trxName || !body.amount || !body.txId) {
          console.log("body.amount: ", body.amount);
          console.log("body.trxName: ", body.trxName);
          toast.dismiss();
          toast.error("Fill all the required fields");
          return;
        }
      }

      let id = authUser().user._id;
      console.log("e: ", e);

      const newTransaction = await createUserTransactionApi(id, body);

      if (newTransaction.success) {
        toast.dismiss();
        toast.success("Staking completed successfully");

        setstakingModal(false);

        getCoins(authUser().user);
        setCurrentCrypto(null);
        setAmount("");
      } else {
        toast.dismiss();
        toast.error(newTransaction.msg);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error);
    } finally {
      setisDisable(false);
    }
  };
  //

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
                        Crypto Staking Rewards
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
                                Staking Bitcoin
                              </h6>
                            </div>
                            <p className="MuiTypography-root MuiTypography-body2 css-1jorj1k">
                              DURATION
                            </p>
                            <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2 css-krtfz2">
                              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 MuiGrid-grid-md-6 css-kdq3hv">
                                <div
                                  onClick={() => activeBtc(30)}
                                  className={`MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root   ${
                                    activeDurationBtc === 30
                                      ? "css-qy35p"
                                      : "css-18xyzlx"
                                  }`}
                                >
                                  <span className="MuiTypography-root MuiTypography-caption css-50upxb">
                                    30 Days
                                  </span>
                                </div>
                              </div>
                              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 MuiGrid-grid-md-6 css-kdq3hv">
                                <div
                                  onClick={() => activeBtc(60)}
                                  className={`MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root  ${
                                    activeDurationBtc === 60
                                      ? "css-qy35p"
                                      : "css-18xyzlx"
                                  }`}
                                >
                                  <span className="MuiTypography-root MuiTypography-caption css-50upxb">
                                    60 Days
                                  </span>
                                </div>
                              </div>
                              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 MuiGrid-grid-md-6 css-kdq3hv">
                                <div
                                  onClick={() => activeBtc(90)}
                                  className={`MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root  ${
                                    activeDurationBtc === 90
                                      ? "css-qy35p"
                                      : "css-18xyzlx"
                                  }`}
                                >
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

                            <button
                              onClick={() => toggleStaking("btc")}
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
                                Staking Ethereum
                              </h6>
                            </div>
                            <p className="MuiTypography-root MuiTypography-body2 css-1jorj1k">
                              DURATION
                            </p>
                            <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2 css-krtfz2">
                              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 MuiGrid-grid-md-6 css-kdq3hv">
                                <div
                                  onClick={() => activeEth(30)}
                                  className={`MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root   ${
                                    activeDurationEth === 30
                                      ? "css-qy35p"
                                      : "css-18xyzlx"
                                  }`}
                                >
                                  <span className="MuiTypography-root MuiTypography-caption css-50upxb">
                                    30 Days
                                  </span>
                                </div>
                              </div>
                              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 MuiGrid-grid-md-6 css-kdq3hv">
                                <div
                                  onClick={() => activeEth(60)}
                                  className={`MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root  ${
                                    activeDurationEth === 60
                                      ? "css-qy35p"
                                      : "css-18xyzlx"
                                  }`}
                                >
                                  <span className="MuiTypography-root MuiTypography-caption css-50upxb">
                                    60 Days
                                  </span>
                                </div>
                              </div>
                              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 MuiGrid-grid-md-6 css-kdq3hv">
                                <div
                                  onClick={() => activeEth(90)}
                                  className={`MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root  ${
                                    activeDurationEth === 90
                                      ? "css-qy35p"
                                      : "css-18xyzlx"
                                  }`}
                                >
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

                            <button
                              onClick={() => toggleStaking("eth")}
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
                                Staking Tether USDT
                              </h6>
                            </div>
                            <p className="MuiTypography-root MuiTypography-body2 css-1jorj1k">
                              DURATION
                            </p>
                            <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2 css-krtfz2">
                              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 MuiGrid-grid-md-6 css-kdq3hv">
                                <div
                                  onClick={() => activeUsdt(30)}
                                  className={`MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root   ${
                                    activeDurationUsdt === 30
                                      ? "css-qy35p"
                                      : "css-18xyzlx"
                                  }`}
                                >
                                  <span className="MuiTypography-root MuiTypography-caption css-50upxb">
                                    30 Days
                                  </span>
                                </div>
                              </div>
                              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 MuiGrid-grid-md-6 css-kdq3hv">
                                <div
                                  onClick={() => activeUsdt(60)}
                                  className={`MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root  ${
                                    activeDurationUsdt === 60
                                      ? "css-qy35p"
                                      : "css-18xyzlx"
                                  }`}
                                >
                                  <span className="MuiTypography-root MuiTypography-caption css-50upxb">
                                    60 Days
                                  </span>
                                </div>
                              </div>
                              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 MuiGrid-grid-md-6 css-kdq3hv">
                                <div
                                  onClick={() => activeUsdt(90)}
                                  className={`MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root  ${
                                    activeDurationUsdt === 90
                                      ? "css-qy35p"
                                      : "css-18xyzlx"
                                  }`}
                                >
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

                            <button
                              onClick={() => toggleStaking("usdt")}
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
                Stake
                <button
                  className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-inqsmp"
                  tabIndex={0}
                  onClick={toggleStaking}
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
                {currentCrypto === "btc" ? (
                  <form>
                    <div className="MuiStack-root css-36lwkk">
                      <div className="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-1lnu8xy">
                        <label
                          className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined css-58zb7v"
                          data-shrink="false"
                          htmlFor=":r3:"
                          id=":r3:-label"
                        ></label>
                        <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-1a4ax0g">
                          <input
                            aria-invalid="false"
                            aria-describedby=":r3:-helper-text"
                            id=":r3:"
                            name="amount"
                            placeholder="Locked Amount"
                            type="text"
                            className="MuiInputBase-input MuiOutlinedInput-input css-f0guyy"
                            value={amount}
                            onChange={(e) => handleAmountChange(e, "bitcoin")}
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
                          Total Balance{" "}
                          {`${btcBalance.toFixed(8)} (${(
                            btcBalance * liveBtc
                          ).toFixed(2)} USD)`}{" "}
                          BTC
                        </p>
                      </div>
                      <div className="MuiStack-root css-9npne8">
                        <span className="MuiTypography-root MuiTypography-caption css-1canfvu">
                          Rate
                        </span>
                        <span className="MuiTypography-root MuiTypography-caption css-dbb9ax">
                          {activeDurationBtc === 30
                            ? "11%"
                            : activeDurationBtc === 60
                            ? "45%"
                            : activeDurationBtc === 90
                            ? "123%"
                            : "..."}{" "}
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
                          Est. Interest
                        </span>
                        <span className="MuiTypography-root MuiTypography-caption css-dbb9ax">
                          {estInterest.toFixed(8)} BTC
                        </span>
                      </div>
                      <button
                        className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-1j9kn1e"
                        tabIndex={0}
                        onClick={() => confirmTransaction("bitcoin")}
                        type="button"
                      >
                        {isDisable ? (
                          <div>
                            <div className="nui-placeload animate-nui-placeload h-4 w-8 rounded mx-auto"></div>
                          </div>
                        ) : (
                          <>
                            Stake
                            <span className="MuiTouchRipple-root css-w0pj6f" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : currentCrypto === "eth" ? (
                  <form>
                    <div className="MuiStack-root css-36lwkk">
                      <div className="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-1lnu8xy">
                        <label
                          className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined css-58zb7v"
                          data-shrink="false"
                          htmlFor=":r3:"
                          id=":r3:-label"
                        ></label>
                        <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-1a4ax0g">
                          <input
                            aria-invalid="false"
                            aria-describedby=":r3:-helper-text"
                            id=":r3:"
                            name="amount"
                            placeholder="Locked Amount"
                            type="text"
                            className="MuiInputBase-input MuiOutlinedInput-input css-f0guyy"
                            value={amount}
                            onChange={(e) => handleAmountChange(e, "ethereum")}
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
                          {isLoading ? (
                            "..."
                          ) : (
                            <>
                              {`${ethBalance.toFixed(8)} (${(
                                ethBalance * 2241.86
                              ).toFixed(2)} USD)`}{" "}
                              ETH
                            </>
                          )}
                        </p>
                      </div>
                      <div className="MuiStack-root css-9npne8">
                        <span className="MuiTypography-root MuiTypography-caption css-1canfvu">
                          Rate
                        </span>
                        <span className="MuiTypography-root MuiTypography-caption css-dbb9ax">
                          {activeDurationEth === 30
                            ? "11%"
                            : activeDurationEth === 60
                            ? "45%"
                            : activeDurationEth === 90
                            ? "123%"
                            : "..."}
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
                          Est. Interest
                        </span>
                        <span className="MuiTypography-root MuiTypography-caption css-dbb9ax">
                          {estInterestEth.toFixed(8)} ETH
                        </span>
                      </div>
                      <button
                        className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-1j9kn1e"
                        tabIndex={0}
                        onClick={() => confirmTransaction("ethereum")}
                        type="button"
                      >
                        {isDisable ? (
                          <div>
                            <div className="nui-placeload animate-nui-placeload h-4 w-8 rounded mx-auto"></div>
                          </div>
                        ) : (
                          <>
                            Stake
                            <span className="MuiTouchRipple-root css-w0pj6f" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : currentCrypto === "usdt" ? (
                  <form>
                    <div className="MuiStack-root css-36lwkk">
                      <div className="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-1lnu8xy">
                        <label
                          className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined css-58zb7v"
                          data-shrink="false"
                          htmlFor=":r3:"
                          id=":r3:-label"
                        ></label>
                        <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-1a4ax0g">
                          <input
                            aria-invalid="false"
                            aria-describedby=":r3:-helper-text"
                            id=":r3:"
                            name="amount"
                            placeholder="Locked Amount"
                            type="text"
                            className="MuiInputBase-input MuiOutlinedInput-input css-f0guyy"
                            value={amount}
                            onChange={(e) => handleAmountChange(e, "tether")}
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
                          {isLoading ? (
                            "..."
                          ) : (
                            <>
                              Total Balance{" "}
                              {`${usdtBalance.toFixed(
                                8
                              )} (${usdtBalance.toFixed(2)} USD)`}{" "}
                              USDT
                            </>
                          )}
                        </p>
                      </div>
                      <div className="MuiStack-root css-9npne8">
                        <span className="MuiTypography-root MuiTypography-caption css-1canfvu">
                          Rate
                        </span>
                        <span className="MuiTypography-root MuiTypography-caption css-dbb9ax">
                          {activeDurationUsdt === 30
                            ? "11%"
                            : activeDurationUsdt === 60
                            ? "45%"
                            : activeDurationUsdt === 90
                            ? "123%"
                            : "..."}
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
                          Est. Interest
                        </span>
                        <span className="MuiTypography-root MuiTypography-caption css-dbb9ax">
                          {estInterestUsdt.toFixed(2)} USDT
                        </span>
                      </div>
                      <button
                        className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-1j9kn1e"
                        tabIndex={0}
                        onClick={() => confirmTransaction("tether")}
                        type="button"
                      >
                        {isDisable ? (
                          <div>
                            <div className="nui-placeload animate-nui-placeload h-4 w-8 rounded mx-auto"></div>
                          </div>
                        ) : (
                          <>
                            Stake
                            <span className="MuiTouchRipple-root css-w0pj6f" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  ""
                )}
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
