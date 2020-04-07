import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import MainNavigationContainer from '../MainNavigationContainer';
import ServiceTemplateListContainer from '../ServiceTemplateListContainer';
import ScrollToTop from '../ScrollToTop';

class DashboardPage extends Component {

  public render() {
    return (
      <React.Fragment>
        <div id="top"/>
        <MainNavigationContainer/>
        <Container maxWidth="lg">
          <ServiceTemplateListContainer/>
        </Container>
        <ScrollToTop selector="#top"/>
      </React.Fragment>);
  }
}

export default DashboardPage;
