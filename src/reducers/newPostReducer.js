import {
    NEWPOST_INPUTS_CHANGE,
    NEWPOST_INPUTS_VALID,
    SENDING_NEWPOST_SUCCESS,
    SENDING_NEWPOST_ERROR,
    CLEAR_INPUTS_NEWPOST
} from "../actionTypes/actionTypes";

const initialState = {
    isValid: false,
    isChanged: false,
    success:false,
    userID:''
}

export default (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {

        case  SENDING_NEWPOST_SUCCESS: {
            return {
                ...state,
                success: payload,
                isValid:false,
                isChanged:false
            }
        }

        case SENDING_NEWPOST_ERROR: {
            return {
                ...state,
                success: payload
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

        case CLEAR_INPUTS_NEWPOST: {
            return {
                ...state,
                isChanged:false,
                isValid:false
            }
        }


        default:
            return state
    }
}