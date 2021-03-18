import React, { useState, useEffect, useMemo } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Pagination from '@material-ui/lab/Pagination';
import Scrollbar from 'react-scrollbars-custom';
import Grid from '@material-ui/core/Grid';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  SearchFieldGraph,
} from 'components';
import classNames from 'classnames';
import { handleWarn, useDebounce, debouncePromise } from 'helpers';
import BusinessDict from '../../../../services/api/businessDict';
import { NewCategory } from './newCategory';
import { Category } from './category';
import { useStyles } from './style';
import { checkValid } from '../../../../services/validation';

const TableHeadList = [
  '',
  'Код',
  'Название',
  'Цвет',
  'Описание',
  'Глобальный',
  'Подкатегории',
  'Вариант расчета',
];

const mapFieldToHeader = {
  value: 'Код',
  label: 'Название',
  color: 'Цвет',
  description: 'Описание',
  isGlobal: 'Глобальный',
  subCategories: 'Подкатегории',
  calcTypes: 'Вариант расчета',
};

export const Categories = (props) => {
  const [categories, setCategories] = useState([]);
  const [deleteData, setDeleteData] = useState(new Set());

  const [edit, setEdit] = useState(null);
  const [isCreate, setIsCreate] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const searchFetch = useDebounce(search, 450);

  useEffect(() => {
    fetch();
  }, [page, searchFetch]);

  const fetch = async () => {
    const query = {
      page: page - 1,
      size: 10,
      sort: ['isGlobal,asc', 'id,desc'],
    };

    if (search) {
      query.search = search;
    }

    try {
      const res = await BusinessDict.category.getAll({ query });
      setCategories(res.data);
      setTotalPage(res.totalPage);
      if (page > res.totalPage) {
        setPage(totalPage);
      }
    } catch (error) {
      handleWarn(error);
    }
  };

  const memoFetchCache = useMemo(
    () => BusinessDict.subCategory.getAllCache(),
    []
  );

  const debounceFetch = useMemo(() =>
    debouncePromise(async (intSearch) => {
      const query = { search: intSearch, size: 10 };
      const res = await memoFetchCache(query);
      return res.data;
    }, 450)
  );

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  /**
   * Выбираем какой параметр удалить
   * @param {String} value - `value категории`
   */
  const handleCheckbox = (_, value) => {
    if (deleteData.has(value)) {
      deleteData.delete(value);
      setDeleteData(new Set(deleteData));
      return;
    }

    deleteData.add(value);
    setDeleteData(new Set(deleteData));
  };

  const handlePagination = (eventPage) => {
    setPage(eventPage);
    setDeleteData(new Set());
  };

  /**
   * Выбираем все параметры для удаления
   * @param {SyntheticEvent} event `SyntheticEvent`
   */
  const handleCheckboxAll = (event) => {
    const { checked } = event.target;

    if (checked) {
      setDeleteData(
        new Set(
          Array.from({ length: categories.length }, (_, i) => categories[i].id)
        )
      );
      return;
    }

    setDeleteData(new Set());
  };

  const handleDelete = () => {
    fetchDelete();
    setDeleteData(new Set());
  };

  const fetchDelete = async () => {
    try {
      const data = categories.filter((category) => deleteData.has(category.id));
      await BusinessDict.category.deleteAll({ data });
      fetch();
    } catch (error) {
      handleWarn(error);
    }
  };

  const handleAdd = () => {
    setEdit(null);
    setIsCreate(!isCreate);
  };

  const changeEdit = (value) => {
    setIsCreate(false);
    setEdit(value);
  };

  const handleEdit = (res) => {
    setCategories(
      categories.map((category) => {
        if (category.id === res.id) {
          return res;
        }

        return category;
      })
    );
  };

  /** Инициализация стилей */
  const classes = useStyles(props);

  return (
    <>
      <Grid
        className={classes.action}
        container
        spacing={3}
        alignItems={'flex-end'}
        justify='space-between'>
        <Grid item sm='auto'>
          <SearchFieldGraph
            value={search}
            onChange={handleSearch}
            classes={{ root: classes.search }}
          />
        </Grid>
        <Grid item sm='auto'>
          <Grid container>
            {!!deleteData.size && (
              <Button
                classes={{ button: classes.button }}
                onClick={handleDelete}
                top={1}
                text='Удалить'
              />
            )}
            <Button
              classes={{ button: classes.button }}
              top={1}
              text='Добавить запись'
              onClick={handleAdd}
            />
          </Grid>
        </Grid>
      </Grid>
      {!categories.length && !isCreate ? (
        <div className={classNames('empty-text', classes.empty)}>
          Нет данных
        </div>
      ) : (
        <>
          <Scrollbar
            trackYProps={{ style: { width: 4, right: 4 } }}
            thumbYProps={{
              style: {
                background: 'rgba(31, 142, 250, 0.4)',
                width: 4,
                borderRadius: 2,
              },
            }}
            trackXProps={{ style: { height: 4, bottom: -1, display: 'block' } }}
            thumbXProps={{
              style: {
                background: 'rgba(31, 142, 250, 0.4)',
                borderRadius: 2,
              },
            }}
            style={{
              marginTop: 12,
              height: 'calc(100% - 200px)',
            }}>
            <Table classes={{ root: classes.table }}>
              <TableHead stickyHeader>
                <TableRow>
                  <TableCell checkbox>
                    <Checkbox
                      indeterminate={
                        deleteData.size > 0 &&
                        deleteData.size < categories.length
                      }
                      checked={
                        categories.length > 0 &&
                        deleteData.size === categories.length
                      }
                      onChange={(event) => handleCheckboxAll(event)}
                      color='primary'
                    />
                  </TableCell>

                  {TableHeadList.map((textHead) => (
                    <TableCell key={textHead}>{textHead}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isCreate && (
                  <NewCategory
                    fetch={fetch}
                    setIsCreate={setIsCreate}
                    memoFetchCache={memoFetchCache}
                    debounceFetch={debounceFetch}
                    checkValid={(form) => checkValid(form, mapFieldToHeader)}
                  />
                )}
                {categories.map((category, index) => {
                  const disabled = category.id !== edit?.id;
                  return (
                    <Category
                      key={category.id}
                      category={category}
                      onEdit={changeEdit}
                      deleteData={deleteData}
                      onCheckbox={handleCheckbox}
                      setCategories={handleEdit}
                      disabled={disabled}
                      debounceFetch={debounceFetch}
                      checkValid={(form) => checkValid(form, mapFieldToHeader)}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </Scrollbar>

          <Pagination
            classes={{ root: classes.pagination }}
            count={totalPage}
            page={page}
            color='primary'
            onChange={(_, eventPage) => handlePagination(eventPage)}
          />
        </>
      )}
    </>
  );
};
