import {
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  DELETE_POST_START,
  CHANGE_POST,
  CHANGE_POST_CATEGORY_START,
  CHANGE_POST_CATEGORY_ERROR,
  CHANGE_POST_CATEGORY_SUCCESS,
  GET_POSTS_START,
} from '../actionTypes/actionTypes';

const initialState = {
  posts: [],
  errorMessage: '',
  updateStatusMessage: '',
  updatePostID: '',
  deleteSuccess: false,
  isLoading: false,
  isLoaded: true,
  deleteIsLoaded: true,
  deleteIsLoading: false,
  postsCategoryIsLoaded: true,
  postsCategoryIsLoading: false,
};

export default (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_POSTS_START: {
      return {
        ...state,
        isLoaded: payload.isLoaded,
        isLoading: payload.isLoading,
      };
    }

    case GET_POSTS_SUCCESS: {
      return {
        ...state,
        posts: payload.data,
        isLoaded: payload.isLoaded,
        isLoading: payload.isLoading,
      };
    }
    case GET_POSTS_ERROR: {
      return {
        ...state,
        isLoaded: payload.isLoaded,
        isLoading: payload.isLoading,
      };
    }

    case CHANGE_POST: {
      return {
        ...state,
        updatePostID: payload,
      };
    }

    case CHANGE_POST_CATEGORY_START: {
      return {
        ...state,
        postsCategoryIsLoaded: payload.isLoaded,
        postsCategoryIsLoading: payload.isLoading,
      };
    }

    case CHANGE_POST_CATEGORY_SUCCESS: {
      return {
        ...state,
        posts: payload.response.posts,
        postsCategoryIsLoaded: payload.isLoaded,
        postsCategoryIsLoading: payload.isLoading,

      };
    }

    case CHANGE_POST_CATEGORY_ERROR: {
      return {
        ...state,
        success: payload.response.success,
        postsCategoryIsLoaded: payload.isLoaded,
        postsCategoryIsLoading: payload.isLoading,
      };
    }

    case DELETE_POST_START: {
      return {
        ...state,
        deleteIsLoaded: payload.deleteIsLoaded,
        deleteIsLoading: payload.deleteIsLoading,
      };
    }

    case DELETE_POST_SUCCESS: {
      return {
        ...state,
        deleteSuccess: payload.success,
        deleteIsLoaded: payload.deleteIsLoaded,
        deleteIsLoading: payload.deleteIsLoading,
      };
    }
    case DELETE_POST_ERROR: {
      return {
        ...state,
        deleteSuccess: payload.success,
        deleteIsLoaded: payload.deleteIsLoaded,
        deleteIsLoading: payload.deleteIsLoading,
      };
    }
    default:
      return state;
  }
};
