import { SessionToken } from 'helpers';
/**
 * Ошибка утификации
 * @param  {Object} res
 */
const authError = async (res) => {
  if (res && (res.code === 401 || res.status === 401)) {
    SessionToken.removeItem();
  }
};

export default authError;
