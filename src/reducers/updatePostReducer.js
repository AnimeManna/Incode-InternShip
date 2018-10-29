import {
    GET_POST_UPDATE_ERROR,
    GET_POST_UPDATE_SUCCESS
} from "../actionTypes/actionTypes";

const initialState = {
    post:{},
    success:false
}

export default (state = initialState, action) => {
    const {payload, type } = action
    switch (type) {

        case GET_POST_UPDATE_SUCCESS:{
            return {
                ...state,
                post:payload.data,
                success:payload.success
            }
        }
        case GET_POST_UPDATE_ERROR:{
            return {
                ...state,
                success:payload
            }
        }

        default : return state

    }
}