import axiosProvires from '../providers/axiosProvider'
import {
    FETCH_REGISTER_START,
    FETCH_REGISTER_SUCCESS,
    FETCH_REGISTER_ERROR
} from "../actionTypes/actionTypes";

import { getUser } from '../actionsCreators/authActions';

export const sendDataRegister = (data,history) => {
    return async dispatch => {
        dispatch({type: FETCH_REGISTER_START});
        const response = await axiosProvires.createPostRequest('auth',data);
        if (response.success) {
            dispatch({type: FETCH_REGISTER_SUCCESS, payload: response});
            getUser(history)(dispatch);
        } else {
            dispatch({
                type: FETCH_REGISTER_ERROR,
                payload: response.data.msg
            })
        }
    }
}