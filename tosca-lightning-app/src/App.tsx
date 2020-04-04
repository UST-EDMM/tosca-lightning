import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Button, CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from './theme';
import store from './store';

class App extends Component {
  public render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Provider store={store}>
          <Button variant="contained" color="secondary">
            Hello World
          </Button>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;
