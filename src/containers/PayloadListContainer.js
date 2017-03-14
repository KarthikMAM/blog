import React from "react";

import { Api } from "../api";
import { PayloadListItem } from "../components";

export class PayloadListContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      payload: []
    };
  }

  static propTypes = {
    payloadType: React.PropTypes.string.isRequired,
    payloadSubtype: React.PropTypes.string.isRequired,
    query: React.PropTypes.string,
    page: React.PropTypes.number
  }

  static defaultProps = {
    payloadType: "projects",
    payloadSubtype: "index",
    query: undefined,
    page: 1
  }

  componentDidMount() {
    Api.getPayload([
      this.props.payloadType,
      this.props.payloadSubtype,
      this.props.query
    ].filter(item => item !== undefined).join("/"), { page: this.props.page }).then(
      res => this.setState({ payload: res.payload }),
      err => console.log(err)
      );
  }

  render() {
    let payload = this.state.payload;

    return (
      <div className="row">
        <div className="col-md-8">
          <h3>
            {[
              this.props.payloadType,
              this.props.payloadSubtype,
              unescape(this.props.query).replace("-", " ")
            ].filter(item => item !== "undefined").join(" - ").toUpperCase()}
          </h3>

          <table className="table payload">
            <tbody>
              {
                payload.map(payloadItem => <PayloadListItem key={payloadItem.id} {...{
                  name: payloadItem.name,
                  showPath: payloadItem.links.path,
                  editPath: payloadItem.links.edit,
                  createdAt: payloadItem.createdAt,
                  desc: payloadItem.desc
                }} />)
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}