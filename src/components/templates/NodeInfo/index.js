import React, { useEffect, useState } from 'react';
import {
  InfoPopUp,
  TextInput,
  AbsolutePosition,
  SingleSelect,
} from 'components';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { usePrevious } from 'helpers';
import Info from '../../svg/Info';
import colors from '../../theme/colors';
import Middleware from '../../../services/middleware';

/**
 * Компонент информции об узле
 * @component
 * @public
 */
const NodeInfo = React.memo((props) => {
  const {
    lockedModel,
    resources,
    categories,
    getParentInfoNode,
    fetchParentInfoSuccesed,
  } = props;

  /** ANCHOR: Состояния */
  const [editNodePoints, setEditNodePoints] = useState([]);

  /** Предыдущее состояние пропсы */
  const prevPropsResources = usePrevious(resources);

  /**
   * При смене ресурса обновляем
   * состояние editNodePoints
   * ANCHOR: Шаблон Панели */
  useEffect(() => {
    if (resources && resources?.value !== prevPropsResources?.value) {
      setEditNodePoints([
        {
          title: 'Имя узла',
          value: resources.label,
          editor: 'input',
        },
        {
          title: 'Назначение',
          value: resources.description,
          editor: 'input',
        },
        {
          title: 'Категория',
          value: resources.categoryName || {
            value: '',
            label: 'Не выбрана категория',
          },
          editor: 'select',
        },
        {
          title: 'Срок полезного использования',
          value: resources.lifeTime,
          editor: 'input',
        },
      ]);
    }
  }, [resources, prevPropsResources]);

  useEffect(() => {
    if (resources.link?.modelId && resources.link?.resourceId) {
      getParentInfoNode({ params: resources.link });
    } else {
      fetchParentInfoSuccesed(null);
    }
  }, [resources.link?.modelId, resources.link?.resourceId]);

  /**
   * ANCHOR: Задежка ввода
   * @param  {void} func
   * @public
   */
  const deBoundFields = async (func) => {
    clearTimeout(window.nodeInfoCounter);
    window.nodeInfoCounter = setTimeout(() => {
      func();
    }, 300);
  };

  /**
   * ANCHOR: вызов селекта
   * @param  {func} caterory
   * @param  {int} index
   * @public
   */
  const handleChangeSelect = (caterory, index) => {
    editNodePoints[index].value = caterory;

    Middleware.SaveDumpData(
      {
        value: caterory.value,
        index,
        resource: resources.value,
        period: resources.period,
      },
      'nodeInfo'
    );

    setEditNodePoints([...editNodePoints]);
  };

  /**
   * ANCHOR: Ввод текста в инпут
   * @param  {object} event
   * @param  {int} index
   * @public
   */
  const handleChangeInput = (event, index) => {
    const { value } = event.target;

    deBoundFields(() => {
      Middleware.SaveDumpData(
        {
          value,
          index,
          resource: resources.value,
          period: resources.period,
        },
        'nodeInfo'
      );
    });

    if (index === 3) {
      editNodePoints[index].value = Number(value.replace(/\D/g, ''));
    } else {
      editNodePoints[index].value = value;
    }
    setEditNodePoints([...editNodePoints]);
  };

  /**
   * ANCHOR: Отображение типа поля (select/input)
   * @param  {object} point
   * @param  {int} index
   * @public
   */
  const renderPoint = (point, index) => {
    let editor;

    if (point.editor === 'select') {
      // TODO Ошибка для групп, у которых нет категории
      editor = (
        <SingleSelect
          classes={{
            root: classes.selectRoot,
            select: classes.select,
            selectedValues: classes.selectedValues,
            label: classes.labelSelect,
          }}
          noOptionsMessageSelect='Не выбрана категория'
          options={categories}
          selected={point.value}
          onChange={(category) => handleChangeSelect(category, index)}
        />
      );
    } else {
      editor = (
        <TextInput
          classes={{
            root: classes.wrapper,
            input: classes.input,
            label: classes.label,
          }}
          value={point.value}
          onChange={(event) => handleChangeInput(event, index)}
        />
      );
    }

    return (
      <div className={classes.row}>
        <div className={classes.title}>{point.title}:</div>
        {!lockedModel && (
          <div className={classes.item}>
            {point.value?.label || point.value}
          </div>
        )}
        {lockedModel && editor}
      </div>
    );
  };

  /** Инициализация стилей */
  const classes = useStyles();

  if (resources) {
    return (
      <div className={classes.infoPanel}>
        <AbsolutePosition top={17} right={17}>
          <div className={classes.info}>
            <InfoPopUp
              content={
                <>
                  <div className={classes.infoItem}>
                    <span className='info-title'>Прямые:</span>
                    <span>{resources.formatValue.direct} руб./год</span>
                  </div>
                  <div className={classes.infoItem}>
                    <span className='info-title'>По тарифу:</span>
                    <span>{resources.tariffValueFormat} руб./год</span>
                  </div>
                </>
              }>
              <Info width={16} height={16} />
            </InfoPopUp>
          </div>
        </AbsolutePosition>
        {/* Пункт ТСО узла */}
        <div className={classes.row}>
          <div className={classes.title}>ТСО узла:</div>
          <div className={classes.item}>
            {resources.formatValue.full} руб./год
          </div>
        </div>

        {editNodePoints.map((point, index) => (
          <React.Fragment key={index}>
            {renderPoint(point, index)}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return 'Нет информации об узле';
});

/** Назначаем  displayName */
NodeInfo.displayName = 'NodeInfo';

/** Назначаем  propTypes */
NodeInfo.propTypes = {
  categories: PropTypes.array.isRequired,
  lockedModel: PropTypes.bool.isRequired,
  resources: PropTypes.object.isRequired,
  getParentInfoNode: PropTypes.func.isRequired,
  fetchParentInfoSuccesed: PropTypes.func.isRequired,
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    infoPanel: {
      width: '100%',
      boxSizing: 'border-box',
      color: theme.colorsTheme.nodeColor,
      fontSize: 12,
      lineHeight: 'normal',
      backgroundColor: theme.colorsTheme.background,
      padding: '15px 25px',
      position: 'relative',
    },
    input: {
      fontSize: 12,
      lineHeight: 'normal',
      color: '#fff',
      border: `1px solid ${colors.colorsTheme.nodeInputBorder}`,
      width: 154,
      height: 25,
      borderRadius: 4,
      background: 'none',
      padding: '6px 7px',
    },
    selectRoot: {
      width: 154,
      border: `1px solid ${colors.colorsTheme.nodeInputBorder}`,
      borderRadius: 4,
    },

    labelSelect: { margin: 0 },

    select: {
      background: 'none',
      minHeight: '25px',
      height: '25px',
    },

    selectedValues: {
      display: 'flex',
      alignItems: 'center',
      height: 25,
      color: theme.colorsTheme.nodeColor,
      paddingLeft: 7,
    },

    wrapper: { display: 'inline-flex' },
    row: {
      marginBottom: 5,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      alignContent: 'center',
    },
    title: {
      color: theme.colorsTheme.nodeLabel,
      fontSize: 12,
      lineHeight: 'normal',
      display: 'inline-flex',
      justifyContent: 'flex-end',
      marginRight: 8,
      alignItems: 'center',
      width: 100,
      height: 25,
    },
    item: {
      display: 'inline-flex',
      padding: '5px 0 5px 8px',
    },
    infoItem: {
      fontSize: 12,
      color: theme.colorsTheme.nodeColor,
      display: 'flex',
      textAlign: 'right',

      '&:first-child': { marginBottom: 8 },

      '& .info-title': {
        color: theme.colorsTheme.grey,
        marginRight: 16,
        width: 80,
      },
    },
  }),
  { name: 'NodeInfo', index: 1 }
);

export default NodeInfo;
