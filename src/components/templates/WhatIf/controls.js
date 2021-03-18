const handleCreate = (dispatch, done) => {
  dispatch({
    type: 'createWhatIfCurrent',
    state: true,
    title: 'Создать модель What-if',
    buttonText: 'Создать',
    titleSize: 220,
    text: '',
    done: (e, close) => {
      done(e);
      close();
    },
  });
};

const handleCreateCommon = (dispatch, done) => {
  dispatch({
    type: 'createWhatIf',
    state: true,
    title: 'Создать модель What-if',
    buttonText: 'Создать',
    titleSize: 220,
    text: '',
    done: (e, close) => {
      done(e);
      close();
    },
  });
};

const handleExit = (dispatch, done) => {
  dispatch({
    type: 'exitWithoutSave',
    state: true,
    title: 'Покинуть модель',
    buttonText: 'Подтвердить',
    titleSize: 220,
    text: '',
    done: (e, close) => {
      done();
      close();
    },
  });
};

export { handleCreate, handleCreateCommon, handleExit };
