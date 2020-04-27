import config from '../config';
import { fetchOrThrow } from './fetch';
import { Config } from '../models/Config';
import { Plugin } from '../models/Plugin';
import { ServiceTemplate } from '../models/ServiceTemplate';
import { TransformResponse } from '../models/TransformResponse';

const getConfig = async (): Promise<Config> => {
  const response = await fetchOrThrow(`${config.backend.baseUrl}/config`, { method: 'GET' });
  return (await response.json()) as Config;
};

const getPlugins = async (): Promise<Plugin[]> => {
  const response = await fetchOrThrow(`${config.backend.baseUrl}/plugins`, { method: 'GET' });
  return (await response.json()) as Plugin[];
};

const getServiceTemplates = async (): Promise<ServiceTemplate[]> => {
  const response = await fetchOrThrow(`${config.backend.baseUrl}/service-templates`, { method: 'GET' });
  return (await response.json()) as ServiceTemplate[];
};

const transformServiceTemplate = async (target: string, st: ServiceTemplate): Promise<TransformResponse> => {
  const response = await fetchOrThrow(
    `${config.backend.baseUrl}/service-templates/${st.id}/transform/${target}`,
    { method: 'POST' }
  );
  return (await response.json()) as TransformResponse;
};

export const backendService = {
  getConfig,
  getPlugins,
  getServiceTemplates,
  transformServiceTemplate,
};
