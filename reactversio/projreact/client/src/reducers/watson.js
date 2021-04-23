//import types
import {
    INPUT_SUCCESS,
    INPUT_FAIL,
    SESSION_FAIL,
    SESSION_SUCCESS,
    MESSAGE_FAIL,
    MESSAGE_SUCCESS,
    ADD_FAIL,
    ADD_SUCCESS,
} from "../actions/types";


//initial state
const initialState = {
    messages: [],
    context: {
        "skills": {
            "main skill": {
                "user_defined": {
                    "arvot": 1000
                }
            }
        },
        "global": {
            "session_id": {}
        }
    },
};

//switch statement - update state
export default (state = initialState, action) => {
    const { type, payload } = action;
    let { messages, context} = state;

    switch(type) {
        case INPUT_SUCCESS:
            messages = [...messages, { message: payload, type: "user" }];
            return {
                messages,
                context,
            };
        case INPUT_FAIL:
            return state;

        case SESSION_SUCCESS:
            context.global.session_id = payload["session_id"];
            return {
                messages,
                context,
            };
        case SESSION_FAIL:
            return state;

        case MESSAGE_SUCCESS:
            messages = [...messages, { message: payload.data.output.generic[0].text, type: "bot" }];
            context = payload.data.context;
            return {
                messages,
                context,
            };
        case MESSAGE_FAIL:
            return state;

        case ADD_FAIL:
            return state;

        case ADD_SUCCESS:
            context.skills["main skill"].user_defined[payload.property] = payload.value;
            return {
                messages,
                context,
            };
        default:
            return state;
    }
};
