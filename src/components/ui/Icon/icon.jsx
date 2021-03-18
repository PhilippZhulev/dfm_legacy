import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { list } from './list';

/**
 * SVG-иконка
 *
 * @param icon передавать результат импорта SVG или ключ из справочника
 * @param fillColor текущий цвет fill
 * @param strokeColor текущий цвет strokeColor
 * @param title заголовок иконки
 * @param isInline Режим
 * @param size размер иконки
 * @param mark отметка
 * @param sizeMark размер отметки 'small', 'middle', 'large'
 */

export const Icon = React.forwardRef((props, ref) => {
  const { icon, title, className, onClick } = props;

  /** Получение svg для иконки */
  const svgForRender =
    typeof icon === 'string' ? list[icon] || list.CLOSE : icon;

  /** Инициализация основных стилей */
  const classes = useStyles(props);

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <div
      data-testid='host'
      ref={ref}
      className={`${classes.host} ${className}`}
      onClick={handleClick}>
      <svg
        data-testid='svg'
        className={classes.svg}
        viewBox={svgForRender.viewBox}>
        {!!title && <title data-testid='title'>{title}</title>}
        <use xlinkHref={`#${svgForRender.id}`} />
      </svg>
    </div>
  );
});

/** Основные стили */
const useStyles = makeStyles(() => ({
  host: ({ inline, size }) => ({
    // background: 'inherit',
    position: 'relative',
    display: inline ? 'inline-flex' : 'flex',
    verticalAlign: inline ? 'text-top' : 'bottom',
    height: size ? `${size}px` : '100%',
  }),
  svg: ({ fillColor, strokeColor }) => ({
    height: '100%',
    width: 'auto',
    fill: fillColor,
    stroke: strokeColor,
  }),
}));

/** Описание пропсы */
Icon.propTypes = {
  icon: PropTypes.any,
  fillColor: PropTypes.string,
  strokeColor: PropTypes.string,
  size: PropTypes.number,
  title: PropTypes.string,
  inline: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

/** Начальная пропса */
Icon.defaultProps = {
  icon: 'CLOSE',
  fillColor: 'currentColor',
  strokeColor: 'currentColor',
  inline: false,
};

Icon.displayName = 'Icon';
