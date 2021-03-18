import { makeStyles } from '@material-ui/core/styles';

/** Основные стили */
export const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      root: {
        position: 'relative',
      },

      rootPanel: {
        backgroundColor: colorsTheme.panelNodeConsumption,
        borderRadius: 8,
        color: colorsTheme.grey,

        '&:not(:last-child)': {
          marginBottom: 16,
        },
      },

      rootSummary: {
        backgroundColor: colorsTheme.panelNodeConsumption,
        borderRadius: 8,
        position: 'relative',
        height: 80,
        paddingTop: '10px',

        '&::before': {
          width: 5,
          position: 'absolute',
          content: '""',
          left: 0,
          top: 20,
          bottom: 40,
          borderRadius: '0 3px 3px 0',
          transition: 'all 300ms ease-in-out',
          willChange: 'top, bottom',
          backgroundColor: ({ consumption }) => consumption.color,
        },
        '& .MuiExpansionPanelSummary-content': {
          width: '100%',
        },
        '&.Mui-expanded': {
          backgroundColor: colorsTheme.panelNodeConsumption,
          color: colorsTheme.nodeColor,

          '&::before': {
            top: 15,
            bottom: 35,
          },
        },
      },

      label: {
        maxWidth: '100%',
      },

      summary: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-between',
        height: 50,
      },

      iconDown: {
        transition: 'transform 0.15s ease-in-out',
        transform: 'rotate(0deg)',
      },

      iconDownExpanded: {
        transform: 'rotate(180deg)',
      },

      iconMore: {
        transition: 'color 0.15s ease-in-out',
        color: colorsTheme.grey,
        cursor: 'pointer',

        '&:hover': {
          color: colorsTheme.nodeColor,
        },
      },

      action: {
        display: 'flex',
        alignItems: 'center',
        color: colorsTheme.grey,
        fontSize: 14,
        cursor: 'pointer',
        height: 24,

        '&:hover': {
          color: colorsTheme.nodeColor,
        },

        '& span': {
          marginLeft: 10,
        },

        '&.disabled': {
          opacity: 0.5,
          cursor: 'not-allowed',

          '&:hover': {
            color: colorsTheme.grey,
          },
        },
      },

      title: {
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        wordBreak: 'break-all',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },

      value: {
        fontSize: 14,
        color: colorsTheme.nodeColor,
      },

      row: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },

      horizontalSeparator: {
        margin: 0,
        marginTop: 16,
        backgroundColor: colorsTheme.grey,
        width: '100%',
      },

      more: {
        display: 'flex',
        flexDirection: 'column',
      },

      '@keyframes blink': {
        from: { boxShadow: 'inset 0 0 0 0px rgba(0,0,0,0)' },
        '50%': { boxShadow: 'inset 0 0 50px 50px rgba(255,255,255,0.3)' },
        to: { boxShadow: 'inset 0 0 0 0px rgba(0,0,0,0)' },
      },
      blinkAnimation: {
        animationName: '$blink',
        animationDuration: '400ms',
        animationTimingFunction: 'linear',
      },

      select: {
        border: '1px solid #869AAC',
        lineHeight: '16px',
        height: 16,
        display: 'flex',
        alignItems: 'center',
        minHeight: 28,
      },

      selectRoot: {
        width: '100%',
        '&:not(:first-child)': {
          marginTop: 16,
        },
      },

      sumWrapper: {
        display: 'flex',
      },

      sumLabel: {
        display: 'flex',
        alignItems: 'center',
      },

      formulaIcon: {},
    };
  },
  { name: 'PanelNodeConsumption', index: 1 }
);
