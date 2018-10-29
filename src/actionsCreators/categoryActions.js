import axiosProviders from '../providers/axiosProvider'

import {
    GET_CATEGORY_ERROR,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_START,
    DELETE_CATEGORY_START,
    DELETE_CATEGORY_ERROR,
    DELETE_CATEGORY_SUCCESS
} from "../actionTypes/actionTypes";

export const getCategories = () => {
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

export const deleteCategory = (categoryID) => {
    return async dispatch => {
        dispatch({type:DELETE_CATEGORY_START})
        const response = await axiosProviders.createDeleteRequest(`category/${categoryID}`)
        if(response.success){
            dispatch({type:DELETE_CATEGORY_SUCCESS,payload:response})
            getCategories()(dispatch)
        }else{
            dispatch({type:DELETE_CATEGORY_ERROR, payload:response})
        }
    }
}