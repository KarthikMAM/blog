import { Api } from "../api";
import * as Constants from "../constants";

export function loadPayloadStart() {
  return {
    type: Constants.LOAD_PAYLOAD_START
  };
}

export function loadPayloadSuccess(payload, payloadType, payloadSubtype) {
  return {
    type: Constants.LOAD_PAYLOAD_SUCCESS,
    payload,
    payloadType,
    payloadSubtype
  };
}

export function loadPayloadFailure(error) {
  return {
    type: Constants.LOAD_PAYLOAD_FAILURE,
    error
  };
}

export function loadAbout() {
  return (dispatch) => {
    Api.getAbout().then(
      res => dispatch(loadPayloadSuccess(res.payload, res.payloadType)),
      err => dispatch(loadPayloadFailure(err))
    ).catch(() => dispatch(loadPayloadFailure(["Error", "Unable to process your request"])));
  };
}