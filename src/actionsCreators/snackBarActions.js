import {
    CLOSE_SNACK_BAR,
} from "../actionTypes/actionTypes";

export const closeSnackBar = () =>{
    return dispatch =>{
        dispatch({type:CLOSE_SNACK_BAR,payload:{message:'', success:false}})
    }
}