import colors from './colors';

const formControl = {
  triggerMui: {
    '.MuiSwitch-colorPrimary.Mui-checked': { color: colors.colorsTheme.blue },
  },
  TextInputLogin: {
    root: { marginBottom: 40 },
    label: {
      marginBottom: 6,
      color: colors.colorsTheme.label,
      fontSize: 14,
      textAlign: 'left',
    },
    errLabel: { color: 'red' },
    input: {
      width: '100%',
      height: 58,
      background: colors.colorsTheme.input,
      borderRadius: 8,
      color: colors.colorsTheme.label,
      border: 0,
      textAlign: 'left',
      boxSizing: 'border-box',
      padding: '0 15px',
      fontSize: 16,
      transition: 'all 200ms ease-in-out',
      '&:focus': {
        outline: 0,
        borderBottom: `1px solid ${colors.colorsTheme.selected}`,
      },
      '&:-internal-autofill-selected': {
        background: `${colors.colorsTheme.input}`,
      },
    },
    error: {
      animation: '$error',
      animationDuration: 400,
      animationIterationCount: 1,
    },
    '@keyframes error': {
      '0%': { transform: 'translateX(0px)' },
      '25%': { transform: 'translateX(-50px)' },
      '50%': { transform: 'translateX(50px)' },
      '75%': { transform: 'translateX(-50px)' },
      '100%': { transform: 'translateX(0px)' },
    },
  },

  button: {
    root: { marginTop: 50 },
    button: {
      background: 'transparent',
      border: `1px solid ${colors.colorsTheme.control}`,
      boxShadow: `inset 0 0 0 0 ${colors.colorsTheme.control}`,
      borderRadius: 6,
      padding: '12px 10px',
      minWidth: 150,
      whiteSpace: 'nowrap',
      fontSize: 12,
      cursor: 'pointer',
      display: 'block',
      margin: 'auto 0',
      color: colors.colorsTheme.text,
      transition: 'all 200ms ease-in-out',
      '&:focus': { outline: 'none' },
      '&:hover': {
        boxShadow: `inset 0 0 0 100px ${colors.colorsTheme.control}`,
      },
      '&:active': { opacity: 0.8 },
      '&[disabled]': {
        background: colors.colorsTheme.disabled,
        boxShadow: `inset 0 0 0 0 ${colors.colorsTheme.control}`,
        border: `1px solid ${colors.colorsTheme.disabled}`,
      },
    },
    mod_blue: {
      background: 'transparent',
      border: `1px solid ${colors.colorsTheme.selected}`,
      color: colors.colorsTheme.selected,
    },
    button__center: { margin: '0 auto' },
    button__right: { margin: 'auto 0 auto auto' },
    button__left: { margin: 'auto auto auto 0' },
    mod_red: {
      boxShadow: `inset 0 0 0 0 ${colors.colorsTheme.err}`,
      border: `1px solid ${colors.colorsTheme.err}`,
      '&:hover': { boxShadow: `inset 0 0 0 100px ${colors.colorsTheme.err}` },
    },
  },

  textInput: {
    root: { marginBottom: 0 },
    label: {
      marginBottom: 6,
      color: colors.colorsTheme.grey,
      fontSize: 12,
      textAlign: 'left',
    },
    input: {
      width: '100%',
      height: 38,
      background: colors.colorsTheme.input,
      borderRadius: 8,
      color: colors.colorsTheme.inputColor,
      border: 0,
      textAlign: 'left',
      boxSizing: 'border-box',
      padding: '0 15px',
      fontSize: 16,
      transition: 'all 200ms ease-in-out',
      '&:focus': {
        outline: 0,
        borderBottom: `1px solid ${colors.colorsTheme.selected}`,
      },
      '&:-internal-autofill-selected': {
        background: `${colors.colorsTheme.layer}!important`,
      },
    },
  },
};

export default formControl;
