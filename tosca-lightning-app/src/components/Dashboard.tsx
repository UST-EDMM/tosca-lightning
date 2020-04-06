import React, { Component } from 'react';
import { ServiceTemplate } from '../models/ServiceTemplate';
import ServiceTemplateList from './ServiceTemplateList';
import { Config } from '../models/Config';

interface ComponentProps {
  config: Config;
  serviceTemplates: ServiceTemplate[];
}

type Props = ComponentProps;

class Dashboard extends Component<Props> {

  public render() {
    const { serviceTemplates, config } = this.props;
    return (
      <ServiceTemplateList config={config} serviceTemplates={serviceTemplates}/>
    );
  }
}

export default Dashboard;
