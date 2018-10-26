import {
    GET_CATEGORY_ERROR,
    GET_CATEGORY_SUCCESS
} from "../actionTypes/actionTypes";

const initialState = {
    categories:[

    ],
    success: false,
    error:''
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
        default : return state
    }
}