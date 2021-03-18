/* eslint-disable */
import { call, put, takeLatest, delay, all, select } from 'redux-saga/effects';
import { createMessage, handlePreload, handleWarn } from 'helpers';
import color from 'color';
import Model from '../../services/api/model';
import Guide from '../../services/api/guide';
import Middleware from '../../services/middleware/index.js';
import { reloader } from '../../services/middleware/reloader.js';
import store from '../store';
import { virualStore, setVirualStore } from '../../virtualStore';
import { COLOR_ITEMS } from '../../components/templates/ReferenceBook/categories';
import { getCurrentResource, getUserPermissions } from './selectors';

let saveDump;

const colorFix = (res) => {
  /** Костыль фикс цвета  */
  res.data.query.categories = res.data.query.categories.map((cat) => ({
    ...cat,
    color:
      cat.color.toLowerCase() !== 'white'
        ? color(cat.color).hex()
        : COLOR_ITEMS[0],
  }));

  /** Костыль фикс цвета  */
  res.data.dump.resCategories = res.data.dump.resCategories.map((cat) => ({
    ...cat,
    color:
      cat.color.toLowerCase() !== 'white'
        ? color(cat.color).hex()
        : COLOR_ITEMS[0],
  }));
};

/**
 * Получить список моделей и блоков
 * @param  {object} action
 * @public
 */
function* ModelFetch(action) {
  /** Разблокировка модели, которая в последний раз открывалась */
  if (action.payload.params?.model) {
    yield all([
      /** Запрос разблокировки модели */
      call(ModelLocked, {
        payload: {
          params: {
            ...action.payload.params.model,
            state: false,
            hideMessage: true,
          },
        },
      }),

      /** Запрос очистки кэша */
      call(ModelClearCache, {
        payload: {
          params: {},
        },
      }),
    ]);

    localStorage.removeItem('model');
  }

  try {
    const permissions = yield select(getUserPermissions);
    const [models, blocks, stages] = yield all([
      /** Запрос моделей (Модифицирован парсеров) */
      call(Middleware.ParseRequestData(Model.GetModelList, 'modelList'), {
        ...action.payload.params,
        url: 'models',
        permissions,
      }),

      /** Запрос блоков */
      call(Model.GetModelList, {
        ...action.payload.params,
        url: 'blocks',
      }),

      /** Запрос stages */
      call(Model.GetModelList, {
        ...action.payload.params,
        url: 'models/stages',
      }),
    ]);

    if (models.code === 200 && blocks.code === 200) {
      yield put({
        type: 'MODEl_SUCCEEDED',
        payload: {
          models: models.data,
          blocks: blocks.data,
          // stages: stages.data,
          state: true,
        },
      });
      yield put({
        type: 'RESOURCES_SUCCEEDED',
        payload: {
          data: {
            inidicator: { label: 'n/a', color: '#fff' },
            formatValue: { full: '0', left: '0', direct: '0' },
          },
          state: false,
        },
      });
    } else {
      yield createMessage(put, delay, models.msg);
    }
  } catch (e) {
    yield put({
      type: 'MODEl_ERROR',
      payload: { models: [], blocks: null, stages: null, state: true },
    });
    yield handleWarn(e);
  }

  handlePreload(null);
}

/**
 * Копировать модель
 * @param  {object} action
 * @public
 */
function* ModelCopy(action) {
  try {
    const res = yield call(Model.CopyModel, action.payload.params);

    if (res.code === 200) {
      yield put({ type: 'MODAL_CLOSE' });
      yield createMessage(put, delay, 'Модель скопирована');
      if (action.payload.params.tariff) {
        yield put({ type: 'MODEL_TARIFF', payload: action.payload });
      } else {
        yield put({ type: 'MODEL_INIT', payload: {} });
      }
    } else {
      yield createMessage(put, delay, 'Ошибка копирования модели');
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

/**
 * Удалить модель
 * @param  {object} action
 * @public
 */
function* ModelDelete(action) {
  try {
    const res = yield call(Model.DeleteModel, action.payload.params);

    if (res.code === 200) {
      yield put({ type: 'MODAL_CLOSE' });
      yield put({ type: 'MODEL_INIT', payload: {} });
      if (action.payload.model) {
        yield put({
          type: 'MODEL_GET_WHATIF',
          payload: { params: { id: action.payload.model }, },
        });
      }
      yield createMessage(put, delay, 'Модель удалена');
    } else {
      yield createMessage(put, delay, 'Ошибка удаления модели');
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

/**
 * Создать модель
 * @param  {object} action
 * @public
 */
function* ModelCreate(action) {
  try {
    const res = yield call(Model.CreateModel, action.payload.params);

    if (res.code >= 200 && res.code <= 201) {
      yield put({ type: 'MODAL_CLOSE' });
      yield createMessage(put, delay, 'Модель создана');

      if (action.payload.params.tariff) {
        yield put({ type: 'MODEL_TARIFF', payload: action.payload });
      } else {
        yield put({ type: 'MODEL_INIT', payload: {} });
      }
    } else {
      yield createMessage(put, delay, 'Ошибка создания модели');
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

/**
 * Создать WhatIf модель
 * @param  {object} action
 * @public
 */
function* ModelWhatIfCreate(action) {
  try {
    const res = yield call(Model.CreateWhatIfModel, action.payload.params);

    if (res.code >= 200 && res.code <= 201) {
      yield put({ type: 'MODAL_CLOSE' });
      yield createMessage(put, delay, 'Модель What-if создана');

      const isInsideModel = store.getState()?.handleModelEdit?.route?.location?.pathname === '/dfm_it';

      if(isInsideModel) {
        yield put({
          type: 'MODEL_GET_WHATIF',
          payload: { params: { id: action.payload.params.data.parentModelValue }, },
        });
      } else {
        yield put({ type: 'MODEL_INIT', payload: {} });
      }
    } else {
      yield createMessage(put, delay, 'Ошибка создания What-if модели');
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

/**
 * Открыть модель
 * @param  {object} action
 * @public
 */
function* ModelSelect(action) {
  yield handlePreload({ message: 'Загрузка модели...' });

  try {
    const permissions = yield select(getUserPermissions);
    const res = yield call(
      Middleware.ParseRequestData(Model.SelectModel, 'modelSelect'),
      {
        ...action.payload.params,
        permissions,
      }
    );

    colorFix(res);

    if (res.code === 200 && res.data !== null) {
      const data = res.data.query;

      localStorage.setItem(
        'model',
        JSON.stringify({ name: data.model.label, id: data.model.id })
      );

      yield put({
        type: 'MODEL_SELECT_SUCCESS',
        payload: { data, state: true },
      });

      if (action.payload.route) {
        yield action.payload.route.push('/dfm_it');
      }

      yield put({
        type: 'MODEL_GET_WHATIF',
        payload: { params: { id: data.parentValue || data.model.id }, },
      });

      yield reloader(action, res);

      const dangers = yield call(
        Middleware.GetDumpData,
        res.data.dump,
        action.payload.params,
        'modelDangers'
      );
      if (dangers.completed) {
        yield put({
          type: 'MODEL_DANGERS',
          payload: { data: dangers.data },
        });
      }

      yield put({
        type: 'MODEL_SERVICES_INIT',
        payload: {
          params: {
            period: data.selectPeriod.value,
            resource: data.selectResource.value,
          },
        },
      });
    } else {
      yield createMessage(put, delay, res.msg);
    }
  } catch (e) {
    yield handleWarn(e);
  }

  yield handlePreload(null);
}

function* ModelFavorite(action) {
  try {
    const res = yield call(Model.ModelFavorite, action.payload.params);

    if (res.code === 200) {
      yield put({ type: 'MODEL_INIT', payload: {} });
    } else {
      yield createMessage(put, delay, res.msg);
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

function* ModelTariff(action) {
  try {
    const res = yield call(Model.ModelSwitchIsTariff, action.payload.params);

    if (res.code === 200) {
      yield createMessage(
        put,
        delay,
        `Модель ${action.payload.params.name} ${res.data ? '' : 'не '}тарифная`
      );
    } else {
      yield createMessage(put, delay, res.msg);
    }
  } catch (e) {
    yield handleWarn(e);
  }
  yield put({ type: 'MODEL_INIT', payload: {} });
}

function* ModelServices(action) {
  try {
    const { model } = virualStore;

    const [res, graph] = yield all([
      call(
        Middleware.GetDumpData,
        model,
        action.payload.params,
        'resourceSelect'
      ),
      call(
        Middleware.GetDumpData,
        model,
        action.payload.params,
        'graphCompile'
      ),
    ]);

    if (res.completed && graph.completed) {
      yield put({
        type: 'RESOURCES_SUCCEEDED',
        payload: { data: res.data, state: true },
      });
      window.DFM.SetResource(res.data);

      yield put({
        type: 'GRAPH_SUCCESS',
        payload: Object.assign({}, !action.payload.updateGraph
          ? { data: graph.data, state: true }
          : { data: graph.data, updater: Math.random(),  state: true },
          { inidicator: res.data.inidicator }),
      });
    } else {
      yield createMessage(put, delay, res.msg);
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

/**
 * Блокировать модель
 * @param  {object} action
 * @public
 */
function* ModelLocked(action) {
  try {
    const res = yield call(Model.ModelLocked, action.payload.params);

    if (res.code === 200) {
      yield put({
        type: 'MODEL_LOCKED_SUCCESS',
        payload: { state: action.payload.params.state },
      });

      if (!action.payload.params.hideMessage) {
        if (action.payload.params.state) {
          yield createMessage(put, delay, 'Модель в режиме редактирования.');
        } else {
          yield createMessage(put, delay, 'Модель в режиме просмотра.');
        }
      }
    } else {
      yield createMessage(put, delay, res.msg);
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

/**
 * Получить список моделей
 * @param  {object} action
 * @public
 */
function* ModelList(action) {
  try {
    const res = store.getState().handleModelSuccess;

    let data = [];

    yield res.models.map(
      (item) =>
        (data = data.concat(
          item.models.map(({ value, label }) => ({ value, label }))
        ))
    );
    if (res) {
      yield put({ type: 'MODEL_LIST_SUCCESS', payload: { models: data } });
    } else {
      yield createMessage(put, delay, res.msg);
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

function* ModelStatus(action) {
  try {
    const res = yield call(Model.ModelStatus, action.payload.params);

    if (res.code === 200 || res.code === 201) {
      if (
        res.data.locked &&
        res.data.userAccount !== action.payload.userData.login
      ) {
        yield createMessage(
          put,
          delay,
          `Модель заблокирована пользователем: ${res.data.userAccount}`
        );
      } else {
        yield put({ type: 'MODEL_LOCKED', payload: action.payload });
      }
    } else {
      yield createMessage(put, delay, res.msg);
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

function* ModelSave(action) {
  try {
    const permissions = yield select(getUserPermissions);
    const statusCount = 0;
    const res = yield call(
      Middleware.saveStatus(Model.ModelResourceSave, {
        progress: statusCount,
        params: {
          message: 'Сохранение ресурсов...',
          state: true,
        },
        err: 'Ошибка сохранение ресурсов.',
      }),
      action.payload.params
    );

    if (res.code === 201 || res.code === 200) {
      const recalc = yield call(
        Middleware.saveStatus(
          Middleware.ParseRequestData(Model.ModelRecalc, 'modelSelect'),
          {
            progress: statusCount,
            params: {
              message: 'Пересчет модели...',
              state: true,
            },
            err: 'Ошибка пересчета модели.',
          }
        ),
        {
          ...action.payload.params,
          reloadData: virualStore.selected,
          permissions,
        }
      );
      const dangers = yield call(
        Middleware.GetDumpData,
        recalc.data.dump,
        action.payload.params,
        'modelDangers'
      );
      if (dangers.completed) {
        yield put({
          type: 'MODEL_DANGERS',
          payload: { data: dangers.data },
        });
      }

      if (recalc.code === 201 || recalc.code === 200) {
        const save = yield call(
          Middleware.saveStatus(Model.ModelSave, {
            progress: statusCount,
            params: {
              message: 'Сохранение модели...',
              state: true,
            },
            err: 'Ошибка сохранение модели.',
          }),
          action.payload.params
        );

        /** Костыль фикс цвета  */
        recalc.data.query.categories = recalc.data.query.categories.map(
          (cat) => ({
            ...cat,
            color:
              cat.color.toLowerCase() !== 'white'
                ? color(cat.color).hex()
                : COLOR_ITEMS[0],
          })
        );

        /** Костыль фикс цвета  */
        recalc.data.dump.resCategories = recalc.data.dump.resCategories.map(
          (cat) => ({
            ...cat,
            color:
              cat.color.toLowerCase() !== 'white'
                ? color(cat.color).hex()
                : COLOR_ITEMS[0],
          })
        );

        if (save.code === 201 || save.code === 200) {
          saveDump = {
            data: recalc.data.query,
            dump: recalc.data.dump,
          };

          yield put({
            type: 'MODEL_CHANGE',
            payload: { state: false },
          });

          yield createMessage(put, delay, 'Модель сохранена.');
        }
      }
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

function* SaveGuide(action) {
  try {
    //yield call(Guide.save, action.payload.params);
    //yield createMessage(put, delay, 'Справочник сохранен.');
    const permissions = yield select(getUserPermissions);
    const resource = yield select(getCurrentResource);

    const recalc = yield call(Model.ModelRecalc, action.payload.params);
    if (recalc.code === 201 || recalc.code === 200) {
      const save = yield call(
        Middleware.ParseRequestData(Model.ModelSave, 'modelSelect'),
        {
          ...action.payload.params,
          reloadData: { resource },
          permissions,
        }
      );
      if (save.code === 201 || save.code === 200) {
        saveDump = {
          data: save.data.query,
          dump: save.data.dump,
        };

        colorFix(save);

        const data = save.data.query;

        yield put({
          type: 'MODEL_SELECT_SUCCESS',
          payload: { data, state: true },
        });

        yield reloader(action, save);

        yield put({
          type: 'MODEL_SERVICES_INIT',
          payload: {
            params: {
              period: data.selectPeriod.value,
              resource: data.selectResource.value,
            },
          },
        });
      }
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

function* ModelRecalc() {
  try {
    yield put({
      type: 'MODEL_SELECT_SUCCESS',
      payload: { data: saveDump.data, state: true },
    });

    yield setVirualStore(
      'model',
      Middleware.CheckModResources(virualStore.model, saveDump.dump)
    );

    yield put({
      type: 'MODEL_SERVICES_INIT',
      payload: {
        updateGraph: true,
        params: {
          period: saveDump.data.selectPeriod.value,
          resource: saveDump.data.selectResource.value,
        },
      },
    });
  } catch (e) {
    yield handleWarn(e);
  }
}

function* ModelClearCache(action) {
  try {
    const res = yield call(Model.ModelClearCache, action.payload.params);

    if (res.code !== 200) {
      yield createMessage(put, delay, res.msg);
    }
    yield put({ type: 'MODEL_DANGERS', payload: { data: '' } });
  } catch (e) {
    yield handleWarn(e);
  }
}

function* ModelGetWhatIf(action) {
  try {
    const res = yield call(Model.GetWhatIfList, action.payload.params);

    if (res.code !== 200) {
      yield createMessage(put, delay, res.msg);
    }
    yield put({ type: 'MODEL_GET_WHATIF_SUCCESS', payload: { models: res.data } });
  } catch (e) {
    yield handleWarn(e);
  }
}

function* WhatIfSelect(action) {
  try {
    const res = yield call(Model.SelectWhatif, action.payload.params);

    if (res.code === 200) {
      yield put({
        type: 'WHATIF_SELECT_SUCCESS',
        payload: { data: res.data },
      });
    } else {
      yield createMessage(put, delay, 'Ошибка получения списка моделей');
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

/**
 * Инициализировать саги
 * @public
 */
function* initSaga() {
  yield takeLatest('MODEL_INIT', ModelFetch);
  yield takeLatest('MODEL_RELOAD', ModelFetch);
  yield takeLatest('MODEL_COPY', ModelCopy);
  yield takeLatest('MODEL_DELETE', ModelDelete);
  yield takeLatest('MODEL_CREATE', ModelCreate);
  yield takeLatest('MODEL_WHATIF_CREATE', ModelWhatIfCreate);
  yield takeLatest('MODEL_SELECT', ModelSelect);
  yield takeLatest('MODEL_FAVORITE', ModelFavorite);
  yield takeLatest('MODEL_TARIFF', ModelTariff);
  yield takeLatest('MODEL_LOCKED', ModelLocked);
  yield takeLatest('MODEL_SERVICES_INIT', ModelServices);
  yield takeLatest('MODEL_LIST', ModelList);
  yield takeLatest('MODEL_STATUS', ModelStatus);
  yield takeLatest('MODEL_SAVE', ModelSave);
  yield takeLatest('MODEL_CALC', ModelRecalc);
  yield takeLatest('MODEL_CLEAR_CACHE', ModelClearCache);
  yield takeLatest('MODEL_DICT_SAVE', SaveGuide);
  yield takeLatest('MODEL_GET_WHATIF', ModelGetWhatIf);
  yield takeLatest('WHATIF_SELECT', WhatIfSelect);
}

export default initSaga;
