import React from 'react';
import PropTypes from 'prop-types';
import { modifyComponent } from 'helpers';
import { makeStyles } from '@material-ui/core/styles';

/**
 * @mod Модификатор поля текста
 * @component
 * @public
 */
function ModTextInput({ children }) {
  const styles = useStyles();
  return modifyComponent(children, {
    classes: {
      input: styles.input,
      root: styles.root,
    },
  });
}

ModTextInput.propTypes = {
  children: PropTypes.element,
  label: PropTypes.string,
};

const useStyles = makeStyles(
  (theme) => ({
    root: {
      '& $input': {
        backgroundColor: theme.colorsTheme.layer,
        height: 30,
        '&:focus': { border: 'none' },
      },
    },
    input: {},
  }),
  {
    name: 'ModTextInput',
  }
);

export default ModTextInput;
