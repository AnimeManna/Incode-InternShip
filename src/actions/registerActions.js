import axios from 'axios'
import {
    FETCH_REGISTER_START,
    FETCH_REGISTER_SUCCESS,
    FETCH_REGISTER_ERROR
} from "../actionTypes/actionTypes";

export const sendDataRegister = (data) => {
    return async dispatch => {
        dispatch({type: FETCH_REGISTER_START})
        const user = await axios.post('http://localhost:8000/register', data);
        if (!!user.data) {
            dispatch({type: FETCH_REGISTER_SUCCESS, payload: user.data});
        } else {
            dispatch({
                type: FETCH_REGISTER_ERROR,
                payload: 'Простите кажется что-то пошло не по плану, но у нас всегд есть план Б'
            })
        }
    }
}