import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getPluginsAction, getServiceTemplatesAction } from '../store/actions/page';
import { ServiceTemplate } from '../models/ServiceTemplate';
import { ResourceMap } from '../lib/resourceSupport';
import Dashboard from './Dashboard';

interface StoreProps {
  plugins: Plugin[];
  serviceTemplates: ServiceTemplate[];
  serviceTemplatesById: ResourceMap<ServiceTemplate>;
  getPlugins(): void;
  getServiceTemplates(): void;
}

type Props = StoreProps;

class DashboardContainer extends Component<Props> {

  public render() {
    const { serviceTemplates } = this.props;
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
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getPlugins: getPluginsAction(dispatch),
  getServiceTemplates: getServiceTemplatesAction(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
