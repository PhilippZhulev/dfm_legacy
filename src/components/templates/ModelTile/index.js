import React from 'react';
import {
  CustomTitle,
  Margin,
  KeyValue,
  IconInfoItem,
  Tile,
  AbsolutePosition,
  LinkButton,
  StyledPopper,
  InfoPopUp,
  Locked,
  LockedPopUp,
  ModelTileProgress,
  Favorite,
  Icon,
  LinkButtonHr,
} from 'components';
import PropTypes from 'prop-types';
import {
  handleError,
  handleWarn,
  permitRule,
  checkTariffModelEnable,
} from 'helpers';
import { AccessControl } from 'containers';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { isModelNotValid } from 'services/validation/models';
import { handleCreate } from '../WhatIf/controls';
import Clock from '../../svg/Clock';
import Copy from '../../svg/Copy';
import Remove from '../../svg/Remove';
import WhatIf from '../../svg/WhatIf';
import SwitchTariff from '../../svg/SwitchTariff';
import ParentModel from '../../svg/ParentModel';
import Add from '../../svg/Add';

/**
 * Плитка экрана моделей
 * @component
 * @public
 */
const ModelTile = React.memo(
  ({
    data,
    stages,
    userData,
    dispatchModal,
    dispatchCopyModal,
    dispatchDeleteModal,
    dispatchModelSelect,
    dispatchModelFavorite,
    dispatchModelTariff,
    dispatchWhatifSelect,
    dispatchWhatIfCreate,
    scenario,
    countWhatifModels,
  }) => {
    /** ANCHOR: Подключение к истории браузера */
    const history = useHistory();

    const showSwitchTariff = checkTariffModelEnable(userData);

    /**
     * ANCHOR: Удалить модель
     * @param  {object} event
     * @public
     */
    const _deleteModel = async (event, close) => {
      try {
        if (event.value === data.label) {
          dispatchDeleteModal({ params: { name: data.value } });
        } else {
          handleWarn({ message: 'Имя модели не совпадает.' });
        }
      } catch (e) {
        handleError('@ModelTile/_deleteModel', e);
      }
    };

    /**
     * ANCHOR: Копировать модель
     * @param  {string} name
     * @param  {object} states
     * @public
     */
    const _copyModel = async (name, states, close) => {
      try {
        const msg = isModelNotValid(states);
        if (msg) {
          handleWarn({ message: msg });
          return;
        }

        dispatchCopyModal({
          params: {
            name: states.value,
            data: {
              destTribeId: states.tribe.value,
              srcModelId: name,
            },
            tariff: states.tariff,
          },
        });
      } catch (e) {
        handleError('@ModelTile/_copyModel', e);
      }
    };

    /**
     * ANCHOR: Запустить модалку копировать модель
     * @param  {string} name
     * @public
     */
    const _handleCopyModel = async (name) => {
      try {
        dispatchModal({
          type: 'copyModel',
          state: true,
          title: `Копировать модель ${name}`,
          buttonText: 'Копировать',
          text: '',
          done: (e, close) => _copyModel(data.value, e, close),
        });
      } catch (e) {
        handleError('@ModelTile/_handleCopyModel', e);
      }
    };

    /**
     * ANCHOR: Запустить модалку выбора модели WhatIf
     * @public
     */
    const _handleWhatIfListModel = async (name) => {
      try {
        dispatchWhatifSelect({ params: { model: name } });
        dispatchModal({
          type: 'selectWhatif',
          state: true,
          title: `Модели What-If для ${name}`,
          buttonText: 'Открыть',
          text: '',
          done: (e, close) => {
            if (!e.value) {
              handleWarn({ message: 'Выберите модель для перехода' });
              return;
            }
            close();
            _handleSelect(e.value);
          },
        });
      } catch (e) {
        handleError('@ModelTile/_handleWhatIfListModel', e);
      }
    };

    const createModal = (e, id) => {
      dispatchWhatIfCreate({
        params: { data: { name: e.value, parentModelValue: id } },
      });
    };

    /**
     * ANCHOR: Запустить модалку добавления WhatIf
     * @public
     */
    const _handleWhatIfAddModel = (id, count) => {
      if (count < 5) {
        handleCreate(dispatchModal, (e) => createModal(e, id));
      } else {
        handleWarn({
          msg:
            'Создано максимальное число What-if моделей для данной родительской',
        });
      }
    };

    /**
     * ANCHOR: Переход к родительской модели
     * @public
     */
    const _handleParentModel = (model) => {
      try {
        dispatchModelSelect({
          params: { model },
          route: history,
        });
      } catch (e) {
        handleError('@ModelTile/_handleSelect', e);
      }
    };

    /**
     * ANCHOR: Запустить модалку удалить модель
     * @param  {string} name
     * @public
     */
    const _handleDeleteModel = async (name) => {
      try {
        dispatchModal({
          type: 'deleteModel',
          state: true,
          title: `Вы действительно хотите удалить модель ${name}?`,
          buttonText: 'Удалить',
          titleSize: 220,
          text: '',
          done: (e, close) => _deleteModel(e, close),
        });
      } catch (e) {
        handleError('@ModelTile/_handleDeleteModel', e);
      }
    };

    /**
     * ANCHOR: Выбор модели
     * @param  {string} name
     * @public
     */
    const _handleSelect = async (name) => {
      try {
        dispatchModelSelect({
          params: { model: name },
          route: history,
        });
      } catch (e) {
        handleError('@ModelTile/_handleSelect', e);
      }
    };

    /**
     * ANCHOR: Клик по плитке (Выбор модели)
     * @param  {string} name
     * @public
     */
    const _handleClickTile = (params, user) => {
      if (typeof params.locked === 'undefined') {
        handleWarn({ message: 'Модель недоступна' });
      } else {
        _handleSelect(params.value);
      }
      // else if (!params.locked || params.lockedInfo.username === user.login) {
      //   _handleSelect(params.value);
      // }
      // else {
      //   handleWarn({
      //     message: `Модель заблокирована ${
      //       params.lockedInfo.fullName || params.lockedInfo.username
      //     }`,
      //   });
      // }
    };

    /**
     * ANCHOR: Модель в избранном
     * @param  {string} name
     * @public
     */
    const _handleFavoriteModel = async (value, status) => {
      try {
        dispatchModelFavorite({ params: { id: value, status } });
      } catch (e) {
        handleError('@ModelTile/_handleFavoriteModel', e);
      }
    };

    /**
     * ANCHOR: Изменение статуса тарифной модели
     * @param  {string} id
     * @public
     */
    const _handleTariffModel = async (name) => {
      try {
        dispatchModelTariff({ params: { name } });
      } catch (e) {
        handleError('@ModelTile/_handleTariffModel', e);
      }
    };

    /** ANCHOR: Подключение классов */
    const classes = useStyles();

    return (
      <Tile onClick={() => _handleClickTile(data, userData)}>
        <Margin bottom={25}>
          <CustomTitle type={'subtitle'}>{data.label}</CustomTitle>
        </Margin>
        <KeyValue label={'Кол-во узлов'} value={data.nodeCount} />
        <Margin top={0}>
          <IconInfoItem icon={<Clock />} label={data.lastChanged} />
        </Margin>
        <AbsolutePosition
          right={-16}
          top={-8}
          onClick={(event) => event.stopPropagation()}>
          <InfoPopUp
            childWrapperWidth={24}
            top='true'
            right='true'
            fixed={true}
            content={
              <>
                {scenario === 'tco' && (
                  <>
                    <Margin bottom={14}>
                      <LinkButton
                        size={14}
                        width={'fit-content'}
                        clicked={true}
                        icon={<Copy />}
                        text={'Копировать'}
                        disabled={!permitRule(data.permissions, ['update'])}
                        onClick={(e) => {
                          e.stopPropagation();
                          _handleCopyModel(data.id);
                        }}
                      />
                    </Margin>
                    <LinkButtonHr />
                  </>
                )}

                {scenario === 'whatif' && (
                  <>
                    <Margin bottom={14}>
                      <LinkButton
                        size={14}
                        width={'fit-content'}
                        clicked={true}
                        icon={<ParentModel />}
                        text={'Родительская модель'}
                        disabled={false}
                        onClick={(e) => {
                          e.stopPropagation();
                          _handleParentModel(data.parentValue);
                        }}
                      />
                    </Margin>
                    <LinkButtonHr />
                  </>
                )}

                <Margin
                  top={14}
                  bottom={showSwitchTariff && scenario === 'tco' ? 14 : 0}>
                  <LinkButton
                    size={14}
                    width={'auto'}
                    clicked={true}
                    icon={<Remove />}
                    text={'Удалить'}
                    disabled={!permitRule(data.permissions, ['delete'])}
                    onClick={(e) => {
                      e.stopPropagation();
                      _handleDeleteModel(data.label);
                    }}
                  />
                </Margin>

                {scenario === 'tco' && (
                  <>
                    <LinkButtonHr />
                    <Margin top={14} bottom={14}>
                      <LinkButton
                        className={{ root: classes.whatIfRoot }}
                        size={14}
                        width={'auto'}
                        clicked={true}
                        icon={<WhatIf />}
                        text={'Модели WhatIf'}
                        counter={countWhatifModels}
                        disabled={!countWhatifModels}
                        onClick={(e) => {
                          e.stopPropagation();
                          _handleWhatIfListModel(data.id);
                        }}
                      />
                    </Margin>
                    <LinkButtonHr />
                    <Margin top={14} bottom={14}>
                      <LinkButton
                        size={14}
                        width={'fit-content'}
                        clicked={true}
                        icon={<Add height={18} />}
                        text={'Новая модель WhatIf'}
                        onClick={(e) => {
                          e.stopPropagation();
                          _handleWhatIfAddModel(
                            data.id,
                            data.countWhatifModels
                          );
                        }}
                      />
                    </Margin>
                    <LinkButtonHr />

                    <AccessControl
                      role={'DFM_BUSINESS_ADMIN'}
                      on={'model'}
                      do={'create'}>
                      <>
                        <Margin top={14}>
                          <LinkButton
                            size={14}
                            width={'auto'}
                            clicked={true}
                            icon={<SwitchTariff />}
                            text={
                              data.tariffModel
                                ? 'Убрать статус тарифной модели'
                                : 'Сделать модель тарифной'
                            }
                            disabled={
                              !permitRule(data.permissions, [
                                'update',
                                'delete',
                              ])
                            }
                            onClick={(e) => {
                              e.stopPropagation();
                              _handleTariffModel(data.value);
                            }}
                          />
                        </Margin>
                      </>
                    </AccessControl>
                  </>
                )}
              </>
            }>
            <Icon size={24} icon='MORE_VERTICAL' className={classes.iconMore} />
          </InfoPopUp>
        </AbsolutePosition>

        {scenario !== 'whatif' && (
          <>
            <AbsolutePosition
              right={
                typeof data.locked === 'undefined' || data.locked === null
                  ? 0
                  : 25
              }
              bottom={-4}>
              <Favorite
                isFavorite={!!data.like}
                onFavorite={(e, status) => {
                  e.stopPropagation();
                  _handleFavoriteModel(data.value, status);
                }}
              />
            </AbsolutePosition>

            <AbsolutePosition right={-6} bottom={-4}>
              <StyledPopper
                right={false}
                content={
                  <LockedPopUp
                    lockedInfo={data.lockedInfo}
                    locked={data.locked}
                  />
                }>
                <Locked locked={data.locked} />
              </StyledPopper>
            </AbsolutePosition>
          </>
        )}

        <ModelTileProgress stageDict={stages} stage={data.stage} />
      </Tile>
    );
  }
);

ModelTile.displayName = 'ModelTile';

ModelTile.propTypes = {
  classes: PropTypes.object,
  settings: PropTypes.object,
  duration: PropTypes.number,
  dispatchCopyModal: PropTypes.func.isRequired,
  dispatchDeleteModal: PropTypes.func.isRequired,
  dispatchModelSelect: PropTypes.func.isRequired,
  dispatchModelFavorite: PropTypes.func.isRequired,
  dispatchModelTariff: PropTypes.func.isRequired,
  dispatchModal: PropTypes.func.isRequired,
  dispatchWhatifSelect: PropTypes.func.isRequired,
  dispatchWhatIfCreate: PropTypes.func.isRequired,
  type: PropTypes.string,
  state: PropTypes.string,
  stages: PropTypes.array.isRequired,
  userData: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  scenario: PropTypes.string.isRequired,
  countWhatifModels: PropTypes.number,
};

ModelTile.defaultProps = { classes: {} };

export default ModelTile;

/** Основные стили */
const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      root: {
        position: 'relative',
        paddingLeft: 32,
      },

      iconMore: {
        transition: 'color 0.15s ease-in-out',
        color: colorsTheme.grey,
        cursor: 'pointer',

        '&:hover': {
          color: colorsTheme.nodeColor,
        },
      },

      linkButtonHr: {
        backgroundColor: `${fade(colorsTheme.grey, 0.5)} !important`,
      },

      whatIfRoot: {
        '&:hover': {
          background: 'rgba(68,142,242,0.12)',
          color: '#448EF2',
        },
      },

      whatIfCounter: {
        marginLeft: 10,

        fontSize: 10,
        lineHeight: '16px',
        fontWeight: 700,
        borderRadius: 4,
        padding: 5,
        minWidth: 25,
        textAlign: 'center',
        background: 'rgb(47,59,82)',
        color: '#869AAC',
      },
    };
  },
  { name: 'ModelTile' }
);
