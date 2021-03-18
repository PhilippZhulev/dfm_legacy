import themes from './index';

export default function () {
  const theme = {};

  Object.keys(themes).forEach((key) => {
    Object.assign(theme, themes[key]);
  });

  return theme;
}
