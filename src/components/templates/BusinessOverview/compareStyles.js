import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      background: '#1F283C',
      borderRadius: 8,
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
      height: 440,
    },
    inner: {
      background: `url("/${process.env.REACT_APP_PREFIX_URL}textures/b_overview.png") top right no-repeat`,
      position: 'absolute',
      mixBlendMode: 'color-dodge',
      width: '100%',
      height: '100%',
      top: 0,
      zIndex: 1,
    },
    innerPadding: {
      padding: '50px 45px',
      height: '100%',
      width: '100%',
      position: 'absolute',
      zIndex: 2,
    },
    compareTitle: {
      fontSize: 14,
      color: '#FFF',
      lineHeight: '32px',
      display: 'flex',
      marginBottom: 30,
    },
    compareTitleIcon: {
      marginTop: 5,
      marginRight: 22,
    },
    compareTileInner: {
      position: 'relative',
      zIndex: 2,
    },
    compareTileHover: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1,
      overflow: 'hidden',
      height: '100%',
      boxShadow: '0px 20px 36px rgba(87, 148, 222, 0.36)',
      borderRadius: 12,
      '&.tariff': {
        background: '#5794DE',
      },
      '&.volume': {
        background: '#4E8E96',
      },
    },
    compareTileHoverImg: {
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
    compareTiles: {
      display: 'flex',
      margin: -7,
    },
    compareTile: {
      background: 'rgba(87, 148, 222, 0.12)',
      borderRadius: 12,
      width: '20%',
      position: 'relative',
      height: 272,
      margin: 7,
      padding: '50px 40px',
      '&:nth-child(2)': {
        background: 'rgba(78, 142, 150, 0.2)',
      },
      '& $compareTileHover': {
        opacity: 0,
        transition: 'opacity 300ms ease-in-out',
      },
      '&:hover $compareTileHover': {
        opacity: 1,
      },
      '&:hover $compareTileValueDiff $red': {
        color: '#fff',
        '&:before': {
          content: '""',
          borderBottom: '5px solid #fff',
        },
      },
      '&:hover $compareTileValueDiff $green': {
        color: '#fff',
        '&:before': {
          content: '""',
          borderTop: '5px solid #fff',
        },
      },
    },
    compareTileLarge: {
      background: 'rgba(107, 117, 202, 0.2)',
      borderRadius: 12,
      width: '60%',
      height: 272,
      margin: 7,
      padding: '50px 40px',
    },
    compareTileTitle: {
      color: 'rgba(255, 255, 255, 0.48)',
      fontSize: 16,
      lineHeight: '19px',
      marginBottom: 20,
    },
    compareTileValue: {
      display: 'flex',
    },
    compareTileValueMain: {
      color: '#fff',
      fontSize: 24,
      lineHeight: '26px',
      fontWeight: 500,
      '& > div span:not(:first-child)': {
        fontSize: 14,
        lineHeight: '16px',
      },
      '& > div span:last-child': {
        display: 'block',
      },
    },
    compareTileValueMainSmall: {
      color: '#fff',
      fontSize: 14,
      lineHeight: '26px',
      fontWeight: 500,
      '& > div span:last-child': {
        fontSize: 12,
      },
    },
    compareTileValueDiff: {
      fontSize: 14,
      marginLeft: 24,
      lineHeight: '24px',
    },
    red: {
      color: '#EF5350',
      transition: 'color 300ms ease-in-out',
      '&:before': {
        content: '""',
        marginTop: 5,
        border: '5px solid transparent',
        transition: 'all 300ms ease-in-out',
        borderBottom: '5px solid #EF5350',
        marginLeft: -15,
        position: 'absolute',
      },
    },
    green: {
      color: '#05C985',
      transition: 'color 300ms ease-in-out',
      '&:before': {
        content: '""',
        marginTop: 10,
        border: '5px solid transparent',
        transition: 'all 300ms ease-in-out',
        borderTop: '5px solid #05C985',
        marginLeft: -15,
        position: 'absolute',
      },
    },
    compareTilePrevPeriod: {
      color: 'rgba(255, 255, 255, 0.48)',
      fontSize: 12,
      lineHeight: '16px',
      display: 'flex',
      '&:not(.small)': {
        position: 'absolute',
        bottom: 36,
        zIndex: 10,
      },
      '& span': {
        fontSize: 14,
        lineHeight: '26px',
        '&:not(:first-child)': {
          fontSize: 12,
        },
      },
      '&.small': {
        marginTop: 18,
      },
      '&.small span': {
        fontSize: 14,
        '&:not(:first-child)': {
          fontSize: 12,
        },
      },
      '& > div:last-child': {
        fontSize: 12,
      },
    },
    compareValuesWrapper: {
      display: 'flex',
      marginTop: 9,
    },
    compareValuesWrapperItem: {
      width: '33.33%',
    },
    compareValuesWrapperFlex: {
      display: 'flex',
    },
    compareValuesWrapperTitle: {
      color: '#657D95',
      fontSize: 12,
      lineHeight: '15px',
      display: 'flex',
    },
    compareValuesIcon: {
      marginRight: 8,
    },
    circle: {
      width: 64,
      height: 64,
      background: '#20283c',
      borderRadius: '50%',
      position: 'absolute',
      right: -40,
      margin: 'auto',
      top: 0,
      bottom: 0,
      zIndex: 4,
      fontWeight: 600,
      color: '#657D95',
      textAlign: 'center',
      fontSize: 30,
      lineHeight: '64px',
    },
    categoryIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 33,
      width: 33,
      borderRadius: 4,
      transition: 'all .2s ease-in-out',
      marginRight: 16,
    },
    '@media (max-width: 1600px)': {
      compareTileValueMain: {
        '& > div span': {
          display: 'inline',
          '&:first-child': {
            display: 'block',
          },
          '&:last-child': {
            display: 'inline',
          },
        },
      },
      compareTileValue: {
        display: 'block',
        '& $compareTileValueDiff': {
          marginLeft: 20,
        },
      },
      compareTile: {
        height: 382, // 296,
      },
      compareTileLarge: {
        height: 382, // 296,
      },
      compareValuesWrapperFlex: {
        display: 'block',
      },
      compareTileTitle: {
        '& span:last-child': {
          display: 'block',
        },
      },
      compareTilePrevPeriod: {
        bottom: '50px!important',
        '& > div > span:first-child': {
          display: 'block',
        },
      },
      root: {
        height: 544,
      },
    },
  }),
  {
    name: 'Compare',
    index: 1,
  }
);

export { useStyles };
