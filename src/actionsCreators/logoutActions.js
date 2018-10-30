import {
  LOGOUT_ACCOUNT_SUCCESS,
  LOGOUT_ACCOUNT_ERROR,
  CLEAR_CATEGORIES,
} from '../actionTypes/actionTypes';

export const logOut = () => (dispatch) => {
  const token = localStorage.setItem('token', '');
  if (!token) {
    dispatch({ type: LOGOUT_ACCOUNT_SUCCESS, payload: false });
    dispatch({ type: CLEAR_CATEGORIES });
  } else {
    dispatch({ type: LOGOUT_ACCOUNT_ERROR });
  }
};
