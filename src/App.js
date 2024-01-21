import React from "react";
import Router from "./config/Router";
import "./assets/css/styles.css";
import "./assets/css/main.css";
import "./assets/css/all.css";
import "./assets/css/new.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/font-sheet.css";
import { BitcoinProvider } from "./contextApi/BtcPrice";

function App() {
  return (
    <BitcoinProvider>
      <div className="App">
        <Router />
      </div>
    </BitcoinProvider>
  );
}

export default App;
