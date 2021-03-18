import React, { useEffect, createRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Scrollbar from 'react-scrollbars-custom';
import Popover from '@material-ui/core/Popover';
import { Button, SearchFieldGraph } from 'components';
import PropTypes from 'prop-types';
import { handleError } from 'helpers';
import MenuIcon from '../../svg/MenuIcon';
/**
 * Компонент селект
 * @public
 * @component
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
const SingleSelect = (props) => {
  const {
    classes,
    onChange,
    visibleItems,
    noOptionsMessage,
    noOptionsMessageSelect,
    options,
    width,
    isDisabled,
    selected,
    label,
    onSearch,
    isAsync,
    defaultSelected,
    customPlaceholder,
  } = props;
  const styles = useStyles({ classes });

  const refs = {
    inputRef: createRef(),
    rootRef: createRef(),
    menuListRef: createRef(),
  };

  const [state, setState] = useState({
    anchorEl: null,
    filterSelect: '',
    childHeight: 0,
  });

  // Переводит фокус на строку ввода фильтра по значениям выпадающего списка
  useEffect(() => {
    if (state.anchorEl) refs.inputRef.current.focus();
  }, [state.anchorEl]);

  /**
   * Функция добавления значения в массив выбранных
   * @param {string} value - Новый элемент массива
   */

  const _handleSelect = async (value) => {
    try {
      onChange(value);
      _handleClose();
    } catch (e) {
      handleError('@SingleSelect/_handleSelect', e);
    }
  };

  /**
   * Закрытие окна с вариантами значений для выбора
   */

  const _handleClose = async () => {
    try {
      setState({
        ...state,
        anchorEl: null,
        filterSelect: '',
      });
    } catch (e) {
      handleError('@SingleSelect/_handleClose', e);
    }
  };

  /**
   * Открытие окна выбора значений и подсчёт размера
   * элемента списка для корректного отображения окна
   * @param {event} event - Событие нажатия на селект
   */

  const _handleClick = async (event) => {
    try {
      if (!isDisabled) {
        setState({
          ...state,
          anchorEl: refs.rootRef.current,
          childHeight: refs.menuListRef.current
            ? refs.menuListRef.current.children[0].clientHeight
            : '',
        });
      }
    } catch (e) {
      handleError('@SingleSelect/_handleClick', e);
    }
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    setState({
      ...state,
      filterSelect: value,
    });
    if (onSearch) {
      onSearch(value);
    }
  };

  /**
   * Функция фильтрации опций
   * @returns {string[]} - Массив не выбранных опций
   * @param settings
   */

  const _filterSearchResults = (settings) => {
    try {
      const result = defaultSelected
        ? settings.filter((opt) => opt.value !== selected.value)
        : settings;

      if (isAsync) {
        return result;
      }

      return result.filter((opt) =>
        opt.label.toLowerCase().includes(state.filterSelect.toLowerCase())
      );
    } catch (e) {
      handleError('@SingleSelect/_filterSearchResults', e);
      return [];
    }
  };

  /**
   * Функция определения высоты раскрывающегося списка.
   * Если опций нет или их меньше чем props.visibleItems
   * то высота пропорциональна количеству элементов,
   * иначе равна максимуму и половине одного элемента
   * @returns {number} - высота списка в пикселях
   */

  const _getListHeight = () => {
    try {
      const listLength = _filterSearchResults(options).length;

      if (listLength === 0) {
        return state.childHeight;
      }
      if (listLength > visibleItems) {
        return (visibleItems + 0.5) * state.childHeight;
      }
      return listLength * state.childHeight;
    } catch (e) {
      handleError('@SingleSelect/_getListHeight', e);
      return false;
    }
  };

  const _inputValue = (opt) => {
    try {
      if (defaultSelected) {
        const result = opt.find((el) => el.value === selected.value);

        if (opt.length > 0 && selected === '') {
          return '';
        }
        if (result) {
          return result.label;
        }
      }
      return noOptionsMessageSelect;
    } catch (e) {
      handleError('@SingleSelect/_inputValue', e);
      return false;
    }
  };

  return (
    <div
      className={classNames(styles.root, { [styles.disabled]: isDisabled })}
      style={{ width: width }}>
      {label && <div className={styles.label}>{label}</div>}
      <div
        className={`${styles.select} ${isDisabled ? styles.disableSelect : ''}`}
        ref={refs.rootRef}
        onClick={_handleClick}>
        <Popover
          onClose={(e) => {
            e.stopPropagation();
            _handleClose();
          }}
          open={state.anchorEl !== null}
          keepMounted
          classes={{ paper: styles.popover }}
          anchorEl={state.anchorEl}
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
            value={state.filterSelect}
            placeholder={customPlaceholder || 'Поиск'}
            width={'100%'}
            focusRef={refs.inputRef}
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
            style={{ height: _getListHeight() }}>
            <div className={styles.listRoot}>
              <div ref={refs.menuListRef} id={'list'}>
                {_filterSearchResults(options).length === 0 && (
                  <div onClick={_handleClose} className={styles.menuItem}>
                    {noOptionsMessage}
                  </div>
                )}
                {_filterSearchResults(options).map((option, ind) => (
                  <div
                    key={ind}
                    className={styles.menuItem}
                    onClick={(e) => {
                      _handleSelect(option);
                      e.stopPropagation();
                    }}>
                    {option.label}
                  </div>
                ))}
              </div>
            </div>
          </Scrollbar>
          <div className={styles.horizontalSeparator} />
          <div className={styles.closePopupWrapper}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                _handleClose();
              }}
              top={1}
              position={'left'}
              mod
              text={'Закрыть'}
              classes={{ button: styles.closePopupButton }}
            />
          </div>
        </Popover>

        <div className={styles.selectedValues}>{_inputValue(options)}</div>
        <div
          className={classNames(styles.menuIcon, {
            [styles.rotate]: state.anchorEl,
            [styles.hidden]: isDisabled,
          })}>
          <MenuIcon />
        </div>
      </div>
    </div>
  );
};

SingleSelect.propTypes = {
  classes: PropTypes.object,
  defaultSelected: PropTypes.bool,
  defaultOptions: PropTypes.array,
  visibleItems: PropTypes.number,
  noOptionsMessage: PropTypes.string,
  noOptionsMessageSelect: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  selected: PropTypes.object,
  width: PropTypes.string,
  isAsync: PropTypes.bool,
  customPlaceholder: PropTypes.string,
};

SingleSelect.defaultProps = {
  label: '',
  defaultSelected: true,
  defaultOptions: [],
  visibleItems: 5,
  noOptionsMessage: 'Нет опций',
  noOptionsMessageSelect: 'Нет опций',
  isDisabled: false,
  selected: {},
  options: [],
  customPlaceholder: '',
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    ...theme.SelectComponent,
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
      flexDirection: 'column',
    },
    disabled: {
      cursor: 'initial',
    },
  }),
  { name: 'SingleSelect' }
);

export default SingleSelect;

// TODO: Проблема тестирования. UseEffect, useState и внутренние функции без экспорта
