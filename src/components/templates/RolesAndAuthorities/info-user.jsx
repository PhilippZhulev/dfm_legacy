import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Avatar } from 'components';
import { nameFormat } from 'helpers';
import Shield from '../../svg/Sheild';

export const InfoUser = (props) => {
  const { user } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Grid container alignItems='center' className={classes.rootInfo}>
        <Grid item sm>
          <Grid container alignItems='center'>
            <Avatar
              classes={{ root: classes.avatarRoot }}
              name={nameFormat(user.fullName)}
              url='name'
              data={user.avatar}
            />
            <div className={classes.userInfo}>
              <span className={classes.fullName}>{user.fullName}</span>
              <span className={classes.small}>{user.position}</span>
            </div>
          </Grid>
        </Grid>
        <div className={classes.separator} />
        <Grid item sm='auto'>
          <Grid container alignItems='center'>
            <Shield />
            <div className={classes.roleBox}>
              <div className={classes.small}>базовая роль</div>
              <div className={classes.role}>{user.role}</div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles(
  (theme) => ({
    root: {
      height: 118,
      border: '1px solid rgba(134, 154, 172, 0.2)',
      width: '100%',
      borderRadius: 8,
      background: 'rgba(0, 0, 0, 0.16)',
      padding: '28px 40px',
      paddingRight: 45,
    },

    rootInfo: {
      height: '100%',
    },

    avatarRoot: {
      margin: 0,
    },

    userInfo: {
      marginLeft: 32,
      display: 'flex',
      flexDirection: 'column',
    },

    fullName: {
      color: '#ffffff',
      fontWeight: 500,
      fontSize: 18,
      lineHeight: '22px',
      marginBottom: 4,
    },

    small: {
      color: '#98A7B9',
      lineHeight: '16px',
      fontSize: 12,
    },

    separator: {
      width: 1,
      height: '116px',
      margin: '-28px 16px',
      marginRight: 40,
      background: 'rgba(134, 154, 172, 0.2)',
    },

    roleBox: {
      marginLeft: 24,
      display: 'flex',
      flexDirection: 'column',
    },

    role: {
      color: '#fff',
      lineHeight: '24px',
      fontSize: 16,
      marginTop: 6,
    },
  }),
  { index: 1 }
);
