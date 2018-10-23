import {
    FETCH_AUTH_START,
    FETCH_AUTH_SUCCESS,
    FETCH_AUTH_ERROR
} from "../actionTypes/actionTypes";
import axios from "axios";

export const getUser = () => async dispatch => {
    dispatch({type:FETCH_AUTH_START});
        let config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };
        console.log('TOKEN',localStorage.getItem("token"));
        let user = await axios.get('http://localhost:8000/userme',config);
        console.log('AUTHSAGASg',user.data);
        if(!!user){
            dispatch({type:FETCH_AUTH_SUCCESS,payload:user.data})
        }else{
            dispatch({type:FETCH_AUTH_ERROR,payload:'Пользователь не найден'})
        }
}