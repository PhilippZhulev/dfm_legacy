const baseConfig = require('../../webpack.config');
const path = require('path');

const iconsPath = path.join(__dirname, '../../public/icons');

module.exports = (wpConfig) => {
  const storybookBaseConfig = wpConfig.config;

  storybookBaseConfig.module.rules.map((rule) => {
    if (rule.test.toString().includes('svg')) {
      if (rule.exclude === undefined) {
        rule.exclude = [];
      }
      rule.exclude.push(iconsPath);
    }
    return rule;
  });

  storybookBaseConfig.resolve.alias.Icons = iconsPath

  return {
    ...storybookBaseConfig,
    resolve: { ...storybookBaseConfig.resolve, modules: baseConfig.resolve.modules },
    module: { ...storybookBaseConfig.module, rules: storybookBaseConfig.module.rules.concat(baseConfig.module.rules.slice(1)) },
  }
};
