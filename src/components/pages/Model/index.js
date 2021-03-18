import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Background,
  TribesMenu,
  ModelFrame,
  ModelScreen,
  GenerateTiles,
  AbsolutePosition,
  RolesAndAuthorities,
  Button,
  SkeletonTribeMenu,
  SkeletonModelFrame,
  Modal,
  Tabs,
} from 'components';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { handleError, handleWarn } from 'helpers';
import { AccessControl } from 'containers';
import { isModelNotValid } from 'services/validation/models';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switcher from '@material-ui/core/Switch';
import Middleware from '../../../services/middleware/index.js';
import NoModel from '../../svg/NoModel';
import { baseTypes } from './baseTypes';
import { useStyles } from './styles';
import { handleCreateCommon } from '../../templates/WhatIf/controls';

/**
 * Открыть модальное окно создания модели
 * @component
 * @public
 */
function Model({
  models,
  blocks,
  stages,
  userData,
  dispatchModal,
  dispatchCreateModal,
  modelSearch,
  dispatchWhatIfCreate,
}) {
  const [tribe, setTribe] = useState('all');
  const [isActive, setIsActive] = useState(false);
  const [modelsData, setModelsData] = useState(null);
  const [completed, setCompleted] = useState(true);
  const history = useHistory();
  const [currentType, setCurrentType] = useState('tco');
  const [types, setTypes] = useState(baseTypes);
  const [byParents, setByParents] = useState(false);

  const styles = useStyles();

  useEffect(() => {
    if (models) {
      const counters = {
        tcoCounter: models.reduce(
          (total, el) =>
            total +
            el.models.filter((fil) => fil.scenario.toLowerCase() === 'tco')
              .length,
          0
        ),

        planingCounter: models.reduce(
          (total, el) =>
            total +
            el.models.filter((fil) => fil.scenario.toLowerCase() === 'planing')
              .length,
          0
        ),

        whatifCounter: models.reduce(
          (total, el) =>
            total +
            el.models.filter((fil) => fil.scenario.toLowerCase() === 'whatif')
              .length,
          0
        ),
      };

      const nTypes = types.map((item) => {
        item.counter = counters[`${item.id}Counter`];
        return item;
      });

      setTypes(nTypes);
    }
  }, [models]);

  /** ANCHOR: Создать модель */
  useEffect(() => {
    setIsActive(true);

    if (models) {
      sort(models, modelSearch);
    }
  }, [models, modelSearch]);

  /** ANCHOR: Проверка наличия данных */
  useEffect(() => {
    if (modelsData?.length > 0) {
      setCompleted(false);
    }
    if (
      modelsData?.filter(
        (item) =>
          (tribe === 'all' ||
            (tribe === 'fav' &&
              item.models.filter((model) => model.like).length > 0) ||
            item.tribe === tribe) &&
          item.models.filter(
            (model) => model.scenario.toLowerCase() === currentType
          ).length > 0
      ).length === 0
    ) {
      setCompleted(true);
    }
  }, [modelsData, tribe, currentType]);

  /**
   * ANCHOR: Открыть модалку - создать модель
   * @public
   */
  const _handleCreateModel = async () => {
    try {
      dispatchModal({
        type: 'createModel',
        state: true,
        title: 'Создать модель',
        buttonText: 'Создать',
        text: '',
        done: (e, close) => {
          const msg = isModelNotValid(e);

          if (msg) {
            handleWarn({ message: msg });
            return;
          }

          _createModel(e, close);
        },
      });
    } catch (e) {
      handleError('@Model/_handleCreateModel', e);
    }
  };

  const createModal = (e) => {
    dispatchWhatIfCreate({
      params: { data: { name: e.value, parentModelValue: e.model.value } },
    });
  };

  /**
   * ANCHOR: Открыть модалку - создать модель
   * @public
   */
  const _handleCreateModelWhatif = async () => {
    try {
      handleCreateCommon(dispatchModal, (e) => createModal(e));
    } catch (e) {
      handleError('@Model/_handleCreateModel', e);
    }
  };

  /**
   * ANCHOR: Создать модель
   * @param  {object} states
   * @param  {func} close
   * @public
   */
  const _createModel = async (states, close) => {
    try {
      dispatchCreateModal({
        params: {
          name: states.value,
          data: {
            value: states.value,
            tribe: states.tribe.value,
          },
          tariff: states.tariff,
        },
      });
    } catch (e) {
      handleError('@ModelTile/_createModel', e);
    }
  };

  /**
   * ANCHOR: Сортировка моделей
   * @param  {array} array
   * @param  {string} search
   * @public
   */
  const sort = async (array, search) => {
    try {
      const response = await Middleware.WorkerParse(
        { array, search },
        'modelsSort'
      );

      if (response.completed) {
        setModelsData(response.data.result);
      } else {
        setModelsData([]);
      }
    } catch (e) {
      handleError('@ModelTile/sort', e);
    }
  };

  // Отрисовка
  return (
    <Background>
      <>
        <ModelScreen>
          <SkeletonTribeMenu load={blocks?.length === 0}>
            <TribesMenu
              tribe={tribe}
              universal={false}
              setTribe={setTribe}
              blockDict={blocks}
              onClickTribe={() => {}}
            />
          </SkeletonTribeMenu>

          <SkeletonModelFrame load={!modelsData}>
            <ModelFrame>
              <Tabs
                tabs={types}
                current={currentType}
                counterViewed={true}
                onChange={(t) => setCurrentType(t)}
              />
              {currentType === 'tco' && (
                <AccessControl on={'model'} do={'create'}>
                  <AbsolutePosition right={'60px'} top='80px' zIndex={50}>
                    <Button
                      classes={{ button: styles.addModel }}
                      onClick={_handleCreateModel}
                      text={'Создать модель'}
                    />
                  </AbsolutePosition>
                </AccessControl>
              )}
              {currentType === 'whatif' && !completed && (
                <>
                  <AccessControl on={'model'} do={'create'}>
                    <AbsolutePosition right={'60px'} top='80px' zIndex={50}>
                      <FormControlLabel
                        onClick={(e) => e.stopPropagation()}
                        control={
                          <Switcher
                            checked={byParents}
                            onChange={() => setByParents(!byParents)}
                            value='groupNode'
                            color='primary'
                            classes={{
                              switchBase: styles.switchBase,
                              root: styles.switchRoot,
                            }}
                          />
                        }
                        classes={{ label: styles.triggerLabel }}
                        label='По родительским моделям'
                      />
                      <Button
                        classes={{
                          root: styles.addModelRoot,
                          button: styles.addModel,
                        }}
                        onClick={_handleCreateModelWhatif}
                        text={'Создать модель'}
                      />
                    </AbsolutePosition>
                  </AccessControl>
                </>
              )}
              <GenerateTiles
                stages={stages}
                tribe={tribe}
                models={modelsData}
                userData={userData}
                isActive={isActive}
                scenario={currentType}
                byParents={byParents}
              />
            </ModelFrame>
            {completed ? (
              <AbsolutePosition
                right={'0'}
                left={'304px'}
                top={'300px'}
                bottom={'auto'}
                style={{
                  margin: 'auto',
                  maxWidth: 500,
                  height: 120,
                  textAlign: 'center',
                }}
                zIndex={50}>
                {currentType === 'whatif' && (
                  <div className={styles.newModelBlock}>
                    <div className={styles.newModelTitle}>
                      Для создания вашей первой модели нажмите кнопку
                    </div>

                    <Button
                      classes={{
                        root: styles.newModelRoot,
                        button: styles.newModel,
                      }}
                      onClick={_handleCreateModelWhatif}
                      text={'Создать модель'}
                    />
                  </div>
                )}
                <NoModel />
              </AbsolutePosition>
            ) : null}
          </SkeletonModelFrame>
        </ModelScreen>
      </>
      <Route
        path='/dfm_it/model/modal'
        render={({ match: { path } }) => (
          <Modal open noMaxWidth close={() => history.push('/dfm_it/model')}>
            <Switch>
              <Route
                path={`${path}/roles-and-authorities`}
                component={RolesAndAuthorities}
              />
              <Route path='*'>
                <Redirect to='/dfm_it/model' />
              </Route>
            </Switch>
          </Modal>
        )}
      />
    </Background>
  );
}

Model.propTypes = {
  models: PropTypes.array,
  blocks: PropTypes.array,
  stages: PropTypes.array,
  userData: PropTypes.object.isRequired,
  dispatchModal: PropTypes.func.isRequired,
  dispatchCreateModal: PropTypes.func.isRequired,
  dispatchWhatIfCreate: PropTypes.func.isRequired,
  modelSearch: PropTypes.string,
};

Model.defaultProps = { stages: [] };

export default Model;
