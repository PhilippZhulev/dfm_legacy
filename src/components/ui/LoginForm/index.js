import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import LoginLogo from '../../svg/LoginLogo';

/**
 * Кнопка
 * @component
 * @public
 */
function LoginForm({ children, classes }) {
  // Получить classes
  const styles = useStyles({ classes });

  return (
    <div data-testid='root' className={styles.root}>
      {/* Окно входа */}
      <div data-testid='form' className={styles.form}>
        {/* Логотип */}
        <div data-testid='logo' className={styles.logo}>
          <LoginLogo />
        </div>

        {children}
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  classes: PropTypes.object,
};

// Приватные стили
const useStyles = makeStyles((theme) => ({ ...theme.login.template }), {
  name: 'LoginForm',
});

export default LoginForm;
