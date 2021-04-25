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
} from "./types";

//import axios
import axios from "axios";

//adds or updates a user defined context variable
export const addContextVariable = (context, property, value) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_SUCCESS,
            payload: { context, property, value },
         });
    } catch (err) {
        dispatch({ type: ADD_FAIL });
    }
};

//function that handles user's message
export const userMessage = (message) => async (dispatch) => {
    try {
        dispatch({ type: INPUT_SUCCESS, payload: message });
    } catch (err) {
        dispatch({ type: INPUT_FAIL });
    }
};

//creates a session - API CALL
export const createSession = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/watson/session");
        dispatch({ type: SESSION_SUCCESS, payload: res.data });
    } catch (err) {
        dispatch({ type: SESSION_FAIL });
    }
};

//sends the message to the bot - API CALL
export const sendMessage = (message, context) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'session_id': context.global.session_id
            }
        };
        const body = {
            input: message,
            context: context,
        };
        const res = await axios.post("/api/watson/message", body, config);
        dispatch({
            type: MESSAGE_SUCCESS,
            payload: res
        });
    } catch (err) {
        dispatch({ type: MESSAGE_FAIL });
    }
};
