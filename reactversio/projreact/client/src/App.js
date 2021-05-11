import React, {useEffect} from "react";
import './App.css';


//import redux components
import { connect } from "react-redux";
import store from "./store";

//import chat component
import Chat from "./components/chat/Chat";
import ChatButton from "./components/chat/ChatButton";

//import action
import { createSession, sendMessage } from "./actions/watson";
import { toggleChat } from "./actions/showChat";

const App = ({context, chatState, toggleChat}) => {

    // runs once when app first gets rendered
    useEffect(() => {
        store.dispatch(createSession());
    }, []);

    //runs when session_id gets updated. initiates Welcome-node from Watson
    useEffect(() => {
        if (context.global.session_id !== null) {
            store.dispatch(sendMessage("", context));
        }
    }, [context.global.session_id]);

  return (
      <div className="container">
        <ChatButton />
        {chatState && <Chat />}
      </div>

  );
};

const mapStateToProps = (state) => ({
    chatState: state.showChat,
    context: state.watson.context,
});

export default connect(mapStateToProps, { sendMessage, toggleChat })(App);
