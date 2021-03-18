/* eslint-disable max-lines */
import React, { useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import PropTypes from 'prop-types';
import Scrollbar from 'react-scrollbars-custom';
import classNames from 'classnames';
import color from 'color';
import {
  SystemCatalogsToolPanel,
  SystemCatalogsTableRow,
  SystemCatalogsTableHeader,
} from 'components';

/**
 * Задание начального состояния для поиска на основе массива ключей колонок
 * @param {array} array - массив id колонок
 * @public
 */
function getInitialState(array) {
  const state = {};
  array.forEach((item) => {
    state[item] = [];
  });
  return state;
}

/**
 * Таблица для системных
 * @component
 * @public
 */
function SystemCatalogsTable({
  classes,
  catalog,
  setCatalog,
  onCancel,
  onSave,
  onPageChange,
  onDelete,
  onSearch,
  onAdd,
}) {
  const styles = useStyles({ classes });

  const {
    data,
    header,
    totalPages,
    secondaryData,
    dictType,
    selects,
  } = catalog;

  const [checkedRows, setCheckedRows] = useState({});
  const [enableEdit, setEnableEdit] = useState(false);
  const [update, setUpdate] = useState({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  // Состояние чекбокса в заголовке, может принимать значения null, 'checked', 'indeterminate'
  const checkState = useMemo(() => {
    const checkedRowsNum = Object.keys(checkedRows).filter(
      (el) => checkedRows[el]
    ).length;
    if (checkedRowsNum === 0) return null;
    return checkedRowsNum === data.length ? 'checked' : 'intermediate';
  }, [checkedRows]);

  /**
   * Выделение всех строк через checkbox в заголовке
   * @public
   */
  const _handelSelectAllRows = async () => {
    const checkedRowsNum = Object.keys(checkedRows).filter(
      (el) => checkedRows[el]
    ).length;
    if (checkedRowsNum === data.length) {
      setCheckedRows({});
      return;
    }
    setCheckedRows(
      data.reduce((res, row) => {
        res[row._id] = true;
        return res;
      }, {})
    );
  };

  /**
   * Выдулуние строки через checkbox в строке
   * @param {number} id - номер выделяемой строки
   */
  const _handelSelectRow = async (id) => {
    setCheckedRows({ ...checkedRows, [id]: !checkedRows[id] });
  };

  /**
   * Обработчик переключения режима редактирования
   */
  const _handleSwitchEdit = async () => {
    setEnableEdit(!enableEdit);
    setUpdate({});
    setCheckedRows({});
  };

  /**
   * Обработка удаления выделенных строк таблицы
   * @public
   */
  const _handleDelete = async () => {
    onDelete(checkedRows, search);
    setCheckedRows({});
    setEnableEdit(false);
    setUpdate({});
  };

  const _handleSave = async () => {
    const updateData = Object.keys(update).map((el) => update[el]);
    if (updateData.length > 0) {
      onSave(updateData, search);
      setUpdate({});
    }
    setCheckedRows({});
  };

  const _handleAdd = async () => {
    const newRow = onAdd();
    setCatalog({ ...catalog, data: [newRow, ...data] });
  };

  const _handlePageChange = async (_, newPage) => {
    setPage(newPage);
    onPageChange(search, newPage);
  };

  const _handleSearch = async (e) => {
    const string = e.target.value;
    setSearch(string);
    clearTimeout(window.catalogSearchInput);
    if (string.length > 3 || string.length === 0) {
      window.catalogSearchInput = setTimeout(() => {
        onSearch(string);
        setPage(1);
        setUpdate({});
        setCheckedRows({});
      }, 1000);
    }
  };

  const _handleCancel = async () => {
    onCancel(search);
    setUpdate({});
    setCheckedRows({});
  };

  return (
    <>
      <SystemCatalogsToolPanel
        switchEnableEdit={_handleSwitchEdit}
        onDelete={_handleDelete}
        showDelete={Boolean(
          Object.keys(checkedRows).find((el) => checkedRows[el])
        )}
        enableEdit={enableEdit}
        onCancel={_handleCancel}
        onSave={_handleSave}
        onAdd={_handleAdd}
        onSearch={_handleSearch}
        search={search}
      />
      <div
        className={classNames(styles.root, {
          [styles.enableEdit]: enableEdit,
        })}>
        <div className={styles.scrollWrapper}>
          <Scrollbar
            trackYProps={{ style: { width: 4, right: -15 } }}
            thumbYProps={{
              style: {
                background: 'rgba(31, 142, 250, 0.4)',
                width: 4,
                borderRadius: 2,
              },
            }}
            trackXProps={{
              style: { height: 4, bottom: -15, display: 'block' },
            }}
            thumbXProps={{
              style: {
                background: 'rgba(31, 142, 250, 0.4)',
                width: 4,
                borderRadius: 2,
              },
            }}
            style={{ height: '100%', width: '100%' }}>
            <table className={styles.tableWrapper}>
              <SystemCatalogsTableHeader
                checkState={checkState}
                onChange={_handelSelectAllRows}
                enableEdit={enableEdit}
                items={header}
              />
              <tbody>
                {data.map((row) => (
                  <SystemCatalogsTableRow
                    dictType={dictType}
                    enableEdit={enableEdit}
                    secondaryData={secondaryData}
                    selects={selects}
                    key={row._id}
                    data={update?.[row._id] || row}
                    checked={checkedRows[row._id]}
                    onSelect={() => _handelSelectRow(row._id)}
                    onChange={(res) => setUpdate({ ...update, [row._id]: res })}
                  />
                ))}
              </tbody>
            </table>
          </Scrollbar>
        </div>
        <Pagination
          page={page}
          classes={{ root: styles.pagination }}
          count={totalPages}
          onChange={_handlePageChange}
        />
      </div>
    </>
  );
}

const useStyles = makeStyles(
  (theme) => ({
    root: {
      height: 'calc(100% - 95px - 32px)',
      margin: '0 36px',
    },
    scrollWrapper: {
      height: 'calc(100% - 30px)',
      position: 'relative',
    },
    headerCheck: {
      width: 42,
      height: 42,
      background: 'yellow',
      position: 'absolute',
      top: 0,
      left: -42,
    },
    enableEdit: {
      marginLeft: 0,
    },
    tableWrapper: {
      // paddingRight: 21,
      borderSpacing: 0,
    },
    tableHeader: {
      display: 'table-row',
      width: 'fit-content',
      background: theme.colorsTheme.headerBackground,
      zIndex: 3,
      paddingRight: 21,
    },
    headerItem: {
      '&:nth-child(2)': {
        borderLeft: `1px solid ${theme.colorsTheme.headerBorders}`,
      },
    },
    checkboxItem: {
      width: 42,
      position: 'sticky',
      top: 0,
      left: 0,
      zIndex: 7,
      background: theme.colorsTheme.categoryBackground,
      display: 'table-cell',
      '& .MuiSvgIcon-root': {
        '& path': {
          fill: theme.colorsTheme.grey,
        },
      },
      '& .Mui-checked .MuiSvgIcon-root': {
        '& path': {
          fill: `${theme.colorsTheme.selected}!important`,
        },
      },
      '& .MuiCheckbox-indeterminate .MuiSvgIcon-root': {
        '& path': {
          fill: `${theme.colorsTheme.selected}!important`,
        },
      },
    },
    checkboxItemHeader: {
      top: 0,
      left: 0,
      zIndex: 7,
    },
    checkboxItemBody: {
      left: 0,
      zIndex: 6,
    },
    checkboxRoot: {
      '& svg': {
        minWidth: 16,
        minHeight: 16,
        fill: 'rgba(0,0,0,0)',
      },
      '&.Mui-checked + span': {
        color: theme.colorsTheme.text,
      },
      '&.Mui-checked svg': {
        background: theme.colorsTheme.text,
        borderRadius: 4,
      },
      margin: 'auto 0',
    },
    row: {
      display: 'table-row',
      position: 'relative',
      width: 'fit-content',
      '&:first-child': {
        '& input': {
          height: 'calc(100% - 1px)',
        },
        // '& $itemWrapper': {
        //   borderTop: `0.5px solid ${theme.colorsTheme.disabled}!important`,
        // },
      },
      '&:last-child .select__menu': {
        top: 'unset',
        bottom: '100%',
      },
    },
    pagination: {
      marginTop: 20,
      '& .MuiPaginationItem-root': {
        color: theme.colorsTheme.text,
      },
      '& .MuiPaginationItem-page': {
        '&.Mui-selected': {
          backgroundColor: `rgba(${
            color(theme.colorsTheme.tabButtonSelection).rgb().color
          },0.4)`,
        },
        '&:hover': {
          backgroundColor: `rgba(${
            color(theme.colorsTheme.tabButtonSelection).rgb().color
          },0.2)`,
        },
      },
    },
  }),
  { name: 'SystemCatalogsTable' }
);

SystemCatalogsTable.defaultProps = {
  enableEdit: false,
  catalog: '',
  onCancel: () => {},
  onSave: () => {},
  onPageChange: () => {},
  onDelete: () => {},
  onAdd: () => {},
};

SystemCatalogsTable.propTypes = {
  classes: PropTypes.object,
  catalog: PropTypes.object.isRequired,
  setCatalog: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  onPageChange: PropTypes.func,
  onDelete: PropTypes.func,
  onSearch: PropTypes.func,
  onAdd: PropTypes.func,
};

export default SystemCatalogsTable;
