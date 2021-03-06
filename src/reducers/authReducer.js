import {
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  GET_USER_START,
  LOGOUT_ACCOUNT_SUCCESS,
} from '../actionTypes/actionTypes';

const initialState = {
  msg: '',
  success: false,
  user: {
    id: '',
    login: '',
    password: '',
  },
  token: localStorage.getItem('token'),
  isLoaded: false,
  isLoading: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_START: {
      return {
        ...state,
        isLoaded: payload.isLoaded,
        isLoading: payload.isLoading,
      };
    }

    case GET_USER_SUCCESS: {
      return {
        ...state,
        success: true,
        user: payload.response,
        isLoaded: payload.isLoaded,
        isLoading: payload.isLoading,
      };
    }
    case GET_USER_ERROR: {
      return {
        ...state,
        msg: payload,
        isLoaded: payload.isLoaded,
        isLoading: payload.isLoading,
      };
    }
    case LOGOUT_ACCOUNT_SUCCESS: {
      return {
        ...state,
        success: payload,
        user: {
          id: '',
          login: '',
          password: '',
        },
      };
    }
    default:
      return state;
  }
};
