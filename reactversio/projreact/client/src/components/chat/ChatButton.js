import React from "react";
import { connect } from "react-redux";


//actions
import { toggleChat } from "../../actions/showChat";

const ChatButton = ({ chatState, toggleChat }) => {

     return (
         <button class="chatButton" onClick={() => toggleChat(chatState)}>Chat</button>
     );
};

const mapStateToProps = (state) => ({
    chatState: state.showChat
});

export default connect(mapStateToProps, { toggleChat })(ChatButton);
