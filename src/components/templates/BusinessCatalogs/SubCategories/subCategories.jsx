import React, { useState, useEffect } from 'react';
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
import { handleWarn, useDebounce } from 'helpers';
import BusinessDict from '../../../../services/api/businessDict';
import { useStyles } from './style';
import { SubCategory } from './subCategory';
import { NewSubCategory } from './newSubCategory';
import { checkValid } from '../../../../services/validation';

const TABLE_HEAD = ['', 'Код', 'Название'];

const mapFieldToHeader = {
  value: 'Код',
  label: 'Название',
};

export const SubCategories = (props) => {
  const [subCategories, setSubCategories] = useState([]);
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
    };

    if (search) {
      query.search = search;
    }

    try {
      const res = await BusinessDict.subCategory.getAll({ query });
      setSubCategories(res.data);
      setTotalPage(res.totalPage);
      if (page > res.totalPage) {
        setPage(totalPage);
      }
    } catch (error) {
      handleWarn(error);
    }
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleDelete = () => {
    fetchDelete();
    setDeleteData(new Set());
  };

  const fetchDelete = async () => {
    try {
      const data = subCategories.filter((category) =>
        deleteData.has(category.id)
      );
      await BusinessDict.subCategory.deleteAll({ data });
      fetch();
    } catch (error) {
      handleWarn(error);
    }
  };

  const handleAdd = () => {
    setEdit(null);
    setIsCreate(!isCreate);
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

  /**
   * Выбираем все параметры для удаления
   * @param {SyntheticEvent} event `SyntheticEvent`
   */
  const handleCheckboxAll = (event) => {
    const { checked } = event.target;

    if (checked) {
      setDeleteData(
        new Set(
          Array.from(
            { length: subCategories.length },
            (_, i) => subCategories[i].id
          )
        )
      );
      return;
    }

    setDeleteData(new Set());
  };

  const changeEdit = (value) => {
    setIsCreate(false);
    setEdit(value);
  };

  const handleEdit = (res) => {
    setSubCategories(
      subCategories.map((subCategory) => {
        if (subCategory.id === res.id) {
          return res;
        }

        return subCategory;
      })
    );
  };

  const handlePagination = (eventPage) => {
    setPage(eventPage);
    setDeleteData(new Set());
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

      {!subCategories.length && !isCreate ? (
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
                        deleteData.size < subCategories.length
                      }
                      checked={
                        subCategories.length > 0 &&
                        deleteData.size === subCategories.length
                      }
                      onChange={(event) => handleCheckboxAll(event)}
                      color='primary'
                    />
                  </TableCell>

                  {TABLE_HEAD.map((textHead) => (
                    <TableCell key={textHead}>{textHead}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isCreate && (
                  <NewSubCategory
                    fetch={fetch}
                    setIsCreate={setIsCreate}
                    checkValid={(form) => checkValid(form, mapFieldToHeader)}
                  />
                )}
                {subCategories.map((subCategory, index) => {
                  const disabled = subCategory.id !== edit?.id;
                  return (
                    <SubCategory
                      key={subCategory.id}
                      subCategory={subCategory}
                      onEdit={changeEdit}
                      deleteData={deleteData}
                      onCheckbox={handleCheckbox}
                      setSubCategories={handleEdit}
                      disabled={disabled}
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
