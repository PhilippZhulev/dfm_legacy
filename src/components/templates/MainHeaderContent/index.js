import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AppBarCol, SingleSelect, LinkButton } from 'components';
import { ModelExit } from 'containers';
import { handleError, permitRule } from 'helpers';
import { virualStore } from '../../../virtualStore';

/**
 * ANCHOR: Событие переключения узла на графе
 */
let nodeSelect = () => {};
document.addEventListener('app.graph.activeNode', (event) => {
  nodeSelect(event);
});

/** ANCHOR: Тип открытой модального окна */
let typeModal = '';

/**
 * Контент шапки
 * @component
 * @public
 */
function MainHeaderContent({
  data,
  userData,
  dispatchModelLocked,
  dispatchModelSave,
  dispatchModelChange,
  dispatchModelSelect,
  dispatchModelReload,
  dispatchFilter,
  dispatchGraph,
  locked,
  modelChange,
  model,
}) {
  /** FIXME: Баг удаления, не перезаписывется селект */
  const [state, setState] = useState({
    resource: data.selectResource,
    period: data.selectPeriod,
  });

  /** REVIEW: Костыль для смены ресурсов в селекте после удаления.
   * Нужно переписать
   */
  useEffect(() => {
    setState({
      resource: data.selectResource,
      period: data.selectPeriod,
    });
  }, [data.selectResource, data.selectPeriod]);

  const [updateLocked, setUpdateLocked] = useState(0);
  const modal = useRef(null);
  const classes = useStyles();

  /** ANCHOR: Запускаем фильтер ресурса при переключении графа  */
  nodeSelect = (event) => {
    _handleFilter('resource', event.detail);
  };

  /**
   * ANCHOR: Переключение фильтра перода и ресурса
   * @param  {string} param
   * @param  {string} select
   * @public
   */
  const _handleFilter = async (param, select) => {
    try {
      virualStore.prevSelected = state;
      virualStore.selected = {
        ...state,
        [param]: select,
      };

      setState({
        ...state,
        [param]: select,
      });

      /** Определяем какие default параметры нужно забрать из state  */
      const defaultParam = param === 'resource' ? 'period' : 'resource';

      /** Делаем диспатч состояния филтра в сагу и получаем новые данные */
      dispatchFilter({
        params: {
          [defaultParam]: state[defaultParam].value,
          model: data.model.label,
          [param]: select.value,
        },
      });

      /** Если переклчаем период то получаем новые данные графа */
      if (param === 'period') {
        dispatchGraph({
          params: {
            model: data.model.label,
            [param]: select.value,
          },
        });
      }
    } catch (error) {
      handleError('@MainHeaderContent/_handleFilter', error);
    }
  };

  /**
   * ANCHOR: Обновление режима редактирования модели
   * @public
   */
  const _handleUpdateLockedModel = () => {
    setUpdateLocked(updateLocked + 1);
    dispatchModelLocked({
      params: {
        name: data.model.label,
        id: data.model.id,
        state: !locked,
      },
      userData,
    });
  };

  /**
   * ANCHOR: Переход в режим редактирования модели
   * @public
   */
  const handleLockedModel = () => {
    if (locked && modelChange) {
      handleOpen();

      typeModal = 'lockedModel';
      return;
    }

    _handleUpdateLockedModel();
  };

  /**
   * ANCHOR: Переход в режим редактирования модели
   * @public
   */
  const handleCancel = () => {
    dispatchModelChange({ state: false });

    /* TODO: Допилить корректный сброс отображаемых данных (сейчас физически данные не сохраняются, но отоброажаются на экране до перезахода в модель) */
    // Вариант рабочий, но некрасиво скачут текстовые блоки
    // dispatchModelReload({ params: { model: data.model.id } });
    // dispatchModelSelect({ params: { model: data.model.id } });
    // _handleFilter('resource', data.selectResource);
    // window.ActiveNode(data.selectResource.value);

    _handleUpdateLockedModel();
  };

  /**
   * ANCHOR: Открыть модальное окно
   * @public
   */
  const handleOpen = () => {
    modal.current.handleShow();
  };

  const handleChangeButton = () => {
    if (locked) {
      window.savePropgess = 0;

      dispatchModelSave({
        params: {
          resource: state.resource.value,
          period: state.period.value,
          resources: virualStore.model.resources,
          model,
        },
      });
    } else {
      handleLockedModel();
    }
  };

  return (
    <>
      <AppBarCol>
        <SingleSelect
          label={'Узел в работе'}
          width={'152px'}
          classes={{
            selectedValues: classes.selectedValues,
          }}
          options={data.resources}
          selected={state.resource}
          onChange={(result) => {
            _handleFilter('resource', result);
            window.ActiveNode(result.value);
          }}
        />
      </AppBarCol>
      <AppBarCol>
        <SingleSelect
          label={'Период'}
          width={'77px'}
          classes={{
            selectedValues: classes.selectedValues,
            menuIcon: classes.menuIcon,
          }}
          options={data.periods}
          selected={state.period}
          onChange={(result) => _handleFilter('period', result)}
        />
      </AppBarCol>
      {data.locked || <div />}
      <AppBarCol>
        <div className={classes.modelWrapper}>
          <div className={classes.modelLabel}>Модель</div>
          <ModelExit label={data.model.label} whatif />
        </div>
      </AppBarCol>
      {data.modelLocked && data.lockedInfo.username !== userData.login ? (
        <AppBarCol width={'48%'}>
          <div className={classes.modelWrapper}>
            <div className={classes.blockedLabel}>Заблокировал</div>
            <div className={classes.blockedValue}>
              {data.lockedInfo.fullName}
            </div>
          </div>
        </AppBarCol>
      ) : (
        <AppBarCol width={'48%'}>
          <>
            <LinkButton
              clicked
              colorType={'stroke'}
              text={locked ? 'Сохранить изменения' : 'Редактировать модель'}
              width={'169px'}
              size={12}
              disabled={
                (locked && !modelChange) ||
                !permitRule(data.permissions, ['update'])
              }
              classes={{
                root: classNames(
                  locked ? classes.save : null,
                  classes.edit,
                  classes.button
                ),
              }}
              onClick={handleChangeButton}
            />
            {locked ? (
              <LinkButton
                clicked
                colorType={'stroke'}
                size={12}
                width={'auto'}
                classes={{
                  root: classNames(classes.cancel, classes.button),
                }}
                text={'Отменить несохраненные изменения'}
                disabled={!permitRule(data.permissions, ['update', 'delete'])}
                onClick={handleCancel}
              />
            ) : null}
          </>
        </AppBarCol>
      )}
    </>
  );
}

MainHeaderContent.propTypes = {
  data: PropTypes.object,
  model: PropTypes.string,
  userData: PropTypes.object,
  dispatchModelLocked: PropTypes.func.isRequired,
  dispatchFilter: PropTypes.func.isRequired,
  dispatchModelChange: PropTypes.func.isRequired,
  dispatchModelSave: PropTypes.func.isRequired,
  dispatchGraph: PropTypes.func.isRequired,
  dispatchModelSelect: PropTypes.func.isRequired,
  dispatchModelReload: PropTypes.func.isRequired,
  locked: PropTypes.bool,
  modelChange: PropTypes.bool,
  stage: PropTypes.object,
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    selectedValues: {
      fontSize: 14,
      lineHeight: '22px',
      padding: '12px 10px',
    },
    menuIcon: {
      '& svg': {
        margin: '0 10px!important',
      },
    },

    save: {
      marginRight: 8,
    },

    button: {
      marginLeft: 0,
      lineHeight: '16px',
      padding: '8px 16px!important',
      alignSelf: 'center',
      marginTop: 14,
      borderRadius: 4,

      '& span': {
        padding: '0px!important',
        lineHeight: '16px!important',
      },

      '&:hover': {
        color: '#fff!important',
      },
    },

    cancel: {
      color: `${theme.colorsTheme.cancelButtonColor}!important`,
      cursor: 'pointer',
      fontSize: '12px!important',
      lineHeight: '16px!important',

      '& span': {
        padding: '0px!important',
        lineHeight: '16px!important',
      },

      '&:hover': {
        color: '#fff!important',
      },
    },
    edit: {
      color: `${theme.colorsTheme.control}!important`,
      border: `1px solid ${theme.colorsTheme.control}!important`,

      '&:hover': {
        background: `${theme.colorsTheme.control}!important`,
      },
    },

    modelLabel: {
      color: `${theme.colorsTheme.grey}!important`,
      fontSize: 12,
      paddingLeft: 0,
      marginBottom: 6,
    },

    modelWrapper: {},

    blockedLabel: {
      color: `${theme.colorsTheme.grey}!important`,
      fontSize: 12,
      paddingLeft: 0,
      marginBottom: 6,
    },

    blockedValue: {
      color: `${theme.colorsTheme.text}!important`,
      fontSize: 14,
      paddingLeft: 0,
      lineHeight: '36px',
    },
  }),
  { name: 'MainHeaderContent' }
);

export default MainHeaderContent;
