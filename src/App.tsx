import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import Gameboard from "./Gameboard";

const App = () => (
  <div className="container">
    <Gameboard rows={2} columns={2} />
  </div>
);
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(<App />);
