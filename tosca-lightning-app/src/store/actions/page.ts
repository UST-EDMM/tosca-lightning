import { Dispatch } from 'redux';
import { Message, MessageVariant } from '../../models/Message';
import {
  CHANGE_MESSAGE, CONFIG_GET_FAILURE, CONFIG_GET_REQUEST, CONFIG_GET_SUCCESS, PLUGINS_GET_FAILURE, PLUGINS_GET_REQUEST,
  PLUGINS_GET_SUCCESS, SERVICE_TEMPLATES_GET_FAILURE, SERVICE_TEMPLATES_GET_REQUEST, SERVICE_TEMPLATES_GET_SUCCESS
} from '../reducers/page';
import { backendService } from '../../service/backend';
import { Config } from '../../models/Config';
import { Plugin } from '../../models/Plugin';
import { ServiceTemplate } from '../../models/ServiceTemplate';

export const getConfigAction = (dispatch: Dispatch) => {
  return async () => {
    dispatch(request());
    try {
      const config = await backendService.getConfig();
      dispatch(success(config));
    } catch {
      dispatch(failure());
    }
  };

  function request() {
    return { type: CONFIG_GET_REQUEST };
  }

  function success(config: Config) {
    return { type: CONFIG_GET_SUCCESS, payload: config };
  }

  function failure() {
    return { type: CONFIG_GET_FAILURE };
  }
};

export const getPluginsAction = (dispatch: Dispatch) => {
  return async () => {
    dispatch(request());
    try {
      const plugins = await backendService.getPlugins();
      dispatch(success(plugins));
    } catch {
      dispatch(failure());
    }
  };

  function request() {
    return { type: PLUGINS_GET_REQUEST };
  }

  function success(plugins: Plugin[]) {
    return { type: PLUGINS_GET_SUCCESS, payload: plugins };
  }

  function failure() {
    return { type: PLUGINS_GET_FAILURE };
  }
};

export const getServiceTemplatesAction = (dispatch: Dispatch) => {
  return async () => {
    dispatch(request());
    try {
      const items = await backendService.getServiceTemplates();
      dispatch(success(items));
    } catch {
      dispatch(failure());
    }
  };

  function request() {
    return { type: SERVICE_TEMPLATES_GET_REQUEST };
  }

  function success(items: ServiceTemplate[]) {
    return { type: SERVICE_TEMPLATES_GET_SUCCESS, payload: items };
  }

  function failure() {
    return { type: SERVICE_TEMPLATES_GET_FAILURE };
  }
};

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
