import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

/**
 * Кнопка
 * @component
 * @public
 */
function LockedPopUp({ locked, lockedInfo, classes }) {
  // Получить classes
  const styles = useStyles({ classes });

  return (
    <div className={styles.lockInfo}>
      {locked ? (
        <>
          <div
            data-testid='title'
            className={`${styles.lockInfo_title} ${styles.lockInfo_locked}`}>
            Заблокировал:
          </div>
          <div className={styles.lockInfo_personWrapper}>
            <div
              data-testid='personAvatar'
              className={styles.lockInfo_personAvatar}
            />
            <div data-testid='person' className={styles.lockInfo_person}>
              {lockedInfo.fullName || lockedInfo.username}
            </div>
          </div>
        </>
      ) : (
        <div data-testid='title' className={styles.lockInfo_title}>
          Не заблокирована
        </div>
      )}
    </div>
  );
}

LockedPopUp.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  lockedInfo: PropTypes.object,
  locked: PropTypes.bool,
  classes: PropTypes.object,
};

// Приватные стили
const useStyles = makeStyles((theme) => ({
  lockInfo: {},
  lockInfo_title: {
    fontSize: 12,
    color: theme.colorsTheme.text,
  },
  lockInfo_person: {
    fontSize: 12,
    color: theme.colorsTheme.text,
    width: 200,
    wordBreak: 'break-word',
    margin: 'auto 0',
    marginLeft: 10,
    height: 'fit-content',
  },
  infoPopupRoot: { width: 'fit-content' },
  lockInfo_personWrapper: { display: 'flex' },
  lockInfo_personAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colorsTheme.grey,
  },
  lockInfo_locked: { marginBottom: 10 },
}));

export default LockedPopUp;
