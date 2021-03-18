import { makeStyles } from '@material-ui/core/styles';

/** Основные стили */
export const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      title: {
        color: colorsTheme.nodeColor,
        fontSize: 20,
        marginBottom: 32,
      },

      table: {
        width: 'calc(100% - 4px)',
        tableLayout: 'fixed',
        padding: 8,
        marginBottom: 16,

        '& tbody': {
          color: '#657D95',
        },

        '& th': {
          top: -1,
          left: -1,
          color: 'inherit !important',
        },

        '& th, & td': {
          '&:nth-child(2)': {
            textAlign: 'center',
            color: colorsTheme.text,
          },
          '&:nth-child(3)': {},
          '&:nth-child(4)': {},
          '&:nth-child(5)': {},
          '&:nth-child(6)': {},
        },
      },

      active: {
        backgroundColor: colorsTheme.background,
        color: colorsTheme.text,
      },

      delete: {
        backgroundColor: colorsTheme.checkedRow,
      },

      multiSelectRoot: {
        width: 'unset',
        background: 'unset',
        height: '100%',

        '& .disabled': {
          color: '#657D95',
        },
      },

      textArea: {
        width: '100%',
        background: 'inherit',
        color: 'inherit',
        border: 0,
        textAlign: 'left',
        padding: '0',
        fontSize: 12,
        height: 30,
        resize: 'none',
        lineHeight: '16px',

        '&:focus': {
          outline: 0,
          border: 'none',
        },

        '&:disabled': {
          cursor: 'not-allowed',
        },
      },

      action: {
        marginTop: 40,
      },

      button: {
        padding: '6px 16px',
        '&:last-child': {
          marginLeft: 12,
          minWidth: 'auto',
        },
      },

      pagination: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 16,

        '& .MuiPaginationItem-root': {
          color: colorsTheme.text,

          '&:hover': {
            opacity: 0.65,
          },
        },
      },

      search: {
        minWidth: 250,
        '& input': {
          backgroundColor: colorsTheme.background,
        },
      },

      empty: {
        color: colorsTheme.text,
        marginTop: 32,
      },

      edit: {
        cursor: 'pointer',
        transition: 'all 0.2s ease-out',
        '&:hover': {
          opacity: 0.6,
        },
      },

      yearPickerRoot: {
        color: colorsTheme.text,
        fontSize: 12,

        '&:before, &:hover:before, &:focus:before, &:hover:after, &:focus:after': {
          border: '0px none',
          display: 'none',
          visibility: 'hidden',
          outline: 'none',
        },

        '&:before': {
          color: colorsTheme.text,
          fontSize: 12,
        },

        '& .MuiSvgIcon-root': {
          fill: colorsTheme.text,
        },
      },

      popoverPaper: {
        background: colorsTheme.nodeBackground,
        width: 200,

        '& .MuiPickersBasePicker-pickerView': {
          width: '100%',
          minWidth: '100%',
        },

        '& .MuiPickersYearSelection-container': {
          width: '100%',
          minWidth: '100%',
          overflowY: 'visible',
        },

        '& .MuiTypography-subtitle1': {
          color: colorsTheme.text,
        },
      },
    };
  },
  { index: 2, name: 'SubCategories' }
);
