import axiosProviders from '../providers/axiosProvider';

import {
  SENDING_NEWPOST_START,
  SENDING_NEWPOST_ERROR,
  SENDING_NEWPOST_SUCCESS,
  CLEAR_INPUTS_NEWPOST,
  USE_SNACK_BAR,
} from '../actionTypes/actionTypes';

import { getCategories } from './categoryActions';

import { getPosts } from './postsActions';

import { closeModalNewPost } from './modalNewPostActions';

import { getUserPostsById } from './accountActions';

export const sendNewPost = (data, id) => async (dispatch) => {
  dispatch({
    type: SENDING_NEWPOST_START,
    payload: {
      newPostIsLoading: true,
      newPostIsLoaded: false,
    },
  });
  try {
    const response = await axiosProviders.createPostRequestWithToken('post', data);
    const { success } = response;
    if (!success) {
      dispatch({
        type: USE_SNACK_BAR,
        payload: {
          message: 'Это лучший пост, что я читал! Мы немедленно добавим его в наш список постов',
          success: true,
        },
      });
      dispatch({
        type: SENDING_NEWPOST_SUCCESS,
        payload: {
          success,
          newPostIsLoading: false,
          newPostIsLoaded: true,
        },
      });
      dispatch({ type: CLEAR_INPUTS_NEWPOST });
      getCategories()(dispatch);
      getUserPostsById(id)(dispatch);
      getPosts()(dispatch);
      closeModalNewPost()(dispatch);
    } else {
      dispatch({
        type: SENDING_NEWPOST_ERROR,
        payload: {
          success,
          newPostIsLoading: false,
          newPostIsLoaded: true,
        },
      });
    }
  } catch (e) {
    dispatch({
      type: USE_SNACK_BAR,
      payload: {
        message: 'Оу, простите, но подороге на нас напали грабители и забрали ваш пост, повторите попытку позже, они ещё могут быть рядом',
        success: true,
      },
    });
  }
};

export default sendNewPost;
