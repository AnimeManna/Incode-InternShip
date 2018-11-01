import axiosProviders from '../providers/axiosProvider';

import { getUser } from './authActions';

import {
  FETCH_LOGIN_ERROR,
  FETCH_LOGIN_START,
  FETCH_LOGIN_SUCCESS,
  USE_SNACK_BAR,
} from '../actionTypes/actionTypes';


export const sendDataLogin = (data, history) => async (dispatch) => {
  dispatch({
    type: FETCH_LOGIN_START,
    payload: {
      isLoaded: false,
      isLoading: true,
    },
  });
  try {
    const response = await axiosProviders.createPostRequest('login', data);
    if (response.success) {
      dispatch({
        type: FETCH_LOGIN_SUCCESS,
        payload: {
          response,
          isLoaded: true,
          isLoading: false,
        },
      });
      dispatch({
        type: USE_SNACK_BAR,
        payload: {
          message: 'Добро пожаловать в мою таверну!',
          success: true,
        },
      });
      getUser(history)(dispatch);
    } else {
      dispatch({
        type: FETCH_LOGIN_ERROR,
        payload: {
          response,
          isLoaded: true,
          isLoading: false,
        },
      });
    }
  } catch (e) {
    const arrayError = e.message.split(' ');
    const numberError = arrayError.slice(5, 6);
    const stringNumberError = numberError.join(' ');
    if (stringNumberError === '403') {
      dispatch({
        type: USE_SNACK_BAR,
        payload: { message: 'Кажется это не твой пароль, може ты попутал?', success: true },
      });
    } else if (stringNumberError === '404') {
      dispatch({
        type: USE_SNACK_BAR,
        payload: { message: 'Прости, но кажется тебя нет в списке, может ты не правильно назвал своё имя?', success: true },
      });
    } else {
      dispatch({
        type: USE_SNACK_BAR,
        payload: { message: 'Простите, но кажется мы потеряли список гостей, возвращайтесь попозже, мы его пока найдём', success: true },
      });
    }
    dispatch({
      type: FETCH_LOGIN_ERROR,
      payload: {
        isLoaded: true,
        isLoading: false,
        response: { success: false },
      },
    });
  }
};

export default sendDataLogin;
