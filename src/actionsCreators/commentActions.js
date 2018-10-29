import axiosProvider from '../providers/axiosProvider'

import {
    SEND_COMMENT_START,
    SEND_COMMENT_ERROR,
    SEND_COMMENT_SUCCESS,
    GET_COMMENTS_START,
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_ERROR,
    DELETE_COMMENT_START,
    DELETE_COMMENT_ERROR,
    DELETE_COMMENT_SUCCESS
} from "../actionTypes/actionTypes";


export const getComments = (postID) => {
    return async dispatch => {
        dispatch({type: GET_COMMENTS_START, payload: {isLoaded: false, isLoading: true}})
        const response = await axiosProvider.getRequestWithToken(`comment/${postID}`);
        if (response.success) {
            dispatch({type: GET_COMMENTS_SUCCESS, payload: {response, isLoading: false, isLoaded: true}})
        } else {
            dispatch({type: GET_COMMENTS_ERROR, payload: {response, isLoading: false, isLoaded: true}})
        }
    }
}


export const sendComment = (dataComment, postId) => {
    return async dispatch => {
        dispatch({type: SEND_COMMENT_START});
        const response = await axiosProvider.createPostRequestWithToken(`comment/${postId}`, dataComment);
        if (!!response) {
            dispatch({
                type: SEND_COMMENT_ERROR, payload: false
            })
        } else {
            dispatch({
                type: SEND_COMMENT_SUCCESS, payload: true
            })
            getComments(postId)(dispatch);
        }


    }
}

export const deleteComment = (uri, postID) => {
    return async dispatch => {
        dispatch({type: DELETE_COMMENT_START})
        const response = await axiosProvider.createDeleteRequest(uri)
        if (response.success) {
            dispatch({type: DELETE_COMMENT_SUCCESS, payload: true})
            getComments(postID)(dispatch)
        } else {
            dispatch({type: DELETE_COMMENT_ERROR, payload: false})
        }
    }
}