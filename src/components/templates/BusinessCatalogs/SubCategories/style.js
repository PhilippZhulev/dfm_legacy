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
            width: 150,
            textAlign: 'center',
            color: colorsTheme.text,
          },
        },
      },

      active: {
        backgroundColor: colorsTheme.background,
        color: colorsTheme.text,
      },

      delete: {
        backgroundColor: colorsTheme.checkedRow,
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
    };
  },
  { index: 2, name: 'SubCategories' }
);
