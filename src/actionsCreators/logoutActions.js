import {
    LOGOUT_ACCOUNT_SUCCESS,
    LOGOUT_ACCOUNT_ERROR
} from "../actionTypes/actionTypes";

export const logOut = () => dispatch => {
    const token = localStorage.setItem("token", '');
    if (!token) {
        dispatch({type: LOGOUT_ACCOUNT_SUCCESS, payload: false})
    } else {
        dispatch({type: LOGOUT_ACCOUNT_ERROR})
    }
}
