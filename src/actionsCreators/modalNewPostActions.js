import {
    OPEN_MODAL_NEWPOST,
    CLOSE_MODAL_NEWPOST
} from "../actionTypes/actionTypes";

export const openModalNewPost = () => {
    return dispatch => {
        dispatch({type:OPEN_MODAL_NEWPOST,payload:true})
    }
}

export const closeModalNewPost = () => {
    return dispatch => {
        dispatch({type:CLOSE_MODAL_NEWPOST, payload:false})
    }
}