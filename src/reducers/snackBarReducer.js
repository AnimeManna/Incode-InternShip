import {
    CLOSE_SNACK_BAR,
    USE_SNACK_BAR
} from "../actionTypes/actionTypes";

const initialState = {
    message: '',
    openSnackBar: false
}

export default (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {

        case USE_SNACK_BAR:{
            return {
                ...state,
                message:payload.message,
                openSnackBar:payload.success
            }
        }

        case CLOSE_SNACK_BAR: {
            return {
                ...state,
                message: payload.message,
                openSnackBar: payload.success
            }
        }

        default:
            return state
    }
}