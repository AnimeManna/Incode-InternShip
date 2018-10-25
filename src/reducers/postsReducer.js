import {
    GET_POSTS_SUCCESS,
    GET_POSTS_ERROR,
    DELETE_POST_SUCCESS,
    DELETE_POST_ERROR,
    UPDATE_POST_ERROR,
    UPDATE_POST_SUCCESS,
    CHANGE_POST,
    CHANGE_POST_SUCCESS,
    CHANGE_POST_ERROR
} from "../actionTypes/actionTypes";

const initialState = {
    posts: [],
    post:{},
    msg: '',
    errorMessage: '',
    updateStatusMessage: '',
    updatePostID:'',
    updateMessage:''
}

export default (state = initialState, action) => {
    const {payload, type} = action
    switch (type) {
        case GET_POSTS_SUCCESS: {
            return {
                ...state,
                posts: payload.posts,
                msg: payload.msg
            }
        }
        case GET_POSTS_ERROR: {
            return {
                ...state,
                msg: payload.msg
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

        case DELETE_POST_SUCCESS: {
            return {
                ...state,
                errorMessage: payload
            }
        }
        case DELETE_POST_ERROR: {
            return {
                ...state,
                errorMessage: payload
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