import { makeStyles } from '@material-ui/core/styles';

/** Основные стили */
export const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      metricPanel: {
        background: colorsTheme.dropdownTagSummaryBackground,
      },
      label: {
        width: 'max-content',
        padding: '5px 0',
        marginLeft: '-5px',

        '&.Mui-disabled': { cursor: 'not-allowed' },

        '& .MuiFormControlLabel-label.Mui-disabled': {
          color: colorsTheme.grey,
        },

        '& .MuiIconButton-root.Mui-disabled': { color: colorsTheme.grey },

        '& .MuiIconButton-root': {
          borderRadius: 0,
        },
      },

      dropdownTagsAdd: {
        background: colorsTheme.dropdownTagSummaryBackground,
        borderRadius: 4,
        border: '1px solid #242E42',
        boxSizing: 'border-box',
        position: 'relative',
        marginBottom: 16,
        color: colorsTheme.grey,
        '& .MuiExpansionPanelSummary-root': {
          padding: '0 10px 0 21px',
        },
        '& .noMetrics': {
          fontSize: 14,
          lineHeight: 1.5,
          fontWeight: 400,
          padding: '8px 13px',
        },
      },

      dropdownTagsAddSummary: {
        background: colorsTheme.dropdownTagSummaryBackground,
        color: colorsTheme.dropdownTagSummaryColor,
        borderRadius: 4,
        boxSizing: 'border-box',
        height: 'auto',
        minHeight: 32,
        '&.Mui-expanded': {
          background: colorsTheme.dropdownTagSummaryBackground,
          color: colorsTheme.dropdownTagSummaryColor,
          borderRadius: 4,
          boxSizing: 'border-box',
          height: 'auto',
          minHeight: 32,
          borderBottom: 0,
        },
        '& .MuiExpansionPanelSummary-content': {
          margin: 0,
          fontSize: '14px',
          lineHeight: '22px',
          color: '#fff',
        },
        '& .MuiCollapse-hidden, .MuiCollapse-entered': {
          background: colorsTheme.dropdownTagSummaryBackground,
        },
      },

      detailsRoot: (props) => ({
        height:
          props.metricForm?.length <= 5 ? props.metricForm.length * 50 : 254,
        overflowY: 'auto',
      }),

      containerTags: {
        display: 'flex',
        flexWrap: 'wrap',
      },

      containerTag: {
        padding: 5,
      },
    };
  },
  { index: 1, name: 'TagsMetricForm' }
);
