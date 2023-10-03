import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { Provider as ReduxProvider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ReduxProvider store={store}>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </ReduxProvider>
);
