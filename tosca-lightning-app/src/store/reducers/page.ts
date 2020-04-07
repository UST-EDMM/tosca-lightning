import { AnyAction } from 'redux';
import { Message } from '../../models/Message';
import { Config } from '../../models/Config';
import { Plugin } from '../../models/Plugin';
import { createResourceMap, ResourceMap } from '../../lib/resourceSupport';
import { ServiceTemplate } from '../../models/ServiceTemplate';

export const CONFIG_GET_REQUEST = 'CONFIG_GET_REQUEST';
export const CONFIG_GET_SUCCESS = 'CONFIG_GET_SUCCESS';
export const CONFIG_GET_FAILURE = 'CONFIG_GET_FAILURE';
export const PLUGINS_GET_REQUEST = 'PLUGINS_GET_REQUEST';
export const PLUGINS_GET_SUCCESS = 'PLUGINS_GET_SUCCESS';
export const PLUGINS_GET_FAILURE = 'PLUGINS_GET_FAILURE';
export const SERVICE_TEMPLATES_GET_REQUEST = 'SERVICE_TEMPLATES_GET_REQUEST';
export const SERVICE_TEMPLATES_GET_SUCCESS = 'SERVICE_TEMPLATES_GET_SUCCESS';
export const SERVICE_TEMPLATES_GET_FAILURE = 'SERVICE_TEMPLATES_GET_FAILURE';
export const CHANGE_MESSAGE = 'CHANGE_MESSAGE';

interface PageState {
  config?: Config;
  plugins: Plugin[];
  serviceTemplates: ServiceTemplate[];
  serviceTemplatesById: ResourceMap<ServiceTemplate>;
  isLoading: boolean;
  message: Message | undefined;
}

const initialState: PageState = {
  config: undefined,
  plugins: [],
  serviceTemplates: [],
  serviceTemplatesById: {},
  isLoading: false,
  message: undefined,
};

export const pageReducer = (state: PageState = initialState, action: AnyAction) => {
  switch (action.type) {
    case CONFIG_GET_REQUEST:
    case PLUGINS_GET_REQUEST:
    case SERVICE_TEMPLATES_GET_REQUEST:
      return { ...state, isLoading: true };
    case CONFIG_GET_SUCCESS:
      return { ...state, isLoading: false, config: action.payload };
    case PLUGINS_GET_SUCCESS:
      return { ...state, isLoading: false, plugins: action.payload };
    case SERVICE_TEMPLATES_GET_SUCCESS:
      const serviceTemplates = action.payload;
      const serviceTemplatesById = createResourceMap(serviceTemplates);
      return { ...state, isLoading: false, serviceTemplates, serviceTemplatesById };
    case CONFIG_GET_FAILURE:
    case PLUGINS_GET_FAILURE:
    case SERVICE_TEMPLATES_GET_FAILURE:
      return { ...state, isLoading: false };
    case CHANGE_MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};
