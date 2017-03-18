import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "underscore";

import { PayloadListItem, Pagination } from "../components";
import { SearchContainer } from "./SearchContainer";
import { loadPayload } from "../actions";

class PayloadListContainer extends React.Component {
  static propTypes = {
    payloadType: React.PropTypes.string.isRequired,
    payloadSubtype: React.PropTypes.string.isRequired,
    query: React.PropTypes.string,
    page: React.PropTypes.number,
    location: React.PropTypes.object.isRequired,
    payload: React.PropTypes.array,
    loadPayload: React.PropTypes.func,
    payloadPageCount: React.PropTypes.number
  }

  static defaultProps = {
    page: 1
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEmpty(nextProps.payload);
  }

  componentWillReceiveProps(nextProps) {
    _.isEmpty(nextProps.payload) && nextProps.loadPayload({
      payloadType: nextProps.payloadType,
      payloadSubtype: "pages",
      query: nextProps.query || "index",
      page: nextProps.page
    });
  }

  render() {
    return _.isEmpty(this.props.payload) ? <span /> : (
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
            pageCount: this.props.payloadPageCount
          }} />

          <table className="table payload">
            <tbody>
              {
                this.props.payload.map(payloadItem => <PayloadListItem key={payloadItem.slug} {...{
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
            pageCount: this.props.payloadPageCount
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

let connector = connect(
  (state, ownProps) => ({
    payload: (
      state[ownProps.payloadType] &&
      state[ownProps.payloadType]["pages"][ownProps.query || "index"] &&
      state[ownProps.payloadType]["pages"][ownProps.query || "index"][ownProps.page] &&
      _.filter(
        state[ownProps.payloadType]["items"],
        (item) => state[ownProps.payloadType]["pages"][ownProps.query || "index"][ownProps.page].includes(item.slug)
      )
    ),
    payloadPageCount: parseInt(
      state[ownProps.payloadType] &&
      state[ownProps.payloadType]["pages"][ownProps.query || "index"] &&
      state[ownProps.payloadType]["pages"][ownProps.query || "index"].pageCount, 10
    )
  }),
  dispatch => ({ loadPayload: bindActionCreators(loadPayload, dispatch) })
)(PayloadListContainer);

export { connector as PayloadListContainer };