//import dependencies
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import combineReducers from "./reducers";

//connect the application to redux devtools
import {composeWithDevTools} from "redux-devtools-extension";

//setup initial state
const initialState = {};
//import middleware
//const middleware = [thunk];
//setup store
const store = createStore(
    combineReducers,
    //initialState,
    composeWithDevTools(applyMiddleware(thunk))
);

//export store
export default store;
