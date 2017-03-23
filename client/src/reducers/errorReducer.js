import * as Constants from "../constants";
import update from "immutability-helper";

export function errorReducer(state = [], action) {
  switch (action.type) {
    case Constants.NEW_ERROR:
    case Constants.LOAD_PAYLOAD_FAILURE: return update(
      state,
      { $push: action.error }
    );
    case Constants.CLEAR_ERROR: return [];
    default: return state;
  }
}