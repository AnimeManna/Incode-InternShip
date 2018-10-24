import axios from 'axios'

import { getUser } from '../actionsCreators/authActions';

import {
    FETCH_LOGIN_ERROR,
    FETCH_LOGIN_START,
    FETCH_LOGIN_SUCCESS,
} from "../actionTypes/actionTypes";


export const sendDataLogin = (data, history) => {
    return async dispatch => {
        dispatch({type: FETCH_LOGIN_START});
        const response = await axios.post('http://localhost:8000/login', data);
        if (response.data.success) {
            dispatch({type: FETCH_LOGIN_SUCCESS, payload: response.data});
            getUser(history)(dispatch);
        } else {
            dispatch({
                type: FETCH_LOGIN_ERROR,
                payload: response.data.msg
            })
        }

    }
}