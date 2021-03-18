import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Scrollbar from 'react-scrollbars-custom';
import { Icon, SearchFieldGraph } from 'components';
import { handleWarn } from 'helpers';
import { virualStore } from '../../../virtualStore';
import store from '../../../redux/store';
import Middleware from '../../../services/middleware';

/**
 * Компонент HOC
 * @param {Components} Components - `компонент`
 * @component
 * @public
 */
export const Container = (Components) => (props) => {
  const { title, dispatchSave, modelElement, allowed, ...other } = props;

  /** Состояние редактирования справочников */
  const [edit, setEdit] = useState(false);
  /** Состояние удаляемых элементов */
  const [deleteData, setDeleteData] = useState(new Set());
  /** Состояние поиска */
  const [search, setSearch] = useState('');
  /** Реф  Components */
  const ref = useRef(null);

  /** Сброс состояния редактирования при смене узла для справочников параметров узла */

  useEffect(() => {
    if (modelElement === 'nodeParameters') {
      setEdit(false);
      setDeleteData(new Set());
    }
  }, [props.resource]);

  /** Добавляем данные через реф */
  const handleAdd = () => {
    ref.current.handleAdd();
  };

  /** Удаляем данные через реф */
  const handleDelete = () => {
    ref.current.handleDelete();
    setDeleteData(new Set());
  };

  /**
   * Выбираем какой параметр удалить
   * @param {Number} index - `Индекс строки`
   */
  const handleCheckbox = (_, index) => {
    if (deleteData.has(index)) {
      deleteData.delete(index);
      setDeleteData(new Set(deleteData));
    } else {
      deleteData.add(index);
      setDeleteData(new Set(deleteData));
    }
  };

  /**
   * Выбираем все параметры для удаления
   * @param {SyntheticEvent} event `SyntheticEvent`
   * @param {Array} data - `список с параметрами`
   */
  const handleCheckboxAll = (event, data, deleteDataSet) => {
    const { checked } = event.target;
    if (deleteDataSet && checked) {
      setDeleteData(deleteDataSet);
      return;
    }

    if (checked) {
      setDeleteData(new Set(Array.from({ length: data.length }, (_, i) => i)));
    } else {
      setDeleteData(new Set([]));
    }
  };

  /**
   * Переводим в режим редактирования справочника
   * @param {SyntheticEvent} event `SyntheticEvent`
   */
  const handleClickEdit = (event) => {
    if (edit) {
      if (ref.current.getValidationMessage()) {
        handleWarn({
          message: ref.current.getValidationMessage(),
        });
        return;
      }

      dispatchSave({
        params: {
          model: virualStore.model.value,
          type: modelElement,
          body: virualStore.model[modelElement],
        },
      });
    }
    setEdit(!edit);
  };

  /**
   * Сохранение справочника модели
   * @param {Array} data - `список параметров`
   * @param {String} type - `тип параметра`
   */
  const saveDump = (data, type) => {
    const resource = store.getState().handleResourcesSuccess.data;
    Middleware.SaveDumpData(
      {
        query: data,
        resource: resource.value,
        period: resource.period,
      },
      type,
      false
    );

    dispatchSave({
      params: {
        model: virualStore.model.value,
      },
    });
  };

  /** Инициализация стилей */
  const classes = useStyles(props);

  let content = (
    <Components
      ref={ref}
      edit={edit}
      deleteData={deleteData}
      onCheckbox={handleCheckbox}
      onCheckboxAll={handleCheckboxAll}
      search={search.toLowerCase()}
      allowed={allowed}
      saveDump={saveDump}
      {...other}
    />
  );

  if (title !== 'Периоды') {
    content = (
      <Scrollbar
        trackYProps={{ style: { width: 4 } }}
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
        style={{ height: 'calc(100% - 92px)', marginBottom: 12 }}>
        {content}
      </Scrollbar>
    );
  }

  /** Рендер компонента */
  return (
    <>
      <div className={classes.title}>{title}</div>

      <div className={classes.listActions}>
        {title !== 'Периоды' && (
          <>
            <SearchFieldGraph
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              classes={{ root: classes.search }}
              width={'70%'}
            />
            <div className={classes.buttons}>
              {allowed && (
                <>
                  <div className={classes.action} onClick={handleDelete}>
                    <Icon
                      icon='CIRCLE_MINUS'
                      size={20}
                      fillColor='transparent'
                    />
                    <span>Удалить</span>
                  </div>

                  <div className={classes.action} onClick={handleAdd}>
                    <Icon
                      icon='CIRCLE_PLUS'
                      size={20}
                      fillColor='transparent'
                    />
                    <span>Добавить</span>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {content}
    </>
  );
};

/** Назначаем displayName */
Container.displayName = 'Container';

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

      listActions: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 24,
      },

      search: {
        maxWidth: 300,
      },

      buttons: {
        display: 'flex',
        alignItems: 'center',
        flex: '0 0 auto',
        marginLeft: 16,
      },

      action: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'color .3s ease-in-out',

        '& span': {
          marginLeft: 8,
          fontSize: 12,
          fontWeight: 100,
        },

        '&:hover': {
          color: colorsTheme.nodeColor,
        },

        '&:not(:last-child)': {
          marginRight: 16,
        },
      },
    };
  },
  { index: 2, name: 'Container' }
);
