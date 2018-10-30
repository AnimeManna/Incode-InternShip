import axiosProvires from '../providers/axiosProvider'
import {
    FETCH_REGISTER_START,
    FETCH_REGISTER_SUCCESS,
    FETCH_REGISTER_ERROR,
    USE_SNACK_BAR
} from "../actionTypes/actionTypes";

import {getUser} from '../actionsCreators/authActions';

export const sendDataRegister = (data, history) => {
    return async dispatch => {
        dispatch({type: FETCH_REGISTER_START, payload: {isLoaded: false, isLoading: true}});
        try {
            const response = await axiosProvires.createPostRequest('auth', data);
            if (response.success) {
                dispatch({
                    type: FETCH_REGISTER_SUCCESS,
                    payload: {
                        response,
                        isLoading: false,
                        isLoaded: true
                    }
                });
                dispatch({
                    type: USE_SNACK_BAR,
                    payload: {
                        message: 'Приветствую тебя, мы всегда рады новым лицам!',
                        success: true
                    }
                })
                getUser(history)(dispatch);
            } else {
                dispatch({
                    type: FETCH_REGISTER_ERROR,
                    payload: {
                        response,
                        isLoading: false,
                        isLoaded: true
                    }
                })
            }
        } catch (e) {
            dispatch({
                type: USE_SNACK_BAR,
                payload: {
                    message: 'Мы случайно не знакомы? Такое знакомое имя',
                    success: true
                }
            })
        }
    }
}