import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from './theme';
import store from './store';
import DashboardPage from './components/layout/DashboardPage';
import Footer from './components/layout/Footer';
import MessageContainer from './components/MessageContainer';

class App extends Component {
  public render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Provider store={store}>
          <DashboardPage/>
          <Footer/>
          <MessageContainer/>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;
