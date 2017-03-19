import React from "react";
import { browserHistory } from "react-router";

import { SearchWell } from "../components";
import { Api } from "../api";

export class SearchContainer extends React.Component {

  constructor(props) {
    super(props);

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);

    this.state = {
      searchResults: {},
      currentSearchQuery: ""
    };
  }

  static propTypes = {
    payloadType: React.PropTypes.string.isRequired
  }

  onChangeHandler(e) {
    if (e.target.value[0].toLowerCase() !== this.state.currentSearchQuery) {
      let currentSearchQuery = e.target.value[0].toLowerCase();

      this.setState({ currentSearchQuery: currentSearchQuery });

      Api.getSearch(this.props.payloadType, currentSearchQuery).then(
        res => this.setState((prevState) => ({ searchResults: { ...prevState.searchResults, [currentSearchQuery]: res } })),
        err => { this.setState({ currentSearchQuery: "" }); console.log(err); }
      );
    }
  }

  onClickHandler(e, item) {
    browserHistory.push(`/${this.props.payloadType}/items/${item}`);
  }

  render() {
    return <SearchWell
      onChangeHandler={this.onChangeHandler}
      onClickHandler={this.onClickHandler}
      searchResults={this.state.searchResults[this.state.currentSearchQuery]}
      placeholder={this.props.payloadType}
    />;
  }
}
