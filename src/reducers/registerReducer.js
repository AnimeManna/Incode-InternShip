import {
    FETCH_REGISTER_ERROR,
    FETCH_REGISTER_SUCCESS,
    REGISTER_INPUT_VALID,
    LOGOUT_ACCOUNT_SUCCESS
} from "../actionTypes/actionTypes";

const initialState = {
    user:{},
    errorMessage:'',
    isValid:false
};

export default (state=initialState,action) => {
    switch (action.type) {
        case FETCH_REGISTER_SUCCESS:{
            localStorage.setItem("token", action.payload.token);
            console.log(action.payload.isValid);
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
        case REGISTER_INPUT_VALID:{
            return{
                ...state,
                isValid:action.payload
            }
        }
        case LOGOUT_ACCOUNT_SUCCESS:{
            return{
                ...state,
                user:{
                    token:''
                }
            }
        }
        default:return state
    }
}