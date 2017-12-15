import { combineReducers } from 'redux'
import update from 'immutability-helper'

import {
  PAYLOAD_SUBTYPE_ITEMS,
  PAYLOAD_SUBTYPE_PAGES,
  PAYLOAD_SUBTYPE_SEARCH,
  PAYLOAD_TYPE_ABOUT,
  PAYLOAD_TYPE_BLOG,
  PAYLOAD_TYPE_PROJECTS
} from '../constants'

function payloadSubtype (state, action, currentSubtype) {
  switch (action.payloadSubtype === currentSubtype && action.payloadSubtype) {
    case PAYLOAD_SUBTYPE_ITEMS:
    case PAYLOAD_SUBTYPE_SEARCH: return update(
      state,
      { $merge: action.payload }
    )
    case PAYLOAD_SUBTYPE_PAGES: return update(
      state,
      {
        $merge: {
          [action.query]: update(
            state[action.query] ? state[action.query] : {}, {
              $merge: {
                [action.page]: action.payload,
                pageCount: action.payloadPages
              }
            }
          )
        }
      }
    )
    default: return state
  }
}

let payloadType = combineReducers({
  items: (state = {}, action) => payloadSubtype(state, action, PAYLOAD_SUBTYPE_ITEMS),
  search: (state = {}, action) => payloadSubtype(state, action, PAYLOAD_SUBTYPE_SEARCH),
  pages: (state = {}, action) => payloadSubtype(state, action, PAYLOAD_SUBTYPE_PAGES)
})

export function payloadReducer (state, action, currentType) {
  if (action.type.includes('_SUCCESS')) {
    switch (action.payloadType === currentType && action.payloadType) {
      case PAYLOAD_TYPE_BLOG:
      case PAYLOAD_TYPE_PROJECTS: return payloadType(state, action)
      case PAYLOAD_TYPE_ABOUT: return action.payload
      default: return state
    }
  } return state
}
