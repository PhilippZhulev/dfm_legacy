import { makeStyles } from '@material-ui/core/styles';

/** Основные стили */
export const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      root: {
        flexGrow: 1,
        background: 'none',
        boxShadow: 'none',
        border: '0px none',
        margin: '0 -40px',
        '& .MuiTab-wrapper': {
          alignItems: 'flex-start',
        },
        height: 'calc(100% - 110px)',
        overflow: 'hidden',
      },

      checkBoxRoot: {
        fontWeight: 700,
        color: '#fff',
      },

      checkBoxLabel: {
        '&.Mui-disabled': {
          opacity: 0.7,
          color: '#fff',
        },
      },
      number: {
        color: '#869AAC',
      },
      selected: {
        color: '#869AAC',
      },

      tabsPanel: {
        background: '#283449',
        height: '100%',
      },

      buttons: {
        height: 70,
        display: 'flex',
        alignItems: 'center',
        'justify-content': 'flex-end',
        textAlign: 'center',
      },

      cancel: {
        marginRight: 20,
        color: '#fff',
        '& span': {
          padding: 0,
          border: '1px solid #CA6B6B',
          borderRadius: 16.5,
          width: 120,
          height: 33,
          lineHeight: '28px',
        },
        '&:hover': {
          opacity: 0.7,
        },
      },

      save: {
        color: '#fff',
        '& span': {
          padding: 0,
          border: '1px solid #6B75CA',
          borderRadius: 16.5,
          width: 120,
          height: 33,
          lineHeight: '28px',
        },
        '&:hover': {
          opacity: 0.7,
        },
      },

      blockLabel: {
        flex: '0 0 225px',
        width: '225px',
        paddingRight: 16,
      },

      checkboxBlockTitle: {
        fontSize: 16,
        lineHeight: '24px',
        color: '#fff',
        width: '100%',
        display: 'flex',
        flex: 0,
      },

      checkboxCol: {
        /* width: 42, */
        zIndex: 7,
        display: 'flex',
        whiteSpace: 'nowrap',
        flexWrap: 'wrap',
        '& .MuiSvgIcon-root': {
          '& path': {
            fill: theme.text,
          },
        },
        '& .Mui-checked .MuiSvgIcon-root': {
          '& path': {
            fill: `${theme.colorsTheme.selected}!important`,
          },
        },
        '& .MuiCheckbox-indeterminate .MuiSvgIcon-root': {
          '& path': {
            fill: `${theme.colorsTheme.selected}!important`,
          },
        },
      },
      checkboxItem: {},
      labelCheck: {
        display: 'flex',
        whiteSpace: 'nowrap',
        flex: '0 0 180px',
      },
      checkboxRoot: {
        color: '#98A7B9',
        '& svg': {
          minWidth: 16,
          minHeight: 16,
          fill: 'rgba(0,0,0,0)',
        },
        '&.Mui-checked + span': {
          color: theme.colorsTheme.text,
        },
        '&.Mui-checked svg': {
          background: theme.colorsTheme.text,
          borderRadius: 4,
        },

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
        margin: 'auto 0',
      },
      input: {
        zIndex: 5,
        background: 'rgba(0,0,0,0)',
        color: theme.colorsTheme.text,
        outline: 'none',
        resize: 'none',
        padding: '10px 15px',
        width: '100%',
        height: '100%',
        border: '1px solid rgba(0,0,0,0)',
        lineHeight: '18px',
        margin: 'auto 0',
        fontSize: 12,
      },
    };
  },
  { index: 2, name: 'PeriodsDesign' }
);
