import React, { useEffect, useRef } from "react";

const TradingViewTickerTapeWidget = () => {
  const tradingViewWidgetRef = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = `
      {
        "symbols": [
          {
            "proName": "FOREXCOM:SPXUSD",
            "title": "S&P 500"
          },
          {
            "proName": "FOREXCOM:NSXUSD",
            "title": "US 100"
          },
          {
            "proName": "FX_IDC:EURUSD",
            "title": "EUR to USD"
          },
          {
            "proName": "BITSTAMP:BTCUSD",
            "title": "Bitcoin"
          },
          {
            "proName": "BITSTAMP:ETHUSD",
            "title": "Ethereum"
          }
        ],
        "showSymbolLogo": true,
        "isTransparent": true,
        "displayMode": "regular",
        "colorTheme": "dark",
        "locale": "en"
      }
    `;

    if (tradingViewWidgetRef.current) {
      tradingViewWidgetRef.current.appendChild(script);
    }

    return () => {
      if (tradingViewWidgetRef.current) {
        tradingViewWidgetRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container" ref={tradingViewWidgetRef}>
      {tradingViewWidgetRef.current && (
        <>
          <div className="tradingview-widget-container__widget"></div>
        </>
      )}
    </div>
  );
};

export default TradingViewTickerTapeWidget;
