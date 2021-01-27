import { fetchOrThrow } from './fetch';
import { Config } from '../models/Config';
import { Plugin } from '../models/Plugin';
import { ServiceTemplate } from '../models/ServiceTemplate';
import { TransformResponse } from '../models/TransformResponse';

const baseUrl = window.location.protocol + '//' + window.location.hostname + ':9000';

const getConfig = async (): Promise<Config> => {
  const response = await fetchOrThrow(`${baseUrl}/config`, { method: 'GET' });
  return (await response.json()) as Config;
};

const getPlugins = async (): Promise<Plugin[]> => {
  const response = await fetchOrThrow(`${baseUrl}/plugins`, { method: 'GET' });
  return (await response.json()) as Plugin[];
};

const getServiceTemplates = async (): Promise<ServiceTemplate[]> => {
  const response = await fetchOrThrow(`${baseUrl}/service-templates`, { method: 'GET' });
  return (await response.json()) as ServiceTemplate[];
};

const transformServiceTemplate = async (target: string, st: ServiceTemplate): Promise<TransformResponse> => {
  const response = await fetchOrThrow(
    `${baseUrl}/service-templates/${st.id}/transform/${target}`,
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
