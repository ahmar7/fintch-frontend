import React, { useEffect, useRef, useState } from "react";
import "./widget.css";
const CryptoMarketWidget = () => {
  const scriptRef = useRef(null);

  useEffect(() => {
    // Set WorldCoinIndex widget configuration
    window.cf_widget_fiat = "usd";
    window.cf_widget_orderby = "volume";
    window.cf_widget_language = "en";
    window.cf_widget_theme = "dark";
    window.cf_widget_height = 500;
    window.cf_widget_width = "auto";
    window.cf_widget_transparent = false;

    // Check if the script has already been created
    if (!scriptRef.current) {
      // Load WorldCoinIndex widget script
      const script = document.createElement("script");
      script.src =
        "https://www.worldcoinindex.com/content/widgets/js/cryptocurrencymarket.js?v=2";
      script.async = true;
      script.type = "text/javascript";

      // Append the script to the document body
      document.body.appendChild(script);

      // Set the scriptRef to the created script element
      scriptRef.current = script;

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []); // Run the effect only once on component mount

  return <div className="wci_overview_widget_div  line-bgs "></div>;
};

export default CryptoMarketWidget;
