import {
  LOGOUT_ACCOUNT_SUCCESS,
  LOGOUT_ACCOUNT_ERROR,
  CLEAR_CATEGORIES,
  USE_SNACK_BAR,
} from '../actionTypes/actionTypes';

export const logOut = () => (dispatch) => {
  try {
    const token = localStorage.setItem('token', '');
    if (!token) {
      dispatch({ type: LOGOUT_ACCOUNT_SUCCESS, payload: false });
      dispatch({ type: CLEAR_CATEGORIES });
    } else {
      dispatch({ type: LOGOUT_ACCOUNT_ERROR });
    }
  } catch (e) {
    dispatch({ type: USE_SNACK_BAR, payload: { success: true, message: 'Стой, останься с нами на дворе вьюга, выйдешь позже' } });
    dispatch({ type: LOGOUT_ACCOUNT_ERROR });
  }
};

export default logOut;
