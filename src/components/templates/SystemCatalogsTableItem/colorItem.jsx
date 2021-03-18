/* eslint-disable max-lines */
import React, { useState, useMemo, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Icon } from 'components';

const COLOR_ITEMS = [
  '#EF5350',
  '#AB47BC',
  '#7E57C2',
  '#42A5F5',
  '#26C6DA',
  '#26A69A',
  '#66BB6A',
  '#D4E157',
  '#FFEE58',
  '#FFA726',
  '#FF7043',
  '#8D6E63',
  '#EC407A',
  '#78909C',
  '#5C6BC0',
];

/**
 * Элемент таблицы системых справочников
 * @component
 * @public
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
function ColorItem({
  classes,
  noLeft,
  column,
  row,
  enableEdit,
  checked,
  options,
  type,
  catalog,
  data,
  update,
  setUpdate,
}) {
  const getInitialInput = () => {
    const updateRow = update?.[data[row]._id];
    const dataRow = updateRow || data[row];
    if (dataRow[column] === undefined) {
      return COLOR_ITEMS[0];
    }
    return dataRow[column];
  };

  const [input, setInput] = useState(getInitialInput());
  const styles = useStyles({ classes });
  /** REVIEW: Это не просто пиздец, это полный пиздец... Нужно преписать с нуля все */
  const _getOptions = useMemo(() => {
    if (!options) return [];
    if (options.values) {
      return options.values.map((el) => ({ label: String(el), value: el }));
    }
    if (options.sourceDict) {
      if (!catalog.secondaryData[options.sourceDict]) return [];
      const uniqueValues = catalog.secondaryData[options.sourceDict]
        .map((el) => el[options.sourceColumn])
        .filter((el, index, self) => self.indexOf(el) === index); // Нужна ли фильтрация уникальных значений?
      return uniqueValues.map((el) => ({ label: String(el), value: el }));
    }
    return [];
  }, [options]);

  /**
   * Функция сбора данных для объекта обновлённых данных
   * @return {object} - строка с обновлёнными данными
   */
  const collectUpdateRow = () => { // Дописать поддержку values
    let updatedRow = {};
      if (
        catalog.secondaryData[options.sourceDict] &&
        catalog.secondaryData[options.sourceDict].length !== 0
      ) {
        updatedRow[column] = input;
        const sourceRow = catalog.secondaryData[options.sourceDict].find(
          (el) => el[options.sourceColumn] === input
        );
        if (options.pairedColumns && sourceRow) {
          options.pairedColumns.forEach((col) => {
            updatedRow[col.to] = sourceRow[col.from];
          });
        }
      } else updatedRow = { [column]: input };
      return updatedRow;
  };

  const _shouldUpdate = () => {
    const updateRow = update?.[data[row]._id];
    const dataRow = updateRow || data[row];
    return input !== dataRow[column];
  };

  // Обработка добавления нового элемента: запись данных в update + pairedRows
  /** REVIEW: Это не просто пиздец, это полный пиздец... Нужно преписать с нуля все */
  useEffect(() => {
    if (_shouldUpdate()) {
      if (update?.[data[row]._id]) {
        setUpdate({
          ...update,
          [data[row]._id]: { ...update?.[data[row]._id], ...collectUpdateRow() },
        });
      } else {
        setUpdate({ ...update, [data[row]._id]: { ...data[row], ...collectUpdateRow() } });
      }
    }
  }, [input]);

  useEffect(() => {
    if (Object.keys(update).length !== 0) {
      const newInput = update?.[data[row]._id];
      if (newInput && newInput[column] !== input) {
        setInput(newInput[column]);
      }
    }
  }, [update]);

  return (
    <Select
      value={input || '#EF5350'}
      MenuProps={{ classes: { paper: styles.selectMenu } }}
      onChange={(e) => setInput(e.target.value) }
      disableUnderline
      IconComponent={(iconProps) => (
        <Icon
          icon='CHEVRON_DOWN'
          size={16}
          fillColor='transparent'
          {...iconProps}
        />
      )}
      className={styles.select}
      classes={{ icon: styles.selectIcon }}
      disabled={!enableEdit || !options.mutable}>
      <MenuItem value={input}>
        <div
          style={{
            backgroundColor: input || '#EF5350',
            height: 16,
            width: '100%',
          }}
        />
      </MenuItem>
      {COLOR_ITEMS.filter((el) => el !== input).map(
        (el, key) => (
          <MenuItem key={key} value={el}>
            <div
              style={{
                backgroundColor: el,
                height: 16,
                width: '100%',
              }}
            />
          </MenuItem>
        )
      )}
    </Select>);
    }

    const useStyles = makeStyles(
      (theme) => ({
        select: {
          width: '100%',
          background: 'rgba(0,0,0,0)',
          color: 'white',
          lineHeight: '18px',
          fontSize: 12,
          padding: '6px 15px',
          '& .MuiSelect-icon': {
            color: 'white',
          },
        },
        selectMenu: {
          width: 'unset',
          // background: 'rgba(0,0,0,0)',
          background: theme.colorsTheme.background,
          color: 'white',
          lineHeight: '18px',
          fontSize: 12,
        },
      }),
      { name: 'ColorItem', index: 1 }
    );

    ColorItem.defaultProps = {
      noLeft: true,
      column: null,
      row: 0,
      enableEdit: false,
      checked: false,
      options: {},
      type: null,
      update: {},
    };

    ColorItem.propTypes = {
      classes: PropTypes.object,
      noLeft: PropTypes.bool,
      column: PropTypes.string,
      row: PropTypes.number,
      enableEdit: PropTypes.bool,
      checked: PropTypes.bool,
      options: PropTypes.object,
      type: PropTypes.string,
      catalog: PropTypes.object,
      data: PropTypes.array,
      update: PropTypes.object,
      setUpdate: PropTypes.func,
    };

    export default ColorItem;
