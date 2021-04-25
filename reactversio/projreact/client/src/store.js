//import dependencies
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import combineReducers from "./reducers";

//connect the application to redux devtools
import {composeWithDevTools} from "redux-devtools-extension";

const store = createStore(
    combineReducers,
    composeWithDevTools(applyMiddleware(thunk))
);

//export store
export default store;
