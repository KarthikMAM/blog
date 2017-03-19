import { combineReducers } from "redux";

import {
  PAYLOAD_TYPE_ABOUT,
  PAYLOAD_TYPE_BLOG,
  PAYLOAD_TYPE_PROJECTS
} from "../constants";
import { payloadReducer } from "./payloadReducer";
import { errorReducer } from "./errorReducer";
import { ajaxReducer } from "./ajaxReducer";

export const rootReducer = combineReducers({
  [PAYLOAD_TYPE_ABOUT]: (state = {}, action) => payloadReducer(state, action, PAYLOAD_TYPE_ABOUT),
  [PAYLOAD_TYPE_BLOG]: (state = {}, action) => payloadReducer(state, action, PAYLOAD_TYPE_BLOG),
  [PAYLOAD_TYPE_PROJECTS]: (state = {}, action) => payloadReducer(state, action, PAYLOAD_TYPE_PROJECTS),
  error: errorReducer,
  ajax: ajaxReducer
});