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
        width: 'calc(100% - 8px)',
        tableLayout: 'fixed',
        padding: 8,
        marginBottom: 16,
        lineHeight: '16px',

        '& tbody': {
          color: '#657D95',
        },

        '& th': {
          top: -1,
          left: -1,
          color: 'inherit !important',
        },

        '& th, & td': {
          '&:nth-child(1)': {
            width: 150,
            textAlign: 'center',
            color: colorsTheme.text,
          },
          '&:nth-child(2)': {
            width: 125,
          },
          '&:nth-child(3)': {
            width: 175,
          },
          '&:nth-child(4)': {
            width: 200,
          },
          '&:nth-child(5)': {
            width: 125,
            textAlign: 'center',
            '& .MuiCheckbox-colorPrimary.Mui-disabled': {
              color: '#418FF3',
            },
          },
          '&:nth-child(6)': {
            width: 200,
            wordWrap: 'break-word',
          },
          '&:nth-child(7)': {
            width: 200,
            wordWrap: 'break-word',
          },
        },
      },

      active: {
        backgroundColor: colorsTheme.background,
        // color: colorsTheme.text,
        '& $textArea': {
          color: colorsTheme.text,
        },
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
          // backgroundColor: colorsTheme.background,
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
    };
  },
  { index: 2, name: 'NodeParameters' }
);
