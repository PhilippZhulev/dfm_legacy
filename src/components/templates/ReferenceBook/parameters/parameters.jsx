import React, {
  useEffect,
  useState,
  useImperativeHandle,
  useMemo,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableHead, TableBody, TableRow, TableCell } from 'components';
import { handleWarn, handleError } from 'helpers';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import { Container } from '../container';
import { virualStore } from '../../../../virtualStore';
import Middleware from '../../../../services/middleware';
import { NewParameters } from './newParameters';
import { Parameter } from './parameter';
import { LocalParamsApi } from '../../../../services/api/globalLocalParams';

/** Заголовки для стобцов */
const TableHeadList = ['Код', 'Название', 'Описание', 'Значение'];

/**
 * Компонент с таблицей спавочника параметры
 * @component
 * @public
 */
const Parameters = React.forwardRef((props, ref) => {
  const {
    deleteData,
    onCheckbox,
    onCheckboxAll,
    search,
    allowed,
    saveDump,
  } = props;
  /** Состояние справочника */
  const [parameters, setParameters] = useState([]);
  const [isCreate, setIsCreate] = useState(false);
  const [edit, setEdit] = useState(null);

  const renderData = useMemo(
    () =>
      parameters.filter(
        (parameter) =>
          parameter.label.toLowerCase().includes(search) ||
          parameter.value.toLowerCase().includes(search)
      ),
    [search, parameters]
  );

  const isNoGlobalMetrics = useMemo(
    () =>
      new Set(
        parameters.filter((metric) => !metric.isGlobal).map((el) => el.id)
      ),
    [parameters]
  );

  /** Получаем данные */
  useEffect(() => {
    fetch();
  }, []);

  /** Функция для получения данных */
  const fetch = async () => {
    try {
      const { model } = virualStore;
      const res = await Middleware.GetDumpData(
        model,
        { type: 'parameter' },
        'referenceCompile'
      );

      if (res.completed) {
        setParameters(res.data);
      }
    } catch (error) {
      handleError('@ReferenceBookPeriods/fetch', error);
    }
  };

  /**
   * Сохранение параметров справочника
   * @param {Array} data - `список параметров`
   */
  const setDump = (data) => {
    saveDump(data, 'guides.parameter');
  };

  /** Добавление элемента в список */
  const handleAdd = () => {
    setIsCreate(!isCreate);
  };

  /** Удаление выбранных элеменов из списка */
  const handleDelete = async () => {
    try {
      const deleteArray = renderData.filter((param) =>
        deleteData.has(param.id)
      );
      if (!deleteArray.length) {
        return;
      }
      const { model } = virualStore;

      const res = await LocalParamsApi.Delete({
        modelId: model.value,
        data: deleteArray,
      });

      saveDump(res.data, 'guides.parameter');
      setParameters(res.data);
    } catch (e) {
      handleWarn(e);
    }
  };

  const changeEdit = (value) => {
    setIsCreate(false);
    setEdit(value);
  };

  /** Передаем реф */
  useImperativeHandle(ref, () => ({
    ...ref,
    handleAdd,
    handleDelete,
  }));
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
                  deleteData.size < isNoGlobalMetrics.size
                }
                checked={
                  isNoGlobalMetrics.size > 0 &&
                  deleteData.size === isNoGlobalMetrics.size
                }
                onChange={(event) =>
                  onCheckboxAll(event, renderData, isNoGlobalMetrics)
                }
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
            <NewParameters
              setIsCreate={setIsCreate}
              setParameters={setParameters}
              saveDump={setDump}
              onEdit={setEdit}
            />
          )}
          {renderData.map((parameter, index) => (
            <Parameter
              key={parameter.id}
              id={index}
              parameter={parameter}
              onCheckbox={onCheckbox}
              deleteData={deleteData}
              onEdit={changeEdit}
              disabled={edit?.id !== parameter.id}
              setParameters={setParameters}
              saveDump={setDump}
              allowed={allowed}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
});

/** Назначаем displayName */
Parameters.displayName = 'Parameters';

/** Назначаем propTypes */
Parameters.propTypes = {
  edit: PropTypes.bool.isRequired,
  deleteData: PropTypes.instanceOf(Set).isRequired,
  onCheckbox: PropTypes.func.isRequired,
  onCheckboxAll: PropTypes.func.isRequired,
  saveDump: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  allowed: PropTypes.bool,
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

        '& td': {
          paddingTop: 8,
          paddingBottom: 8,
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
            width: 200,
          },
          '&:nth-child(5)': {
            width: 300,
          },
          '&:nth-child(6)': {
            width: 250,
          },
        },
      },

      edit: {
        cursor: 'pointer',
        transition: 'all 0.2s ease-out',
        '&:hover': {
          opacity: 0.6,
        },
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
        lineHeight: '16px',
        resize: 'none',

        '&:focus': {
          outline: 0,
          border: 'none',
        },
      },
    };
  },
  { index: 2, name: 'Parameters' }
);

export default Container(Parameters);
