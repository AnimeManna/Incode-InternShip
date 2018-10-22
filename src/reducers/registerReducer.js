import {
    FETCH_REGISTER_ERROR,
    FETCH_REGISTER_SUCCESS
} from "../actionTypes/actionTypes";

const initialState = {
    user:{},
    errorMessage:''
};

export default (state=initialState,action) => {
    switch (action.type) {
        case FETCH_REGISTER_SUCCESS:{
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                user:{
                    ...action.payload
                }
            }
        }
        case FETCH_REGISTER_ERROR:{
            return {
                ...state,
                errorMessage:action.payload
            }
        }
        default:return state
    }
}