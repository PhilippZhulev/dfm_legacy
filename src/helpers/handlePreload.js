
/**
 * Создание ошибок
 * @param  {object} state
 */
const handlePreload = (state) => {
  document.dispatchEvent(
    new CustomEvent('app.preload.state', {
      detail: state,
    })
  );
};

export default handlePreload;
