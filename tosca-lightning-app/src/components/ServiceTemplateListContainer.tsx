import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { changeMessageAction, getPluginsAction, getServiceTemplatesAction } from '../store/actions/page';
import { ServiceTemplate } from '../models/ServiceTemplate';
import { ResourceMap } from '../lib/resourceSupport';
import { Config } from '../models/Config';
import { Plugin } from '../models/Plugin';
import ServiceTemplateList from './ServiceTemplateList';
import { MessageVariant } from '../models/Message';

interface StoreProps {
  plugins: Plugin[];
  serviceTemplates: ServiceTemplate[];
  serviceTemplatesById: ResourceMap<ServiceTemplate>;
  config: Config;
  isLoading: boolean;
  getPlugins(): void;
  getServiceTemplates(): void;
  changeMessage(variant: MessageVariant, text: string): void;
}

type Props = StoreProps;

class ServiceTemplateListContainer extends Component<Props> {

  public render() {
    const { serviceTemplates, plugins, isLoading, changeMessage } = this.props;
    return (
      <ServiceTemplateList serviceTemplates={serviceTemplates} plugins={plugins} isLoading={isLoading}
                           changeMessage={changeMessage}/>
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
  changeMessage: changeMessageAction(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceTemplateListContainer);
