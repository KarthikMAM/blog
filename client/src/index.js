import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { IndexRoute, Router, Route, browserHistory } from "react-router";
import { newError } from "./actions";

import { store } from "./store";
import { Home, About, Payload, PayloadList } from "./containers";
import { App } from "./app";
import "./styles";

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
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
          <Route path="items/:query" component={({ params, location }) => <Payload {...{
            payloadType: params.payloadType,
            payloadSubtype: "items",
            query: params.query,
            target: location.pathname
          }} />} />
          <Route path="tags/:query" component={({ params, location }) => <PayloadList {...{
            payloadType: params.payloadType,
            payloadSubtype: "tags",
            query: params.query,
            page: location.query.page === undefined ? 1 : parseInt(location.query.page, 10),
            location
          }} />} />
          <Route path="*" onEnter={() => { store.dispatch(newError([["Error", "Page not found"]])); }} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);