import {
    GET_POST_SUCCESS,
    GET_POST_ERROR
} from "../actionTypes/actionTypes";

const initialState = {
    post: {},
    success: false,
}

export default (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case GET_POST_SUCCESS: {
            return {
                ...state,
                post: payload.data,
                success: payload.success
            }
        }

        case GET_POST_ERROR: {
            return {
                ...state,
                success: payload
            }
        }

        default:
            return state
    }
}