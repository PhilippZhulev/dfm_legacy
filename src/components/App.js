import React, { useEffect, useState } from 'react';
import {
  Login,
  Model,
  UserControl,
  ModelControl,
  Main,
  SaveStatus,
  AppBar,
} from 'containers';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { Preload, ModHiddenSudir, AbsolutePosition, Mouse } from 'components';
import InitModals from '../containers/InitModals';

/**
 * Приложение
 * @component
 * @publics
 */
function App({ message, dispatchMessageEvent, userData, modelLoad }) {
  /** ANCHOR: Стили и локация */
  const location = useLocation();
  const classes = useStyles();

  /** ANCHOR: Состояния */
  const [modelSearch, setModelSearch] = useState('');
  const [preload, setPreload] = useState(null);
  const [save, setSave] = useState({
    status: 0,
    message: '',
    state: false,
    err: null,
  });

  /** ANCHOR: Глобальные кастомные события */
  useEffect(() => {
    document.addEventListener('app.error', async (event) => {
      dispatchMessageEvent({
        text: `ERROR: ${event.detail.text}`,
        state: true,
      });
    });

    document.addEventListener('app.warn', async (event) => {
      dispatchMessageEvent({
        text: `${event.detail.message}`,
        state: true,
      });
    });

    document.addEventListener('app.save.status', async (event) => {
      setSave(event.detail);
    });

    document.addEventListener('app.preload.state', async (event) => {
      setPreload(event.detail);
    });
  }, []);

  return (
    <>
      {location.pathname !== '/dfm_it/login' ? (
        <AppBar
          modelLoad={modelLoad}
          modelSearch={(e) => setModelSearch(e)}
          userData={userData}
        />
      ) : null}
      {/* Сообщения */}
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={message.state}
        message={message.text}
        autoHideDuration={15000}
        action={
          <>
            <IconButton
              aria-label='close'
              color='inherit'
              className={classes.close}
              onClick={() =>
                dispatchMessageEvent({
                  text: '',
                  state: false,
                })
              }>
              <CloseIcon />
            </IconButton>
          </>
        }
      />

      <AbsolutePosition right='50px' bottom='50px' zIndex={10}>
        <Mouse showModal={true} />
      </AbsolutePosition>

      {/* Роутинг */}
      <Switch location={location}>
        <Route path='/dfm_it/login' exact>
          <ModHiddenSudir>
            <Login />
          </ModHiddenSudir>
        </Route>
        <Route path='/dfm_it/model'>
          <UserControl location={location}>
            <Model modelSearch={modelSearch} />
          </UserControl>
        </Route>
        <Route path='/dfm_it' exact>
          <UserControl location={location}>
            <ModelControl location={location}>
              <Main />
            </ModelControl>
          </UserControl>
        </Route>
        <Route path='/' exact>
          {/* Обертка редиректа */}
          <Redirect
            to={{
              pathname: '/dfm_it/model',
              state: { from: location },
            }}
          />
        </Route>
      </Switch>

      <SaveStatus {...save} />

      <InitModals />

      <Preload state={preload} />
    </>
  );
}

App.propTypes = {
  message: PropTypes.object,
  dispatchMessageEvent: PropTypes.func,
  userData: PropTypes.object,
  modelLoad: PropTypes.bool,
};

App.defaultProps = {
  message: {
    text: '',
    state: false,
  },
};

/** ANCHOR: В стилях подключение шрифтов и глобальных стилей */
const useStyles = makeStyles(
  (theme) => ({
    '@global': {
      ...theme.global,
      ...theme.OpenSans,
      ...theme.initOpenSans,
      ...theme.expansionPanel,
      ...theme.expansionPanelSummary,
      ...theme.triggerMui,
    },
    close: { padding: theme.spacing(0.5) },
  }),
  {
    name: 'App',
  }
);

export default App;
