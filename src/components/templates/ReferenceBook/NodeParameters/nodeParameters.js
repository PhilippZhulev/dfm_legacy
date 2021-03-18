import React, {
  useState,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from 'components';
import { handleError } from 'helpers';
import PropTypes from 'prop-types';
import { useStyles } from './style';
import { NodeParameter } from './nodeParameter';
import { NewNodeParameter } from './newNodeParameter';
import { virualStore } from '../../../../virtualStore';
import Middleware from '../../../../services/middleware/index.js';
import { checkValid, checkSameValue } from '../../../../services/validation';
import { Container } from '../container';

const TABLE_HEAD = ['Код', 'Название', 'Значение', 'Описание'];
const TABLE_HEAD_MAP = {
  value: 'Код',
  label: 'Название',
  volume: 'Значение',
  description: 'Описание',
};

const NodeParameters = React.forwardRef((props, ref) => {
  const [parameters, setParameters] = useState([]);
  const [deleteData, setDeleteData] = useState(new Set());

  const [edit, setEdit] = useState(null);
  const [isCreate, setIsCreate] = useState(false);

  const [cancel, setCancel] = useState(0);

  /** Инициализация стилей */
  const classes = useStyles(props);

  const { resource, saveDump, allowed, search } = props;

  /**
   * Фильтрация данных
   * @param el
   * @returns {boolean}
   */
  const filterSearch = (el) => {
    const searchString = search.toLowerCase();
    const { value, label, description } = el;
    const isResult = (str) => String(str).toLowerCase().includes(searchString);
    return isResult(value) || isResult(label) || isResult(description);
  };

  /**
   * Данные справочника
   * @type {*}
   */
  const renderData = useMemo(() => parameters.filter(filterSearch), [
    search,
    parameters,
  ]);

  /** Получаем данных */
  useEffect(() => {
    fetch();
  }, []);

  /** Функция для получения данных */
  const fetch = async () => {
    try {
      const { model } = virualStore;
      const res = await Middleware.GetDumpData(
        model,
        { type: 'nodeParameters', resource },
        'referenceCompile'
      );

      if (res.completed) {
        setParameters(res.data);
        // handleTotalPages(res.data);
      }
    } catch (error) {
      handleError('@ReferenceBookPeriods/fetch', error);
    }
  };

  // TODO: Добавить после реализации общего справочника параметров узла

  /** Функция для получения данных */
  // const fetchAll = async () => {
  //   try {
  //     const { model } = virualStore;
  //     const res = await NodeParametersApi.getAll({
  //       modelId: model.value,
  //     });

  //     if (res.code >= 200) {
  //       setAllParameters(res.data);
  //     } else {
  //       handleWarn({
  //         message: 'Ошибка загрузки общего справочника параметров узла',
  //       });
  //     }
  //   } catch (error) {
  //     handleError('@ReferenceBookPeriods/fetchAll', error);
  //   }
  // };

  /**
   * Выбираем какой параметр удалить
   * @param {String} id - `id параметра`
   */
  const handleCheckbox = (_, id) => {
    if (deleteData.has(id)) {
      deleteData.delete(id);
      setDeleteData(new Set(deleteData));
      return;
    }

    deleteData.add(id);
    setDeleteData(new Set(deleteData));
  };

  const handleAdd = () => {
    setCancel(cancel + 1);
    setEdit(null);
    setIsCreate(!isCreate);
  };

  const handleChangeEdit = (param) => {
    setCancel(cancel + 1);
    setEdit(param);
  };

  /** Передаем реф */
  useImperativeHandle(ref, () => ({
    ...ref,
    handleAdd,
  }));

  const handleValid = (form, fields = Object.keys(TABLE_HEAD_MAP)) => {
    let validation = checkValid(form, TABLE_HEAD_MAP, fields);
    if (validation.status) {
      return {
        ...validation,
        message: `Не заполнено поле "${validation.field}"`,
      };
    }
    const { model } = virualStore;
    const msgBase = 'Параметр с таким кодом существует в параметрах';
    validation = checkSameValue(form, model.parameters, `${msgBase} модели`);
    if (validation.status) {
      return validation;
    }
    validation = checkSameValue(form, parameters, `${msgBase} узла`, true);
    return validation;
  };

  /**
   * Сохранение параметров узла
   * @param {Array} data - `список параметров`
   */
  const setDump = (data) => {
    saveDump(data, 'nodeParameter');
  };

  return (
    <>
      <Table classes={{ root: classes.table }}>
        <TableHead stickyHeader>
          <TableRow>
            <TableCell />

            {TABLE_HEAD.map((textHead) => (
              <TableCell key={textHead}>{textHead}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isCreate && !edit && (
            <NewNodeParameter
              setParameters={setParameters}
              setIsCreate={setIsCreate}
              resource={resource}
              saveDump={setDump}
            />
          )}
          {renderData.map((parameter, index) => {
            const disabled = !!(!edit || parameter.value !== edit?.value);
            return (
              <NodeParameter
                key={index}
                parameter={parameter}
                deleteData={deleteData}
                disabled={disabled}
                onEdit={handleChangeEdit}
                onCheckbox={handleCheckbox}
                resource={resource}
                setParameters={setParameters}
                saveDump={setDump}
                allowed={allowed}
                cancel={cancel}
              />
            );
          })}
        </TableBody>
      </Table>
    </>
  );
});

/** Назначаем displayName */
NodeParameters.displayName = 'NodeParameters';

/** Назначаем propTypes */
NodeParameters.propTypes = {
  resource: PropTypes.string.isRequired,
  edit: PropTypes.bool,
  deleteData: PropTypes.instanceOf(Set),
  onCheckbox: PropTypes.func,
  onCheckboxAll: PropTypes.func,
  saveDump: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  categories: PropTypes.array,
  mapCategories: PropTypes.object,
  allowed: PropTypes.bool,
};

export default Container(NodeParameters);
