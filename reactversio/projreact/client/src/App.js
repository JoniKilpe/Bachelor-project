import React, {useEffect} from "react";
import './App.css';


//import redux components
import { Provider, useSelector, useDispatch, connect } from "react-redux";
import store from "./store";

//import chat component
import Chat from "./components/chat/Chat";
import ChatButton from "./components/chat/ChatButton";

//import action
import { createSession } from "./actions/watson";
import { toggleChat } from "./actions/showChat";

const App = ({chatState, toggleChat}) => {
    useEffect(() => {
        store.dispatch(createSession());
    });
    //const chatState = useSelector(state => state.showChat);

    const dispatch = useDispatch();
  return (
    //<Provider store={store}>
      <div className="container">
        {/*insert chat component here*/}
        <ChatButton />
        <Chat />
      </div>
    //</Provider>
  );
};

const mapStateToProps = (state) => ({
    chatState: state.showChat
});

export default connect(mapStateToProps, { toggleChat })(App);
//export default App;
