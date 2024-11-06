import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastProvider } from "./assets/hooks/Toastify.jsx";
import { Provider } from "react-redux";
import { Store } from "./Services/Store.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <ToastProvider>
        <Provider store={Store}>
          <App />
        </Provider>
      </ToastProvider>
    </Router>
  </StrictMode>
);
