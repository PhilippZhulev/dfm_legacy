import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Icon,
  SearchFieldGraph,
  MultiSelect,
} from 'components';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Scrollbar from 'react-scrollbars-custom';
import { handleError } from 'helpers';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { virualStore } from '../../../virtualStore';
import Middleware from '../../../services/middleware/index.js';

export const variantСalc = [
  { value: 'tariff', label: 'По тарифам' },
  { value: 'payment', label: 'По платам' },
];

/** Список цветов для категории */
export const COLOR_ITEMS = [
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

/** Заголовки для стобцов */
const TableHeadList = [
  'Код',
  'Название',
  'Цвет',
  'Подкатегории',
  'Варинант расчета',
];
/** Параметры для стобцов */
const TableBodyList = ['value', 'label', 'color'];

/**
 * Компонент с таблицей спавочника категории
 * @component
 * @public
 */
const Categories = (props) => {
  /** Состояние списка категорий */
  const [categories, setCategories] = useState([]);
  /** Состояние поиска */
  const [search, setSearch] = useState('');

  /** Получаем категории */
  useEffect(() => {
    fetch();
  }, []);

  /** Функция для получения категорий */
  const fetch = async () => {
    try {
      const { model } = virualStore;
      const res = await Middleware.GetDumpData(
        model,
        { type: 'category' },
        'referenceCompile'
      );

      if (res.completed) {
        setCategories(res.data);
      }
    } catch (error) {
      handleError('@ReferenceBookPeriods/fetch', error);
    }
  };

  /**
   * Поиск в параметре category
   * @param {Object} category - `элемент из таблицы`
   * @returns {Boolean} `true/false`
   */
  const searchFunc = (category) =>
    category.label.toLowerCase().includes(search.toLowerCase()) ||
    category.value.toLowerCase().includes(search.toLowerCase());

  /** Инициализация стилей */
  const classes = useStyles(props);

  /** Рендер компонента */
  return (
    <>
      <SearchFieldGraph
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        classes={{ root: classes.search }}
        width={'70%'}
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
        thumbXProps={{
          style: {
            background: 'rgba(31, 142, 250, 0.4)',
            borderRadius: 2,
          },
        }}
        style={{ height: 'calc(100% - 92px)' }}>
        <Table classes={{ root: classes.table }}>
          <TableHead stickyHeader>
            <TableRow>
              {TableHeadList.map((textHead) => (
                <TableCell key={textHead}>{textHead}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => {
              if (searchFunc(category)) {
                return (
                  <TableRow key={index}>
                    {TableBodyList.map((cell, indexCell) => (
                      <TableCell key={`${index}_${indexCell}_${cell}`}>
                        {cell !== 'color' && (
                          <TextareaAutosize
                            value={category[cell]}
                            className={classes.textArea}
                            spellCheck='false'
                            disabled={true}
                          />
                        )}

                        {cell === 'color' && (
                          <Select
                            value={category[cell] || '#EF5350'}
                            MenuProps={{ classes: { paper: classes.select } }}
                            onChange={() => {}}
                            IconComponent={(iconProps) => (
                              <Icon
                                icon='CHEVRON_DOWN'
                                size={16}
                                fillColor='transparent'
                                {...iconProps}
                              />
                            )}
                            className={classes.select}
                            classes={{ icon: classes.selectIcon }}
                            disabled={true}>
                            <MenuItem value={category[cell]}>
                              <div
                                style={{
                                  backgroundColor: category[cell] || '#EF5350',
                                  height: 16,
                                  width: '100%',
                                }}
                              />
                            </MenuItem>
                            {COLOR_ITEMS.filter(
                              (el) => el !== category[cell]
                            ).map((el, key) => (
                              <MenuItem key={key} value={el}>
                                <div
                                  style={{
                                    backgroundColor: el,
                                    height: 16,
                                    width: '100%',
                                  }}
                                />
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      {/* ! МОК */}
                      <MultiSelect
                        selected={category.subCategories}
                        isDisabled={true}
                        classes={{
                          root: classes.multiSelectRoot,
                        }}
                        onChange={() => {}}
                      />
                    </TableCell>
                    <TableCell>
                      {/* ! МОК */}
                      <MultiSelect
                        selected={
                          category.calcTypes?.map((el) =>
                            variantСalc.find((cur) => cur.value === el)
                          ) || []
                        }
                        options={variantСalc}
                        isDisabled={true}
                        classes={{
                          root: classes.multiSelectRoot,
                        }}
                        onChange={() => {}}
                      />
                    </TableCell>
                  </TableRow>
                );
              }

              return null;
            })}
          </TableBody>
        </Table>
      </Scrollbar>
    </>
  );
};

/** Назначаем displayName */
Categories.displayName = 'Categories';

/** Основные стили */
const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      title: {
        color: colorsTheme.nodeColor,
        fontSize: 20,
        marginBottom: 32,
      },

      table: {
        width: 'calc(100% - 4px)',
        tableLayout: 'fixed',
        marginBottom: 16,

        '& th': {
          top: -1,
        },

        '& th, & td': {
          '&:nth-child(1)': {
            width: 150,
          },
          '&:nth-child(2)': {
            width: 200,
          },
          '&:nth-child(3)': {
            width: 125,
          },
          '&:nth-child(4)': {
            width: 300,
            '& .MuiInputBase-root': {
              backgroundColor: 'transparent !important',
            },
          },
          '&:nth-child(5)': {
            width: 200,
          },
        },
      },

      selectIcon: {
        color: `${colorsTheme.grey} !important`,
        cursor: 'pointer',
        position: 'absolute',
        top: 'auto',
      },

      search: {
        maxWidth: 300,
        marginBottom: 16,
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

      select: {
        width: '100%',
        maxWidth: 200,
        background: 'inherit',
        color: '#fff',
        lineHeight: '18px',
        fontSize: 12,
        backgroundColor: colorsTheme.background,

        '&::before': {
          border: 'none !important',
        },
        '&::after': {
          border: 'none !important',
        },

        '& .MuiSelect-select:focus': {
          background: 'transparent',
        },
      },
    };
  },
  { index: 2, name: 'Categories' }
);

export default Categories;
