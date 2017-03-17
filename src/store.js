import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { aboutReducer } from "./reducers";

export const store = createStore(aboutReducer, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));