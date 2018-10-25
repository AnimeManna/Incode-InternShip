export const inputValid = (name,data) => {
    return dispatch =>{
        dispatch({type:`${name}_INPUTS_VALID`,payload:data})
    }
}

export const inputChanged = (name, data) =>{
    return dispatch => {
        dispatch({type:`${name}_INPUTS_CHANGE`,payload:data})
    }
}