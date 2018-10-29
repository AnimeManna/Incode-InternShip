import axiosProviders from '../providers/axiosProvider'

import {
    SENDING_NEWPOST_START,
    SENDING_NEWPOST_ERROR,
    SENDING_NEWPOST_SUCCESS,
    CLEAR_INPUTS_NEWPOST
} from "../actionTypes/actionTypes";

import {getCategories} from "./categoryActions";

import {getUserPostsById} from "./accountActions";

export const sendNewPost = (data,id) =>{
    return async dispatch => {
        dispatch({type:SENDING_NEWPOST_START});
        const response = await axiosProviders.createPostRequestWithToken('post',data);
        const {success} = response
        if(success){
            dispatch({type:SENDING_NEWPOST_ERROR, payload:success});
        }else{
            dispatch({type:SENDING_NEWPOST_SUCCESS,payload:success});
            dispatch({type:CLEAR_INPUTS_NEWPOST});
            getCategories()(dispatch)
            getUserPostsById(id)(dispatch)
        }
    }
}