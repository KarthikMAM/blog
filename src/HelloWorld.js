import React from 'react';
import { Api } from './Api';

export class HelloWorld extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      err: null
    };
  }

  componentDidMount() {
    Api.getName().then(
      res => this.setState({ name: res.name, err: null }),
      err => this.setState({ err })
    );
  }

  render() {
    return this.state.err === null ?
      <h1> Hello {this.state.name} </h1> :
      <h1> {JSON.stringify(this.state.err)} </h1>;
  }
}