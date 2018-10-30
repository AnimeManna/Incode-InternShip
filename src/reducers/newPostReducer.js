import {
    NEWPOST_INPUTS_CHANGE,
    NEWPOST_INPUTS_VALID,
    SENDING_NEWPOST_SUCCESS,
    SENDING_NEWPOST_ERROR,
    SENDING_NEWPOST_START,
    CLEAR_INPUTS_NEWPOST
} from "../actionTypes/actionTypes";

const initialState = {
    isValid: false,
    isChanged: false,
    success:false,
    userID:'',
    newPostIsLoaded:true,
    newPostIsLoading:false,
}

export default (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {

        case SENDING_NEWPOST_START:{
            return {
                ...state,
                newPostIsLoaded: payload.newPostIsLoaded,
                newPostIsLoading: payload.newPostIsLoading
            }
        }

        case  SENDING_NEWPOST_SUCCESS: {
            return {
                ...state,
                success: payload.success,
                isValid:false,
                isChanged:false,
                newPostIsLoaded: payload.newPostIsLoaded,
                newPostIsLoading: payload.newPostIsLoading
            }
        }

        case SENDING_NEWPOST_ERROR: {
            return {
                ...state,
                success: payload.success,
                newPostIsLoaded: payload.newPostIsLoaded,
                newPostIsLoading: payload.newPostIsLoading
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