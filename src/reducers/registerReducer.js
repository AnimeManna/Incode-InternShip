import {
    FETCH_REGISTER_ERROR,
    FETCH_REGISTER_SUCCESS,
    FETCH_REGISTER_START,
    REGISTER_INPUTS_VALID,
    REGISTER_INPUTS_CHANGE
} from "../actionTypes/actionTypes";

const initialState = {
    isValid: false,
    isChanged: false,
    isLoaded:true,
    isLoading:false
};

export default (state = initialState, action) => {
    const {payload, type} = action;
    switch (type) {

        case FETCH_REGISTER_START:{
            return {
                ...state,
                isLoading:payload.isLoading,
                isLoaded:payload.isLoaded
            }
        }

        case FETCH_REGISTER_SUCCESS: {
            localStorage.setItem("token", payload.response.token);
            return {
                ...state,
                isLoading:payload.isLoading,
                isLoaded:payload.isLoaded

            }
        }
        case FETCH_REGISTER_ERROR: {
            return {
                ...state,
                isLoading:payload.isLoading,
                isLoaded:payload.isLoaded
            }
        }
        case REGISTER_INPUTS_VALID: {
            return {
                ...state,
                isValid: payload
            }
        }
        case REGISTER_INPUTS_CHANGE: {
            return {
                ...state,
                isChanged: payload
            }
        }
        default:
            return state
    }
}