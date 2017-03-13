import React from 'react';
import request from 'superagent';

export class HelloWorld extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      err: null
    };
  }

  static propTypes = {
    name: React.PropTypes.string
  };

  componentDidMount() {
    new Promise((resolve, reject) => {
      request
        .get('http://localhost:3000/about.json')
        .end((err, res) => {
          if (err || !res.ok) { reject(err); return; }

          res = JSON.parse(res.text);

          res.success ? resolve(res.payload) : reject(err);
        });
    }).then(
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