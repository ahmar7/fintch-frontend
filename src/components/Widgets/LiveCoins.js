import React, { useEffect, useRef } from "react";

const TradingViewWidget = () => {
  const tradingViewRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
    script.async = true;
    script.text = JSON.stringify({
      width: "100%",
      height: "490",
      defaultColumn: "overview",
      screener_type: "crypto_mkt",
      displayCurrency: "USD",
      colorTheme: "dark",
      locale: "en",
      isTransparent: true,
    });

    tradingViewRef.current.appendChild(script);

    return () => {
      // Check if tradingViewRef.current is not null before removing child nodes
      if (tradingViewRef.current) {
        while (tradingViewRef.current.firstChild) {
          tradingViewRef.current.removeChild(tradingViewRef.current.firstChild);
        }
      }
    };
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <div ref={tradingViewRef} className="tradingview-widget-container sdws">
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewWidget;
