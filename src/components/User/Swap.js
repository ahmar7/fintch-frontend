import React, { useEffect, useState } from "react";
import SideBar from "../../layout/UserSidebar/SideBar";
import {
  createUserTransactionDepositSwapApi,
  createUserTransactionWithdrawSwapApi,
  getCoinsUserApi,
  getsignUserApi,
} from "../../Api/Service";
import { toast } from "react-toastify";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import UserHeader from "./UserHeader";
import "./style.css";
import axios from "axios";
const Swap = () => {
  const [Active, setActive] = useState(false);
  let toggleBar = () => {
    if (Active === true) {
      setActive(false);
    } else {
      setActive(true);
    }
  };
  const [UserData, setUserData] = useState(true);

  const [liveBtcPrice, setLiveBtcPrice] = useState(0);
  const [liveEthPrice, setLiveEthPrice] = useState(0);
  const [liveUsdtPrice, setLiveUsdtPrice] = useState(1);
  const [isDisable, setisDisable] = useState(true);
  const authUser = useAuthUser();
  const Navigate = useNavigate();
  const [offers, setoffers] = useState(false);

  const [selectedCurrency, setSelectedCurrency] = useState("USDT");
  const [placeholder, setplaceholder] = useState("You will receive");
  const [ethBalance, setethBalance] = useState(0);
  const [usdtBalance, setusdtBalance] = useState(0);

  setTimeout(() => {
    setoffers(true);
  }, 1500);
  useEffect(() => {
    if (authUser().user.role === "user") {
      return;
    } else if (authUser().user.role === "admin") {
      Navigate("/admin/dashboard");
      return;
    }
  }, []);
  //

  const filterAndSumTransactions = (transactions, currency) => {
    const filtered = transactions.filter(
      (transaction) =>
        transaction.trxName.includes(currency) &&
        transaction.status.includes("completed")
    );
    return filtered.reduce(
      (total, transaction) => total + parseFloat(transaction.amount),
      0
    );
  };

  const [isLoading, setisLoading] = useState(true);

  const [liveBtc, setliveBtc] = useState(null);
  const [btcBalance, setbtcBalance] = useState(0);

  const [ExpectedRate, setExpectedRate] = useState(0);
  const [loadingSecondInput, setLoadingSecondInput] = useState(false);
  const [selectedFromCurrency, setSelectedFromCurrency] = useState("USDT");
  const [selectedToCurrency, setSelectedToCurrency] = useState("BTC");
  const [selectedToCurrencyInput, setSelectedToCurrencyInput] = useState("");
  const getCoinsPrice = async () => {
    try {
      const [response, ethResponse] = await Promise.all([
        axios.get("https://api.coindesk.com/v1/bpi/currentprice.json"),
        axios.get("https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT"),
      ]);

      if (response && response.data) {
        let val = response.data.bpi.USD.rate.replace(/,/g, "");
        setLiveBtcPrice(parseFloat(val));
        setliveBtc(val);
        updateExpectedRate();
      }

      if (ethResponse && ethResponse.data) {
        setLiveEthPrice(parseFloat(ethResponse.data.price));
      }

      if (ethResponse && ethResponse.data) {
        setLiveEthPrice(parseFloat(ethResponse.data.price));
        console.log(
          "ethResponse.data.data.price: ",
          ethResponse.data.data.price
        );
      }
      if (response && response.data) {
        let val = response.data.bpi.USD.rate.replace(/,/g, "");
        console.log("val: ", val);

        setLiveBtcPrice(parseFloat(val));
      }
      console.log("response: ", response);
    } catch (error) {
      toast.dismiss();
      toast.error(error);
    } finally {
    }
  };
  const getCoins = async () => {
    //

    let id = authUser().user._id;
    try {
      const userCoins = await getCoinsUserApi(id);

      if (userCoins.success) {
        setUserData(userCoins.getCoin);
        console.log("userCoins.getCoin: ", userCoins.getCoin);
        // setUserTransactions;
        console.log("liveBtc", userCoins.getCoin.transactions);

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
  const handleInputChange = (event) => {
    setisDisable(true);
    setplaceholder("");
    let value = event.target.value;
    let maxBalance =
      selectedFromCurrency === "BTC"
        ? btcBalance
        : selectedFromCurrency === "USDT"
        ? usdtBalance
        : ethBalance;

    let inputValue = value;
    if (parseFloat(value) > maxBalance) {
      inputValue = maxBalance.toString();
    }

    if (isNaN(value) || value < 0) {
      setInputValue("");
      setSelectedToCurrencyInput("");
      setLoadingSecondInput(false);
      setisDisable(true);
      return;
    }
    setInputValue(inputValue);

    if (selectedFromCurrency && selectedToCurrency) {
      setSelectedToCurrencyInput("");
      setLoadingSecondInput(true);

      setTimeout(() => {
        let convertedValue = 0;

        if (selectedFromCurrency === "BTC" && selectedToCurrency === "ETH") {
          convertedValue = inputValue * (liveBtcPrice / liveEthPrice);
        } else if (
          selectedFromCurrency === "ETH" &&
          selectedToCurrency === "BTC"
        ) {
          convertedValue = inputValue * (liveEthPrice / liveBtcPrice);
        } else if (
          selectedFromCurrency === "BTC" &&
          selectedToCurrency === "USDT"
        ) {
          convertedValue = inputValue * (liveBtcPrice / liveUsdtPrice);
        } else if (
          selectedFromCurrency === "ETH" &&
          selectedToCurrency === "USDT"
        ) {
          convertedValue = inputValue * (liveEthPrice / liveUsdtPrice);
        } else if (
          selectedFromCurrency === "USDT" &&
          selectedToCurrency === "BTC"
        ) {
          convertedValue = inputValue / liveBtcPrice;
        } else if (
          selectedFromCurrency === "USDT" &&
          selectedToCurrency === "ETH"
        ) {
          convertedValue = inputValue * (liveUsdtPrice / liveEthPrice);
        }

        setSelectedToCurrencyInput(convertedValue.toFixed(8));
        setLoadingSecondInput(false);
        setplaceholder("You will receive");
        setisDisable(false);
        if (isNaN(value) || value == 0 || value < 0 || value == "") {
          setisDisable(true);
        }
      }, 500); // Delay for realism, adjust as needed
    }
  };

  const [inputValue, setInputValue] = useState("");
  const handleCurrencyChange = (event, type) => {
    const currency = event.target.value;
    let newFromCurrency = selectedFromCurrency;
    let newToCurrency = selectedToCurrency;

    if (type === "from") {
      newFromCurrency = currency;
      if (currency === selectedToCurrency) {
        // Reset selected currency in 'To' dropdown
        newToCurrency = currency === "BTC" ? "ETH" : "BTC";
      }
    } else {
      newToCurrency = currency;
      if (currency === selectedFromCurrency) {
        // Reset selected currency in 'From' dropdown
        newFromCurrency = currency === "BTC" ? "ETH" : "BTC";
      }
    }

    setSelectedFromCurrency(newFromCurrency);
    setSelectedToCurrency(newToCurrency);
    updateExpectedRate(newFromCurrency, newToCurrency);
    setSelectedCurrency(currency);
    setInputValue("");
    setisDisable(true);
    setSelectedToCurrencyInput("");
    setplaceholder("You will receive");
  };

  const updateExpectedRate = (fromCurrency, toCurrency) => {
    let rate = 0;

    if (fromCurrency === "BTC" && toCurrency === "ETH") {
      rate = liveBtcPrice / liveEthPrice;
    } else if (fromCurrency === "ETH" && toCurrency === "BTC") {
      rate = liveEthPrice / liveBtcPrice;
    } else if (fromCurrency === "BTC" && toCurrency === "USDT") {
      rate = liveBtcPrice;
    } else if (fromCurrency === "ETH" && toCurrency === "USDT") {
      rate = liveEthPrice / liveUsdtPrice;
    } else if (fromCurrency === "USDT" && toCurrency === "BTC") {
      rate = 1 / liveBtcPrice;
    } else if (fromCurrency === "USDT" && toCurrency === "ETH") {
      rate = liveUsdtPrice / liveEthPrice;
    } else {
      rate = 1 / 64249.246;
    }
    setExpectedRate(rate.toFixed(8));
  };

  // Maximum available balance based on selected currency
  const maxBalance =
    selectedCurrency === "BTC"
      ? btcBalance
      : selectedCurrency === "USDT"
      ? usdtBalance
      : ethBalance;
  useEffect(() => {
    getCoins();
    getCoinsPrice();
  }, []);
  //

  const convertCurrency = (value, fromCurrency, toCurrency) => {
    let convertedValue = 0;

    if (fromCurrency === "BTC") {
      if (toCurrency === "ETH") {
        convertedValue = (value * liveBtcPrice) / liveEthPrice;
      } else if (toCurrency === "USDT") {
        convertedValue = value * liveBtcPrice;
      }
    } else if (fromCurrency === "ETH") {
      if (toCurrency === "BTC") {
        convertedValue = (value * liveEthPrice) / liveBtcPrice;
      } else if (toCurrency === "USDT") {
        convertedValue = (value * liveEthPrice) / liveUsdtPrice;
      }
    } else if (fromCurrency === "USDT") {
      if (toCurrency === "BTC") {
        convertedValue = value / liveBtcPrice;
      } else if (toCurrency === "ETH") {
        convertedValue = (value * liveUsdtPrice) / liveEthPrice;
      }
    }

    setSelectedToCurrencyInput(convertedValue.toFixed(8));
  };
  //

  const postUserTransaction = async () => {
    setisDisable(true);
    let selectedFromCurrencyTrxName = "";
    let selectedToCurrencyTrxName = "";
    let fromAmount = inputValue;
    let toAmount = selectedToCurrencyInput;
    let fromAddress = "placeholder";
    let status = "completed";
    let fromType = "withdraw";
    let toType = "deposit";
    let isHidden = true;

    try {
      let id = authUser().user._id;

      if (selectedFromCurrency === "BTC") {
        selectedFromCurrencyTrxName = "bitcoin";
      } else if (selectedFromCurrency === "ETH") {
        selectedFromCurrencyTrxName = "ethereum";
      } else if (selectedFromCurrency === "USDT") {
        selectedFromCurrencyTrxName = "tether";
      } else {
        selectedFromCurrencyTrxName = "";
      }

      if (selectedToCurrency === "BTC") {
        selectedToCurrencyTrxName = "bitcoin";
      } else if (selectedToCurrency === "ETH") {
        selectedToCurrencyTrxName = "ethereum";
      } else if (selectedToCurrency === "USDT") {
        selectedToCurrencyTrxName = "tether";
      } else {
        selectedToCurrencyTrxName = "";
      }

      if (!selectedFromCurrencyTrxName || !selectedToCurrencyTrxName) {
        toast.info("Please select a currency");
        return;
      }

      if (
        inputValue <= 0 ||
        inputValue === 0 ||
        inputValue === "" ||
        inputValue === null
      ) {
        toast.error("Amount cannot be less than or equal to zero");
        return;
      }

      let bodyWithdraw = {
        trxName: selectedFromCurrencyTrxName,
        amount: -fromAmount,
        txId: "placeholder",
        fromAddress: fromAddress,
        status: status,
        type: fromType,
        isHidden: isHidden,
      };

      let bodyDeposit = {
        trxName: selectedToCurrencyTrxName,
        amount: toAmount,
        txId: "placeholder",
        fromAddress: fromAddress,
        status: status,
        type: toType,
        isHidden: isHidden,
      };

      // Make both API calls in parallel
      const [newTransactionWithdraw, newTransactionDeposit] = await Promise.all(
        [
          createUserTransactionWithdrawSwapApi(id, bodyWithdraw),
          createUserTransactionDepositSwapApi(id, bodyDeposit),
        ]
      );

      if (newTransactionDeposit.success) {
        toast.success(newTransactionDeposit.msg);
        Navigate("/assets");
      } else {
        console.log("neemdone");

        toast.error("One or both transactions failed.");
      }
    } catch (error) {
      console.log("notdone", error);
      toast.error(error);
    } finally {
      setisDisable(false);
    }
  };

  return (
    <div className="dark dtr user-bg">
      <div>
        <div className="pb-20">
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
            <div className="col-xxl-3 col-xl-6" bis_skin_checked={1}>
              <div className="card card-f" bis_skin_checked={1}>
                <div className="card-header" bis_skin_checked={1}>
                  <h4 className="card-title">Convert </h4>
                </div>
                <div className="card-body">
                  <form className="currency_validate trade-form row g-3">
                    <div className="col-12">
                      <label className="form-label">From</label>
                      <div className="input-group">
                        <select
                          className="form-control"
                          onChange={(e) => handleCurrencyChange(e, "from")}
                          value={selectedFromCurrency}
                        >
                          <option value="USDT">USDT</option>
                          <option value="ETH">ETH</option>
                          <option value="BTC">BTC</option>
                        </select>
                        <input
                          type="text"
                          className="form-control add"
                          placeholder={`Enter amount to convert`}
                          value={inputValue}
                          onChange={handleInputChange}
                        />
                      </div>
                      <p className="mt-2">
                        Available Balance:{" "}
                        {selectedFromCurrency === "BTC"
                          ? btcBalance
                          : selectedFromCurrency === "USDT"
                          ? usdtBalance
                          : ethBalance}{" "}
                        {selectedFromCurrency}
                      </p>
                    </div>
                    <div className="col-12">
                      <label className="form-label">To</label>
                      <div className="input-group">
                        <select
                          className="form-control"
                          onChange={(e) => handleCurrencyChange(e, "to")}
                          value={selectedToCurrency}
                        >
                          <option value="USDT">USDT</option>
                          <option value="ETH">ETH</option>
                          <option value="BTC">BTC</option>
                        </select>
                        <input
                          type="text"
                          className="form-control asd"
                          placeholder={`${placeholder}`}
                          readOnly
                          value={selectedToCurrencyInput}
                        />
                        {loadingSecondInput && (
                          <div
                            className="spinner-border borer spinner-border-sm ms-2"
                            role="status"
                          ></div>
                        )}
                      </div>
                    </div>
                    <p className="mb-2 mt-2">
                      Expected rate: 1 {selectedFromCurrency} ~ {ExpectedRate}{" "}
                      {selectedToCurrency}
                      <br />
                      No extra fees
                    </p>
                    <button
                      onClick={postUserTransaction}
                      disabled={isDisable}
                      type="button"
                      className="btn btn-success btn-block"
                    >
                      Convert Now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swap;
