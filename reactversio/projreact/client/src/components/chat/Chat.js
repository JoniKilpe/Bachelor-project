import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

//import action
import { addContextVariable, userMessage, sendMessage } from "../../actions/watson";

const Chat = ({ chat, context, addContextVariable, userMessage, sendMessage }) => {

    // handle user's message
    const [message, setMessage] = useState("");
    const endOfMessages = useRef(null);

    //scrolls to bottom automatically
    const scrollToBottom = () => {
        endOfMessages.current.scrollIntoView({ behavior: "smooth" });
    }
    useEffect(scrollToBottom, [chat]);

    // function that handles enter press to send message
    const handleClick = async (e) => {
        const code = e.keyCode || e.which;

        if (code === 13) {
            sendInput();
        }
    };
    // function that sends the message
    const sendInput = async () => {
        if (message.trim() !== "") { //only whitespace won't be sent
            console.log(message);
            userMessage(message);
            sendMessage(message, context);
        }
        setMessage("");
    };

    return (
        <div className="chat">
            <h1>Bank Manager</h1>
            {/*handle messages*/}
            <div class="historyContainer">
            {chat.length === 0
                ? ""
                : chat.map((msg) => <div className={msg.type}>{msg.message}</div>)}
                <div ref={endOfMessages}></div>
            </div>
            {/* input box */}
            <input
                id="chatBox"
                onChange={(e)=>setMessage(e.target.value)}
                onKeyPress={handleClick}
                value={message}
            ></input>
            <button
                className="sendButton"
                onClick={sendInput}
            >Send</button>
          <p className="bankManager">🤵</p>
        </div>
    );
};
const mapStateToProps = (state) => ({
    chat: state.watson.messages,
    context: state.watson.context,
});

export default connect(mapStateToProps, { addContextVariable, userMessage, sendMessage })(Chat);
