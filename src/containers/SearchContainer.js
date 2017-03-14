import React from 'react';

import { SearchWell } from '../components';

export class SearchContainer extends React.Component {
  
  constructor(props) {
    super(props);

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  static propTypes = {
    payloadType: React.PropTypes.string.isRequired
  }

  onChangeHandler() {
    console.log('hello');
  }

  render() {
    return <SearchWell onChangeHandler={this.onChangeHandler} placeholder={this.props.payloadType} />;
  }
}
