import React from "react";
import { connect } from "react-redux";
import * as toastr from "toastr";
import _ from "underscore";
import { browserHistory } from "react-router";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import { clearError } from "../actions";

class StatusContainer extends React.Component {
  static propTypes = {
    error: React.PropTypes.array,
    clearError: React.PropTypes.func,
    children: React.PropTypes.object,
    loading: React.PropTypes.bool
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
      <div className="nanobar">
        <ReactCSSTransitionGroup
          transitionName="bar"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          {this.props.loading && <div className="bar" />}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

let connector = connect(
  state => ({ error: state.error, loading: state.ajax > 0 }),
  (dispatch) => ({ clearError: () => dispatch(clearError()) })
)(StatusContainer);

export { connector as StatusContainer };