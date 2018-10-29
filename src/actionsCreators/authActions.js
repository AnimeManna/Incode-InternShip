import {
    GET_USER_START,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
} from "../actionTypes/actionTypes";

import {getCategories} from "./categoryActions";

import axiosProviders from '../providers/axiosProvider';


export const getUser = (history) => async dispatch => {
    dispatch({type:GET_USER_START});
    let response = await axiosProviders.getRequestWithToken('user');
    if (!!response) {
        dispatch({type: GET_USER_SUCCESS, payload: response});
        history.push('/home');
        getCategories()(dispatch);
    } else {
        dispatch({type: GET_USER_ERROR, payload: 'Пользователь не найден'})
        history.push('/');
    }
}
