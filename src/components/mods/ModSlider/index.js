import React from 'react';
import PropTypes from 'prop-types';
import { modifyComponent } from 'helpers';
import { makeStyles } from '@material-ui/core/styles';

/**
 * @mod Модификатор слайдера
 * @component
 * @public
 */
function ModSlider({ children, label }) {
  const styles = useStyles();
  return (
    <div className={styles.inline}>
      <div className={styles.label}>{label}</div>
      <div className={styles.wrapper}>{children}</div>
    </div>
  );
}

ModSlider.propTypes = {
  children: PropTypes.element,
  label: PropTypes.string,
};

const useStyles = makeStyles(
  (theme) => ({
    slider: {
      paddingTop: 3,
      width: 200,
      display: 'flex',
      marginRight: 20,
    },
    label: {
      color: theme.colorsTheme.grey,
      marginTop: 5,
      fontSize: 14,
      marginRight: 20,
    },
    inline: { display: 'inline-flex' },
    wrapper: { width: 200 },
  }),
  {
    name: 'ModSlider',
  }
);

export default ModSlider;
