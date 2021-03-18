import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Icon } from 'components';
import { darken } from '@material-ui/core/styles/colorManipulator';

export const Tag = React.forwardRef((props, ref) => {
  const { label = 'label', color = '#fff', onDelete, onClick } = props;

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  /** Инициализация стилей */
  const classes = useStyles(props);

  return (
    <div
      data-testid='root'
      title={label}
      ref={ref}
      className={classes.root}
      onClick={handleClick}>
      <div data-testid='label' className={classes.label}>
        {label}
      </div>
      {onDelete && (
        <Icon className={classes.icon} size={14} onClick={onDelete} />
      )}
    </div>
  );
});

Tag.displayName = 'Tag';

const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 20,
        borderRadius: 10,
        cursor: 'pointer',
        maxWidth: 'fit-content',
        padding: '0 12px',
        transition: 'all .2s ease-in-out',
        backgroundColor: ({ color }) => color,

        '&:hover': {
          backgroundColor: ({ color }) => darken(color, 0.3),
        },
      },

      icon: {
        borderRadius: '50%',
        backgroundColor: colorsTheme.nodeColor,
        opacity: 0.5,
        marginLeft: 8,
        transition: 'opacity .2s ease-in-out',

        '&:hover': {
          opacity: 1,
        },
      },

      label: {
        display: 'inline-block',
        color: '#fff',
        overflow: 'hidden',
        fontSize: 12,
        maxWidth: '116px',
        lineHeight: '20px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',

        '&:first-letter': {
          textTransform: 'uppercase',
        },
      },
    };
  },
  { index: 1 }
);

// TODO: Проблема тестирования. Внутренние функции без экспорта
