import React, { useRef, useState } from 'react';
import { LinkButton, Confrim } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { virualStore } from '../../../virtualStore';
import WhatIf from '../../svg/WhatIf';

/** ANCHOR: Тип открытой модального окна */
let typeModal = '';

/**
 * Выход из модели
 * @component
 * @publics
 */
function ModelExit(props) {
  const history = useHistory();
  const {
    data,
    userData,
    dispatchModelChange,
    dispatchModelLocked,
    dispatchModelClearCache,
    dispatchModelListReload,
    modelChange,
    locked,
    classes,
    label,
    icon,
    modelData,
    whatif,
  } = props;
  const modal = useRef(null);
  const styles = useStyles({ classes });
  const [updateLocked, setUpdateLocked] = useState(0);

  /**
   * ANCHOR: Возвращение к списку модели
   * @public
   */
  const _handleSelectModel = () => {
    if (modelChange) {
      handleOpen();

      typeModal = 'selectModel';
      return;
    }

    _handleReturn();
  };

  /**
   * ANCHOR: Открыть модальное окно
   * @public
   */
  const handleOpen = () => {
    modal.current.handleShow();
  };

  /**
   * ANCHOR: Выйти без сохранения
   * @public
   */
  const handleAgree = () => {
    modal.current.handleHide();
    dispatchModelChange({ state: false });

    if (typeModal === 'lockedModel') {
      _handleUpdateLockedModel();
    }

    if (typeModal === 'selectModel') {
      _handleReturn();
    }
  };

  /**
   * ANCHOR: Продолжить редактирование
   * @public
   */
  const handleDisagree = () => {
    modal.current.handleHide();
  };

  /**
   * ANCHOR: Обновление режима редактирования модели
   * @public
   */
  const _handleUpdateLockedModel = () => {
    setUpdateLocked(updateLocked + 1);
    dispatchModelLocked({
      params: {
        name: data.model.label,
        id: data.model.id,
        state: !locked,
      },
      userData,
    });
  };
  /**
   * Отработать возврат к списку моделей
   * @private
   */
  const _handleReturn = () => {
    dispatchModelClearCache({});

    dispatchModelListReload({
      params:
        localStorage.getItem('model') !== null
          ? { model: JSON.parse(localStorage.getItem('model')) }
          : {},
    });

    virualStore.model = {};
    virualStore._v = 0;

    history.push('/dfm_it/model');
  };

  return (
    <div className={styles.root}>
      {whatif && modelData.parentValue && <WhatIf />}
      <LinkButton
        classes={{
          root: classNames(styles.regularReturn, { [styles.return]: whatif }),
        }}
        size={14}
        width={'auto'}
        icon={icon || null}
        text={label}
        onClick={_handleSelectModel}
      />

      <Confrim
        ref={modal}
        title='В модели есть несохраненные изменения.'
        description={
          <>
            <p>Сохранить изменения перед выходом из этой модели?</p>
            <p>Это действие нельзя отменить.</p>
          </>
        }
        footer={{
          agree: {
            label: 'Выйти без сохранения',
            callback: handleAgree,
          },
          disagree: {
            label: 'Продолжить редактирование',
            callback: handleDisagree,
          },
        }}
      />
    </div>
  );
}

ModelExit.propTypes = {
  data: PropTypes.object,
  userData: PropTypes.object,
  dispatchModelChange: PropTypes.func.isRequired,
  dispatchModelLocked: PropTypes.func.isRequired,
  dispatchModelReload: PropTypes.func.isRequired,
  dispatchModelClearCache: PropTypes.func.isRequired,
  dispatchModelListReload: PropTypes.func.isRequired,
  modelChange: PropTypes.bool,
  locked: PropTypes.bool,
  classes: PropTypes.object,
  label: PropTypes.string,
  icon: PropTypes.object,
  modelData: PropTypes.object,
  whatif: PropTypes.bool,
};

ModelExit.defaultProps = {
  whatif: false,
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'flex',
      '& > svg': {
        fill: 'none',
        margin: 'auto 0',
        marginRight: 4,
      },
    },
    regularReturn: {
      padding: 0,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 300ms ease-in-out',

      '& svg path': {
        transition: 'all 300ms ease-in-out',
      },

      '&:hover': {
        color: '#fff',

        '& svg path': {
          fill: '#fff',
        },
      },
    },
    return: {
      color: `${theme.colorsTheme.blue}`,
      overflow: 'hidden!important',
      fontSize: '14px!important',
      maxWidth: '200px!important',
      wordBreak: 'break-all!important',
      lineHeight: '36px!important',
      whiteSpace: 'nowrap!important',
      textOverflow: 'ellipsis!important',
      cursor: 'pointer!important',

      '& span': {
        paddingLeft: '0px!important',
        marginLeft: 0,
      },
    },
  }),
  {
    name: 'ModelExit',
    index: 1,
  }
);

export default ModelExit;
