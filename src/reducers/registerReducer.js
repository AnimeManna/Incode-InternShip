import {
    FETCH_REGISTER_ERROR,
    FETCH_REGISTER_SUCCESS,
    REGISTER_INPUTS_VALID,
    REGISTER_INPUTS_CHANGE
} from "../actionTypes/actionTypes";

const initialState = {
    user: {},
    errorMessage: '',
    isValid: false,
    isChanged: false
};

export default (state = initialState, action) => {
    const {payload, type} = action;
    switch (type) {
        case FETCH_REGISTER_SUCCESS: {
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                user: {
                    ...payload.user
                },
                errorMessage: ''
            }
        }
        case FETCH_REGISTER_ERROR: {
            return {
                ...state,
                errorMessage: payload
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