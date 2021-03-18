import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(
  (theme) => ({
    addModel: {
      padding: '7px 20px!important',
    },
    addModelRoot: {
      display: 'inline-flex',
    },
    newModel: {
      padding: '7px 20px!important',
    },
    newModelRoot: {
      display: 'inline-flex',
      margin: '20px auto 50px!important',
      justifyContent: 'center',
    },
    newModelBlock: {
      textAlign: 'center',
    },
    newModelTitle: {
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 400,
      lineHeight: '27px',
      color: '#fff',
    },
    triggerLabel: {
      color: theme.colorsTheme.text,
      fontSize: 14,
      lineHeight: '34px',
      zIndex: 100,
      marginRight: 60,
    },
    switchRoot: { zIndex: 100 },
    switchBase: { color: theme.colorsTheme.text, zIndex: 100 },
  }),
  {
    name: 'Model',
  }
);
