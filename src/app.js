import React from "react";

import { Header } from "./components";
import { Error } from "./containers";

export class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.object,
    location: React.PropTypes.object,
    params: React.PropTypes.object
  };

  render() {
    return (
      <div>
        { this.props.params.payloadType && <Header activePath={this.props.location.pathname} /> }

        <Error>
          <div className="container">
            {this.props.children}
          </div>
        </Error>
      </div >
    );
  }
}