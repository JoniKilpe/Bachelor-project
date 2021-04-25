//import dependencies
import { combineReducers } from "redux";

//import reducers
import watson from "./watson";
import showChat from "./showChat";

//export combined reducers
export default combineReducers({ watson: watson, showChat: showChat });
