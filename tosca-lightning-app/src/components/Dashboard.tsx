import React, { Component } from 'react';
import { ServiceTemplate } from '../models/ServiceTemplate';
import ServiceTemplateList from './ServiceTemplateList';

interface ComponentProps {
  serviceTemplates: ServiceTemplate[];
}

type Props = ComponentProps;

class Dashboard extends Component<Props> {

  public render() {
    const { serviceTemplates } = this.props;
    return (
      <ServiceTemplateList serviceTemplates={serviceTemplates}/>
    );
  }
}

export default Dashboard;
