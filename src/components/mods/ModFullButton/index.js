import React from 'react';
import PropTypes from 'prop-types';
import { modifyComponent } from 'helpers';
import { makeStyles } from '@material-ui/core/styles';

/**
 * @mod Модификатор поля текста
 * @component
 * @public
 */
function ModFullButton({ children }) {
  const styles = useStyles();
  return modifyComponent(children, {
    classes: {
      root: styles.root,
      button: styles.botton,
    },
  });
}

ModFullButton.propTypes = {
  children: PropTypes.element,
  label: PropTypes.string,
};

const useStyles = makeStyles(
  (theme) => ({
    root: {
      width: '100%',
      marginTop: 0,
    },
    botton: {
      width: '100%',
    },
  }),
  {
    name: 'ModSelect',
    index: 1,
  }
);

export default ModFullButton;
