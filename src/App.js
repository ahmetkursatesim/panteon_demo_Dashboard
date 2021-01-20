import React from "react";
import ContextConnector from "./config/connector";
import Routes from "./components/routes";
function App() {
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
    document.head.appendChild(styleLink);
  return (
      <ContextConnector>
         <Routes />
      </ContextConnector>
  );
}

export default App;
