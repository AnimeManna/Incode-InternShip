import {
    GET_CATEGORY_ERROR,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_START,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_ERROR,
    CLEAR_CATEGORIES
} from "../actionTypes/actionTypes";

const initialState = {
    categories:[

    ],
    success: false,
    error:'',
    deleteStatus:false,
    getIsLoaded:true,
    getIsLoading:false
}

export default (state = initialState , action)=>{
    const {type,payload} = action
    switch (type) {

        case GET_CATEGORY_START:{
            return {
                ...state,
                getIsLoaded: payload.getIsLoaded,
                getIsLoading:payload.getIsLoading
            }
        }

        case GET_CATEGORY_SUCCESS:{
            return {
                ...state,
                success:payload.response.success,
                categories:payload.response.categories,
                getIsLoaded: payload.getIsLoaded,
                getIsLoading:payload.getIsLoading
            }
        }
        case GET_CATEGORY_ERROR:{
            return {
                ...state,
                success:payload.response.success,
                error:payload.response.error,
                getIsLoaded: payload.getIsLoaded,
                getIsLoading:payload.getIsLoading
            }
        }
        case DELETE_CATEGORY_SUCCESS:{
            return {
                ...state,
                deleteStatus: payload
            }
        }

        case DELETE_CATEGORY_ERROR:{
            return {
                ...state,
                deleteStatus:payload
            }
        }

        case CLEAR_CATEGORIES :{
            return {
                ...state,
                categories:[]
            }
        }

        default : return state
    }
}