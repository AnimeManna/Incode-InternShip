import axiosProviders from '../providers/axiosProvider'

import { getUser } from '../actionsCreators/authActions';

import {
    FETCH_LOGIN_ERROR,
    FETCH_LOGIN_START,
    FETCH_LOGIN_SUCCESS,
} from "../actionTypes/actionTypes";


export const sendDataLogin = (data, history) => {
    return async dispatch => {
        dispatch({type: FETCH_LOGIN_START});
        console.log(data);
        const response = await axiosProviders.createPostRequest('login', data);
        console.log(response);
        if (response.success) {
            dispatch({
                type: FETCH_LOGIN_SUCCESS,
                payload: response
            });
            getUser(history)(dispatch);
        } else {
            dispatch({
                type: FETCH_LOGIN_ERROR,
                payload: response
            })
        }

    }
}