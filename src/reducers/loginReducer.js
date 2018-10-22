import {
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_ERROR
} from "../actionTypes/actionTypes";

const initialState = {
    isAuth:false,
    user:{

    },
    errorMessage:''
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
        default:return state
    }
}