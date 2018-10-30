import {
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  USE_SNACK_BAR,
} from '../actionTypes/actionTypes';

import { getCategories } from './categoryActions';

import axiosProviders from '../providers/axiosProvider';


export const getUser = history => async (dispatch) => {
  dispatch({ type: GET_USER_START, payload: { isLoaded: false, isLoading: true } });
  try {
    const response = await axiosProviders.getRequestWithToken('user');
    if (response) {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: {
          response,
          isLoaded: true,
          isLoading: false,
        },
      });
      dispatch({
        type: USE_SNACK_BAR,
        payload: { message: 'Заходи, заходи, я уже нагрел тебе место', success: true },
      });
      history.push('/home');
      getCategories()(dispatch);
    } else {
      dispatch({
        type: GET_USER_ERROR,
        payload: {
          response,
          isLoaded: true,
          isLoading: false,
        },
      });
      history.push('/');
    }
  } catch (e) {
    dispatch({
      type: GET_USER_ERROR,
      payload: {
        isLoaded: true,
        isLoading: false,
      },
    });
    dispatch({
      type: USE_SNACK_BAR,
      payload: {
        message: 'Опп, что-то я тебя не узнаю, не напомнишь кто ты? Или мы ещё не знакомы?',
        success: true,
        isLoaded: true,
        isLoading: false,
      },
    });
  }
};

export default getUser;
