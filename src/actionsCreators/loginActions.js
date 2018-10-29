import axiosProviders from '../providers/axiosProvider'

import {getUser} from '../actionsCreators/authActions';

import {
    FETCH_LOGIN_ERROR,
    FETCH_LOGIN_START,
    FETCH_LOGIN_SUCCESS,
    USE_SNACK_BAR
} from "../actionTypes/actionTypes";


export const sendDataLogin = (data, history) => {
    return async dispatch => {
        dispatch({type: FETCH_LOGIN_START});
        try {
            const response = await axiosProviders.createPostRequest('login', data);
            if (response.success) {
                dispatch({
                    type: FETCH_LOGIN_SUCCESS,
                    payload: response
                });
                dispatch({
                    type: USE_SNACK_BAR,
                    payload: {
                        message: 'Добро пожаловать в мою таверну!',
                        success: true
                    }
                })
                getUser(history)(dispatch);
            } else {
                dispatch({
                    type: FETCH_LOGIN_ERROR,
                    payload: response
                })
            }
        } catch (e) {
            dispatch({
                type: USE_SNACK_BAR,
                payload: {message: 'Оу, пользователь не найден, точно всё правильно ввели?', success: true}
            })
        }


    }
}