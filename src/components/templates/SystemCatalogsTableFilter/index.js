/* eslint-disable sonarjs/no-identical-functions */
import React, { useState, useCallback, useMemo, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Scrollbar from 'react-scrollbars-custom';
import Popover from '@material-ui/core/Popover';
import Checkbox from '@material-ui/core/Checkbox';
import { SearchFieldGraph, Button } from 'components';
import CheckboxIcon from '../../svg/Checkbox';
import CheckboxChecked from '../../svg/CheckboxChecked';

/**
 * Фильтр колонок таблицы
 * @component
 * @public
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
function SystemCatalogsTableHeaderItemFilter({
  classes,
  visibleItems,
  anchorEl,
  noOptionsMessage,
  column,
  onClose,
  search,
  setSearch,
  data,
  toDelete,
  update,
  options,
  type,
  secondaryData,
}) {
  const styles = useStyles({ classes });
  const [searchState, setSearchState] = useState('');
  const inputRef = useRef(null);
  const menuListRef = useRef(null);
  const _handleClose = useCallback(
    (e) => {
      e.stopPropagation();
      if (onClose) onClose();
    },
    [onClose]
  );

  /**
   * Обработка нажатия на чекбокс фильтра по колонке
   * @param {object} obj
   * @param {any} value - значение из колонки
   */
  const handleCheckbox = async ({ action, value }) => {
    switch (action) {
      case 'add':
        setSearch({ ...search, [column]: [...search[column], value] });
        break;
      case 'delete':
        setSearch({
          ...search,
          [column]: search[column].filter((el) => el !== value),
        });
        break;
      default:
        break;
    }
  };

  /**
   * Функция определения высоты раскрывающегося списка.
   * Если опций нет или их меньше чем props.visibleItems, то высота пропорциональна количеству элементов, иначе равна максимуму и половине одного элемента
   * @returns {number} - высота списка в пикселях
   */
  const listHeight = () => {
    const listLength = searchResults.length;
    const childHeight =
      menuListRef && menuListRef.current
        ? menuListRef.current.children[0].clientHeight + 11
        : 0;
    if (listLength === 0) return childHeight;
    return listLength > visibleItems
      ? (visibleItems + 0.5) * childHeight
      : listLength * childHeight;
  };

  /**
   * Определение ширины фильтра
   */
  const listWidth = () => {
    if (!menuListRef || !menuListRef.current) return 300;
    return menuListRef.current.clientWidth;
  };

  /**
   * Получаем все значения для выделенной колонки
   * @returns {array} - массив значений для колонки
   */

  const collectColumnValues = () => {
    // Если данных нет или данной колонки нет в данных - нет опций для фильтра
    if (
      !type ||
      !options ||
      data.length === 0 ||
      !Object.prototype.hasOwnProperty.call(data[0], column)
    ) {
      return [];
    }
    // Отбираем все значения из начальных данных и обновлённых
    if (type !== 'multiselect' && type !== 'select') {
      // Собираем все значения в колонке, если они не подлежат удалению
      return [...data, ...Object.values(update)].map((el) =>
        (!toDelete.includes(el._id) ? el[column] : null)
      );
    }
    // Если опции для селектов приходят внутри заголовка
    if (options.values) {
      return options.values;
    }
    // Проверяем, что указаны данные для выбора значений для select и multiselect
    if (options.sourceDict && (options.sourceColumn || options.valueColumn)) {
      return secondaryData[options.sourceDict].map((el) =>
        (type === 'select'
          ? el[options.sourceColumn]
          : { value: el[options.valueColumn], label: el[options.labelColumn] })
      );
    }
    // Если данных не хватает - указываем, что опций нет
    return [];
  };

  // Уникальные значения в соответствии с колонкой
  const uniqueColumnValues = useMemo(() => {
    const exceptions = [null, undefined, ''];
    if (type === 'select' || type === 'multiselect') {
      return collectColumnValues(); // тк значения берутся из приходящего справочника предполагаем, что они уникальные
    }
    return collectColumnValues() // убираем дублирующиеся значения и исключения
      .filter(
        (el, index, self) =>
          self.indexOf(el) === index && !exceptions.includes(el)
      );
  }, [data, column]);

  // Фильтрация значений поиском внутри фильтра
  const searchResults = useMemo(
    () =>
      uniqueColumnValues.filter((item) =>
        String(item).toLowerCase().includes(searchState.toLowerCase())
      ),
    [uniqueColumnValues, searchState]
  );

  return (
    <Popover
      onClose={onClose}
      open={anchorEl !== null}
      classes={{ paper: styles.popover }}
      anchorEl={anchorEl}
      keepMounted
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}>
      <SearchFieldGraph
        onChange={(e) => setSearchState(e.target.value)}
        classes={{ root: styles.inputRoot }}
        value={searchState}
        placeholder={'Поиск'}
        focusRef={inputRef}
        width={'100%'}
      />
      <Scrollbar
        trackYProps={{ style: { width: 4 } }}
        thumbYProps={{
          style: {
            background: 'rgba(31, 142, 250, 0.4)',
            width: 4,
            borderRadius: 2,
          },
        }}
        style={{ height: listHeight(), width: listWidth() }}>
        <div>
          <div ref={menuListRef} id={'syslist'}>
            {searchResults.length === 0 ? (
              <div key={-1} onClick={_handleClose} className={styles.menuItem}>
                {noOptionsMessage}
              </div>
            ) : null}
            {searchResults.map((option, ind) => {
              const checked =
                column && search && search[column]
                  ? search[column].includes(option) ||
                    search[column].includes(option.value)
                  : false;
              return (
                <div style={{ height: 'fit-content' }} key={ind}>
                  <div
                    className={styles.menuItem}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}>
                    <Checkbox
                      checked={checked}
                      classes={{ root: styles.checkboxRoot }}
                      value={true}
                      icon={<CheckboxIcon />}
                      checkedIcon={<CheckboxChecked />}
                      onChange={() =>
                        handleCheckbox({
                          action: checked ? 'delete' : 'add',
                          value:
                            type === 'multiselect' && options.valueColumn
                              ? option.value
                              : option,
                        })
                      }
                    />
                    <div className={styles.itemText}>
                      {type === 'multiselect' && options.valueColumn
                        ? option.label
                        : String(option)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Scrollbar>
      <div className={styles.horizontalSeparator} />
      <div className={styles.closePopupWrapper}>
        <Button
          onClick={onClose}
          top={1}
          position={'left'}
          mod
          text={'Закрыть'}
          classes={{ button: styles.closePopupButton }}
        />
      </div>
    </Popover>
  );
}

const useStyles = makeStyles(
  (theme) => ({
    root: {
      // padding: "0 15px",
      // width: "100%"
    },
    popover: {
      maxWidth: 500,
      background: theme.colorsTheme.background,
      color: theme.colorsTheme.grey,
      padding: 15,
      zIndex: 999,
    },
    inputRoot: {
      marginBottom: 15,
    },
    closePopupButton: {
      padding: '6px 25px',
      margin: 'auto',
      marginRight: 0,
      color: theme.colorsTheme.text,
    },
    horizontalSeparator: {
      height: 1,
      width: '100%',
      background: theme.colorsTheme.nodeBackground,
      marginTop: 12,
      marginBottom: 12,
    },
    listRoot: {
      padding: 0,
    },
    menuItem: {
      borderBottom: `1px solid ${theme.colorsTheme.verticalSeparator}`,
      padding: '6px 16px',
      width: 'fit-content', // '100%',
      height: 47,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      paddingLeft: 0,
      color: theme.colorsTheme.text,
      fontSize: 14,
      display: 'flex',
      '&:last-child': {
        borderBottomColor: 'rgba(0, 0, 0, 0)',
      },
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
    },
    itemText: {
      margin: 'auto 0',
    },
  }),
  { name: 'SystemCatalogsTableHeaderItemFilter', index: 1 }
);

SystemCatalogsTableHeaderItemFilter.defaultProps = {
  visibleItems: 3,
  anchorEl: null,
  noOptionsMessage: 'Нет опций',
  column: null,
  onClose: () => {},
  toDelete: [],
  type: '',
  options: {
    sourceDict: '',
    valueColumn: '',
  },
};

SystemCatalogsTableHeaderItemFilter.propTypes = {
  classes: PropTypes.object,
  visibleItems: PropTypes.number,
  anchorEl: PropTypes.element,
  noOptionsMessage: PropTypes.string,
  column: PropTypes.string,
  onClose: PropTypes.func,
  data: PropTypes.array,
  search: PropTypes.object,
  setSearch: PropTypes.func,
  toDelete: PropTypes.array,
  update: PropTypes.object,
  options: PropTypes.object,
  type: PropTypes.string,
  secondaryData: PropTypes.object,
};

export default SystemCatalogsTableHeaderItemFilter;
