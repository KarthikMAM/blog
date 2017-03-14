import React from "react";

import { Api } from "../api";
import { About } from "../components";

export class AboutContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      about: undefined
    };
  }

  componentDidMount() {
    Api.getAbout().then(
      res => this.setState({ about: res.payload }),
      err => console.log(err)
    );
  }

  render() {
    return this.state.about === undefined ? null : <About {...this.state.about} />;
  }
}