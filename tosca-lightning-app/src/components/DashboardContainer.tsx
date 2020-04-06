import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getPluginsAction, getServiceTemplatesAction } from '../store/actions/page';
import { ServiceTemplate } from '../models/ServiceTemplate';
import { ResourceMap } from '../lib/resourceSupport';
import Dashboard from './Dashboard';
import { Config } from '../models/Config';

interface StoreProps {
  plugins: Plugin[];
  serviceTemplates: ServiceTemplate[];
  serviceTemplatesById: ResourceMap<ServiceTemplate>;
  config: Config;
  getPlugins(): void;
  getServiceTemplates(): void;
}

type Props = StoreProps;

class DashboardContainer extends Component<Props> {

  public render() {
    const { serviceTemplates, config } = this.props;
    return (
      <React.Fragment>
        <Dashboard serviceTemplates={serviceTemplates}/>
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
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getPlugins: getPluginsAction(dispatch),
  getServiceTemplates: getServiceTemplatesAction(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
