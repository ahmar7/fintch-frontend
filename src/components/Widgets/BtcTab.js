import React, { useEffect, useRef } from "react";

const TradingViewWidget = () => {
  const tradingViewWidgetRef = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.async = true;
    script.innerHTML = `
      {
        "symbol": "BINANCE:BTCUSDT",
        "width": "100%",
        "height": "220",
        "locale": "en",
        "dateRange": "1M",
        "colorTheme": "dark",
        "trendLineColor": "rgba(0, 0, 255, 1)",
        "underLineColor": "#8b5cf6",
        "underLineBottomColor": "rgba(0, 0, 255, 0)",
        "isTransparent": true,
        "autosize": false,
        "largeChartUrl": "",
        "chartOnly": false,
        "backgroundColor": "rgba(0, 0, 0, 1)"
      }
    `;

    // Ensure the ref is valid before manipulating its contents
    if (tradingViewWidgetRef.current) {
      tradingViewWidgetRef.current.appendChild(script);
    }

    return () => {
      // Ensure the ref is still valid before manipulating it
      if (tradingViewWidgetRef.current) {
        tradingViewWidgetRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container" ref={tradingViewWidgetRef}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewWidget;
