import {
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_ERROR,
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
    isValid: false
};

export default (state = initialState, action) => {
    const {type,payload} = action
    switch (type) {
        case FETCH_LOGIN_SUCCESS: {
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                user: {
                    ...payload
                },
                errorMessage: '',
                isChanged:false,
                isValid:false
            }
        }
        case FETCH_LOGIN_ERROR: {
            return {
                ...state,
                errorMessage: payload.error,
                success:payload.success
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