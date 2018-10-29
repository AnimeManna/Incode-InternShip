import {
    GET_CATEGORY_ERROR,
    GET_CATEGORY_SUCCESS,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_ERROR,
    CLEAR_CATEGORIES
} from "../actionTypes/actionTypes";

const initialState = {
    categories:[

    ],
    success: false,
    error:'',
    deleteStatus:false
}

export default (state = initialState , action)=>{
    const {type,payload} = action
    switch (type) {
        case GET_CATEGORY_SUCCESS:{
            return {
                ...state,
                success:payload.success,
                categories:payload.categories
            }
        }
        case GET_CATEGORY_ERROR:{
            return {
                ...state,
                success:payload.success,
                error:payload.error
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