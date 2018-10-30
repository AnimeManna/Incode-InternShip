import {
    GET_USER_BY_ID_SUCCESS,
    GET_USER_BY_ID_ERROR,
    GET_USER_BY_ID_START,
    DISPATCH_USER_ID
} from "../actionTypes/actionTypes";

const initialState = {
    posts: [],
    success: false,
    error: '',
    userId:'',
    isLoading:false,
    isLoaded:false
}

export default (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {

        case GET_USER_BY_ID_START:{
            return {
                ...state,
                isLoaded:payload.isLoaded,
                isLoading:payload.isLoading
            }
        }

        case GET_USER_BY_ID_SUCCESS: {
            return {
                ...state,
                posts:payload.user.data,
                success:payload.user.success,
                isLoaded:payload.isLoaded,
                isLoading:payload.isLoading
            }
        }

        case GET_USER_BY_ID_ERROR:{
            return {
                ...state,
                success:payload.user.success,
                error:payload.user.error,
                isLoaded:payload.isLoaded,
                isLoading:payload.isLoading
            }
        }

        case DISPATCH_USER_ID :{
            return {
                ...state,
                userId:payload
            }
        }

        default:
            return state
    }
}