import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import MainNavigationContainer from '../MainNavigationContainer';
import DashboardContainer from '../DashboardContainer';

class DashboardPage extends Component {

  public render() {
    return (
      <React.Fragment>
        <MainNavigationContainer/>
        <Container maxWidth='lg'>
          <DashboardContainer/>
        </Container>
      </React.Fragment>);
  }
}

export default DashboardPage;
