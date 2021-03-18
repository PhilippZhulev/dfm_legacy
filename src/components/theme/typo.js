import colors from './colors';

const typo = {
  typography: {
    titles: {
      title: { color: colors.colorsTheme.text },
      h1: {
        fontSize: 52,
        fontWeight: '200',
      },
      h2: {
        fontSize: 20,
        fontWeight: '400',
      },
      h3: {
        fontSize: 32,
        fontWeight: '500',
      },
      h4: {
        fontSize: 26,
        fontWeight: '400',
      },
      h5: {
        fontSize: 20,
        fontWeight: '400',
      },
      h6: {
        fontSize: 18,
        fontWeight: '400',
      },
      subtitle: {
        fontSize: 16,
        fontWeight: '400',
        height: 36,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': 2,
      },
    },
  },
};

export default typo;
