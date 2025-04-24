import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/navigation";

import App from "./App.jsx";

/* redux store */
import { Provider } from "react-redux";
import store from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
