import colors from './colors';

const { colorsTheme } = colors;

const Panel = {
  expansionPanel: {
    '.MuiExpansionPanel-root': {
      background: colorsTheme.layer,
      marginBottom: 0,
      boxShadow: 'none',
      position: 'relative',
    },
  },

  expansionPanelSummary: {
    '.MuiExpansionPanelSummary-root': {
      background: colorsTheme.layer,
      transition: 'all .15s ease-in-out',
      fontSize: 16,
      height: 58,
      display: 'flex',
      alignItems: 'center',
      padding: '0 25px',
      color: colorsTheme.grey,

      '& .MuiExpansionPanelSummary-content': { alignItems: 'center' },

      '&.Mui-expanded': {
        background: colorsTheme.nodeSummaryPanelActive,
        margin: 0,
        minHeight: 58,
      },
    },

    '.MuiExpansionPanelDetails-root': { flexWrap: 'wrap' },
  },
};

export default Panel;
