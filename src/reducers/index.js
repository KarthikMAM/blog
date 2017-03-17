export function aboutReducer(state = {}, action) {
  switch (action.type) {
    case "LOAD_PAYLOAD_SUCCESS": return { about: action.payload };
    default: return state;
  }
}