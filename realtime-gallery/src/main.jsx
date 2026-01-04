import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Global styles (Tailwind base, components, utilities)

// Create React root and render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* StrictMode helps detect potential problems in development */}
    <App />
  </React.StrictMode>
);
