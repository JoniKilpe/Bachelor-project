import {
    TOGGLE_SUCCESS,
    TOGGLE_FAIL
} from "./types";


export const toggleChat = (chatState) => async (dispatch) => {
    try {
        dispatch({ type: TOGGLE_SUCCESS, payload: chatState });
    } catch (err) {
        dispatch({ type: TOGGLE_FAIL });
    }
};
