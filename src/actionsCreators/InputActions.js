export const changeInput = (name,data) => {
    return dispatch =>{
        dispatch({type:`${name}_INPUT_VALID`,payload:data})
    }
}