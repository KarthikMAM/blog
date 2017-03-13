import React from 'react';

import { Api } from '../api';
import {
  Home,
  Error
} from '../components';

export class HomeContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      about: undefined,
      err: undefined
    };
  }

  componentDidMount() {
    Api.getAbout().then(
      res => this.setState({ about: res, err: null }),
      err => this.setState({ err })
    );
  }

  render() {
    return this.state.err === null ?
      <Home {...this.state.about} /> :
      <Error content={"Error: " + JSON.stringify(this.state.err)} />;
  }
}