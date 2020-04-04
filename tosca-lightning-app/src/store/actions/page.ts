import { Dispatch } from 'redux';
import { Message, MessageVariant } from '../../models/Message';

export const CHANGE_MESSAGE = 'message/CHANGE_MESSAGE';

export const changeMessageAction = (dispatch: Dispatch) => {
  return async (variant: MessageVariant, text: string) => {
    dispatch(action({ id: Math.random(), variant, text }));
  };

  function action(message: Message) {
    return { type: CHANGE_MESSAGE, payload: message };
  }
};

export const clearMessageAction = (dispatch: Dispatch) => {
  return async () => {
    dispatch(action());
  };

  function action() {
    return { type: CHANGE_MESSAGE, payload: undefined };
  }
};
