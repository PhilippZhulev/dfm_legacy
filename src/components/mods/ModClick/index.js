import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

/**
 * @mod Модификатор клик
 * @component
 * @public
 */
function ModClick({ children, onClick }) {
  const styles = useStyles();
  return (
    <div onClick={onClick} className={styles.root}>
      {children}
    </div>
  );
}

ModClick.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element,
};

const useStyles = makeStyles(
  (theme) => ({
    root: {
      cursor: 'pointer',
      '& path': { ...theme.helper.transition(300) },
      '&:hover path': { fill: theme.colorsTheme.text },
    },
  }),
  {
    name: 'ModClick',
  }
);

export default ModClick;
