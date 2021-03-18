import { makeStyles } from '@material-ui/core/styles';

/** Основные стили панели с категориями */
export const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      title: {
        fontSize: 20,
        lineHeight: '27px',
        fontWeight: 'normal',
        color: colorsTheme.nodeColor,
        margin: 0,
      },

      details: {
        padding: 0,
        flexWrap: 'nowrap',
      },

      leftSummary: {
        paddingLeft: 40,
        flex: '0 0 321px',
      },

      leftDetails: {
        width: 321,
        flex: '0 0 321px',
      },

      rightSummary: {
        display: 'flex',
        alignItems: 'center',

        flex: 1,
        height: '100%',
        backgroundColor: '#1F2738',
        paddingLeft: 25,
        marginRight: -50,
      },

      rightDetails: {
        flex: 1,
        height: 476,
        backgroundColor: '#1F2738',
        paddingLeft: 25,
        paddingRight: 8,
        paddingTop: 12,
      },

      label: {
        fontSize: 20,
        lineHeight: '27px',
        fontWeight: 'normal',
        color: colorsTheme.nodeColor,
        margin: '24px 0',
      },

      rootPanel: {
        backgroundColor: colorsTheme.nodeBackground,
        borderRadius: 8,
        marginTop: 0,
        color: colorsTheme.grey,
        overflow: 'hidden',

        '&:not(:first-child)': {
          marginTop: 16,
        },

        '&::before': {
          opacity: 0,
        },

        '&.Mui-expanded': {
          marginTop: 0,
          '&:not(:first-child)': { marginTop: 16 },
        },
      },

      rootSummary: {
        backgroundColor: colorsTheme.nodeBackground,
        borderRadius: 8,
        color: colorsTheme.nodeColor,
        fontSize: 18,
        padding: 0,
        paddingRight: 25,

        '&.Mui-expanded': {
          backgroundColor: colorsTheme.nodeBackground,
          minHeight: 'auto',
        },

        '& .MuiExpansionPanelSummary-content': {
          height: '100%',
        },
      },

      list: {
        width: '100%',
      },

      labelCheck: {
        margin: 0,
        alignItems: 'flex-start',

        '& .MuiTypography-body1': {
          fontSize: 14,
          lineHeight: '24px',
        },

        '& .MuiIconButton-root': {
          padding: 0,
          marginRight: 16,
        },

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

      import: {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        color: colorsTheme.grey,
        width: 190,
        marginLeft: 16,
        flex: '0 0 auto',

        '&:hover': {
          color: colorsTheme.nodeColor,

          '& path': {
            fill: colorsTheme.nodeColor,
          },
        },

        '& .text': {
          marginLeft: 16,
          fontSize: 14,
        },
      },

      selected: {
        backgroundColor: '#1F2738',
      },

      search: {
        width: '30%',
        '& input': {
          backgroundColor: '#171E2C',
        },
        maxWidth: 300,
      },

      panel: {
        marginBottom: 24,
        flexWrap: 'nowrap',
      },
    };
  },
  { index: 1 }
);
