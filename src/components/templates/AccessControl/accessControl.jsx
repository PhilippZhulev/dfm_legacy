/**
 * Проверка роли авторизованного пользователя
 * @param roles
 * @param role
 * @returns {boolean}
 */
const checkUserRole = (roles, role = '') => {
  if (!roles?.length) {
    return false;
  }
  return !(role && !roles.find(({ value }) => value === role));
};

/**
 * Проверка разрешенных полномочий для авторизованного пользователя
 * @param authorities
 * @param object
 * @param item
 * @param action
 * @returns {boolean}
 */
const checkUserPermissions = (authorities, object, item = '', action = '') => {
  let permissions = authorities?.filter(({ target }) => target === object);
  if (permissions) {
    if (item) {
      permissions = permissions.filter(({ code }) =>
        [item, 'all'].includes(code)
      );
    }
    if (action) {
      permissions = permissions.filter(
        (permit) =>
          (action === 'all' &&
            ['read', 'create', 'update', 'delete'].every(
              (elem) => permit[elem]
            )) ||
          !!permit[action]
      );
    }
    return !!permissions.length;
  }

  return false;
};

/**
 * Компонент принимает правила и решает, могут ли пользователи выполнять желаемое действие или видеть некоторую часть пользовательского интерфейса.
 * @param props
 ** props.roles Список ролей
 ** props.permissions Список полномочий
 ** props.role Проверяемая роль
 ** props.on Проверяемая тип объекта
 ** props.an Проверяемый идентификатор объекта
 ** props.do Проверяемое действие полномочия
 * @returns {null|*}
 * @constructor
 */
export const AccessControl = (props) => {
  if (
    checkUserRole(props.roles, props.role) &&
    checkUserPermissions(props.permissions, props.on, props.an, props.do)
  ) {
    return props.children;
  }
  return null;
};
