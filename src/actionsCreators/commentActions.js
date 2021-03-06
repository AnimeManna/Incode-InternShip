import axiosProvider from '../providers/axiosProvider';

import {
  SEND_COMMENT_START,
  SEND_COMMENT_ERROR,
  SEND_COMMENT_SUCCESS,
  GET_COMMENTS_START,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_ERROR,
  DELETE_COMMENT_START,
  DELETE_COMMENT_ERROR,
  DELETE_COMMENT_SUCCESS, USE_SNACK_BAR,
} from '../actionTypes/actionTypes';


export const getComments = postID => async (dispatch) => {
  dispatch({ type: GET_COMMENTS_START, payload: { isLoaded: false, isLoading: true } });
  try {
    const response = await axiosProvider.getRequestWithToken(`comment/${postID}`);
    if (response.success) {
      dispatch({
        type: GET_COMMENTS_SUCCESS,
        payload: {
          response,
          isLoading: false,
          isLoaded: true,
        },
      });
    } else {
      dispatch({
        type: GET_COMMENTS_ERROR,
        payload: {
          response,
          isLoading: false,
          isLoaded: true,
        },
      });
    }
  } catch (e) {
    dispatch({
      type: USE_SNACK_BAR,
      payload: {
        message: 'Ох чёрт эти коментарии вечно опаздывают, но не переживайте мы их накажем и в следуйщий раз они явятся быстрее!',
        success: true,
      },
    });
  }
};


export const sendComment = (dataComment, postId) => async (dispatch) => {
  dispatch({ type: SEND_COMMENT_START, payload: { commentLoaded: false, commentLoading: true } });
  try {
    const response = await axiosProvider.createPostRequestWithToken(`comment/${postId}`, dataComment);
    if (response) {
      dispatch({
        type: SEND_COMMENT_ERROR,
        payload: {
          success: false,
          commentLoaded: true,
          commentLoading: false,
        },
      });
      dispatch({
        type: USE_SNACK_BAR,
        payload: {
          message: 'Простите, мы потеряли ваш комментарий по пути, не могли бы вы попробовать позже, вдруг мы его ещё найдём',
          success: true,
        },
      });
    } else {
      dispatch({
        type: SEND_COMMENT_SUCCESS,
        payload: {
          success: true,
          commentLoaded: true,
          commentLoading: false,
        },
      });
      dispatch({
        type: USE_SNACK_BAR,
        payload: {
          message: 'Комментарий добавлен и уже на месте!',
          success: true,
        },
      });
      getComments(postId)(dispatch);
    }
  } catch (e) {
    dispatch({
      type: USE_SNACK_BAR,
      payload: {
        message: 'Что-то с этим коментарием не так, попробуйте позже, мы пока разберемся',
        success: true,
      },
    });
  }
};

export const deleteComment = (uri, postID) => async (dispatch) => {
  dispatch({ type: DELETE_COMMENT_START });
  const response = await axiosProvider.createDeleteRequest(uri);
  if (response.success) {
    dispatch({ type: DELETE_COMMENT_SUCCESS, payload: true });
    getComments(postID)(dispatch);
  } else {
    dispatch({ type: DELETE_COMMENT_ERROR, payload: false });
  }
};
