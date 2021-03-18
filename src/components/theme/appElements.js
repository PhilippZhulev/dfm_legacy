import colors from './colors';

const appElements = {
  background: {
    root: {
      background: colors.colorsTheme.bgGradient,
      left: 0,
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      overflow: 'hidden',
    },
    inner: {
      zIndex: 2,
      height: 'calc(100% - 0px)',
      position: 'relative',
    },
  },

  modal: {
    modalRoot: { backgroundColor: 'transparent' },
    root: {
      '& > div:first-child': {
        backgroundColor: colors.colorsTheme.menuBackground,
      },
    },
    paper: {
      borderRadius: 10,
      padding: 20,
      background: colors.colorsTheme.background,
    },
    content: { padding: '10px 25px' },
    title: {
      '& > h2': {
        color: colors.colorsTheme.text,
        fontSize: 16,
        fontWeight: 400,
        lineHeight: '22px',
      },
    },
    text: {
      color: colors.colorsTheme.textGrey,
      fontSize: 16,
      marginTop: 0,
      marginBottom: 0,
      fontWeight: 300,
      lineHeight: '19px',
      '& > p': {
        color: colors.colorsTheme.textGrey,
        fontSize: 16,
        marginTop: 15,
        fontWeight: 300,
        lineHeight: '19px',
      },
    },
    modalBtn: {
      width: 86,
      height: 36,
      borderRadius: '50px',
      background: colors.colorsTheme.control,
      color: colors.colorsTheme.layer,
      border: 0,
      marginRight: 15,
      marginBottom: 10,
      fontSize: 14,
      transition: 'all 300ms ease-in-out',
      fontWeight: 400,
      '&:hover': { background: colors.colorsTheme.control },
    },
    buttons: {
      padding: 15,
      display: 'flex',
      width: '100%',
      '& > *': { marginRight: 15 },
      '& > *:last-child': { marginRight: 0 },
    },
    closeIcon: {
      position: 'absolute',
      top: 12,
      right: 12,
      cursor: 'pointer',
      transition: 'color .2s ease-in-out',
      color: colors.colorsTheme.grey,
      background: 'unset',
      zIndex: 999,

      '&:hover': {
        color: colors.colorsTheme.nodeColor,
      },
    },
    noMaxWidth: {
      width: '100%',
      maxWidth: 'unset',
    },
  },

  avatar: {
    root: {
      margin: 12,
      width: 44,
      height: 44,
    },
    preview: {
      display: 'flex',
      borderRadius: 50,
      cursor: 'pointer',
      background: colors.colorsTheme.grey,
      color: colors.colorsTheme.text,
      overflow: 'hidden',
      lineHeight: '43px',
      alignContent: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      width: '100%',
      height: '100%',
      transform: 'scale(1)',
      transition: 'all 200ms ease-in-out',
      '& img': {
        display: 'block',
        width: '100%',
        margin: 'auto',
      },
    },
  },

  searchFieldGraph: {
    root: {
      position: 'relative',
      boxSizing: 'border-box',
      display: 'flex',
    },
    input: {
      width: '100%',
      height: 34,
      border: `1px solid ${colors.colorsTheme.menuBackground}`,
      borderRadius: 50,
      fontSize: 14,
      color: colors.colorsTheme.text,
      padding: '0 15px',
      paddingRight: '32px',
      background: colors.colorsTheme.menuBackground,
      '&:focus': {
        outline: 'none',
        height: 34,
        border: `1px solid ${colors.colorsTheme.text}`,
      },
      '&::-webkit-input-placeholder': { color: colors.colorsTheme.grey },
      '&::-moz-placeholder': { color: colors.colorsTheme.grey },
      '&:-ms-input-placeholder': { color: colors.colorsTheme.grey },
      '&:-moz-placeholder': { color: colors.colorsTheme.grey },
    },
    icon: {
      position: 'absolute',
      width: 16,
      height: 16,
      right: 12,
      top: 10,
    },
  },
};

export default appElements;
