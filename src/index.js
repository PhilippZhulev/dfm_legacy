
import 'react-hot-loader/patch';
import 'babel-polyfill';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import { createLog } from './logger';

import { combineTheme } from './components/theme';
import { basename } from './config';

// Комбинировать тему
const themeDefault = combineTheme();

const theme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  ...themeDefault,
});

createLog(require('../package'));

window.DFM.SetStorage(store);

/** Генерировать приложение */
const renderApp = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>{' '}
    </ThemeProvider>{' '}
  </Provider>
);

// Создать точку входа
const root = document.getElementById('app');
ReactDOM.render(renderApp(), root);

// Горячая перезагрузка компонентов
if (module.hot) {
  module.hot.accept('components/App', () => {
    require('components/App');
    ReactDOM.render(renderApp(), root);
  });
}

// Воркер
serviceWorker.unregister();
