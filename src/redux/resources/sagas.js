import { call, put, takeLatest, delay, select } from 'redux-saga/effects';
import { handleError, handleWarn, createMessage } from 'helpers';
import Resources from '../../services/api/resources.js';
import Metric from '../../services/api/metric.js';
import { changeResources } from './actions';
import Middleware from '../../services/middleware/index.js';
import { virualStore, setVirualStore } from '../../virtualStore';

const getPeriod = (store) => store.handleResourcesInit.params.period;

/**
 * ANCHOR: Выбор ресурса saga
 * @param {object} action
 * @public
 */
function* ResourceSelect(action) {
  const { model } = virualStore;

  try {
    const res = yield call(
      Middleware.GetDumpData,
      model,
      action.payload.params,
      'resourceSelect'
    );

    if (res.completed) {
      yield put({
        type: 'RESOURCES_SUCCEEDED',
        payload: { data: res.data, state: true },
      });
      window.DFM.SetResource(res.data);
    } else {
      yield createMessage(put, delay, res.msg);
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

/**
 * ANCHOR: Изменение фиксированоого тарифа saga
 * @param {object} action
 * @public
 */
function* changeFixedTariffResources() {
  try {
    const { resource, period } = yield select(getPeriod);
    const res = yield call(Metric.changeFixedTariff, resource, period);

    if (res.code === 200) {
      yield put(changeResources({ fixedTariff: res.data.state }));
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

/**
 * ANCHOR: Создание модели saga
 * @param {object} action
 * @public
 */
function* ResourceCreate(action) {
  try {
    const res = yield call(Resources.createResource, action.payload.params);

    if (res.code === 200 || res.code === 201) {
      yield put({ type: 'MODAL_CLOSE' });
      yield put({
        type: 'RESOURCE_CREATE_SUCCEEDED',
        payload: { data: res.data, state: true },
      });

      yield call(ResourceChange, {
        payload: {
          params: {
            model: action.payload.params.model,
            resource: action.payload.params.id,
            reloadData: action.payload.params,
            reload: 'createResource',
          },
        },
      });

      yield createMessage(put, delay, 'Ресурс создан');
    } else {
      yield createMessage(put, delay, 'Ошибка создания ресурса');
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

/**
 * ANCHOR: Удаление модели saga
 * @param {object} action
 * @public
 */
function* ResourceRemove(action) {
  try {
    const res = yield call(Resources.removeResource, action.payload.params);

    if (res.code === 200 || res.code === 201) {
      yield put({ type: 'MODAL_CLOSE' });
      yield put({
        type: 'RESOURCE_REMOVE_SUCCEEDED',
        payload: { data: res.data, state: true },
      });

      const actualState = { ...virualStore.prevSelected };
      yield call(ResourceChange, {
        payload: {
          params: {
            reloadData: actualState,
            model: action.payload.params.model,
            resource: null,
            reload: 'removeResource',
          },
        },
      });

      yield setVirualStore('prevSelected', {
        ...virualStore.prevSelected,
        resource: null,
      });

      yield createMessage(put, delay, 'Ресурс удален');
    } else {
      yield createMessage(put, delay, 'Ошибка удаления ресурса');
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

/**
 * ANCHOR: Копирование ресурса saga
 * @param {object} action
 * @public
 */
function* ResourceCopy(action) {
  try {
    const res = yield call(Resources.copyResource, action.payload.params);

    if (res.code === 200 || res.code === 201) {
      yield put({ type: 'MODAL_CLOSE' });
      yield put({
        type: 'RESOURCE_COPY_SUCCEEDED',
        payload: { data: res.data, state: true },
      });

      yield call(ResourceChange, {
        payload: {
          params: {
            model: action.payload.params.model,
            resource:
              action.payload.params[
                action.payload.params.isNodeChanging ? 'id' : 'resource'
              ],
            reloadData: action.payload.params,
            reload: 'copyResource',
          },
        },
      });

      yield createMessage(put, delay, 'Ресурс скопирован');
    } else {
      yield createMessage(put, delay, 'Ошибка копирования ресурса');
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

/**
 * ANCHOR: Создание линка ресурса saga
 * @param {object} action
 * @public
 */
function* ResourceLink(action) {
  try {
    const res = yield call(Resources.linkResource, action.payload.params);

    if (res.code === 200 || res.code === 201) {
      yield put({ type: 'MODAL_CLOSE' });
      yield put({
        type: 'RESOURCE_LINK_SUCCEEDED',
        payload: { data: res.data, state: true },
      });

      yield call(ResourceChange, {
        payload: {
          params: {
            model: action.payload.params.model,
            resource: action.payload.params.resource,
            reloadData: action.payload.params,
            reload: 'linkResource',
          },
        },
      });

      yield createMessage(put, delay, 'Ресурс залинкован');
    } else {
      yield createMessage(put, delay, 'Ошибка линкования');
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

/**
 * ANCHOR: Лист ресурсов saga
 * @param {object} action
 * @public
 */
function* ResourceList(action) {
  try {
    const res = yield call(
      Middleware.ParseRequestData(Resources.resourceList, 'resourceList'),
      action.payload.params
    );

    if (res.code === 200) {
      yield put({
        type: 'RESOURCE_LIST_SUCCEEDED',
        payload: res.data,
      });
    } else {
      yield createMessage(put, delay, res.msg);
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

/**
 * ANCHOR: Групировка ресурсов saga
 * @param {object} action
 * @public
 */
function* ResourceGroup(action) {
  try {
    const res = yield call(Resources.groupResource, action.payload.params);

    if (res.code === 200 || res.code === 201) {
      yield put({ type: 'MODAL_CLOSE' });
      yield put({
        type: 'RESOURCE_GROUP_SUCCEEDED',
        payload: { data: res.data, state: true },
      });

      yield call(ResourceChange, {
        payload: {
          params: {
            model: action.payload.params.model,
            resource: action.payload.params.resource,
            reloadData: action.payload.params,
            reload: 'groupResource',
          },
        },
      });

      yield createMessage(put, delay, 'Группа отредактирована');
    } else {
      yield createMessage(put, delay, 'Ошибка редактирования группы');
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

/**
 * ANCHOR: Групировка по категориям для ресурсов saga
 * @param {object} action
 * @public
 */
function* ResourceGroupToCategory(action) {
  const { model } = virualStore;
  try {
    const res = yield call(
      Middleware.GetDumpData,
      model,
      action.payload.params,
      'getResourcesToCategory'
    );

    if (res.completed) {
      yield put({
        type: 'RESOURCE_GROUP_CATEGORY_SUCCESED',
        payload: { data: res.data, state: true },
      });
      yield createMessage(put, delay, res.msg);
    } else {
      yield createMessage(put, delay, res.msg);
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

/**
 * ANCHOR: Получение инфы о родитльском узле
 * @param {object} action
 * @public
 */
function* GetParentNodeInfo(action) {
  try {
    const res = yield call(Resources.getParentInfoNode, action.payload.params);

    if (res.code === 200) {
      yield put({
        type: 'FETCH_PARENT_INFO_SUCCESED',
        payload: res.data,
      });
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

/**
 * ANCHOR: Отправка метрики для узла модели
 * @param {object} action
 * @public
 */
function* AddMetricResource(action) {
  try {
    const res = yield call(Metric.MetricSet, action.payload.params);

    if (res.code === 200 || res.code === 201) {
      yield put({
        type: 'ACTION_METRIC_SUCCEEDED',
        payload: res.data,
      });

      yield call(ResourceChange, {
        payload: {
          params: {
            model: action.payload.params.model,
            resource: action.payload.params.resource,
            reloadData: action.payload.params,
            reload: 'metricResource',
          },
        },
      });
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

/**
 * ANCHOR: Удаление метрики для узла модели
 * @param {object} action
 * @public
 */
function* DeleteMetricResource(action) {
  try {
    const res = yield call(Metric.MetricDelete, action.payload.params);

    if (res.code === 200) {
      yield put({
        type: 'ACTION_METRIC_SUCCEEDED',
        payload: res.data,
      });

      yield call(ResourceChange, {
        payload: {
          params: {
            model: action.payload.params.model,
            resource: action.payload.params.resource,
            reloadData: action.payload.params,
            reload: 'metricResource',
          },
        },
      });
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

/**
 * ANCHOR: Смена узла модели
 * @param {object} action
 * @public
 */
function* ResourceChange(action) {
  try {
    yield put({
      type: 'MODEL_SELECT',
      payload: {
        params: {
          model: action.payload.params.model,
          resource: action.payload.params.resource,
          reloadData: action.payload.params.reloadData,
          reload: action.payload.params.reload,
        },
      },
    });
    yield put({
      type: 'MODEL_CHANGE',
      payload: { state: true },
    });
  } catch (e) {
    yield handleWarn(e);
  }
}

/**
 * ANCHOR: Инициализировать саги ресурса
 * @public
 */
function* initResourcesSaga() {
  yield takeLatest('RESOURCES_INIT', ResourceSelect);
  yield takeLatest('CHANGE_FIXED_TARIFF', changeFixedTariffResources);
  yield takeLatest('RESOURCE_CREATE', ResourceCreate);
  yield takeLatest('RESOURCE_REMOVE', ResourceRemove);
  yield takeLatest('RESOURCE_COPY', ResourceCopy);
  yield takeLatest('RESOURCE_LINK', ResourceLink);
  yield takeLatest('RESOURCE_LIST', ResourceList);
  yield takeLatest('RESOURCE_GROUP', ResourceGroup);
  yield takeLatest('RESOURCE_GROUP_CATEGORY', ResourceGroupToCategory);
  yield takeLatest('FETCH_PARENT_INFO_NODE', GetParentNodeInfo);
  yield takeLatest('ADD_METRIC', AddMetricResource);
  yield takeLatest('DELETE_METRIC', DeleteMetricResource);
}

export default initResourcesSaga;
