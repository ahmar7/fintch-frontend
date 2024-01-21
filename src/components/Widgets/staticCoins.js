import React, { useEffect, useRef, useState } from "react";
import "./widget.css";
const StaticCoin = () => {
  // Use useRef to track whether the script has already been added
  const scriptRef = useRef(null);

  const [delayedClass, setDelayedClass] = useState("");
  useEffect(() => {
    // Check if the script has already been added
    if (!scriptRef.current) {
      // Load the CoinGecko widget script
      const script = document.createElement("script");
      script.src =
        "https://widgets.coingecko.com/coingecko-coin-price-static-headline-widget.js";
      script.async = true;
      document.head.appendChild(script);

      // Set the scriptRef to prevent re-adding the script
      scriptRef.current = script;

      // Cleanup: Remove the script when the component unmounts
      return () => {
        document.head.removeChild(scriptRef.current);
      };
    }
    const delayTimeout = setTimeout(() => {
      setDelayedClass("chsa");
    }, 2000);
    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(delayTimeout);
  }, []);

  return (
    <div className={delayedClass}>
      {/* Your other React components or content */}

      {/* Embed the CoinGecko Coin Price Static Headline Widget */}
      <coingecko-coin-price-static-headline-widget
        coin-ids="bitcoin,ethereum,eos,ripple,litecoin"
        currency="usd"
        locale="en"
        background-color="#000000"
      ></coingecko-coin-price-static-headline-widget>
    </div>
  );
};

export default StaticCoin;
