import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Root from './components/root';
import { BrowserRouter as Router } from 'react-router-dom';
import {MuiThemeProvider, createMuiTheme}  from '@material-ui/core';
import {teal} from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
      primary: teal,
      secondary: {
        main: '#fbc02d',
      },
    },

})

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme} >
      <Router>
        <Root />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
