import axios from 'axios'

import {
    SENDING_NEWPOST_START,
    SENDING_NEWPOST_ERROR,
    SENDING_NEWPOST_SUCCESS
} from "../actionTypes/actionTypes";

export const sendNewPost = (data) =>{
    return async dispatch => {
        dispatch({type:SENDING_NEWPOST_START});
        const response = await axios.post('http://localhost:8000/newPost',data);
        const {success,msg} = response.data
        if(success){
            dispatch({type:SENDING_NEWPOST_SUCCESS,payload:msg});
        }else{
            dispatch({type:SENDING_NEWPOST_ERROR, payload:msg});
        }
    }
}