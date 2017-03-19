import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "underscore";

import { PayloadContent, ButtonWell } from "../components";
import { SearchContainer } from "./SearchContainer";
import { loadPayload } from "../actions";

class PayloadContainer extends React.Component {
  static propTypes = {
    payload: React.PropTypes.object,
    payloadType: React.PropTypes.string.isRequired,
    payloadSubtype: React.PropTypes.string,
    query: React.PropTypes.string.isRequired,
    loadPayload: React.PropTypes.func
  }

  static defaultProps = {
    payloadSubtype: "items"
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    _.isEmpty(nextProps.payload) && nextProps.loadPayload({
      payloadType: nextProps.payloadType,
      payloadSubtype: nextProps.payloadSubtype,
      query: nextProps.query
    });
  }

  render() {
    let payload = this.props.payload;

    return _.isEmpty(payload) ? <span /> : (
      <div className="row">
        <div className="col-md-8">
          <PayloadContent {...{
            title: payload.name,
            createdAt: payload.createdAt,
            desc: payload.desc,
            content: payload.content
          }} />
        </div>
        <div className="col-md-4">
          <hr />

          <SearchContainer payloadType={this.props.payloadType} />

          <ButtonWell {...{
            title: "Links",
            buttons: [
              { name: "GitHub", url: `https://github.com/KarthikMAM/${payload.github}` },
              { name: "Issues", url: `https://github.com/KarthikMAM/${payload.github}/issues` },
              { name: "Release", url: `https://github.com/KarthikMAM/${payload.github}/release` },
              { name: "Live", url: payload.store }
            ].filter(item => item.url && !item.url.includes("undefined"))
          }} />

          <ButtonWell {...{
            title: "Tags",
            buttons: payload.tags.map(tag => ({ name: unescape(tag), url: `/${this.props.payloadType}/tags/${tag}` }))
          }} />
        </div>
        <div className="col-md-12"><hr /></div>
      </div>
    );
  }
}

let connector = connect(
  (state, ownProps) => ({
    payload: state[ownProps.payloadType] &&
    state[ownProps.payloadType]["items"] &&
    state[ownProps.payloadType]["items"][ownProps.query]
  }),
  dispatch => ({ loadPayload: bindActionCreators(loadPayload, dispatch) })
)(PayloadContainer);

export { connector as PayloadContainer };