import {combineReducers} from 'redux'

import loginReducer from './loginReducer'
import registerReducer from './registerReducer'
import authReducer from './authReducer'
import newPostReducer from './newPostReducer'

export default combineReducers({
    loginReducer,
    registerReducer,
    authReducer,
    newPostReducer
})