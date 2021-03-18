import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

/**
 * Кнопка с боковым выделителем
 * @component
 * @public
 */
function TabButton({ classes, selected, onClick, label }) {
  const styles = useStyles({ classes });
  return (
    /*
     * Добавляет класс active к индикатору
     * если: в storage Category есть id этой категории
     * или: CategoryTarget === id
     */
    <div
      data-testid='root'
      className={`${styles.categoryItem} ${selected ? styles.selected : ''}`}
      onClick={() => {
        if (onClick) onClick();
      }}>
      <div
        data-testid='selected'
        className={`${styles.selection} ${selected ? styles.visible : ''}`}
      />

      {/* Название */}
      <div data-testid='label' className={styles.label}>
        {label}
      </div>
    </div>
  );
}

TabButton.defaultProps = {
  selected: false,
  label: 'Название',
  onClick: false,
};

TabButton.propTypes = {
  selected: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  classes: PropTypes.object,
};

const useStyles = makeStyles(
  (theme) => ({
    categoryItem: {
      display: 'flex',
      cursor: 'pointer',
      position: 'relative',
      padding: '0 40px',
      transition: 'all 300ms ease-in-out',
      height: 50,
      backgroundColor: 'transparent',
      '&:hover $label': {
        color: theme.colorsTheme.text,
      },
      '&:hover $icon': {
        '& path': {
          fill: `${theme.colorsTheme.text}!important`,
        },
      },
    },
    selection: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: 4,
      opacity: 0,
      willChange: 'opacity',
      backgroundColor: theme.colorsTheme.tabButtonSelection,
      transition: 'all 300ms ease-in-out',
    },
    icon: {
      height: 33,
      width: 33,
      minWidth: 33,
      display: 'flex',
      background: theme.colorsTheme.nodeBackground,
      borderRadius: 4,
      margin: 'auto 0',
      marginRight: 15,
      '& svg': {
        paddingTop: 3,
        margin: 'auto',
      },
      '& path': {
        transition: 'all 300ms ease-in-out',
      },
    },
    label: {
      lineHeight: '16px',
      display: 'flex',
      margin: 'auto 0',
      fontSize: 16,
      color: theme.colorsTheme.grey,
      transition: 'all 300ms ease-in-out',
    },
    visible: {
      opacity: 1,
    },
    selected: {
      backgroundColor: theme.colorsTheme.categoryBackground,
    },
  }),
  { name: 'TabButton' }
);

export default TabButton;
