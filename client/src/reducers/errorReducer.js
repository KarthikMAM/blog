import * as Constants from "../constants";

export function errorReducer(state = [], action) {
  switch (action.type) {
    case Constants.NEW_ERROR:
    case Constants.LOAD_PAYLOAD_FAILURE: return [
      ...state,
      ...action.error
    ];
    case Constants.CLEAR_ERROR: return [];
    default: return state;
  }
}