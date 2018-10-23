import {
    FETCH_AUTH_SUCCESS,
    FETCH_AUTH_ERROR,
    LOGOUT_ACCOUNT_ERROR,
    LOGOUT_ACCOUNT_SUCCESS
} from "../actionTypes/actionTypes";

const initialState = {
    msg:'',
    success:false,
    user:{

    },
    token:localStorage.getItem("token")
}

export default (state = initialState,action)=>{
    switch (action.type) {
        case FETCH_AUTH_SUCCESS:{
            return {
                ...state,
                ...action.payload
            }
        }
        case FETCH_AUTH_ERROR:{
            return {
                ...state,
                msg:action.payload
            }
        }
        case LOGOUT_ACCOUNT_SUCCESS:{
            return{
                ...state,
                success:action.payload
            }
        }

        default:return state
    }
}