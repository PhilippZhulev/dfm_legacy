import Scrollbar from 'react-scrollbars-custom';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Grow from '@material-ui/core/Grow';
import { useHistory } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import { Avatar, SearchFieldGraph } from 'components';
import { nameFormat, handleWarn, useDebounce } from 'helpers';
import MenuIcon from '../../svg/MenuIcon';
import User from '../../../services/api/user';

function Users(props) {
  const { classes } = props;
  const styles = useStyles({ classes });
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const searchFetch = useDebounce(search, 450);

  useEffect(() => {
    getUserList();
  }, [page, searchFetch]);

  const getUserList = async () => {
    try {
      const query = {
        page: page - 1,
        size: 10,
      };

      if (search) {
        query.search = search;
      }

      const { totalPage, data } = await User.getAllUser({ query });

      setTotal(totalPage);
      setUsers(data);
    } catch (error) {
      handleWarn(error);
    }
  };

  const handleClick = (user) => {
    history.push(`./users/id-${user.id}`, user);
  };

  return (
    <>
      <Grow in={true}>
        <div className={styles.root}>
          <div className={styles.title}>Список пользователей</div>
          <SearchFieldGraph
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            classes={{ root: styles.search }}
            width={'70%'}
          />
          <div className={styles.row}>
            <div className={styles.user}>пользователь</div>
            <div className={styles.authorities}>полномочия</div>
          </div>
          <div className={styles.hl} />
          <Scrollbar
            trackYProps={{ style: { width: 4, right: -15 } }}
            thumbYProps={{
              style: {
                background: 'rgba(31, 142, 250, 0.4)',
                width: 4,
                borderRadius: 2,
              },
            }}
            trackXProps={{
              style: { height: 4, bottom: -15, display: 'block' },
            }}
            thumbXProps={{
              style: {
                background: 'rgba(31, 142, 250, 0.4)',
                width: 4,
                borderRadius: 2,
              },
            }}
            style={{ height: 'calc(100vh - 390px)', width: '100%' }}>
            {users.map((user, index) => {
              const username = user.fullName || user.username || user.login;
              return (
                <div
                  className={classNames(styles.row, styles.userRow)}
                  key={user.id}
                  onClick={() => handleClick(user)}>
                  <div className={styles.user}>
                    <Avatar
                      name={nameFormat(username)}
                      url='name'
                      data={user.avatar}
                      classes={{ root: styles.avatarRoot }}
                    />

                    <div className={styles.name}>
                      {nameFormat(username)}
                      <div className={styles.rang}>{user.position}</div>
                    </div>
                  </div>
                  <div className={styles.authorities}>
                    <div className={styles.authorityBubble}>{user.role}</div>
                  </div>
                  <div className={styles.arrow}>
                    <MenuIcon />
                  </div>
                </div>
              );
            })}
          </Scrollbar>
          <Pagination
            classes={{ root: styles.pagination }}
            count={total}
            page={page}
            color='primary'
            onChange={(_, eventPage) => setPage(eventPage)}
          />
        </div>
      </Grow>
    </>
  );
}

const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: '38px 56px',
    },
    title: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 20,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: theme.colorsTheme.grey,
      marginBottom: 20,
    },

    search: {
      maxWidth: 300,
      marginTop: 24,
      marginBottom: 24,

      '& input': {
        backgroundColor: 'rgba(68, 142, 242, 0.1)',
      },
    },

    hl: {
      height: 1,
      width: '100%',
      backgroundColor: 'rgba(112, 126, 138, 0.24)',
      marginTop: 20,
      marginBottom: 40,
    },
    row: {
      display: 'flex',
      '& > div': {
        fontSize: 13,
        color: theme.colorsTheme.disabled,
      },
      '&:not(:last-child)': {
        marginBottom: 36,
      },
    },
    userRow: {
      '&:hover': {
        cursor: 'pointer',
        '& > $arrow path': {
          fill: theme.colorsTheme.text,
        },
      },
    },
    user: {
      width: 380,
      display: 'flex',
    },
    name: {
      fontSize: 14,
      color: theme.colorsTheme.text,
      marginLeft: 24,
    },
    rang: {
      marginTop: 8,
      color: theme.colorsTheme.nodeLabel,
      overflow: 'hidden',
      maxHeight: 20,
      maxWidth: 290,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    authorities: {
      flexGrow: 1,
    },
    authorityBubble: {
      background: 'rgba(101, 125, 149, 0.24)',
      borderRadius: 20,
      color: theme.colorsTheme.text,
      padding: '4px 12px',
      fontSize: 12,
      width: 'min-content',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      maxWidth: 300,
      textOverflow: 'ellipsis',
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 16,

      '& .MuiPaginationItem-root': {
        color: theme.colorsTheme.text,

        '&:hover': {
          opacity: 0.65,
        },
      },
    },

    avatarRoot: {
      margin: 'unset',
    },
    arrow: {
      alignSelf: 'center',
      '& > svg': {
        transform: 'rotate(-90deg)',
      },
    },
    userRoot: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 2,
    },
  }),
  { name: 'Users', index: 1 }
);

export default Users;
