const handleWarn = async (e) => {
  document.dispatchEvent(
    new CustomEvent('app.warn', {
      detail: { message: e?.response?.data.msg || e.message },
    })
  );
};

export default handleWarn;
