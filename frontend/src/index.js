import { hot } from "react-hot-loader/root";
import React from "react";
import ReactDOM from "react-dom";

import App from "root/App";

const HottestApp = hot(App);

window.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<HottestApp />, document.getElementById("root"));
});
