import {
    GET_USER_START,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
} from "../actionTypes/actionTypes";


import axios from "axios";


export const getUser = (history) => async dispatch => {
    dispatch({type: GET_USER_START});
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    };
    let response = await axios.get('http://localhost:8000/userme', config);
    if (!!response.data.user) {
        dispatch({type: GET_USER_SUCCESS, payload: response.data.user});
        history.push('/home');
    } else {
        dispatch({type: GET_USER_ERROR, payload: 'Пользователь не найден'})
    }
}
