import "./styles/index.scss";

import React from "react";
import ReactDOM from "react-dom";
import App from "./scripts/components/app/app";
import reportWebVitals from "./scripts/reportWebVitals";

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById(`root`)
);

// eslint-disable-next-line no-console
reportWebVitals(console.log);
