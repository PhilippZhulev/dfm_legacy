/**
 * Проверка разрешенных полномочий
 * @param {object} permissions
 * @param {array} actions
 * @return {boolean}
 * @public
 */
const permitRule = (permissions, actions = []) =>
  permissions &&
  actions.length &&
  actions.every((action) => permissions[action]);

export default permitRule;
