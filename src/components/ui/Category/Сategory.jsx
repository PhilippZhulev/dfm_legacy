import React from 'react';
import { Icon } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const getIcon = (value) => {
  switch (value) {
    case 'compute':
    case 'storage':
      return 'STORAGE';
    case 'dbms':
      return 'DBMS';
    case 'isoft':
      return 'ISOFT';
    case 'as':
      return 'AS';
    case 'staff':
      return 'STAFF';
    case 'bu':
      return 'BU';
    default:
      return 'COD';
  }
};

export const Category = React.forwardRef((props, ref) => {
  const { category, isActive, isSelected, onClick } = props;

  const handleClick = () => {
    if (onClick) {
      onClick(!!isSelected);
    }
  };

  /** Инициализация стилей */
  const classes = useStyles(props);

  return (
    <div
      data-testid='categoryWrapper'
      ref={ref}
      className={classNames(classes.root, {
        [classes.active]: isActive,
        [classes.selected]: isSelected,
      })}
      onClick={handleClick}>
      <div className={classes.icon} data-testid='categoryIcon'>
        <Icon
          icon={getIcon(category.value)}
          size={18}
          strokeColor='transparent'
        />
      </div>
      <span data-testid='categoryLabel' className={classes.label}>
        {category.label}
      </span>
    </div>
  );
});

Category.displayName = 'Category';

Category.propTypes = {
  category: PropTypes.object,
  isActive: PropTypes.bool,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};

Category.defaultProps = {
  category: {
    value: '',
    label: '',
    color: '',
  },
  isActive: false,
  isSelected: false,
  onClick: null,
};

/** Основные стили */
const useStyles = makeStyles((theme) => {
  const { colorsTheme } = theme;

  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      height: '50px',
      width: '100%',
      color: colorsTheme.grey,
      cursor: 'pointer',
      transition: 'all .2s ease-in-out',
      position: 'relative',

      '&:hover': {
        color: colorsTheme.nodeColor,
      },

      '&::before': {
        content: '""',
        position: 'absolute',
        height: '100%',
        width: 4,
        backgroundColor: ({ category }) => category.color,
        opacity: 0,
        transition: 'opacity .2s ease-in-out',
      },
    },

    active: {
      color: colorsTheme.nodeColor,
      '& $icon': {
        backgroundColor: ({ category }) => category.color,
      },
    },

    selected: {
      backgroundColor: colorsTheme.nodeBackground,
      color: colorsTheme.nodeColor,

      '&::before': {
        opacity: 1,
      },

      '& $icon': {
        backgroundColor: ({ category }) => category.color,
      },
    },

    icon: () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 26,
      height: 33,
      width: 33,
      borderRadius: 4,
      backgroundColor: colorsTheme.categoryIconBackgroundDefault,
      transition: 'all .2s ease-in-out',
    }),

    label: {
      marginLeft: 18,
      fontSize: 14,
      lineHeight: '18px',
      flex: 1,
      width: 'auto',
      marginRight: 16,

      '&:first-letter': {
        textTransform: 'uppercase',
      },
    },
  };
});
