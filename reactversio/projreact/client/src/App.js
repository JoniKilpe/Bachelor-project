import React, {useEffect} from "react";
import './App.css';


//import redux components
import { Provider } from "react-redux";
import store from "./store";

//import chat component
import Chat from "./components/chat/Chat";

//import action
import { createSession } from "./actions/watson";

//import axios
import axios from "axios";

if (localStorage.session) {
    delete axios.defaults.headers.common["session_id"];
    axios.defaults.headers.common["session_id"] = localStorage.session;
} else {
    delete axios.defaults.headers.common["session_id"];
}
//connect application to redux

const App = () => {
    useEffect(() => {
        //check if there is a session
        localStorage.clear(); //ehkä joku fiksi tälle?
        if (!localStorage.session) {
            //create
            store.dispatch(createSession());
        }
    });
  return (
    <Provider store={store}>
      <div className="container">
        {/*insert chat component here*/}
        <Chat />
      </div>
    </Provider>
  );
};

export default App;
