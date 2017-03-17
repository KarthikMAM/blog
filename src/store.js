import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { rootReducer } from "./reducers";
import { INITIAL_STATE } from "./constants";

export const store = createStore(rootReducer, INITIAL_STATE, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));