import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as StylesThemeProvider } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; // assuming you’ve created this

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <StylesThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </StylesThemeProvider>
      </MuiThemeProvider>
    </Provider>
  </React.StrictMode>
);
