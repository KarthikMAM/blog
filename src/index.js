import React from "react";
import ReactDOM from "react-dom";

import { Home, About, Payload, PayloadList } from "./containers";
import { IndexRoute, Router, Route, browserHistory } from "react-router";
import "./styles";

ReactDOM.render(
  <Router history={browserHistory} >
    <Route path="/" component={Home} />
    <Route path="about" component={About} />
    <Route path="home" component={Home} />
    <Route path="contact" component={Home} />

    <Route path=":payloadType">
      <IndexRoute component={({ params, location }) => <PayloadList {...{
        payloadType: params.payloadType,
        payloadSubtype: "index",
        page: location.query.page === undefined ? 1 : parseInt(location.query.page, 10),
        location
      }} />} />
      <Route path="items/:query" component={({ params }) => <Payload {...{
        payloadType: params.payloadType,
        payloadSubtype: "items",
        query: params.query
      }} />} />
      <Route path="tags/:query" component={({ params, location }) => <PayloadList {...{
        payloadType: params.payloadType,
        payloadSubtype: "tags",
        query: params.query,
        page: location.query.page === undefined ? 1 : parseInt(location.query.page, 10),
        location
      }} />} />

    </Route>
  </Router>,
  document.getElementById("root")
);