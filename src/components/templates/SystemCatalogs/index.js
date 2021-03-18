import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TabButton, SystemCatalogsTable } from 'components';
import { handleWarn } from 'helpers';
import HandleDict from './handleDict';
import SystemDict from '../../../services/api/systemDict';

function catalogAPI(dict) {
  switch (dict) {
    case 'DICT_ACCESS_GROUP':
      return SystemDict.accessGroup;
    case 'ACCESS_GROUPS_AUTHORITY_OBJECT':
      return SystemDict.accessGroupsAuthorityObject;
    case 'ACCESS_GROUP_USER':
      return SystemDict.accessGroupUser;
    case 'USER_ACTION':
      return SystemDict.userAction;
    case 'ACCESS_CATEGORY':
      return SystemDict.accessCategory;
    case 'USER':
      return SystemDict.user;
    case 'AUTHORITY_OBJECT':
      return SystemDict.authorityObject;
    case 'AUTHORITY_OBJECT_TYPE':
      return SystemDict.authorityObjectType;
    default:
      handleWarn({ message: 'Отсутствует API для выбранного справочника' });
      return null;
  }
}

function handleDict(dict) {
  switch (dict) {
    case 'DICT_ACCESS_GROUP':
      return HandleDict.accessGroup;
    case 'ACCESS_GROUPS_AUTHORITY_OBJECT':
      return HandleDict.accessGroupsAuthorityObject;
    case 'ACCESS_GROUP_USER':
      return HandleDict.accessGroupUser;
    default:
      return HandleDict.unknown;
  }
}

const catalogs = [
  {
    value: 'DICT_ACCESS_GROUP',
    label: 'Группы доступа',
    additionalDicts: ['ACCESS_CATEGORY'],
  },
  {
    value: 'ACCESS_GROUPS_AUTHORITY_OBJECT',
    label: 'Связь группы и объекта полномочий',
    additionalDicts: ['DICT_ACCESS_GROUP', 'USER_ACTION', 'AUTHORITY_OBJECT'],
  },
  {
    value: 'ACCESS_GROUP_USER',
    label: 'Связь группы и пользователя',
    additionalDicts: ['USER', 'DICT_ACCESS_GROUP'],
  },
];

/**
 * Компонент внутренней части модального окна системных справочников
 * @component
 * @public
 */
function SystemCatalogs({ classes }) {
  const styles = useStyles({ classes });
  const [catalog, setCatalog] = useState({
    data: [],
    header: [],
    dictType: '',
    totalPages: 0,
    secondaryData: {},
  });
  const [selected, setSelected] = useState(catalogs[0]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    _handleLoad();
  }, [selected]);

  /**
   * Обработчик нажатия на кнопку перехода к справочнику
   * @param {object} item - справочник
   */
  const _handleClick = async (item) => {
    setLoaded(false);
    setSelected(item);
  };

  /**
   * Генерация id
   * @param {array} data - массив данных
   * @param {string} dict - id словаря
   * @returns {array} - дополненный массив данных
   */

  const _mapId = (data, dict) =>
    data.map((row) => ({ ...row, _id: handleDict(dict).getId(row) }));

  const _handleLoad = async () => {
    try {
      const mainPromise = catalogAPI(selected.value)?.getAll({
        query: { page: 0, size: 10 },
      });
      const additionalPromises = selected.additionalDicts.map((dict) =>
        catalogAPI(dict)?.getAll({ query: { page: 0, size: 999 } })
      );
      const [res, ...additionalRes] = await Promise.all([
        mainPromise,
        ...additionalPromises,
      ]);
      const secondaryData = selected.additionalDicts.reduce(
        (set, dict, ind) => ({
          ...set,
          [dict]: additionalRes[ind]?.data || additionalRes[ind],
        }),
        {}
      );

      setCatalog({
        ...catalog,
        data: _mapId(res.data, selected.value),
        totalPages: res.totalPage,
        dictType: selected.value,
        header: handleDict(selected.value).header,
        secondaryData,
        selects: handleDict(selected.value).getSelects(secondaryData),
      });
      setLoaded(true);
    } catch (e) {
      handleWarn({ message: 'Ошибка получения данных справочника' });
    }
  };

  /**  */
  const checkData = (el) => {
    if (!loaded || !catalog.data.length === 0 || catalog.header.length === 0) {
      if (!loaded && !catalog.data.length === 0) {
        handleWarn({
          message: 'Отстутствуют данные по выбранному справочнику',
        });
      }
      return null; // TODO: при отсутствии данных заменить null на прелоадер
    }
    return el;
  };

  /**
   * Обработка отмены изменений
   * @public
   */
  const _handleCancel = async (search) => {
    setLoaded(false);
    _handleReload(search);
  };

  const _handleReload = async (string = '', page = 1) => {
    const promise = await catalogAPI(selected.value)?.getAll({
      query: { page: page - 1, size: 10, search: string },
    });
    setCatalog({
      ...catalog,
      data: _mapId(promise.data, selected.value),
      totalPages: promise.totalPage,
    });
    setLoaded(true);
  };

  /**
   * Обработка отправки изменений
   * @public
   */
  const _handleSave = async (data, search) => {
    try {
      await catalogAPI(selected.value)?.saveAll({
        data,
      });
    } catch (e) {
      handleWarn({ message: e });
    }
    _handleReload(search);
  };

  const _handleDelete = async (checkedRows, search) => {
    const deleteRows = catalog.data.filter((el) => checkedRows[el._id]);
    await catalogAPI(selected.value)?.deleteAll({
      data: deleteRows,
    });
    _handleReload(search);
  };

  /**
   * Обработка смены страницы
   * @param {number} page - целевая страница
   */

  const _handlePageChange = async (string, page) => {
    _handleReload(string, page);
  };

  const _handleSearch = async (string) => {
    _handleReload(string);
  };

  const _handleCreate = () => {
    const _id = String(Math.random()).substr(2, 6);
    return { _id, ...handleDict(selected.value).newRow };
  };

  return (
    <div className={styles.root}>
      <div className={styles.catalogMenu}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>Справочники полномочий</div>
        </div>
        {catalogs.map((item) => (
          <TabButton
            key={item.value}
            label={item.label}
            selected={item.value === selected.value}
            classes={{ label: styles.buttonLabel }}
            onClick={() => _handleClick(item)}
          />
        ))}
      </div>
      <div className={styles.workspace}>
        {checkData(
          <SystemCatalogsTable
            catalog={catalog}
            setCatalog={setCatalog}
            onCancel={_handleCancel}
            onSave={_handleSave}
            onPageChange={_handlePageChange}
            onDelete={_handleDelete}
            onSearch={_handleSearch}
            onAdd={_handleCreate}
          />
        )}
      </div>
    </div>
  );
}

SystemCatalogs.propTypes = {
  classes: PropTypes.object,
};

const useStyles = makeStyles(
  (theme) => ({
    root: {
      height: 'fit-content',
      display: 'flex',
      borderRadius: 8,
      zIndex: 999,
      margin: -43,
    },
    catalogMenu: {
      width: 300,
      background: theme.colorsTheme.nodeBackground,
      height: 'calc(100vh - 70px)',
    },
    workspace: {
      width: 'calc(100% - 300px)',
      height: 'calc(100vh - 70px)',
      background: theme.colorsTheme.categoryBackground,
    },
    titleWrapper: {
      display: 'flex',
      height: 95,
    },
    title: {
      margin: 'auto 0',
      marginLeft: 34,
      color: theme.colorsTheme.text,
      fontSize: 18,
      lineHeight: '25px',
      width: 'max-content',
    },
    buttonLabel: {
      fontSize: 14,
    },
  }),
  { name: 'SystemCatalogs' }
);

export default SystemCatalogs;
