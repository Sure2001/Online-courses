import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./cartpages/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <App />
  </CartProvider>
);
