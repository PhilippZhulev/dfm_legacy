import React, { useRef, useEffect } from 'react';
import { Confrim } from 'components';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

/**
 * Модалка
 * @component
 * @publics
 */
function ModelRecalc({ onSave, onCancel, title, show }) {
  const modal = useRef(null);

  useEffect(
    () => (show ? modal.current.handleShow() : modal.current.handleHide()),
    [show]
  );

  /**
   * ANCHOR: Сохранить
   * @public
   */
  const handleAgree = () => {
    modal.current.handleHide();
    onSave();
  };

  /**
   * ANCHOR: Продолжить редактирование
   * @public
   */
  const handleDisagree = () => {
    modal.current.handleHide();
    onCancel();
  };

  return (
    <>
      <Confrim
        ref={modal}
        title={title}
        footer={{
          agree: {
            label: 'Сохранить',
            callback: handleAgree,
          },
          disagree: {
            label: 'Продолжить редактирование',
            callback: handleDisagree,
          },
        }}
      />
    </>
  );
}

ModelRecalc.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string,
  show: PropTypes.bool,
};

ModelRecalc.defaultProps = {
  show: false,
  title: 'Изменение параметра приведет к пересчету модели?',
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    return: {},
  }),
  {
    name: 'ModelRecalc',
    index: 1,
  }
);

export default ModelRecalc;
