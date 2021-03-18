import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { colors } from '../../theme';

/**
 * Кнопка линк кликабельная или нет
 * @component
 * @public
 */
function LinkButton({
  classes,
  width,
  size,
  clicked,
  disabled,
  onClick,
  icon,
  text,
  linked,
  colorType,
  counter,
}) {
  /** ANCHOR: Приватные стили */
  const useStylesHover = makeStyles(
    () => ({
      hover: {
        cursor: 'pointer',
        transition: 'all 300ms ease-in-out',
        '& path': {
          transition: 'all 300ms ease-in-out',
        },
        '& circle': {
          transition: 'all 300ms ease-in-out',
        },
        '&:hover': { color: colors.colorsTheme.text },
        '&:hover path': { [colorType]: colors.colorsTheme.text },
        '&:hover circle': { stroke: colors.colorsTheme.text },
      },
    }),
    {
      name: 'LinkButton',
    }
  );

  /** ANCHOR: получить стили */
  const styles = useStyles({ classes });
  const hoverStyles = useStylesHover();

  /** ANCHOR: событие нажатия на элемент */
  const handleClick = (e) => {
    e.stopPropagation();

    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    /* Обертка */
    <div
      data-testid='root'
      style={{ width: width || 350, fontSize: size || 12 }}
      onClick={handleClick}
      className={classNames(styles.root, {
        [styles.disabled]: disabled,
        [hoverStyles.hover]: clicked && !disabled,
        [styles.linked]: linked,
      })}>
      {/* Иконка */}
      {icon}
      {/* Контент */}
      <span className={styles.text}>{text}</span>
      {counter ? (
        <span className={classNames(styles.count, 'count')}>{counter}</span>
      ) : null}
    </div>
  );
}

LinkButton.propTypes = {
  classes: PropTypes.object,
  disabled: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  clicked: PropTypes.bool,
  linked: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  colorType: PropTypes.string,
  counter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

LinkButton.defaultProps = {
  text: '',
  size: '',
  classes: {},
  disabled: false,
  clicked: false,
  colorType: 'fill',
  counter: '',
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    root: {
      color: colors.colorsTheme.grey,
      fontSize: 12,
      lineHeight: '19px',
      display: 'flex',
      '& path': { transition: 'all 300ms ease-in-out' },
      '&:hover .count': {
        color: '#448EF2',
        background: 'rgba(68,142,242,0.12)',
      },
    },
    text: {
      marginLeft: 10,
    },

    linked: {
      width: 'fit-content',
      color: `${theme.colorsTheme.groupTitle}`,
      '& span': { paddingLeft: `${0}!important` },
      '&:hover': { color: `${theme.colorsTheme.text}` },
    },
    disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    count: {
      marginLeft: 'auto',
      fontSize: 10,
      lineHeight: '16px',
      fontWeight: 700,
      borderRadius: 4,
      padding: 5,
      minWidth: 25,
      textAlign: 'center',
      background: 'rgba(0,0,0,0.15)',
      color: colors.colorsTheme.grey,
      marginTop: -3,
      marginBottom: -2,
    },
  }),
  {
    name: 'LinkButton',
  }
);

export default LinkButton;
