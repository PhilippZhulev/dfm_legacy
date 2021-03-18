import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

/**
 * Кнопка
 * @component
 * @public
 */
function Title({ classes, text }) {
  // Получить classes
  const styles = useStyles({ classes });

  return (
    <div data-testid='title' className={styles.title}>
      {text}
    </div>
  );
}

Title.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]),
  classes: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};

Title.defaultProps = {
  text: '',
  classes: {},
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    title: {
      fontSize: 20,
      marginBottom: 25,
      color: theme.colorsTheme.text,
      '&:focus': { outline: 'none' },
    },
  }),
  {
    name: 'Title',
  }
);

export default Title;
