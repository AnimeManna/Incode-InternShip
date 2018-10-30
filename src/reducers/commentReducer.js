import {
  SEND_COMMENT_START,
  SEND_COMMENT_SUCCESS,
  SEND_COMMENT_ERROR,
  GET_COMMENTS_START,
  GET_COMMENTS_ERROR,
  GET_COMMENTS_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
} from '../actionTypes/actionTypes';

const initialState = {
  success: false,
  comments: [],
  isLoading: true,
  isLoaded: false,
  deleteStatus: false,
  commentLoaded: true,
  commentLoading: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEND_COMMENT_START: {
      return {
        ...state,
        commentLoaded: payload.commentLoaded,
        commentLoading: payload.commentLoading,
      };
    }

    case SEND_COMMENT_SUCCESS: {
      return {
        ...state,
        success: payload.success,
        commentLoaded: payload.commentLoaded,
        commentLoading: payload.commentLoading,
      };
    }

    case SEND_COMMENT_ERROR: {
      return {
        ...state,
        success: payload.success,
        commentLoaded: payload.commentLoaded,
        commentLoading: payload.commentLoading,
      };
    }

    case GET_COMMENTS_START: {
      return {
        ...state,
        isLoaded: payload.isLoaded,
        isLoading: payload.isLoading,
      };
    }
    case GET_COMMENTS_SUCCESS: {
      return {
        ...state,
        isLoaded: payload.isLoaded,
        isLoading: payload.isLoading,
        comments: payload.response.comments,
        success: payload.response.success,
      };
    }
    case GET_COMMENTS_ERROR: {
      return {
        ...state,
        isLoading: payload.isLoading,
        isLoaded: payload.isLoaded,
        success: payload.response.success,
      };
    }

    case DELETE_COMMENT_SUCCESS: {
      return {
        ...state,
        deleteStatus: payload,
      };
    }

    case DELETE_COMMENT_ERROR: {
      return {
        ...state,
        deleteStatus: payload,
      };
    }

    default:
      return state;
  }
};
