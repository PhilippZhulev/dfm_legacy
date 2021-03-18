import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuElement from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';

/**
 * Элемент меню
 * @component
 * @public
 */
function MenuItem({
  classes,
  width,
  size,
  clicked,
  label,
  icon,
  items,
  disabled,
}) {
  const styles = useStyles({ classes });

  const [anchorEl, setAnchorEl] = useState(null);

  /**
   * Открыть popup
   * @param {object} event
   * @return {boolean}
   * @public
   */
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Закрыть popup
   * @return {boolean}
   * @public
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div
        data-testid='root'
        style={{
          width,
          fontSize: size,
          opacity: disabled ? 0.5 : 1,
        }}
        onClick={(e) => (!disabled ? handleClick(e) : {})}
        className={`${styles.root} ${
          clicked && !disabled ? styles.hover : ''
        }`}>
        <span className={styles.label}>{label}</span>
        <div style={{ marginTop: -1 }}>{icon}</div>
      </div>

      {/* Меню material component */}
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        classes={{ paper: styles.paper }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        {/* Генерация элементов */}
        {items.map((item, i) => (
          <MenuElement
            key={i}
            classes={{ root: styles.menuItem }}
            ListItemClasses={{ disabled: styles.menuItemDisabled }}
            disabled={item.disabled}
            onClick={(e) => {
              if (!item.disabled) {
                item.callback(e);
                setAnchorEl(null);
              }
            }}>
            {/* Иконка */}
            <div
              style={{
                marginTop: 10,
                marginRight: 10,
              }}>
              {item.icon}
            </div>

            {/* Текст */}
            {item.label}
          </MenuElement>
        ))}
      </Menu>
    </>
  );
}

MenuItem.propTypes = {
  classes: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  clicked: PropTypes.bool,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.elementType,
    PropTypes.array,
  ]),
  items: PropTypes.array,
};

MenuItem.defaultProps = {
  width: 350,
  size: 12,
  items: [],
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    root: {
      color: theme.colorsTheme.text,
      fontSize: 12,
      lineHeight: '22.5px',
      display: 'flex',
      '& span': { paddingRight: 10 },
    },
    hover: {
      cursor: 'pointer',
      ...theme.helper.transition(300),
      '& path': { ...theme.helper.transition(300) },
      '& span': { ...theme.helper.transition(300) },
      '&:hover span': { color: '#fff' },
      '&:hover path': { fill: '#fff' },
    },
    label: { color: theme.colorsTheme.grey },
    paper: {
      background: theme.colorsTheme.layer,
      marginTop: 55,
    },
    menuItem: {
      color: theme.colorsTheme.grey,
      fontSize: 14,
      transition: 'all 300ms ease-in-out',
      padding: '15px 50px 15px 20px',
      '&:not(:last-child)': {
        borderBottom: `1px solid ${theme.colorsTheme.background}`,
      },
      '& path': { ...theme.helper.transition(300) },
      '&:hover': { color: '#fff' },
      '&:hover path': { fill: '#fff' },
      '&$menuItemDisabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'inherit',
      },
      '&$menuItemDisabled:hover': { color: '#869AAC' },
      '&$menuItemDisabled:hover path': { fill: '#869AAC' },
    },
    menuItemDisabled: {},
  }),
  {
    name: 'MenuItem',
  }
);

export default MenuItem;

// TODO: Проблема тестирования. Используемый компонент Menu задействует modal, на котором сыпется ошибка во время тестов
