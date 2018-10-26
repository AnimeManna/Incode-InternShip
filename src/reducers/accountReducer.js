import {
    GET_USER_BY_ID_SUCCESS,
    GET_USER_BY_ID_ERROR,
    DISPATCH_USER_ID
} from "../actionTypes/actionTypes";

const initialState = {
    posts: [],
    success: false,
    error: '',
    userId:''
}

export default (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case GET_USER_BY_ID_SUCCESS: {
            return {
                ...state,
                posts:payload.data,
                success:payload.success
            }
        }

        case GET_USER_BY_ID_ERROR:{
            return {
                ...state,
                success:payload.success,
                error:payload.error
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