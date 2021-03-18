import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MenuIcon from '../../svg/MenuIcon';

/**
 * Кнопка
 * @component
 * @public
 */
function MenuButton({ classes, onClick, label }) {
  const styles = useStyles({ classes });

  return (
    <div
      data-testid='menuButton'
      onClick={onClick}
      className={styles.menuButton}>
      <span>Настроить граф</span> <MenuIcon />
    </div>
  );
}

MenuButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  classes: PropTypes.object,
};

// Приватные стили
const useStyles = makeStyles((theme) => ({
  menuButton: {
    color: theme.colorsTheme.grey,
    marginTop: 4,
    fontSize: 14,
    cursor: 'pointer',
    '&:hover': {
      color: theme.colorsTheme.text,
      '& path': { fill: theme.colorsTheme.text },
    },
    '& span': {
      paddingRight: 10,
      ...theme.helper.transition(300),
    },
    '& path': { ...theme.helper.transition(300) },
  },
}));

export default MenuButton;
