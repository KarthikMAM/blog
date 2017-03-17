import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import _ from "underscore";

import { loadAbout } from "../actions";
import { Home, Loading } from "../components";

class HomeContainer extends React.Component {
  static propTypes = {
    about: React.PropTypes.object,
    load: React.PropTypes.func
  }

  componentDidMount() {
    _.isEmpty(this.props.about) && this.props.load();
  }

  render() {
    return _.isEmpty(this.props.about) ? <Loading /> : <Home about={this.props.about} />;
  }
}

let connector = connect(
  state => ({ about: state.about }),
  dispatch => ({ load: bindActionCreators(loadAbout, dispatch) })
)(HomeContainer);

export { connector as HomeContainer };