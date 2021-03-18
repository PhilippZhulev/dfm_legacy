import { makeStyles } from '@material-ui/core/styles';

/** Основные стили */
export const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      root: {
        margin: 16,
        marginTop: 205,
        marginLeft: 396,
        backgroundColor: colorsTheme.background,
        padding: 40,
        paddingRight: 55,
        borderRadius: 8,
        position: 'relative',
        height: 'calc(100% - 171px)',
      },

      title: {
        fontSize: 20,
        lineHeight: '27px',
        fontWeight: 'normal',
        color: colorsTheme.nodeColor,
        margin: 0,
      },

      cardWrapper: {
        display: 'flex',
        width: '100%',
      },

      cardWrapperRight: {
        width: '75%',
        paddingTop: 7,
      },

      cardWrapperRightFlex: {
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        margin: '5px -5px -5px -5px',
      },

      cardWrapperLeft: {
        width: '25%',
      },

      progressBlock: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 24,

        '& .bar': {
          maxWidth: 610,
          flex: '1',
          width: '100%',
          marginLeft: 16,
        },
      },

      progressValue: {
        display: 'flex',
        flexDirection: 'column',

        '& .title': {
          color: colorsTheme.grey,
          fontSize: 14,
        },

        '& .value': {
          color: colorsTheme.nodeColor,
          fontSize: 18,
          marginTop: 12,
        },
      },

      rootPanel: {
        backgroundColor: colorsTheme.nodeBackground,
        borderRadius: 8,
        marginTop: 0,
        color: colorsTheme.grey,

        '&::before': {
          opacity: 0,
        },

        '&.Mui-expanded': {
          marginTop: 0,
        },
      },

      rootSummary: {
        backgroundColor: colorsTheme.nodeBackground,
        borderRadius: 8,
        color: colorsTheme.nodeColor,
        fontSize: 18,

        '&.Mui-expanded': {
          backgroundColor: colorsTheme.nodeBackground,
        },
      },

      rootDetails: {
        margin: '0 -16px',
      },

      blockLabel: {
        flex: '0 0 225px',
        width: '225px',
        padding: '0 16px',
      },

      label: {
        margin: 0,

        '&.Mui-disabled': { cursor: 'not-allowed' },

        '& .MuiFormControlLabel-label.Mui-disabled': {
          color: colorsTheme.grey,
        },

        '& .MuiIconButton-root.Mui-disabled': {
          color: colorsTheme.grey,
        },

        '& .MuiCheckbox-colorPrimary.Mui-checked.Mui-disabled': {
          color: '#3f51b5',
        },
      },

      switchWrapper: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: -8,
        marginTop: 24,
      },

      labelSwitch: {
        fontSize: 14,
        lineHeight: '38px',
        color: colorsTheme.grey,
      },

      shortage: {
        backgroundColor: colorsTheme.shortage,
      },
      popular: {
        backgroundColor: colorsTheme.popular,
      },
      unpopular: {
        backgroundColor: colorsTheme.unpopular,
      },

      textShortage: {
        color: colorsTheme.shortage,
      },
      textPopular: {
        color: colorsTheme.popular,
      },
      textUnpopular: {
        color: colorsTheme.unpopular,
      },
    };
  },
  { index: 1, name: 'MaximizeNodeProvides' }
);
