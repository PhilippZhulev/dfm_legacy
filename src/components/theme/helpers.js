const helpers = {
  helper: {
    inline: 'inline-flex',
    transition: (duration) => ({ transition: `all ${duration}ms ease-in-out` }),
    transColor: (color = '#fff', opacity = 1) => ({
      color,
      opacity,
    }),
    isScreenWidth: (media, styles = {}) =>
      window.innerWidth === (media ? styles : {}),
    isScreenHeight: (media, styles = {}) =>
      window.innerHeight === (media ? styles : {}),
    borderBox: { boxSizing: 'border-box' },
  },
};

export default helpers;
