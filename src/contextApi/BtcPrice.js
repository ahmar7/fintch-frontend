// BitcoinContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const BitcoinContext = createContext();

export const useBitcoin = () => {
  return useContext(BitcoinContext);
};

export const BitcoinProvider = ({ children }) => {
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.coindesk.com/v1/bpi/currentprice.json"
        );

        if (
          response &&
          response.data &&
          response.data.bpi &&
          response.data.bpi.USD &&
          response.data.bpi.USD.rate
        ) {
          setBitcoinPrice(response.data.bpi.USD.rate);
        } else {
          console.error("Invalid API response format:", response);
        }
      } catch (error) {
        console.error("Error fetching Bitcoin price:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    const intervalId = setInterval(fetchBitcoinPrice, 60000);

    fetchBitcoinPrice();

    return () => clearInterval(intervalId);
  }, []);

  const contextValue = {
    bitcoinPrice,
    loading,
  };

  return (
    <BitcoinContext.Provider value={contextValue}>
      {children}
    </BitcoinContext.Provider>
  );
};
