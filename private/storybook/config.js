
import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { withInfo } from '@storybook/addon-info';
import { combineTheme } from 'components/theme';
import { AppTheme } from 'helpers';
import { store } from 'redux/store';
import requireContext from 'require-context.macro';

const theme = combineTheme();

const req = requireContext('components', true, /.stories.js$/);

/**
 */
function loadStories() {
  req.keys().forEach((filename) => req(filename));
};

addDecorator((story) => (
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppTheme>
          <div style={{ padding: 25 }}>{story()}</div>
        </AppTheme>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
));

addDecorator(
  withInfo({
    header: false, // Global configuration for the info addon across all of your stories.
  })
);

configure(loadStories, module);
