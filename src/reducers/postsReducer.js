import {
    GET_POSTS_SUCCESS,
    GET_POSTS_ERROR,
    DELETE_POST_SUCCESS,
    DELETE_POST_ERROR,
    UPDATE_POST_ERROR,
    UPDATE_POST_SUCCESS,
    CHANGE_POST,
    CHANGE_POST_SUCCESS,
    CHANGE_POST_ERROR,
    CHANGE_POST_CATEGORY_ERROR,
    CHANGE_POST_CATEGORY_SUCCESS
} from "../actionTypes/actionTypes";

const initialState = {
    posts: [],
    post:{},
    msg: '',
    errorMessage: '',
    updateStatusMessage: '',
    updatePostID:'',
    updateMessage:'',
    deleteSuccess:false
}

export default (state = initialState, action) => {
    const {payload, type} = action
    switch (type) {
        case GET_POSTS_SUCCESS: {
            return {
                ...state,
                posts: payload.data,
                msg: payload.msg
            }
        }
        case GET_POSTS_ERROR: {
            return {
                ...state,
                msg: payload
            }
        }

        case UPDATE_POST_SUCCESS: {
            return {
                ...state,
                updateMessage: payload
            }

        }

        case UPDATE_POST_ERROR: {
            return {
                ...state,
                updateMessage: payload
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
        case CHANGE_POST_SUCCESS:{
            return {
                ...state,
                post:payload.post,
                updateStatusMessage:payload.msg,
                updateMessage:''
            }
        }
        case CHANGE_POST_ERROR:{
            return {
                ...state,
                updateStatusMessage:payload
            }
        }
        default:
            return state

    }
}