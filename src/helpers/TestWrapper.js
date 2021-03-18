import React from 'react';
import { combineTheme } from 'components/theme';
import { ThemeProvider } from '@material-ui/core/styles';

const theme = combineTheme();

const TestWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default TestWrapper;
