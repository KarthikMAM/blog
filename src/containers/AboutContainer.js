import React from 'react';

import { Api } from '../api';
import {
  About,
  Error
} from '../components';

export class AboutContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      about: undefined,
      err: undefined
    };
  }

  componentDidMount() {
    Api.getAbout().then(
      res => this.setState({ about: res.payload, err: null }),
      err => this.setState({ err })
    );
  }

  render() {
    return this.state.err === null ?
      <About {...this.state.about} /> :
      <Error content={"Error: " + JSON.stringify(this.state.err)} />;
  }
}