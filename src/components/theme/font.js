const fonts = {
  OpenSans: {
    '@font-face': [
      {
        'font-family': 'Open Sans',
        src: `local('Open Sans'), local('OpenSans'), url('/${process.env.REACT_APP_PREFIX_URL}fonts/OpenSansRegular.woff') format('woff'), url('/${process.env.REACT_APP_PREFIX_URL}fonts/OpenSansRegular.ttf') format('truetype')`,
        'font-weight': '400',
        'font-style': 'normal',
      },
      {
        'font-family': 'Open Sans',
        src: `local('Open Sans Italic'), local('OpenSans-Italic'),  url('/${process.env.REACT_APP_PREFIX_URL}fonts/OpenSansItalic.woff') format('woff'), url('/${process.env.REACT_APP_PREFIX_URL}fonts/OpenSansItalic.ttf') format('truetype')`,
        'font-weight': '400',
        'font-style': 'italic',
      },
      {
        'font-family': 'Open Sans',
        src: `local('Open Sans Bold'), local('OpenSans-Bold'), url('/${process.env.REACT_APP_PREFIX_URL}fonts/OpenSansBold.woff') format('woff'), url('/${process.env.REACT_APP_PREFIX_URL}fonts/OpenSansBold.ttf') format('truetype')`,
        'font-weight': '700',
        'font-style': 'normal',
      },
      {
        'font-family': 'Open Sans',
        src: `local('Open Sans Bold Italic'), local('OpenSans-BoldItalic'),  url('/${process.env.REACT_APP_PREFIX_URL}fonts/OpenSansBoldItalic.woff') format('woff'), url('/${process.env.REACT_APP_PREFIX_URL}fonts/OpenSansBoldItalic.ttf') format('truetype')`,
        'font-weight': '500',
        'font-style': 'italic',
      },
      {
        'font-family': 'Open Sans',
        src: `local('Open Sans Light'), local('OpenSans-Light'),  url('/${process.env.REACT_APP_PREFIX_URL}fonts/OpenSansLight.woff') format('woff'), url('/${process.env.REACT_APP_PREFIX_URL}fonts/OpenSansLight.ttf') format('truetype')`,
        'font-weight': '300',
        'font-style': 'normal',
      },
    ],
  },
  initOpenSans: {
    body: {
      'font-family': '"Open Sans", serif',
      'font-weight': '400',
      margin: '0',
      position: 'inherit!important',
    },
  },
};

export default fonts;
