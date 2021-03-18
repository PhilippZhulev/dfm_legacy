/**
 * Создание ошибок
 * @param  {string} funcName
 * @param  {object} e
 */
const handleError = async (funcName, e) => {
  document.dispatchEvent(
    new CustomEvent('app.error', {
      detail: {
        func: funcName,
        message: e.stack,
        text: e.message || e.response.data.msg,
      },
    })
  );
};

export default handleError;
