import React from "react";

import { Api } from "../api";
import { PayloadListItem, Pagination } from "../components";
import { SearchContainer } from "./SearchContainer";

export class PayloadListContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      payload: [],
      payloadPages: 1
    };
  }

  static propTypes = {
    payloadType: React.PropTypes.string.isRequired,
    payloadSubtype: React.PropTypes.string.isRequired,
    query: React.PropTypes.string,
    page: React.PropTypes.number,
    location: React.PropTypes.object.isRequired
  }

  static defaultProps = {
    payloadType: "projects",
    payloadSubtype: "index",
    query: undefined,
    page: 1
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    Api.getPayload([
      nextProps.payloadType,
      nextProps.payloadSubtype,
      nextProps.query
    ].filter(item => item !== undefined).join("/"), { page: nextProps.page }).then(
      res => this.setState({ payload: res.payload, payloadPages: res.payloadPages }),
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

          <Pagination {...{
            location: this.props.location,
            currentPage: this.props.page,
            pageCount: this.state.payloadPages
          }} />

          <table className="table payload">
            <tbody>
              {
                payload.map(payloadItem => <PayloadListItem key={payloadItem.slug} {...{
                  name: payloadItem.name,
                  showPath: payloadItem.links.path,
                  editPath: payloadItem.links.edit,
                  createdAt: payloadItem.createdAt,
                  desc: payloadItem.desc
                }} />)
              }
            </tbody>
          </table>

          <Pagination {...{
            location: this.props.location,
            currentPage: this.props.page,
            pageCount: this.state.payloadPages
          }} />
        </div>

        <div className="col-md-4">
          <hr />
          <SearchContainer payloadType={this.props.payloadType} />
        </div>
      </div>
    );
  }
}