import {
  GET_POST_SUCCESS,
  GET_POST_ERROR,
  GET_POST_START,
} from '../actionTypes/actionTypes';

const initialState = {
  post: {
    title: '',
    body: '',
    id: '',
  },
  success: false,
  isLoading: true,
  isLoaded: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POST_START: {
      return {
        ...state,
        isLoading: payload.isLoading,
        isLoaded: payload.isLoaded,
      };
    }

    case GET_POST_SUCCESS: {
      return {
        ...state,
        post: payload.post.data,
        success: payload.post.success,
        isLoading: payload.isLoading,
        isLoaded: payload.isLoaded,
      };
    }

    case GET_POST_ERROR: {
      return {
        ...state,
        success: payload,
        isLoaded: !payload,
        isLoading: payload,
      };
    }

    default:
      return state;
  }
};
