import {
    NEWPOST_INPUTS_CHANGE,
    NEWPOST_INPUTS_VALID,
    SENDING_NEWPOST_SUCCESS,
    SENDING_NEWPOST_ERROR
} from "../actionTypes/actionTypes";

const initialState = {
    isValid: false,
    isChanged: false,
    errorMessage: ''
}

export default (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {

        case  SENDING_NEWPOST_SUCCESS: {
            return {
                ...state,
                errorMessage: payload
            }
        }

        case SENDING_NEWPOST_ERROR: {
            return {
                ...state,
                errorMessage: payload
            }
        }

        case NEWPOST_INPUTS_VALID: {
            return {
                ...state,
                isValid: payload
            }
        }
        case NEWPOST_INPUTS_CHANGE: {
            return {
                ...state,
                isChanged: payload
            }
        }

        default:
            return state
    }
}