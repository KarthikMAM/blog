import React from 'react';

import { Api } from './Api';
import { About } from './About';
import { Error } from './Error';

export class AboutContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      about: undefined,
      err: undefined
    };
  }

  componentDidMount() {
    Api.getName().then(
      res => this.setState({ about: res, err: null }),
      err => this.setState({ err })
    );
  }

  render() {
    return this.state.err === null ?
      <About {...this.state.about} /> :
      <Error content={"Error: " + JSON.stringify(this.state.err)} />;
  }
}