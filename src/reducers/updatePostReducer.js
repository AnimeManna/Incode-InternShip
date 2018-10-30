import {
  GET_POST_UPDATE_ERROR,
  GET_POST_UPDATE_SUCCESS,
  GET_POST_UPDATE_START,
  UPDATE_POST_START,
  UPDATE_POST_ERROR,
  UPDATE_POST_SUCCESS,
} from '../actionTypes/actionTypes';

const initialState = {
  post: {},
  success: undefined,
  isLoading: false,
  isLoaded: false,
  updateIsLoading: true,
  updateIsLoaded: true,
};

export default (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_POST_UPDATE_START: {
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
      };
    }

    case GET_POST_UPDATE_SUCCESS: {
      return {
        ...state,
        post: payload.response.data,
        success: payload.response.success,
        isLoaded: payload.isLoaded,
        isLoading: payload.isLoading,
      };
    }
    case GET_POST_UPDATE_ERROR: {
      return {
        ...state,
        isLoaded: payload.isLoaded,
        isLoading: payload.isLoading,
        success: false,
      };
    }

    case UPDATE_POST_START: {
      return {
        ...state,
        updateIsLoaded: payload.isLoaded,
        updateIsLoading: payload.isLoading,
      };
    }
    case UPDATE_POST_SUCCESS: {
      return {
        ...state,
        updateIsLoaded: payload.isLoaded,
        updateIsLoading: payload.isLoading,
      };
    }
    case UPDATE_POST_ERROR: {
      return {
        ...state,
        updateIsLoaded: payload.isLoaded,
        updateIsLoading: payload.isLoading,
      };
    }

    default: return state;
  }
};
