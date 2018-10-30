import axiosProviders from '../providers/axiosProvider'

import {
    GET_CATEGORY_ERROR,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_START,
    DELETE_CATEGORY_START,
    DELETE_CATEGORY_ERROR,
    DELETE_CATEGORY_SUCCESS,
    USE_SNACK_BAR
} from "../actionTypes/actionTypes";

export const getCategories = () => {
    return async dispatch =>{
        dispatch({type:GET_CATEGORY_START,payload:{getIsLoading:true, getIsLoaded:false}});
        try{
            const response = await axiosProviders.getRequestWithToken('category');
            if(response.success){
                dispatch({type:GET_CATEGORY_SUCCESS,payload:{response,getIsLoading:false, getIsLoaded:true}})
            }else{
                dispatch({type:GET_CATEGORY_ERROR,payload:{response,getIsLoading:false, getIsLoaded:true}})
            }
        }catch (e) {
            dispatch({type:USE_SNACK_BAR, payload:{message:'Простите, категории опаздывают, но не переживайте мы уже выслали им в помощь вертолёт', success:true}})
        }
    }
}

export const deleteCategory = (categoryID) => {
    return async dispatch => {
        dispatch({type:DELETE_CATEGORY_START})
        try {
            const response = await axiosProviders.createDeleteRequest(`category/${categoryID}`)
            if (response.success) {
                dispatch({type: DELETE_CATEGORY_SUCCESS, payload: response})
                dispatch({type:USE_SNACK_BAR, payload:{message:'Мне давно она не нравилась. Спасибо что удалил', success:true}})
                getCategories()(dispatch)
            } else {
                dispatch({type: DELETE_CATEGORY_ERROR, payload: response})
            }
        }catch (e) {
            dispatch({type:USE_SNACK_BAR, payload:{message:'Оу простите, но категория слишком стойкая,не получается её удалить, повторите позже', success:true}})
        }
    }
}