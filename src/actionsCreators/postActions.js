import axiosProviders from '../providers/axiosProvider'

import {
    GET_POST_ERROR,
    GET_POST_SUCCESS,
    GET_POST_START,
    GET_POST_UPDATE_START,
    GET_POST_UPDATE_ERROR,
    GET_POST_UPDATE_SUCCESS,
    UPDATE_POST_START,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_ERROR,
    USE_SNACK_BAR
} from "../actionTypes/actionTypes";


export const getPost = (postId) => {
    return async dispatch => {
        dispatch({type: GET_POST_START, payload: {isLoaded: false, isLoading: true}})
        let post = await axiosProviders.getRequestWithToken(`post/${postId}`);
        if (post.success) {
            dispatch({type: GET_POST_SUCCESS, payload: {post, isLoaded: true, isLoading: false}});
        } else {
            dispatch({type: GET_POST_ERROR, payload: false})
        }
    }
}

export const getPostForUpdate = (postId) => {
    return async dispatch => {
        dispatch({type: GET_POST_UPDATE_START})
        const response = await axiosProviders.getRequestWithToken(`post/${postId}`);
        if (response.success) {
            dispatch({type: GET_POST_UPDATE_SUCCESS, payload: response});
        } else {
            dispatch({type: GET_POST_UPDATE_ERROR, payload: false})
        }
    }
}


export const updatePost = (data, postID) => {
    return async dispatch => {
        dispatch({type: UPDATE_POST_START});
        try {
            const response = await axiosProviders.createPutRequestWithToken(`post/${postID}`, data);
            const {success} = response
            if (!success) {
                dispatch({type: UPDATE_POST_SUCCESS, payload: success});
                dispatch({type:USE_SNACK_BAR,payload:{message:'Успешно обновленно, теперь он свеж как никогда раньше!', success:true}})
            } else {
                dispatch({type: UPDATE_POST_ERROR, payload: success});
            }
        }catch (e) {
            dispatch({type:USE_SNACK_BAR, payload:{message:'Оуу, что-то не получилось обновить ваш пост, попробуй позже'}})
        }
    }
}