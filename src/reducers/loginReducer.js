import {
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_ERROR,
    LOGIN_INPUT_VALID,
    LOGOUT_ACCOUNT_SUCCESS
} from "../actionTypes/actionTypes";

const initialState = {
    isAuth:false,
    user:{
        success:false
    },
    errorMessage:'',
    hasChanges: false,
    isValid:false
}

export default (state=initialState,action)=>{
    switch(action.type){
        case FETCH_LOGIN_SUCCESS:{
            localStorage.setItem("token", action.payload.token);
            return{
                ...state,
                user:{
                    ...action.payload
                }
            }
        }
        case FETCH_LOGIN_ERROR:{
            return{
                ...state,
                errorMessage:action.payload
            }
        }
        case LOGIN_INPUT_VALID:{
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