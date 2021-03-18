import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Margin } from 'components';
import { makeStyles } from '@material-ui/core/styles';

/**
 * Модалка копировать модель
 * @component
 * @public
 */
const ChangeOrExitModel = ({ classes }) => {
  // Получить classes
  const styles = useStyles({ classes });

  return (
    <>
      <Margin bottom={25} top={-15}>
        <div className={styles.text}>
          Вы уверены, что хотите выйти из модели без сохранения изменений?
        </div>
      </Margin>
    </>
  );
};

ChangeOrExitModel.propTypes = {
  classes: PropTypes.object,
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    text: {
      color: theme.colorsTheme.grey,
      fontSize: 14,
      margin: 'auto 0',
    },
  }),
  { index: 2 }
);

export default ChangeOrExitModel;
