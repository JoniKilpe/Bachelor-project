import React, {useEffect} from "react";
import './App.css';


//import redux components
import { Provider } from "react-redux";
import store from "./store";

//import chat component
import Chat from "./components/chat/Chat";

//import action
import { createSession } from "./actions/watson";

const App = () => {
    useEffect(() => {
        store.dispatch(createSession());
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
