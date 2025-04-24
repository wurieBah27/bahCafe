import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

// Access environment variables
const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const firebaseApiKey = import.meta.env.VITE_FIREBASE_API_KEY;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);
