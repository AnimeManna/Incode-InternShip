import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import authReducer from './authReducer';
import newPostReducer from './newPostReducer';
import postsReducer from './postsReducer';
import categoryReducer from './categoryReducer';
import postReducer from './postReducer';
import accountReducer from './accountReducer';
import commentReducer from './commentReducer';
import updatePostReducer from './updatePostReducer';
import snackBarReducer from './snackBarReducer';
import modalNewPostReducer from './modalNewPostReducer';

export default combineReducers({
  loginReducer,
  registerReducer,
  authReducer,
  newPostReducer,
  postsReducer,
  categoryReducer,
  postReducer,
  accountReducer,
  commentReducer,
  updatePostReducer,
  snackBarReducer,
  modalNewPostReducer,
});
