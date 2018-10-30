import axiosProviders from '../providers/axiosProvider';

import {
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  GET_POSTS_START,
  DELETE_POST_ERROR,
  DELETE_POST_START,
  DELETE_POST_SUCCESS,
  CHANGE_POST,
  CHANGE_POST_CATEGORY_ERROR,
  CHANGE_POST_CATEGORY_START,
  CHANGE_POST_CATEGORY_SUCCESS,
  USE_SNACK_BAR,
} from '../actionTypes/actionTypes';

import { getUserPostsById } from './accountActions';

export const getPosts = () => async (dispatch) => {
  dispatch({ type: GET_POSTS_START, payload: { isLoaded: false, isLoading: true } });
  const response = await axiosProviders.getRequestWithToken('post');
  const { success, data } = response;
  if (success) {
    dispatch({ type: GET_POSTS_SUCCESS, payload: { data, isLoading: false, isLoaded: true } });
  } else {
    dispatch({ type: GET_POSTS_ERROR, payload: { isLoading: false, isLoaded: true } });
  }
};

export const changePostCategories = query => async (dispatch) => {
  dispatch({ type: CHANGE_POST_CATEGORY_START, payload: { isLoaded: false, isLoading: true } });
  const response = await axiosProviders.getRequestWithToken(`post/category/${query}`);
  if (response.success) {
    dispatch({
      type: CHANGE_POST_CATEGORY_SUCCESS,
      payload: {
        response,
        isLoaded: true,
        isLoading: false,

      },
    });
  } else {
    dispatch({
      type: CHANGE_POST_CATEGORY_ERROR,
      payload: {
        response,
        isLoaded: true,
        isLoading: false,
      },
    });
  }
};


export const deletePost = (id, userID) => async (dispatch) => {
  dispatch({ type: DELETE_POST_START, payload: { deleteIsLoading: true, deleteIsLoaded: false } });
  try {
    const response = await axiosProviders.createDeleteRequest(id);
    const { success } = response;
    if (success) {
      dispatch({
        type: DELETE_POST_SUCCESS,
        payload: {
          success,
          deleteIsLoading: false,
          deleteIsLoaded: true,
        },
      });
      dispatch({
        type: USE_SNACK_BAR,
        payload: {
          message: 'Пост успешно удалён, думаю теперь он задумается над своим поведением.',
          success: true,
        },
      });
      getPosts()(dispatch);
      getUserPostsById(userID)(dispatch);
    } else {
      dispatch({
        type: DELETE_POST_ERROR,
        payload: {
          success,
          deleteIsLoading: false,
          deleteIsLoaded: true,
        },
      });
    }
  } catch (e) {
    dispatch({
      type: USE_SNACK_BAR,
      payload: {
        message: 'Простите, не получается удалить пост, но мы сделали ему предупреждение',
        success: true,
      },
    });
  }
};

export const changePost = id => (dispatch) => {
  dispatch({ type: CHANGE_POST, payload: id });
};
