import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />

    <ToastContainer
      position="bottom-center"
      transition={Slide}
      autoClose={2000}
      closeButton={false}
      pauseOnFocusLoss={false}
      theme="colored"
    />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
