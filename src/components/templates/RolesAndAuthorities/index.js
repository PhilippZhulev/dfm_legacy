import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TabButton, Icon } from 'components';
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import Users from './users';
import { CurrentUser } from './current-user';

const catalogs = [
  {
    value: 'users',
    label: 'Пользователи',
  },
];

/**
 * Компонент внутренней части модального окна системных справочников
 * @component
 * @public
 */
const RolesAndAuthorities = React.memo(({ classes }) => {
  const styles = useStyles({ classes });
  const [selected, setSelected] = useState(catalogs[0]);
  const [loaded, setLoaded] = useState(false);
  const { url } = useRouteMatch();
  const history = useHistory();
  /**
   * Обработчик нажатия на кнопку перехода к справочнику
   * @param {object} item - справочник
   */
  const _handleClick = async (item) => {
    if (item.value !== selected.value) {
      setLoaded(false);
      setSelected(item);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.catalogMenu}>
          <div className={styles.titleWrapper}>
            <div className={styles.title}>Ролевая модель</div>
          </div>
          {catalogs.map((item) => (
            <TabButton
              key={item.value}
              label={item.label}
              selected={item.value === selected.value}
              classes={{ label: styles.buttonLabel }}
              onClick={() => _handleClick(item)}
            />
          ))}
        </div>
        <div className={styles.workspace}>
          <Icon
            size={24}
            className={styles.close}
            onClick={() => history.push('/dfm_it/model')}
          />
          <Switch>
            <Route
              path={`${url}/users`}
              render={({ match }) => (
                <Switch>
                  <Route path={match.url} exact component={Users} />
                  <Route
                    path={`${match.url}/id-:id`}
                    exact
                    component={CurrentUser}
                  />
                  <Route
                    path='*'
                    render={() => <Redirect to={`${url}/users`} />}
                  />
                </Switch>
              )}
            />
            <Route path='*' render={() => <Redirect to={`${url}/users`} />} />
          </Switch>
        </div>
      </div>
    </div>
  );
});

RolesAndAuthorities.propTypes = {
  classes: PropTypes.object,
};

const useStyles = makeStyles(
  (theme) => ({
    root: {
      width: '100%',
    },
    inner: {
      height: 'fit-content',
      display: 'flex',
      borderRadius: 8,
      zIndex: 999,
      margin: -43,
    },
    catalogMenu: {
      width: 300,
      background: theme.colorsTheme.nodeBackground,
      height: 'calc(100vh - 70px)',
    },
    workspace: {
      width: 'calc(100% - 300px)',
      height: 'calc(100vh - 70px)',
      position: 'relative',
      background: theme.colorsTheme.categoryBackground,
    },
    titleWrapper: {
      display: 'flex',
      height: 95,
    },
    close: {
      position: 'absolute',
      zIndex: 2,
      right: 15,
      top: 15,
      color: '#869AAC',
      cursor: 'pointer',

      '&:hover': {
        opacity: 0.6,
      },
    },
    title: {
      margin: 'auto 0',
      marginLeft: 34,
      color: theme.colorsTheme.text,
      fontSize: 18,
      lineHeight: '25px',
      width: 'max-content',
    },
    buttonLabel: {
      fontSize: 14,
    },
  }),
  { name: 'RolesAndAuthorities', index: 1 }
);

export default RolesAndAuthorities;
