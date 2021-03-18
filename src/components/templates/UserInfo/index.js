import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Popover } from '@material-ui/core';
import {
  ButtonBlock,
  Button,
  LinkButton,
  InfoItem,
  ItemWrapper,
  Separator,
  Title,
  Confrim,
  ModHiddenSudir,
} from 'components';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { handleError } from 'helpers';
import Login from '../../pages/Login';

/**
 * userInfo
 * @component
 * @public
 */
function UserInfo({
  open,
  anchorEl,
  onClose,
  dispatchModal,
  username,
  roles,
  position,
  modelChange,
  dispatchModelLocked,
  dispatchLogout,
  dispatchModelClearCache,
}) {
  const styles = useStyles();

  /** ANCHOR: Получить browser history */
  const history = useHistory();

  /**
   * ANCHOR: Состояния
   */
  const [changePassword, setChangePassword] = useState(false);

  /**
   * ANCHOR: Изменение пароля
   * @public
   */
  const _isChangePassword = () => {};

  const modal = useRef(null);

  /**
   * ANCHOR: Отправляем запрос выхода из приложения
   * @public
   */
  const _logoutUser = () => {
    try {
      dispatchModelClearCache({});

      // Разблокировка модели, открытая в последний раз открывалась
      if (localStorage.getItem('model') !== null) {
        const model = JSON.parse(localStorage.getItem('model'));
        dispatchModelLocked({
          params: {
            name: model.label,
            id: model.id,
            state: false,
          },
        });

        localStorage.removeItem('model');
      }

      dispatchLogout({
        params: {},
        route: history,
      });

      history.push('/dfm_it/login');
    } catch (e) {
      handleError('@UserInfo/_logoutUser', e);
    }
  };

  /**
   * Выход из системы
   * @param  {object} states
   * @public
   */
  const _quitUser = async (states, close) => {
    try {
      close();

      if (modelChange) {
        modal.current.handleShow();
        return;
      }

      _logoutUser();
    } catch (e) {
      handleError('@UserInfo/_logoutUser', e);
    }
  };

  /**
   * ANCHOR: Открыть модальное окно "Выйти"
   * @public
   */
  const _handleQuit = async () => {
    try {
      dispatchModal({
        type: 'quit',
        state: true,
        title: 'Вы действительно хотите выйти?',
        buttonText: 'Выйти',
        text: '',
        done: (e, close) => _quitUser(e, close),
      });
    } catch (e) {
      handleError('@UserInfo/_handleQuit', e);
    }
  };

  /**
   * ANCHOR: Подтверждение сохранение данных перед выход из приложения
   */
  const handleAgree = () => {
    modal.current.handleHide();

    // TODO добавить сохранение изм если есть изменение

    _logoutUser();
  };

  /**
   * ANCHOR: Отменить измения данных перед выходом из приложения
   */
  // eslint-disable-next-line sonarjs/no-identical-functions
  const handleDisagree = () => {
    modal.current.handleHide();

    // TODO добавить отмену изм если есть изменение

    _logoutUser();
  };

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        keepMounted
        onClose={onClose}
        classes={{ paper: styles.paper }}>
        <Title text='Информация о пользователе' />

        <InfoItem label='ФИО' text={username} />

        <InfoItem label='Должность' text={position} />

        <InfoItem label='Роль' text={roles} />

        {
          // TODO Исправление функционала смены пароля (возможно не нужно)
          /*
        <ItemWrapper hidden={AuthType.isSudir()}>
          <ChangeBlock
            changePassword={changePassword}
            setChangePassword={setChangePassword}
            title='Изменить пароль'
          />
        </ItemWrapper> */
        }

        <ModHiddenSudir>
          <ItemWrapper>
            <Separator />
          </ItemWrapper>

          <ItemWrapper>
            <LinkButton
              clicked
              size={14}
              width='auto'
              icon={<div />}
              text='Выйти из системы'
              onClick={_handleQuit}
              linked
            />
          </ItemWrapper>

          <ItemWrapper>
            <Separator />
          </ItemWrapper>

          <ItemWrapper>
            <ButtonBlock>
              {changePassword ? (
                <Button
                  disabled={false}
                  onClick={_isChangePassword}
                  top={1}
                  position='left'
                  text='Сохранить'
                />
              ) : null}
            </ButtonBlock>
          </ItemWrapper>
        </ModHiddenSudir>
      </Popover>

      <Confrim
        ref={modal}
        title='В модели есть не сохраненные изменения.'
        description='Сохранить изменения перед выходом?
        Это действие нельзя отменить.'
        footer={{
          agree: {
            label: 'Не сохранить',
            callback: handleAgree,
          },
          disagree: {
            label: 'Сохранить',
            callback: handleDisagree,
          },
        }}
      />
    </>
  );
}

Login.propTypes = {
  anchorEl: PropTypes.bool,
  onClose: PropTypes.func,
  dispatchModal: PropTypes.func,
  dispatchModelLocked: PropTypes.func,
  dispatchLogout: PropTypes.func,
  username: PropTypes.string,
  roles: PropTypes.string,
  position: PropTypes.string,
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    paper: {
      background: theme.colorsTheme.layer,
      marginTop: 55,
      width: 415,
      color: '#FFF',
      padding: '32px 40px',
      boxShadow: '0px 12px 74px rgba(0, 0, 0, 0.5)',
      borderRadius: 8,
      fontWeight: 300,
    },
  }),
  {
    name: 'UserInfo',
  }
);

export default UserInfo;
