/*
 * desc: Овальное превью
 * Copyright(c) Heavy mouse team.
 */

// Зависимости
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

/**
 * Пользователь
 * @component
 * @public
 */
function Index({ classes, name, data, updated, styles, url }) {
  // Получить classes
  const CustomStyles = useStyles({ classes });

  return (
    /* Обертка */
    <div style={styles} className={CustomStyles.root}>
      {/*
       * Превью
       * Если в массиве есть изображения то будет загружено изображение
       * Если массив пуст то отображается первый символ имени
       */}
      <div className={CustomStyles.preview}>
        {data && data.length > 0 ? (
          <img src={`${url}/users/avatars/${data[0]}?${updated}`} alt='' />
        ) : (
          name.charAt(0)
        )}
      </div>
    </div>
  );
}

Index.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  data: PropTypes.string,
  updated: PropTypes.string,
  styles: PropTypes.object,
  classes: PropTypes.object,
};

Index.defaultProps = {
  name: '',
  url: '',
  data: '',
  updated: '',
  styles: {},
};

// Приватные стили
const useStyles = makeStyles((theme) =>
  ({ ...theme.avatar }));

export default Index;
