import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

/** Основные стили */
export const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      root: {
        display: 'flex',
        alignItems: 'stretch',
        flexWrap: 'wrap',
        margin: '0 -8px',
        marginTop: 8,
      },

      well: {
        padding: '15px',
        margin: '0 -15px',
      },

      listItem: {
        display: 'block',
        flex: '0 0 90%',
        width: '90%',
        padding: '8px',
      },

      card: {
        backgroundColor: colorsTheme.nodeBackground,
        borderRadius: 8,
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
      },

      cardTitle: {
        fontSize: 16,
        lineHeight: '18px',
        paddingBottom: 16,
        borderBottom: '1px solid #2F3B52',
        color: 'white',
        boxSizing: 'border-box',
      },

      cardBody: {
        marginTop: 16,
        boxSizing: 'border-box',
      },

      row: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 24,
      },

      container: {
        display: 'flex',
        alignItems: 'flex-end',
        width: '100%',
        marginTop: 24,
      },

      icon: {
        color: colorsTheme.grey,
        marginLeft: 8,
        marginBottom: 4,
        cursor: 'pointer',

        '&.active': {
          color: colorsTheme.popular,
        },
      },

      nameMetric: {
        fontSize: 12,
        lineHeight: '15px',
        color: colorsTheme.grey,
      },

      metricValue: {
        fontSize: 18,
        fontWeight: 300,
        color: colorsTheme.nodeColor,
      },

      input: {
        width: '100%',
        height: 30,
        background: '#1F2738',
        borderRadius: 4,
        color: 'white',
        border: 0,
        textAlign: 'left',
        boxSizing: 'border-box',
        padding: '0 15px',
        fontSize: 12,
        transition: 'all 200ms ease-in-out',

        '&:focus': {
          outline: 0,
          border: 'none',
        },

        '&:disabled': {
          cursor: 'not-allowed',
          border: `1px solid ${colorsTheme.background}`,
          background: 'none',
        },
      },

      rootInput: {
        width: '100%',
      },

      isEmpty: {
        padding: '0 8px',
        color: colorsTheme.grey,
      },

      tooltip: {
        color: colorsTheme.nodeLabel,
        fontSize: 14,
        minWidth: 220,
        lineHeight: '150%',
      },

      value: {
        color: 'white',
        marginBottom: 8,
      },

      info: {},

      actions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      },

      button: {
        marginTop: 12,

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
  { index: 1, name: 'CardListMetric' }
);
