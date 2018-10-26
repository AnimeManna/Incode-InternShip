import axiosProviders from '../providers/axiosProvider'

import {
    SENDING_NEWPOST_START,
    SENDING_NEWPOST_ERROR,
    SENDING_NEWPOST_SUCCESS
} from "../actionTypes/actionTypes";

import {getCategorys} from "./categoryActions";

export const sendNewPost = (data) =>{
    return async dispatch => {
        dispatch({type:SENDING_NEWPOST_START});
        const response = await axiosProviders.createPostRequestWithToken('post',data);
        const {success} = response
        if(success){
            dispatch({type:SENDING_NEWPOST_SUCCESS,payload:success});
            getCategorys()(dispatch)
        }else{
            dispatch({type:SENDING_NEWPOST_ERROR, payload:success});
        }
    }
}