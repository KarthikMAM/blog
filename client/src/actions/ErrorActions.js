import * as Constants from "../constants";

export function clearError() { return { type: Constants.CLEAR_ERROR }; }
export function newError(error) {
  return {
    type: Constants.NEW_ERROR,
    error
  };
}