import React, {useEffect} from "react";
import './App.css';


//import redux components
import { connect } from "react-redux";
import store from "./store";

//import chat component
import Chat from "./components/chat/Chat";
import ChatButton from "./components/chat/ChatButton";

//import action
import { createSession } from "./actions/watson";
import { toggleChat } from "./actions/showChat";

const App = ({chatState, toggleChat}) => {

    // runs once when app first gets rendered
    useEffect(() => {
        store.dispatch(createSession());
    }, []);

  return (
      <div className="container">
        <ChatButton />
        <Chat />
      </div>
  );
};

const mapStateToProps = (state) => ({
    chatState: state.showChat
});

export default connect(mapStateToProps, { toggleChat })(App);
