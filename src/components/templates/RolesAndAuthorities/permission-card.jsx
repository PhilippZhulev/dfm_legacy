import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Badge from '@material-ui/core/Badge';
import { useWindowSize } from 'helpers';

const defaultValue = {
  approve: false,
  create: false,
  delete: false,
  read: false,
  update: false,
  target: 'model',
};

export const PermissionCard = React.memo((props) => {
  const {
    main,
    label,
    name,
    permission,
    oChangePermission,
    create,
    update,
    measure,
  } = props;
  const [state, setState] = useState(defaultValue);

  const { width } = useWindowSize();

  useEffect(() => {
    const timer = setTimeout(() => measure(), 300);

    return () => {
      clearTimeout(timer);
    };
  }, [width]);

  useEffect(() => {
    if (update || create || permission) {
      setState(update || create || permission);
    }
  }, [update, create, permission]);
  const classes = useStyles(props);

  const isChange = (parametr) => {
    if (permission && update) {
      return permission[parametr] !== update[parametr];
    }
    if (!permission && create) {
      return create[parametr];
    }

    return false;
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });

    if (oChangePermission) {
      oChangePermission({
        ...state,
        [event.target.name]: event.target.checked,
      });
    }
  };
  return (
    <div className={classNames(classes.root, { [classes.main]: main })}>
      <div className={classes.label}>{label}</div>
      {/** TODO добавить кол-во нод блок, трайб */}
      <Grid container>
        <div className={classes.name}>{name}</div>
      </Grid>
      <div className={classes.separator} />
      <Grid container>
        <FormControlLabel
          className={classes.labelSwitch}
          control={
            <Switch
              className={classes.switch}
              checked={state.read}
              color='primary'
              name='read'
              onChange={handleChange}
            />
          }
          label={
            <Badge
              classes={{ badge: classes.badge }}
              color='secondary'
              variant='dot'
              invisible={!isChange('read')}>
              Просмотр
            </Badge>
          }
          labelPlacement='start'
        />
        <FormControlLabel
          className={classes.labelSwitch}
          control={
            <Switch
              checked={state.create}
              color='primary'
              name='create'
              onChange={handleChange}
            />
          }
          label={
            <Badge
              classes={{ badge: classes.badge }}
              color='secondary'
              variant='dot'
              invisible={!isChange('create')}>
              Создание
            </Badge>
          }
          labelPlacement='start'
        />
        <FormControlLabel
          className={classes.labelSwitch}
          control={
            <Switch
              checked={state.update}
              color='primary'
              name='update'
              onChange={handleChange}
            />
          }
          label={
            <Badge
              classes={{ badge: classes.badge }}
              color='secondary'
              variant='dot'
              invisible={!isChange('update')}>
              Редактирование
            </Badge>
          }
          labelPlacement='start'
        />
        <FormControlLabel
          className={classes.labelSwitch}
          control={
            <Switch
              checked={state.delete}
              color='primary'
              name='delete'
              onChange={handleChange}
            />
          }
          label={
            <Badge
              classes={{ badge: classes.badge }}
              color='secondary'
              variant='dot'
              invisible={!isChange('delete')}>
              Удаление
            </Badge>
          }
          labelPlacement='start'
        />
        {/* <FormControlLabel
          className={classes.labelSwitch}
          control={
            <Switch
              checked={state.approve}
              color='primary'
              name='approve'
              onChange={handleChange}
            />
          }
          label={
            <Badge
              classes={{ badge: classes.badge }}
              color='secondary'
              variant='dot'
              invisible={!isChange('approve')}>
              Согласование
            </Badge>
          }
          labelPlacement='start'
        /> */}
      </Grid>
    </div>
  );
});

PermissionCard.displayName = 'PermissionCard';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      minHeight: 164,
      padding: '16px 24px',
      backgroundColor: 'rgba(68, 142, 242, 0.1)',
      borderRadius: 6,
      width: '100%',
    },

    badge: {
      backgroundColor: '#FFB828',
      transform: 'scale(1) translate(120%, -100%)',
    },

    labelSwitch: {
      margin: 0,
      color: '#fff',

      '&:not(:last-child)': {
        marginRight: 60,
      },

      '& .MuiTypography-body1': {
        fontSize: 13,
        lineHeight: '16px',
      },

      '& .MuiSwitch-root': {
        marginLeft: 16,
      },
    },

    main: {
      backgroundColor: 'rgba(68, 142, 242, 0.24)',
      border: '1px solid rgba(68, 142, 242, 0.44)',
    },

    label: {
      fontSize: 13,
      lineHeight: '16px',
      color: '#98A7B9',
      marginBottom: 8,
    },
    name: {
      fontWeight: 600,
      fontSize: 18,
      lineHeight: '24px',
      color: '#ffffff',
      textTransform: 'lowercase',

      '&:first-letter': {
        textTransform: 'uppercase',
      },
    },

    separator: {
      height: 1,
      width: '100%',
      backgroundColor: 'rgba(112, 126, 138, 0.24)',
      marginBottom: 28,
      marginTop: 24,
    },
  }),
  { index: 1 }
);
