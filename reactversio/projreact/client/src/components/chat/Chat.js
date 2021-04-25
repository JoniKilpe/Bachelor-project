import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

//import action
import { addContextVariable, userMessage, sendMessage } from "../../actions/watson";

const Chat = ({ chat, context, addContextVariable, userMessage, sendMessage }) => {
    // handle user's message
    const [message, setMessage] = useState("");
    const endOfMessages = useRef(null);

    const scrollToBottom = () => {
        endOfMessages.current.scrollIntoView({ behavior: "smooth" });
    }
    useEffect(scrollToBottom, [chat]);

    // function that handles user submission
    const handleClick = async (e) => {
        const code = e.keyCode || e.which;

        if (code === 13) {
            console.log(message);
            userMessage(message);
            sendMessage(message, context);
            setMessage("");
        }
    };
    return (
        <div className="chat">
            <h1>Pankinjohtajabossman</h1>
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
        </div>
    );
};
const mapStateToProps = (state) => ({
    chat: state.watson.messages,
    context: state.watson.context,
});

export default connect(mapStateToProps, { addContextVariable, userMessage, sendMessage })(Chat);
