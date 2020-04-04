import { AnyAction } from 'redux';
import { Message } from '../../models/Message';
import { CHANGE_MESSAGE } from '../actions/page';

interface PageState {
  message: Message | undefined;
}

const initialState: PageState = {
  message: undefined,
};

export const pageReducer = (state: PageState = initialState, action: AnyAction) => {
  switch (action.type) {
    case CHANGE_MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};
