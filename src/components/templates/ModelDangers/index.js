import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { Confrim } from 'components';

/**
 * Сообщение с предупреждением о состоянии модели
 * @component
 * @publics
 */
function ModelDangers({ dangers }) {
  const warningModal = useRef(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (dangers?.length) {
      handleOpenRule();
    }
  }, [dangers]);

  /**
   * ANCHOR: Открыть модальное окно
   * @public
   */
  const handleOpenRule = () => {
    if (openModal) {
      return;
    }

    setOpenModal(true);
    warningModal.current.handleShow();
  };

  /**
   * ANCHOR: Выйти без сохранения
   * @public
   */
  const handleAgree = () => {
    warningModal.current.handleHide();
  };

  return (
    <Confrim
      ref={warningModal}
      title={'Предупреждение'}
      description={dangers}
      footer={{
        agree: {
          label: 'Закрыть',
          callback: handleAgree,
        },
      }}
    />
  );
}

ModelDangers.propTypes = {
  dangers: PropTypes.string,
};

ModelDangers.defaultProps = {};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    return: {},
  }),
  {
    name: 'ModelDangers',
    index: 1,
  }
);

export default ModelDangers;
