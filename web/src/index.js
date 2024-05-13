import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/style.css";
import App from "./components/App";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);
