import React from "react";

import { Api } from "../api";
import { PayloadContent, ButtonWell } from "../components";
import { SearchContainer } from "./SearchContainer";

export class PayloadContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      payload: undefined
    };
  }

  static propTypes = {
    payloadType: React.PropTypes.string.isRequired,
    payloadSubtype: React.PropTypes.string.isRequired,
    query: React.PropTypes.string.isRequired
  }

  static defaultProps = {
    payloadSubtype: "items"
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    Api.getPayload([
      nextProps.payloadType,
      nextProps.payloadSubtype,
      nextProps.query
    ].join("/")
    ).then(
      res => this.setState({ payload: res.payload }),
      err => console.log(err)
      );
  }

  render() {
    let payload = this.state.payload; payload = payload !== undefined ? payload[0] : undefined;

    return payload === undefined ? null : (
      <div className="row">
        <div className="col-md-8">
          <PayloadContent {...{
            title: payload.name,
            createdAt: payload.createdAt,
            desc: payload.desc,
            content: payload.content
          }} />

          <hr />
        </div>
        <div className="col-md-4">
          <SearchContainer payloadType={this.props.payloadType} />

          <ButtonWell {...{
            title: "Links",
            buttons: [
              { name: "GitHub", url: `https://github.com/KarthikMAM/${payload.github}` },
              { name: "Issues", url: `https://github.com/KarthikMAM/${payload.github}/issues` },
              { name: "Release", url: `https://github.com/KarthikMAM/${payload.github}/release` },
              { name: "Live", url: `https://github.com/KarthikMAM/${payload.store}/release` }
            ].filter(item => !item.url.includes("undefined") && !item.url.includes("null"))
          }} />

          <ButtonWell {...{
            title: "Tags",
            buttons: payload.tags.map(tag => ({ name: unescape(tag), url: `../tags/${tag}` }))
          }} />
        </div>
        <div className="col-md-12"><hr /></div>
      </div>
    );
  }
}