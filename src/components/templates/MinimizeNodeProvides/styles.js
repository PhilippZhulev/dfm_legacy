import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

/** Основные стили */
export const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },

      well: {
        padding: '15px',
        margin: '0 -15px',
      },

      consumedBtn: {
        color: '#1F8EFA',
        fontSize: 12,
        marginTop: 15,
        cursor: 'pointer',
        lineHeight: '16px',
        transition: 'all 300ms ease-in-out',
        '&:hover': {
          opacity: 0.6,
        },
      },

      cloneBlock: {
        margin: '0 -20px 15px -20px ',
      },

      wrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginLeft: 16,
        color: colorsTheme.nodeColor,
        fontSize: 14,
      },

      progressBlock: { width: '100%' },

      progressValue: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 52,
        marginTop: 8,
        fontSize: 14,
        lineHeight: '20px',

        '& .title': { color: colorsTheme.grey },

        '& .value': { color: colorsTheme.nodeColor },
      },

      rootPanel: {
        backgroundColor: colorsTheme.nodeBackground,
        borderRadius: 8,
        color: colorsTheme.grey,

        '&:not(:last-child)': { marginBottom: 16 },
      },

      rootSummary: {
        backgroundColor: colorsTheme.nodeBackground,
        borderRadius: 8,
        position: 'relative',

        '&.Mui-expanded': {
          backgroundColor: colorsTheme.nodeBackground,
          color: colorsTheme.nodeColor,

          '&::after': {
            content: '""',
            height: 1,
            width: 'calc(100% - 32px)',
            position: 'absolute',
            bottom: 0,
            backgroundColor: colorsTheme.background,
          },
        },
      },

      listMetricCheck: {
        color: colorsTheme.grey,
        marginTop: 32,
        display: 'flex',
        flexDirection: 'column',

        '& .title': {
          color: colorsTheme.nodeColor,
          marginBottom: 16,
        },

        '& .MuiExpansionPanelDetails-root label': {
          width: '100%',
        },

        '& .MuiExpansionPanel-root.Mui-expanded:last-child': {
          marginBottom: 20,
        },

        '& .MuiIconButton-colorPrimary:hover': {
          background: 'inherit',
        },

        // '& .MuiIconButton-root': {
        //   borderRadius: 0,
        // },
      },

      paramsMetric: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      },

      rootInput: {
        marginTop: 16,

        '&:last-child': {
          marginTop: 48,
          marginBottom: 10,
          position: 'relative',

          '&::before': {
            content: '""',
            height: 1,
            width: '100%',
            position: 'absolute',
            top: '-24px',
            backgroundColor: colorsTheme.background,
          },
        },
      },

      labelNode: {
        fontSize: 14,
        color: colorsTheme.grey,
        lineHeight: '18px',
      },

      label: {
        width: 'max-content',

        '&.Mui-disabled': { cursor: 'not-allowed' },

        '& .MuiFormControlLabel-label.Mui-disabled': {
          color: colorsTheme.grey,
        },

        '& .MuiIconButton-root.Mui-disabled': { color: colorsTheme.grey },

        '& .MuiCheckbox-colorPrimary.Mui-checked.Mui-disabled': {
          color: '#3f51b5',
        },
      },

      row: {
        marginTop: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        '& span': {
          lineHeight: '18px',
        },
      },

      input: {
        backgroundColor: colorsTheme.background,
        height: 30,

        '&:focus': { border: 'none' },
        '&:disabled': {
          cursor: 'not-allowed',
          border: `1px solid ${colorsTheme.background}`,
          background: 'none',
        },
      },

      shortage: { backgroundColor: colorsTheme.shortage },
      popular: { backgroundColor: colorsTheme.popular },
      unpopular: { backgroundColor: colorsTheme.unpopular },

      textShortage: { color: colorsTheme.shortage },
      textPopular: { color: colorsTheme.popular },
      textUnpopular: { color: colorsTheme.unpopular },

      icon: {
        color: colorsTheme.popular,
      },

      detailsRoot: {
        height: 230,
        overflowY: 'auto',
      },

      containerTags: {
        display: 'flex',
        flexWrap: 'wrap',
      },

      containerTag: {
        padding: 5,
      },

      actions: {
        marginTop: 24,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      },

      button: {
        marginTop: 0,

        '& button': {
          width: '100%',
          borderRadius: 50,
        },
      },

      small: {
        fontSize: 12,
        textAlign: 'center',
        color: colorsTheme.groupTitle,
        cursor: 'pointer',
        marginTop: 12,
        transition: 'color 0.2s',

        '&:hover': {
          color: fade(colorsTheme.groupTitle, 0.6),
        },
      },
    };
  },
  { index: 1, name: 'MinimizeNodeProvides' }
);
