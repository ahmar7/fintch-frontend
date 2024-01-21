import React, { useEffect, useRef } from "react";

const CoinGeckoConverterWidget = () => {
  // Use useRef to track whether the script has already been added
  const scriptRef = useRef(null);

  useEffect(() => {
    // Check if the script has already been added
    if (!scriptRef.current) {
      // Load the CoinGecko converter widget script
      const script = document.createElement("script");
      script.src =
        "https://widgets.coingecko.com/coingecko-coin-converter-widget.js";
      script.async = true;
      document.head.appendChild(script);

      // Set the scriptRef to prevent re-adding the script
      scriptRef.current = script;

      // Cleanup: Remove the script when the component unmounts
      return () => {
        document.head.removeChild(scriptRef.current);
      };
    }
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div>
      {/* Your other React components or content */}

      {/* Embed the CoinGecko Coin Converter Widget */}
      <coingecko-coin-converter-widget
        coin-id="bitcoin"
        currency="usd"
        background-color="#000000"
        font-color="#ffffff"
        locale="en"
      ></coingecko-coin-converter-widget>
    </div>
  );
};

export default CoinGeckoConverterWidget;
