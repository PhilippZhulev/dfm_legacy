import { handleError } from 'helpers';

export default function* createMessage(put, delay, msg) {
  try {
    yield put({
      type: 'MESSAGE',
      payload: {
        text: msg,
        state: true,
      },
    });
    yield delay(3000);
    yield put({
      type: 'MESSAGE',
      payload: {
        text: '',
        state: false,
      },
    });
  } catch (e) {
    handleError(e);
  }
}
