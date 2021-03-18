import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tag } from 'components';
import PropTypes from 'prop-types';

/**
 * Компонент списка тэгов
 * @component
 * @public
 */
export const TagsList = React.memo((props) => {
  const { consumptions, clickTag } = props;

  /**
   * Клик по тэгу,
   * @param {Object} consumption `объект с параметрами потребления`
   * @param {Number} index `индекс по списку`
   */
  const handleClick = (consumption, index) => {
    if (clickTag) {
      clickTag(consumption, index);
    }
  };

  /** Инициализация стилей */
  const classes = useStyles(props);

  /** Рендер компонента */
  return (
    <div className={classes.root}>
      {consumptions.map((consumption, index) => (
        <div key={index} className={classes.containerTag}>
          <Tag
            color={consumption.color}
            label={consumption.name}
            onClick={() => handleClick(consumption, index)}
          />
        </div>
      ))}
    </div>
  );
});

/** Назначаем  displayName */
TagsList.displayName = 'TagsList';

/** Назначаем  propTypes */
TagsList.propTypes = {
  consumptions: PropTypes.array.isRequired,
  clickTag: PropTypes.func,
};

/** Основные стили */
const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        margin: '0 -4px',
        marginTop: 24,
      },

      containerTag: {
        padding: '4px',
      },
    };
  },
  { name: 'TagsList' }
);
