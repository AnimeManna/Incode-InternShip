import axios from 'axios'

import {
    FETCH_LOGIN_ERROR,
    FETCH_LOGIN_START,
    FETCH_LOGIN_SUCCESS,
    FETCH_AUTH_SUCCESS
} from "../actionTypes/actionTypes";

export const sendDataLogin = (data) => {
    return async dispatch => {
        dispatch({type: FETCH_LOGIN_START});
        console.log(data);
        const user = await axios.post('http://localhost:8000/login', data);
        console.log(user.data);
        if (!!user.data) {
            dispatch({type: FETCH_LOGIN_SUCCESS, payload: user.data});
            dispatch({type: FETCH_AUTH_SUCCESS, payload: {success: true}})
        } else {
            dispatch({
                type: FETCH_LOGIN_ERROR,
                payload: 'Простите невозможно вас авторизовать, но наряд миньйонов уже решает вашу проблему'
            })
        }

    }
}