import React, { Component } from 'react';
import MainNavigation from './MainNavigation';
import { Dispatch } from 'redux';
import { getConfigAction } from '../store/actions/page';
import { connect } from 'react-redux';
import { Config } from '../models/Config';

interface StoreProps {
  config?: Config,
  getConfig(): void;
}

type Props = StoreProps;

class MainNavigationContainer extends Component<Props> {

  public render() {
    const { config } = this.props;
    return (
      <React.Fragment>
        <MainNavigation config={config}/>
      </React.Fragment>
    );
  }

  public componentDidMount() {
    this.props.getConfig();
  }
}

const mapStateToProps = (state: any) => ({
  config: state.page.config,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getConfig: getConfigAction(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigationContainer);
