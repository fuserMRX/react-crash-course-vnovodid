import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { usersReducer, userState } from "./rootReducer";

const store = createStore(
    usersReducer,
    userState,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
