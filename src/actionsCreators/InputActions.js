export const inputValid = (name,data) => {
    return dispatch =>{
        dispatch({type:`${name}_INPUT_VALID`,payload:data})
    }
}

export const inputChanged = (name, data) =>{
    return dispatch => {
        dispatch({type:`${name}_INPUT_CHANGE`,payload:data})
    }
}