import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getPluginsAction, getServiceTemplatesAction } from '../store/actions/page';
import { ServiceTemplate } from '../models/ServiceTemplate';
import { ResourceMap } from '../lib/resourceSupport';
import { Config } from '../models/Config';
import { Plugin } from '../models/Plugin';
import ServiceTemplateList from './ServiceTemplateList';

interface StoreProps {
  plugins: Plugin[];
  serviceTemplates: ServiceTemplate[];
  serviceTemplatesById: ResourceMap<ServiceTemplate>;
  config: Config;
  isLoading: boolean;
  getPlugins(): void;
  getServiceTemplates(): void;
}

type Props = StoreProps;

class ServiceTemplateListContainer extends Component<Props> {

  public render() {
    const { serviceTemplates, plugins, isLoading } = this.props;
    return (
      <React.Fragment>
        <ServiceTemplateList serviceTemplates={serviceTemplates} plugins={plugins} isLoading={isLoading}/>
      </React.Fragment>
    );
  }

  public componentDidMount() {
    this.props.getPlugins();
    this.props.getServiceTemplates();
  }
}

const mapStateToProps = (state: any) => ({
  plugins: state.page.plugins,
  serviceTemplates: state.page.serviceTemplates,
  serviceTemplatesById: state.page.serviceTemplatesById,
  config: state.page.config,
  isLoading: state.page.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getPlugins: getPluginsAction(dispatch),
  getServiceTemplates: getServiceTemplatesAction(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceTemplateListContainer);
