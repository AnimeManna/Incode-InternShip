import axiosProviders from '../providers/axiosProvider'

import {
    GET_USER_BY_ID_START,
    GET_USER_BY_ID_SUCCESS,
    GET_USER_BY_ID_ERROR,
    DISPATCH_USER_ID
} from "../actionTypes/actionTypes";

export const getUserPostsById = (userId)=> {
    return async dispatch => {
        dispatch({type:GET_USER_BY_ID_START});
        let user = await axiosProviders.getRequestWithToken(`post/author/${userId}`);
        if(user.success){
            dispatch({type:GET_USER_BY_ID_SUCCESS,payload:user});
        }else{
            dispatch({type:GET_USER_BY_ID_ERROR,payload:user});
        }
    }
}

export const dispatchUserID = (userId) => {
    return dispatch => {
        getUserPostsById(userId)(dispatch)
        dispatch({type:DISPATCH_USER_ID, payload:userId})
    }
}