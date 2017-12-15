export const LOAD_PAYLOAD_START = 'LOAD_PAYLOAD_START'
export const LOAD_PAYLOAD_SUCCESS = 'LOAD_PAYLOAD_SUCCESS'
export const LOAD_PAYLOAD_FAILURE = 'LOAD_PAYLOAD_FAILURE'

export const PAYLOAD_TYPE_PROJECTS = 'projects'
export const PAYLOAD_TYPE_BLOG = 'blog'
export const PAYLOAD_TYPE_ABOUT = 'about'

export const PAYLOAD_SUBTYPE_ITEMS = 'items'
export const PAYLOAD_SUBTYPE_PAGES = 'pages'
export const PAYLOAD_SUBTYPE_SEARCH = 'search'

export const NEW_ERROR = 'NEW_ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'

export const INITIAL_STATE = {
  [PAYLOAD_TYPE_ABOUT]: {},
  [PAYLOAD_TYPE_PROJECTS]: {
    [PAYLOAD_SUBTYPE_SEARCH]: {},
    [PAYLOAD_SUBTYPE_ITEMS]: {},
    [PAYLOAD_SUBTYPE_PAGES]: {}
  },
  [PAYLOAD_TYPE_BLOG]: {
    [PAYLOAD_SUBTYPE_SEARCH]: {},
    [PAYLOAD_SUBTYPE_ITEMS]: {},
    [PAYLOAD_SUBTYPE_PAGES]: {}
  },
  error: []
}
