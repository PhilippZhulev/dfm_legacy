import React, { useEffect, createRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Scrollbar from 'react-scrollbars-custom';
import Popover from '@material-ui/core/Popover';
import { Button, SearchFieldGraph } from 'components';
import PropTypes from 'prop-types';
import { handleError } from 'helpers';
import ClearIcon from '@material-ui/icons/Clear';
import CloseIcon from '../../svg/CloseTagIcon';

// eslint-disable-next-line sonarjs/cognitive-complexity
function MultiSelect({
  classes,
  onChange,
  visibleItems,
  noOptionsMessage,
  options,
  width,
  isDisabled,
  selected,
  label,
  onSearch,
  isAsync,
}) {
  const styles = useStyles({ classes });

  /**
   * Компонент мультиселекта
   * @class
   * @callback [onChange] - Функция, вызываемая при изменении набора выбранных опций
   * @param {string[]} options - Массив опций для выбора
   * @param {string[]} [defaultOptions=[]] - Массив опций по-умолчанию
   * @param {number} [visibleItems=5] - Число видимых опций в раскрывающемся списке
   * @param {string} [noOptionsMessage=Нет опций] - Сообщение при отсутствии опций для выбора
   * @param {boolean} [isDisabled=false] - Отключить возможность редактирования поля
   * @public
   */

  const inputRef = createRef();
  const rootRef = createRef();
  const menuListRef = createRef();
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterSelect, setFilterSelect] = useState('');
  const [childHeight, setChildHeight] = useState(0);

  const includesByValue = (array, obj) =>
    array.reduce((flag, item) => flag || item.value === obj.value, false);

  /**
   * Функция добавления значения в массив выбранных
   * @param {string} value - Новый элемент массива
   */

  const handleSelect = (value) => {
    // setSelected([...selected, value]);
    onChange([...selected, value]);
    handleClose();
  };

  const handleSearch = (event) => {
    const { value } = event.target;

    if (onSearch) {
      onSearch(value);
    }
    setFilterSelect(value);
  };

  /**
   * Функция удаления значения из массива выбранных
   * @param {event} event - Событие при нажатии на кнопку удаления тега выбранного элемента
   * @param {object} item - Значение, которое будет удалено из массива выбранных значений
   */

  const deleteOption = (event, item) => {
    // setSelected(selected.filter(el => el.value !== item.value));
    onChange(selected.filter((el) => el.value !== item.value));

    event.stopPropagation();
  };

  /**
   * Закрытие окна с вариантами значений для выбора
   * @param {event} event - Событе нажатия на фон
   */

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  /**
   * Открытие окна выбора значений и подсчёт
   * размера элемента списка для корректного отображения окна
   * @param {event} event - Событие нажатия на селект
   */

  const handleClick = (event) => {
    if (!isDisabled) {
      setAnchorEl(rootRef.current);
      if (menuListRef.current) {
        setChildHeight(menuListRef.current.children[0].clientHeight);
      }
    }
  };

  // Переводит фокус на строку ввода фильтра по значениям выпадающего списка

  useEffect(() => {
    if (anchorEl) inputRef.current.focus();
  }, [anchorEl]);

  /**
   * Функция фильтрации опций
   * @param {string[]} options - Массив всех опций
   * @returns {string[]} - Массив не выбранных опций
   */

  const filterSearchResults = (opt) => {
    const res = opt.filter((option) => !includesByValue(selected, option));

    if (isAsync) {
      return res;
    }

    return res.filter(
      (option) =>
        option.label &&
        option.label.toLowerCase().includes(filterSelect.toLowerCase())
    );
  };

  const searchResults = filterSearchResults(options);

  /**
   * Функция определения высоты раскрывающегося списка.
   * Если опций нет или их меньше чем visibleItems,
   * то высота пропорциональна количеству элементов,
   * иначе равна максимуму и половине одного элемента
   * @returns {number} - высота списка в пикселях
   */

  const getListHeight = () => {
    try {
      const listLength = filterSearchResults(options).length;

      if (listLength === 0) {
        return childHeight;
      }
      if (listLength > visibleItems) {
        return (visibleItems + 0.5) * childHeight;
      }
      return listLength * childHeight;
    } catch (e) {
      handleError('@SingleSelect/getListHeight', e);
      return false;
    }
  };

  return (
    <div style={{ width: width }}>
      <div data-testid='label' className={styles.label}>
        {label}
      </div>
      <div
        data-testid='class'
        className={classNames(styles.root, { [styles.disabled]: isDisabled })}
        ref={rootRef}
        onClick={handleClick}>
        <Popover
          onClose={(e) => {
            e.stopPropagation();
            handleClose(e);
          }}
          open={anchorEl !== null}
          keepMounted
          classes={{ paper: styles.popover }}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}>
          <SearchFieldGraph
            onChange={handleSearch}
            classes={{ root: styles.inputRoot }}
            value={filterSelect}
            placeholder={'Поиск'}
            width={'100%'}
            focusRef={inputRef}
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
            style={{ height: getListHeight() }}>
            <div classes={{ root: styles.listRoot }}>
              <div ref={menuListRef} id={'list'}>
                {searchResults.length === 0 && (
                  <div className={styles.menuItem} onClick={handleClose}>
                    {noOptionsMessage}
                  </div>
                )}
                {searchResults.map((option, ind) => (
                  <div
                    className={styles.menuItem}
                    key={ind}
                    onClick={() => handleSelect(option)}>
                    {option.label}
                  </div>
                ))}
              </div>
            </div>
          </Scrollbar>
          <div className={styles.horizontalSeparator} />
          <div
            data-testid='closePopupWrapper'
            className={styles.closePopupWrapper}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              top={1}
              position={'left'}
              mod
              text={'Закрыть'}
              classes={{ button: styles.closePopupButton }}
            />
          </div>
        </Popover>

        <div data-testid='selectedValues' className={styles.selectedValues}>
          {selected.map((option, ind) => (
            <div key={ind} className={styles.selectedValue}>
              <span className={styles.selectedValueLabel}>{option.label}</span>
              <div
                className={styles.closeTag}
                onClick={(e) => deleteOption(e, option)}
                style={{ display: isDisabled ? 'none' : 'flex' }}>
                <CloseIcon />
              </div>
            </div>
          ))}
        </div>
        <div
          data-testid='controlElements'
          className={styles.controlElements}
          style={{ visibility: isDisabled ? 'hidden' : 'visible' }}>
          <ClearIcon
            onClick={(e) => {
              e.stopPropagation();
              onChange([]);
            }}
          />
        </div>
      </div>
    </div>
  );
}

MultiSelect.propTypes = {
  classes: PropTypes.object,
  defaultOptions: PropTypes.array,
  visibleItems: PropTypes.number,
  noOptionsMessage: PropTypes.string,
  noOptionsMessageSelect: PropTypes.string,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  width: PropTypes.string,
  isAsync: PropTypes.bool,
};

MultiSelect.defaultProps = {
  label: '',
  defaultOptions: [],
  visibleItems: 5,
  noOptionsMessage: 'Нет опций',
  noOptionsMessageSelect: 'Нет опций',
  isDisabled: false,
  options: [],
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    ...theme.multiSelecComponent,
    closeTag: {
      width: 20,
      height: 20,
      minWidth: 20,
      marginRight: -6,
      marginTop: 6,
      marginLeft: 6,
      '& svg': {
        width: 14,
        cursor: 'pointer',
        height: 14,
        margin: 'auto',
      },
      '& path': {
        fill: '#FFFFFF',
        fillOpacity: 0.56,
      },
    },
    menuItem: {
      padding: '6px 16px',
      width: 'auto',
      overflow: 'hidden',
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '1.5',
      whiteSpace: 'nowrap',
      cursor: 'pointer',
      '&:hover': {
        background: '#2d384e',
      },
    },
    root: {
      background: 'transparent',
      cursor: 'pointer',
      display: 'flex',
    },
    disabled: {
      cursor: 'initial',
    },
  }),
  { name: 'MultiSelect' }
);

export default MultiSelect;

// TODO: Проблема тестирования. UseEffect и внутренние функции без экспорта
