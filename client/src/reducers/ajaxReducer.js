import * as Constants from "../constants";

export function ajaxReducer(state = 0, action) {
  switch(action.type) {
    case Constants.LOAD_PAYLOAD_START: return state + 1;
    case Constants.LOAD_PAYLOAD_SUCCESS:
    case Constants.LOAD_PAYLOAD_FAILURE: return state === 0 ? state : state - 1;
    default: return state;
  }
}