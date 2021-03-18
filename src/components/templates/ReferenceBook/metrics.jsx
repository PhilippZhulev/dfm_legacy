import React, {
  useEffect,
  useState,
  useImperativeHandle,
  useMemo,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableHead, TableBody, TableRow, TableCell } from 'components';
import PropTypes from 'prop-types';
import { handleError, handleWarn } from 'helpers';
import Checkbox from '@material-ui/core/Checkbox';
import { Container } from './container';
import { virualStore } from '../../../virtualStore';
import Middleware from '../../../services/middleware/index.js';
import store from '../../../redux/store';
import { isMetricNotValid } from '../../../services/validation/reference';
import { Metric } from './metrics/metric';
import { NewMetric } from './metrics/newMetric';
import * as APIMetric from '../../../services/api/metric';

/** Заголовки для стобцов */
const TableHeadList = ['Код', 'Название', 'Категории'];

/**
 * Компонент с таблицей спавочника метрик
 * @component
 * @public
 */
const Metrics = React.forwardRef((props, ref) => {
  const {
    deleteData,
    onCheckbox,
    onCheckboxAll,
    mapCategories,
    categories,
    search,
    allowed,
    saveDump,
  } = props;
  /** Состояние списка метрик */
  const [metrics, setMetrics] = useState([]);
  const [isCreate, setIsCreate] = useState(false);
  const [edit, setEdit] = useState(null);

  const isNoGlobalMetrics = useMemo(
    () => metrics.filter((metric) => !metric.isGlobal),
    [metrics]
  );

  /** Получаем данные */
  useEffect(() => {
    fetch();
  }, []);

  /**
   * Сохранение параметров справочника
   * @param {Array} data - `список параметров`
   */
  const setDump = (data) => {
    saveDump(data, 'guides.metric');
  };

  /** Функция для получения данных */
  const fetch = async () => {
    try {
      const { model } = virualStore;
      const res = await Middleware.GetDumpData(
        model,
        { type: 'metric' },
        'referenceCompile'
      );

      if (res.completed) {
        setMetrics(res.data);
      }
    } catch (error) {
      handleError('@ReferenceBookPeriods/fetch', error);
    }
  };

  /** Добавление элемента в список */
  const handleAdd = () => {
    setIsCreate(!isCreate);
    setEdit(null);
  };

  /** Удаление выбранных элеменов из списка */
  const handleDelete = async () => {
    try {
      const deleteArray = metrics.filter((_, id) => deleteData.has(id));
      if (!deleteArray.length) {
        return;
      }
      const { model } = virualStore;

      const res = await APIMetric.default.DeleteMetrics({
        modelId: model.value,
        data: deleteArray,
      });

      saveDump(res.data, 'guides.metric');
      setMetrics(res.data);
    } catch (e) {
      handleWarn(e);
    }
  };

  /** Прокидывание валидации */
  const getValidationMessage = (model) =>
    isMetricNotValid(virualStore.model.metricDictionary);

  /** Передаем реф */
  useImperativeHandle(ref, () => ({
    ...ref,
    handleAdd,
    handleDelete,
    getValidationMessage,
  }));

  const handleCheckbox = (event) => {
    onCheckboxAll(event, isNoGlobalMetrics);
  };

  const changeEdit = (value) => {
    setIsCreate(false);
    setEdit(value);
  };

  /**
   * Поиск в параметре metric
   * @param {Object} metric - `элемент из таблицы`
   * @returns {Boolean} `true/false`
   */
  const searchFunc = (metric) =>
    metric.label.toLowerCase().includes(search) ||
    metric.value.toLowerCase().includes(search);

  /** Инициализация стилей */
  const classes = useStyles(props);

  /** Рендер компонента */
  return (
    <>
      <Table ref={ref} classes={{ root: classes.table }}>
        <TableHead stickyHeader>
          <TableRow>
            <TableCell checkbox>
              <Checkbox
                indeterminate={
                  deleteData.size > 0 &&
                  deleteData.size < isNoGlobalMetrics.length
                }
                checked={
                  isNoGlobalMetrics.length > 0 &&
                  deleteData.size === isNoGlobalMetrics.length
                }
                onChange={handleCheckbox}
                color='primary'
              />
            </TableCell>
            <TableCell />
            {TableHeadList.map((textHead) => (
              <TableCell key={textHead}>{textHead}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isCreate && (
            <NewMetric
              categories={categories}
              setIsCreate={setIsCreate}
              setMetrics={setMetrics}
              saveDump={setDump}
            />
          )}
          {metrics.map((metric, index) => {
            const disabled = metric.id !== edit?.id;

            if (searchFunc(metric)) {
              return (
                <Metric
                  key={metric.id}
                  metric={metric}
                  id={index}
                  onEdit={changeEdit}
                  deleteData={deleteData}
                  onCheckbox={onCheckbox}
                  disabled={disabled}
                  mapCat={mapCategories}
                  categories={categories}
                  saveDump={setDump}
                  setMetrics={setMetrics}
                  allowed={allowed}
                />
              );
            }

            return null;
          })}
        </TableBody>
      </Table>
    </>
  );
});

/** Назначаем displayName */
Metrics.displayName = 'Metrics';

/** Назначаем propTypes */
Metrics.propTypes = {
  edit: PropTypes.bool.isRequired,
  deleteData: PropTypes.instanceOf(Set).isRequired,
  onCheckbox: PropTypes.func.isRequired,
  onCheckboxAll: PropTypes.func.isRequired,
  saveDump: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  mapCategories: PropTypes.object.isRequired,
  allowed: PropTypes.bool.isRequired,
};

/** Основные стили */
export const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      table: {
        width: 'calc(100% - 4px)',
        tableLayout: 'fixed',
        marginBottom: 16,

        '& th': {
          top: -1,
        },

        '& th, & td': {
          '&:nth-child(2)': {
            width: 150,
            textAlign: 'center',
          },
          '&:nth-child(3)': {
            width: 200,
          },
          '&:nth-child(4)': {
            width: 125,
          },
          '&:nth-child(5)': {
            width: 250,
            '& .MuiInputBase-root': {
              backgroundColor: 'transparent !important',
            },
          },
        },
      },

      multiSelectRoot: {
        width: 'unset',
        background: 'unset',
        height: '100%',
      },

      active: {
        backgroundColor: colorsTheme.input,
        color: colorsTheme.text,
      },

      delete: {
        backgroundColor: colorsTheme.checkedRow,
      },

      textArea: {
        width: '100%',
        background: 'inherit',
        color: '#fff',
        border: 0,
        textAlign: 'left',
        padding: '0',
        fontSize: 12,
        height: 30,
        resize: 'none',
        lineHeight: '16px',

        '&:focus': {
          outline: 0,
          border: 'none',
        },
      },

      edit: {
        cursor: 'pointer',
        transition: 'all 0.2s ease-out',
        '&:hover': {
          opacity: 0.6,
        },
      },
    };
  },
  { index: 2, name: 'Metrics' }
);

export default Container(Metrics);
