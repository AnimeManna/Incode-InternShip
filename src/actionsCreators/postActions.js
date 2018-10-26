import axiosProviders from '../providers/axiosProvider'

import {
    GET_POST_ERROR,
    GET_POST_SUCCESS,
    GET_POST_START
} from "../actionTypes/actionTypes";


export const getPost = (postId) => {
    return async dispatch => {
        dispatch({type:GET_POST_START})
        let post = await axiosProviders.getRequestWithToken(`post/${postId}`);
        if(post.success){
            dispatch({type:GET_POST_SUCCESS,payload:post});
        }else{
            dispatch({type:GET_POST_ERROR,payload:false})
        }
    }
}