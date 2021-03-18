import colors from './colors';

const borderBox = 'border-box';
const { colorsTheme } = colors;

const normalize = {
  global: {
    '*': {
      'box-sizing': borderBox,
      '-moz-box-sizing': borderBox,
      '-webkit-box-sizing': borderBox,
    },
    html: {
      'line-height': '1.15',
      '-webkit-text-size-adjust': '100%',
    },
    body: {
      margin: '0',
      position: 'inherit!important',
    },
    main: {
      display: 'block',
      overflow: 'hidden',
    },
    h1: {
      'font-size': '2em',
      margin: '0.67em 0',
    },
    '.ScrollbarsCustom-TrackX': { display: 'none' },
    '.ScrollbarsCustom-Wrapper': { bottom: `${0}!important` },
    hr: {
      'box-sizing': 'content-box',
      height: '0',
      overflow: 'visible',
    },
    pre: {
      'font-family': 'monospace, monospace',
      'font-size': '1em',
    },
    a: { 'background-color': 'transparent' },
    'abbr[title]': {
      'border-bottom': 'none',
      'text-decoration': 'underline',
    },
    'b, strong': { 'font-weight': 'bolder' },
    '[hidden]': { display: 'none' },
    "[type='search']::-webkit-search-decoration": {
      '-webkit-appearance': 'none',
    },
    textarea: { overflow: 'auto' },
    "[type='checkbox'], [type='radio']": {
      'box-sizing': 'border-box',
      padding: 0,
    },
    "[type='number']::-webkit-inner-spin-button, [type='number']::-webkit-outer-spin-button": {
      height: 'auto',
    },
    img: { 'border-style': 'none' },
    'button, input, optgroup, select, textarea': {
      'font-family': 'inherit',
      'font-size': '100%',
      'line-height': '1.15',
      margin: '0',
    },
    'button, input': { overflow: 'visible' },
    'button, select': { 'text-transform': 'none' },
    "button, [type='button'], [type='reset'], [type='submit']": {
      '-webkit-appearance': 'button',
    },
    "button::-moz-focus-inner, [type='button']::-moz-focus-inner, [type='reset']::-moz-focus-inner, [type='submit']::-moz-focus-inner": {
      'border-style': 'none',
      padding: '0',
    },
    "button:-moz-focusring, [type='button']:-moz-focusring, [type='reset']:-moz-focusring, [type='submit']:-moz-focusring": {
      outline: '1px dotted ButtonText',
    },

    '.MuiCheckbox-root': { color: colorsTheme.grey },

    'empty-text': {
      fontSize: 16,
      color: colorsTheme.grey,
    },
  },
};

export default normalize;
