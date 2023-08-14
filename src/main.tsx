import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { StoreProvider } from "./context/store_context";
import { CartProvider } from "./context/cart_context";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <StoreProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </StoreProvider>
  </React.StrictMode>
);
