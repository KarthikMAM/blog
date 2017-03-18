import React from "react";
import { connect } from "react-redux";
import * as toastr from "toastr";
import _ from "underscore";
import { browserHistory } from "react-router";

import { clearError } from "../actions";

class ErrorContainer extends React.Component {
  static propTypes = {
    error: React.PropTypes.array,
    clearError: React.PropTypes.func,
    children: React.PropTypes.object
  };

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.error)) {
      setTimeout(() => browserHistory.push({
        pathname: (
          browserHistory.getCurrentLocation().pathname.includes("/projects") ? "/projects" :
            browserHistory.getCurrentLocation().pathname.includes("/blog") ? "/blog" :
              "/"
        )
      }), 1000);

      nextProps.error.map(error => toastr.error(error.join(": ")));

      nextProps.clearError();
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

let connector = connect(
  state => ({ error: state.error }),
  (dispatch) => ({ clearError: () => dispatch(clearError()) })
)(ErrorContainer);

export { connector as ErrorContainer };