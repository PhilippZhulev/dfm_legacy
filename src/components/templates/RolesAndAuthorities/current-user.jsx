import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Icon, SearchFieldGraph } from 'components';
import { handleWarn } from 'helpers';
import User from '../../../services/api/user';
import { InfoUser } from './info-user';
import { ListModels } from './list-models';

export const CurrentUser = (props) => {
  const { location, match } = props;
  const [user, setUser] = useState(location.state);
  const [permissions, setPermissions] = useState([]);
  const classes = useStyles(props);
  const history = useHistory();
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!user) {
      getUserById();
    }
    getUserPermissionsById();
  }, []);

  const getUserById = async () => {
    try {
      const userFetch = await User.getUserById(+match.params.id);
      setUser(userFetch.data);
    } catch (error) {
      handleWarn(error);
    }
  };

  const getUserPermissionsById = useCallback(async () => {
    try {
      const permissionsFetch = await User.getUserPermissionsById(
        +match.params.id
      );
      setPermissions(permissionsFetch.data);
    } catch (error) {
      handleWarn(error);
    }
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.backBtn} onClick={() => history.push('../users')}>
        <Icon icon='CHEVRON_LEFT' size={16} fillColor='transparent' inline />К
        списку пользователей
      </div>
      <div className={classes.title}>Полномочия пользователя</div>
      <InfoUser user={user} />
      <SearchFieldGraph
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        classes={{ root: classes.search }}
        width={'70%'}
      />
      <ListModels
        search={search}
        user={user}
        permissions={permissions}
        getUserPermissionsById={getUserPermissionsById}
      />
    </div>
  );
};

const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: '32px 56px',
      paddingRight: 20,
    },

    search: {
      maxWidth: 300,
      marginTop: 24,
      marginBottom: 24,

      '& input': {
        backgroundColor: 'rgba(68, 142, 242, 0.1)',
      },
    },

    rootBtn: {
      margin: 0,

      '&:first-child': {
        '& button': {
          borderColor: '#CA6B6B',

          '&:hover': {
            boxShadow: 'inset 0 0 0 100px #CA6B6B',
          },
        },
      },

      '&:last-child': {
        marginLeft: 24,
      },
    },

    actions: {
      display: 'flex',
      width: '100%',
      justifyContent: 'flex-end',
      marginTop: 24,
    },

    backBtn: {
      fontSize: 14,
      display: 'inline-flex',
      alignItems: 'center',
      color: '#98A7B9',
      marginLeft: -4,
      cursor: 'pointer',
      marginBottom: 32,

      '&:hover': {
        opacity: 0.65,
      },
    },

    permissionCard: {
      margin: '24px 0',
      '&:first-child': {
        marginTop: 0,
      },
    },

    list: {
      width: 'calc(100% - 1px)',
    },

    title: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 20,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: theme.colorsTheme.grey,
      marginBottom: 24,
    },
  }),
  { index: 2 }
);
