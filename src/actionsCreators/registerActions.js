import axios from 'axios'
import {
    FETCH_REGISTER_START,
    FETCH_REGISTER_SUCCESS,
    FETCH_REGISTER_ERROR
} from "../actionTypes/actionTypes";

import { getUser } from '../actionsCreators/authActions';

export const sendDataRegister = (data,history) => {
    return async dispatch => {
        dispatch({type: FETCH_REGISTER_START});
        const response = await axios.post('http://localhost:8000/register', data);
        if (response.data.success) {
            dispatch({type: FETCH_REGISTER_SUCCESS, payload: response.data});
            getUser(history)(dispatch);
        } else {
            dispatch({
                type: FETCH_REGISTER_ERROR,
                payload: response.data.msg
            })
        }
    }
}