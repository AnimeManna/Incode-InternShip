import {
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_ERROR,
    FETCH_LOGIN_START,
    LOGIN_INPUTS_VALID,
    LOGIN_INPUTS_CHANGE
} from "../actionTypes/actionTypes";

const initialState = {
    isAuth: false,
    user: {
        success: false
    },
    errorMessage: '',
    isChanged: false,
    isValid: false,
    isLoaded:true,
    isLoading:false
};

export default (state = initialState, action) => {
    const {type,payload} = action
    switch (type) {

        case FETCH_LOGIN_START:{
            return {
                ...state,
                isLoaded:payload.isLoaded,
                isLoading:payload.isLoading
            }
        }

        case FETCH_LOGIN_SUCCESS: {
            localStorage.setItem("token", payload.response.token);
            return {
                ...state,
                user: {
                    ...payload.response
                },
                errorMessage: '',
                isChanged:false,
                isValid:false,
                isLoaded:payload.isLoaded,
                isLoading:payload.isLoading
            }
        }
        case FETCH_LOGIN_ERROR: {
            return {
                ...state,
                errorMessage: payload.response.error,
                success:payload.response.success,
                isLoaded:payload.isLoaded,
                isLoading:payload.isLoading
            }
        }
        case LOGIN_INPUTS_VALID: {
            return {
                ...state,
                isValid: payload
            }
        }
        case LOGIN_INPUTS_CHANGE: {
            return {
                ...state,
                isChanged: payload
            }
        }
        default:
            return state
    }
}