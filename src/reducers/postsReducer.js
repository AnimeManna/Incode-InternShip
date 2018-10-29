import {
    GET_POSTS_SUCCESS,
    GET_POSTS_ERROR,
    DELETE_POST_SUCCESS,
    DELETE_POST_ERROR,
    CHANGE_POST,
    CHANGE_POST_CATEGORY_ERROR,
    CHANGE_POST_CATEGORY_SUCCESS,
    GET_POSTS_START
} from "../actionTypes/actionTypes";

const initialState = {
    posts: [],
    msg: '',
    errorMessage: '',
    updateStatusMessage: '',
    updatePostID:'',
    deleteSuccess:false,
    isLoading:false,
    isLoaded:true
}

export default (state = initialState, action) => {
    const {payload, type} = action
    switch (type) {

        case GET_POSTS_START:{
            return {
                ...state,
                isLoaded:payload.isLoaded,
                isLoading:payload.isLoading
            }
        }

        case GET_POSTS_SUCCESS: {
            return {
                ...state,
                posts: payload.data,
                isLoaded:payload.isLoaded,
                isLoading:payload.isLoading,
                msg: payload.msg
            }
        }
        case GET_POSTS_ERROR: {
            return {
                ...state,
                msg: payload
            }
        }

        case CHANGE_POST: {
            return {
                ...state,
                updatePostID:payload
            }
        }

        case CHANGE_POST_CATEGORY_SUCCESS: {
            return {
                ...state,
                posts:payload
            }
        }

        case CHANGE_POST_CATEGORY_ERROR: {
            return {
                ...state,
                success:payload
            }
        }

        case DELETE_POST_SUCCESS: {
            return {
                ...state,
                deleteSuccess: payload
            }
        }
        case DELETE_POST_ERROR: {
            return {
                ...state,
                deleteSuccess: payload
            }
        }
        default:
            return state

    }
}