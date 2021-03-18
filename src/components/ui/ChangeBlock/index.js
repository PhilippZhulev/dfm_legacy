/*
 * desc: контролл Поле ввода
 * Copyright(c) Heavy mouse team.
 */

// Зависимости
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { LinkButton, TextInput } from '../../index';

function ChangeBlock({ classes, title, changePassword, setChangePassword }) {
  // Получить classes
  const styles = useStyles({ classes });

  const [passwordProps, setPasswordProps] = useState({
    old: '',
    new: '',
    retype: '',
  });

  const _generateChangePasswordMessage = (type) => {};

  const _isPasswordValid = (type) => {};

  return (
    <>
      {changePassword ? (
        <>
          <div
            data-testid='changePasswordTitle'
            className={styles.changePasswordTitle}>
            {title}
          </div>
          <div
            data-testid='changePasswordItem'
            className={styles.changePasswordItem}>
            <div
              data-testid='changePasswordTextField'
              className={styles.changePasswordTextField}>
              <TextInput
                label='Введите новый пароль'
                width={200}
                type='password'
                onChange={(e) =>
                  setPasswordProps({ ...passwordProps, new: e.target.value })
                }
                value={passwordProps.new}
              />
              <div
                data-testid='changePasswordTextField_indicatorWrapper'
                className={styles.changePasswordTextField_indicatorWrapper}>
                {_isPasswordValid('new').icon}
              </div>
            </div>
            <div
              data-testid='changePasswordTextField_errorMessage'
              className={styles.changePasswordTextField_errorMessage}>
              {_generateChangePasswordMessage('new')}
            </div>
          </div>
          <div
            data-testid='changePasswordItem'
            className={styles.changePasswordItem}>
            <div
              data-testid='changePasswordTextField'
              className={styles.changePasswordTextField}>
              <TextInput
                disabled={!_isPasswordValid('new').status}
                label='Подтверждение пароля'
                width={200}
                type='password'
                onChange={(e) =>
                  setPasswordProps({ ...passwordProps, retype: e.target.value })
                }
                value={passwordProps.retype}
              />
              <div
                data-testid='changePasswordTextField_indicatorWrapper'
                className={styles.changePasswordTextField_indicatorWrapper}>
                {_isPasswordValid('retype').icon}
              </div>
            </div>
            <div
              data-testid='changePasswordTextField_errorMessage'
              className={styles.changePasswordTextField_errorMessage}>
              {_generateChangePasswordMessage('retype')}
            </div>
          </div>
        </>
      ) : (
        <LinkButton
          clicked
          size={14}
          width='auto'
          icon={<div />}
          text='Изменить пароль'
          onClick={() => setChangePassword(true)}
          linked
        />
      )}
    </>
  );
}

ChangeBlock.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  changePassword: PropTypes.bool,
  setChangePassword: PropTypes.func,
};

ChangeBlock.defaultProps = {
  classes: {},
  title: '',
  changePassword: false,
};

// Приватные стили
const useStyles = makeStyles((theme) => ({
  changePasswordTitle: {
    marginBottom: 30,
    fontSize: 14,
  },
  changePasswordItem: { marginBottom: 15 },
  changePasswordTextField: { display: 'flex' },
  changePasswordTextField_indicatorWrapper: {
    height: 30,
    margin: 'auto 0 0 10px',
    '& svg': { height: '100%' },
  },
  changePasswordTextField_errorMessage: {
    color: theme.colorsTheme.shortage,
    fontSize: 12,
    height: 12,
  },
}));

export default ChangeBlock;

// TODO: Проблема тестирования. ChangeBlock - ошибка тестирования "Jest encountered an unexpected token", сыпется на компоненте D3Nodes (параметр transformIgnorePatterns не помогает, ошибки сыпятся в других местах)
