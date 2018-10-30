import {
  OPEN_MODAL_NEWPOST,
  CLOSE_MODAL_NEWPOST,
} from '../actionTypes/actionTypes';

const initialState = {
  openModal: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case OPEN_MODAL_NEWPOST: {
      return {
        ...state,
        openModal: payload,
      };
    }

    case CLOSE_MODAL_NEWPOST: {
      return {
        ...state,
        openModal: false,
      };
    }

    default:
      return state;
  }
};
