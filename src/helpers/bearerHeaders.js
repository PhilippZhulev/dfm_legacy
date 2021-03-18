
import { SessionToken } from './index';

/**
 * Шаблон заголовка
 * Проверка судир
 */
const bearerHeaders = () => {
  const headers = {
    Accept: 'application/json',
    // Тип контента
    'Content-Type': 'application/json',
  };

  // Проверка авторизации
  if (!SessionToken.isEmpty()) {
    headers.Authorization = `Bearer ${SessionToken.getItem()}`;
  }

  return headers;
};

export default bearerHeaders;
