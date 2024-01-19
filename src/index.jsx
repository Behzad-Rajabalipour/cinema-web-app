// Importing necessary modules from React and ReactDOM
import React from "react";
import ReactDOM from "react-dom/client";

// Importing the main App component from "./App1"
import App from "./App1";

// Creating a root using ReactDOM.createRoot and specifying the target element with the ID "root"
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the main App component inside the root element
root.render(<App />);
