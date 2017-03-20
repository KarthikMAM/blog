import React from "react";

import { Header, Footer } from "./components";
import { Status } from "./containers";

export class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.object,
    location: React.PropTypes.object,
    params: React.PropTypes.object
  };

  render() {
    return (
      <div>
        <Status />

        {this.props.location.pathname !== "/" && <Header activePath={this.props.location.pathname} />}

        <div className="container">
          {this.props.children}
        </div>

        {this.props.location.pathname !== "/" && <Footer />}
      </div >
    );
  }
}