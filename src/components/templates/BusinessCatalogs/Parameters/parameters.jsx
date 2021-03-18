import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Pagination from '@material-ui/lab/Pagination';
import Scrollbar from 'react-scrollbars-custom';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  SearchFieldGraph,
} from 'components';
import { handleWarn, useDebounce, SciNotation } from 'helpers';
import BusinessDict from '../../../../services/api/businessDict';
import { useStyles } from './style';
import { Parameter } from './parameter';
import { NewParameter } from './newParameter';
import { isParametersNotValid } from '../../../../services/validation/reference';

const TABLE_HEAD = [
  'Код',
  'Название',
  'Значение',
  'Описание',
  'Глобальный',
  'Кем добавлено',
  'Модель',
];

export const Parameters = (props) => {
  const [parameters, setParameters] = useState([]);
  const [deleteData, setDeleteData] = useState(new Set());

  const [edit, setEdit] = useState(null);
  const [isCreate, setIsCreate] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const searchFetch = useDebounce(search, 450);

  /** Инициализация стилей */
  const classes = useStyles(props);

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
      const res = await BusinessDict.parameters.getAll({ query });
      setParameters(
        res.data.map((parameter) => ({
          ...parameter,
          volume: SciNotation.toFixed(parameter.volume),
        }))
      );
      setTotalPage(res.totalPage);
      if (page > res.totalPage) {
        setPage(totalPage);
      }
    } catch (error) {
      handleWarn(error);
    }
  };

  const fetchDelete = async () => {
    try {
      const data = parameters.filter((metric) => deleteData.has(metric.id));
      await BusinessDict.parameters.deleteAll({ data });
      fetch();
    } catch (error) {
      handleWarn(error);
    }
  };

  /**
   * Выбираем какой параметр удалить
   * @param {String} id - `id параметра`
   */
  const handleCheckbox = (_, id) => {
    if (deleteData.has(id)) {
      deleteData.delete(id);
      setDeleteData(new Set(deleteData));
      return;
    }

    deleteData.add(id);
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
          Array.from({ length: parameters.length }, (_, i) => parameters[i].id)
        )
      );
      return;
    }

    setDeleteData(new Set());
  };

  const handleAdd = () => {
    setEdit(null);
    setIsCreate(!isCreate);
  };

  const handleDelete = () => {
    fetchDelete();
    setDeleteData(new Set());
  };

  const handlePagination = (eventPage) => {
    setPage(eventPage);
    setDeleteData(new Set());
  };

  const changeEdit = (value) => {
    setIsCreate(false);
    setEdit(value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleEdit = (res) => {
    setParameters(
      parameters.map((parameter) => {
        if (parameter.id === res.id) {
          return res;
        }

        parameter.volume = SciNotation.toFixed(parameter.volume);
        return parameter;
      })
    );
  };

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

      {!parameters.length && !isCreate ? (
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
                        deleteData.size < parameters.length
                      }
                      checked={
                        parameters.length > 0 &&
                        deleteData.size === parameters.length
                      }
                      onChange={(event) => handleCheckboxAll(event)}
                      color='primary'
                    />
                  </TableCell>

                  <TableCell />

                  {TABLE_HEAD.map((textHead) => (
                    <TableCell key={textHead}>{textHead}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isCreate && (
                  <NewParameter
                    fetch={fetch}
                    setIsCreate={setIsCreate}
                    checkValid={isParametersNotValid}
                  />
                )}
                {parameters.map((parameter, index) => {
                  const disabled = parameter.id !== edit?.id;
                  return (
                    <Parameter
                      key={parameter.id}
                      parameter={parameter}
                      deleteData={deleteData}
                      disabled={disabled}
                      onEdit={changeEdit}
                      onCheckbox={handleCheckbox}
                      setParameters={handleEdit}
                      checkValid={isParametersNotValid}
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
