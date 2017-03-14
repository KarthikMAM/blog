import React from "react";
import ReactDOM from "react-dom";

import { Home, About, Payload, PayloadList } from "./containers";
import "./styles";

ReactDOM.render(
  <PayloadList {...{
    payloadType: "blog",
    payloadSubtype: "index"
  }} />,
  document.getElementById("root")
);