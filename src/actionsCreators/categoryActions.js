import axiosProviders from '../providers/axiosProvider'

import {
    GET_CATEGORY_ERROR,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_START
} from "../actionTypes/actionTypes";

export const getCategorys = () => {
    return async dispatch =>{
        dispatch({type:GET_CATEGORY_START});
        const response = await axiosProviders.getRequestWithToken('category');
        if(response.success){
            dispatch({type:GET_CATEGORY_SUCCESS,payload:response})
        }else{
            dispatch({type:GET_CATEGORY_ERROR,payload:response})
        }
    }
}