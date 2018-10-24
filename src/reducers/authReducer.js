import {
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    LOGOUT_ACCOUNT_SUCCESS
} from "../actionTypes/actionTypes";

const initialState = {
    msg: '',
    success: false,
    user: {},
    token: localStorage.getItem("token")
}

export default (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case GET_USER_SUCCESS: {
            return {
                ...state,
                success: true,
                user: payload
            }
        }
        case GET_USER_ERROR: {
            return {
                ...state,
                msg: payload
            }
        }
        case LOGOUT_ACCOUNT_SUCCESS: {
            return {
                ...state,
                success: payload
            }
        }
        default:
            return state
    }
}