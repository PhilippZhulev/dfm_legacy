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
import { handleWarn, useDebounce } from 'helpers';
import BusinessDict from '../../../../services/api/businessDict';
import { useStyles } from './style';
import { Period } from './period';
import { NewPeriod } from './newPeriod';
import { required } from '../../../../services/validation';

const TABLE_HEAD = [
  'Управление',
  'Период планирования',
  'Название',
  'Год',
  'Квартал',
  'Месяц',
];

export const Periods = (props) => {
  const [periods, setPeriods] = useState([]);
  const [deleteData, setDeleteData] = useState(new Set());

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [edit, setEdit] = useState(null);
  const [isCreate, setIsCreate] = useState(false);
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
      const res = await BusinessDict.period.getAll({ query });
      setPeriods(res.data);
      setTotalPage(res.totalPage);
      if (page > res.totalPage) {
        setPage(totalPage);
      }
    } catch (error) {
      handleWarn(error);
    }
  };

  const deleteEmpty = (data) => {
    Object.keys(data).forEach((item) => {
      Object.keys(data[item]).forEach(
        (el) => required(data[item][el]) && delete data[item][el]
      );
    });
  };

  const fetchDelete = async () => {
    try {
      const data = periods.filter((period) => deleteData.has(period.id));
      deleteEmpty(data);
      await BusinessDict.period.deleteAll({ data });
      fetch();
    } catch (error) {
      handleWarn(error);
    }
  };

  const handleDelete = () => {
    fetchDelete();
    setDeleteData(new Set());
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
        new Set(Array.from({ length: periods.length }, (_, i) => periods[i].id))
      );
      return;
    }

    setDeleteData(new Set());
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handlePagination = (eventPage) => {
    setPage(eventPage);
    setDeleteData(new Set());
  };

  const changeEdit = (value) => {
    setIsCreate(false);
    setEdit(value);
  };

  const handleEdit = (res) => {
    setPeriods(
      periods.map((period) => {
        if (periods.id === res.id) {
          return res;
        }

        return period;
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

      {!periods.length ? (
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
                        deleteData.size > 0 && deleteData.size < periods.length
                      }
                      checked={
                        periods.length > 0 && deleteData.size === periods.length
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
                  <NewPeriod fetch={fetch} setIsCreate={setIsCreate} />
                )}
                {periods.map((period, index) => {
                  const disabled = period.id !== edit?.id;
                  return (
                    <Period
                      key={period.id}
                      period={period}
                      onEdit={changeEdit}
                      deleteData={deleteData}
                      onCheckbox={handleCheckbox}
                      setPeriods={handleEdit}
                      disabled={disabled}
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
