import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, SkeletonUser, SkeletonManual } from 'components';

import PropTypes from 'prop-types';
import { UserInfo } from 'containers';
import { nameFormat } from 'helpers';
import Logo from '../../svg/Logo';
import Manual from '../../svg/Manual';

/**
 * Верхняя часть шапки
 * @component
 * @public
 */
function HeaderTop({ userData, children, logoMain }) {
  const [anchorEl, setAnchorEl] = useState(null);

  /**
   * ANCHOR: Привязка меню к элементу по клику
   * @param {object} e
   * @public
   * @return {boolean}
   */
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    return false;
  };

  // Получить classes
  const styles = useStyles();

  return (
    <div className={styles.headerTop}>
      {/* Header -> верхняя панель -> внутреняя обертка */}
      <div className={styles.inner}>
        {/* Header -> логотип */}
        <div
          className={styles.headerItemWrapper}
          style={{ width: logoMain ? 202 : 279 }}>
          <div className={styles.logo}>
            {/* Header -> лготип -> иконка */}
            <Logo />
          </div>
        </div>

        {children}

        {/* preview пользователя */}
        <div className={styles.headerItemColRight}>
          <SkeletonUser load={!userData.state}>
            <div className={styles.user} onClick={handleClick}>
              {/* preview -> аватар */}
              <Avatar
                name={nameFormat(
                  userData.fullName || userData.username || userData.login
                )}
                url='name'
                data={userData.avatar}
              />

              {/* preview -> фио */}
              <div className={styles.name}>
                {nameFormat(
                  userData.fullName || userData.username || userData.login
                )}
                <div className={styles.rang}>{userData.position}</div>
              </div>
            </div>
          </SkeletonUser>
          <UserInfo
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            open={anchorEl !== null}
            username={
              userData.fullName ||
              userData.username ||
              userData.login ||
              'отсутствует'
            }
            position={userData.position || 'отсутствует'}
            roles={
              userData.roles[userData.roles.length - 1].label || 'отсутствует'
            }
          />

          {/* ссылка на руководство пользователя */}
          <SkeletonManual load={!userData.state}>
            <a
              href='/dfm_it/docs/help.pdf'
              className={styles.link}
              target='_blank'
              rel='noreferrer'>
              <div className={styles.manualIcon}>
                <Manual />
              </div>
            </a>
          </SkeletonManual>
        </div>
      </div>
    </div>
  );
}

HeaderTop.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  userData: PropTypes.object,
  logoMain: PropTypes.bool,
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    headerTop: {
      height: 85,
      width: '100%',
      background: theme.colorsTheme.layer,
      zIndex: 10,
      position: 'relative',
      top: 0,
    },
    inner: {
      padding: '0 25px',
      height: '100%',
      display: 'flex',
      flexWrap: 'nowrap',
    },
    headerItemWrapper: {
      height: '100%',
      position: 'relative',
      display: theme.helper.inline,
      justifyContent: 'left',
      alignItems: 'center',
      width: 279,
    },
    logo: { margin: 'auto 0' },
    headerItemCol: {
      height: '100%',
      paddingTop: 12,
      position: 'relative',
      display: theme.helper.inline,
    },
    headerItemColRight: {
      height: '100%',
      paddingTop: 8,
      position: 'relative',
      margin: 'auto 0 auto auto',
      display: theme.helper.inline,
    },
    user: {
      display: theme.helper.inline,
      color: theme.colorsTheme.text,
      fontSize: 14,
      lineHeight: '16px',
      fontWeight: 300,
      cursor: 'pointer',
    },
    name: {
      paddingTop: 16,
      width: 220,
    },
    rang: {
      fontSize: 12,
      fontWeight: 300,
      marginTop: 6,
      color: theme.colorsTheme.grey,
    },
    manualIcon: {
      margin: 'auto 0',
      '& path': {
        transition: 'all 300ms ease-in-out',
      },
      '& path:hover': {
        fill: theme.colorsTheme.text,
      },
    },
    link: {
      display: 'inline-flex',
    },
  }),
  {
    name: 'HeaderTop',
  }
);

export default HeaderTop;
