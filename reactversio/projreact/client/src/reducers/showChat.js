import {
    TOGGLE_SUCCESS,
    TOGGLE_FAIL
} from "../actions/types";


const initialState = false;

export default (state = initialState, action) => {

    switch(action.type) {
        case TOGGLE_SUCCESS:
            return !state;

        case TOGGLE_FAIL:
            return state;

        default:
            return state;
    }
};
