import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { handleError } from 'helpers';
import { SearchFieldGraph } from 'components';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Scrollbar from 'react-scrollbars-custom';
import { virualStore } from '../../../virtualStore';
import Middleware from '../../../services/middleware/index.js';
import Copy from '../../svg/Copy';
import { handleCopyResource } from '../MainHeaderContentBottom/controls';

/**
 * Компонент управления категориями
 * в узле потребляет
 * @component
 * @public
 */
export const CategoryManagementPanel = React.memo((props) => {
  const {
    consumptions,
    category,
    period,
    lockedModel,
    dispatchModal,
    dispatchCopyResource,
  } = props;

  /** Список ресурсов */
  const [resources, setResources] = useState([]);
  /** Строка для поиска */
  const [search, setSearch] = useState('');
  /** Отфильтрованнаый список ресурсов по search */
  const renderSearch = resources.filter(
    (element) =>
      element.label.toLowerCase().includes(search.toLowerCase()) ||
      element.id.toLowerCase().includes(search.toLowerCase())
  );

  /**
   * Получаем список ресурсов
   * При новом списке очищаем search
   */
  useEffect(() => {
    setSearch('');
    getResources();
  }, [category, period.resource, period.period, consumptions]);

  /** Функция для получения ресурсов */
  const getResources = async () => {
    try {
      const { model } = virualStore;
      const res = await Middleware.GetDumpData(
        model,
        {
          resource: period.resource,
          period: period.period,
          category: category.value,
        },
        'getResourcesToCategory'
      );

      if (res.completed) {
        setResources(res.data);
      }
    } catch (error) {
      handleError('CategoryManagementPanel', error);
    }
  };

  /** Функция для изменения состояния Checkbox
   * @param {SyntheticEvent} event `SyntheticEvent`
   * @param {String} resourceId `индекс ресурса`
   */
  const handleChangeCheckbox = (event, resourceId) => {
    const { checked } = event.target;

    Middleware.SaveDumpData(
      { checked, resourceId, resource: period.resource, period: period.period },
      'categoryManagment'
    );

    const newResources = resources.map((el) => {
      if (el.id === resourceId) {
        return { ...el, state: checked };
      }

      return el;
    });

    setResources(newResources);
  };

  /** Функция для изменения поиска
   * @param {SyntheticEvent} event `SyntheticEvent`
   */
  const handleChange = (event) => {
    const { value } = event.target;

    setSearch(value);
  };

  /** Инициализация стилей */
  const classes = useStyles(props);

  /** Рендер компонента */
  return (
    <>
      <div className={classes.title}>{category.label}</div>

      <div className={classes.row}>
        <SearchFieldGraph
          placeholder='Поиск'
          width={'70%'}
          classes={{ root: classes.search }}
          value={search}
          onChange={handleChange}
        />

        {lockedModel && (
          <div
            className={classes.import}
            onClick={() =>
              handleCopyResource(
                dispatchModal,
                dispatchCopyResource,
                category.value
              )
            }>
            <Copy />
            <div className='text'>Скопировать узел</div>
          </div>
        )}
      </div>

      {!renderSearch.length && (
        <div className='empty-text'>Список доступных ресурсов пуст.</div>
      )}

      {!!renderSearch.length && (
        <Scrollbar
          trackYProps={{ style: { width: 4 } }}
          thumbYProps={{
            style: {
              background: 'rgba(31, 142, 250, 0.4)',
              width: 4,
              borderRadius: 2,
            },
          }}
          style={{
            height: 'calc(100% - 100px)',
            width: '100%',
            padding: 12,
          }}>
          <Grid container spacing={3}>
            {renderSearch.map((resource, index) => (
              <Grid item key={index} xl={2} lg={3} md={4} sm={6}>
                <FormControlLabel
                  classes={{ root: classes.label }}
                  control={
                    <Checkbox
                      onChange={(event) =>
                        handleChangeCheckbox(event, resource.id)
                      }
                      checked={resource.state}
                      color='primary'
                      disabled={!lockedModel}
                    />
                  }
                  label={resource.label}
                />
              </Grid>
            ))}
          </Grid>
        </Scrollbar>
      )}
    </>
  );
});

/** Назначаем  displayName */
CategoryManagementPanel.displayName = 'CategoryManagementPanel';

/** Назначаем  propTypes */
CategoryManagementPanel.propTypes = {
  consumptions: PropTypes.array.isRequired,
  category: PropTypes.object.isRequired,
  period: PropTypes.object.isRequired,
  lockedModel: PropTypes.bool.isRequired,
  dispatchModal: PropTypes.func.isRequired,
  dispatchCopyResource: PropTypes.func.isRequired,
};

/** Основные стили */
const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      title: {
        position: 'relative',
        color: colorsTheme.nodeColor,
        fontSize: 20,
        marginBottom: 32,

        '&:first-letter': {
          textTransform: 'uppercase',
        },

        '&::before': {
          content: '""',
          position: 'absolute',
          height: 42,
          width: 10,
          left: -40,
          top: '50%',
          transform: 'translateY(-50%)',
          borderRadius: '0px 4px 4px 0px',
          backgroundColor: ({ category }) => category.color,
        },
      },

      blockLabel: {
        flex: '0 0 calc(100% / 3)',
        width: 'calc(100% / 3)',
        padding: '4px 16px',
      },

      label: {
        margin: 0,
        alignItems: 'flex-start',

        '&.Mui-disabled': { cursor: 'not-allowed' },

        '& .MuiTypography-body1': {
          fontSize: 14,
          lineHeight: '24px',
        },

        '& .MuiIconButton-root': {
          padding: 0,
          marginRight: 16,
        },

        '& .MuiFormControlLabel-label.Mui-disabled': {
          color: colorsTheme.grey,
        },

        '& .MuiIconButton-root.Mui-disabled': {
          color: colorsTheme.grey,
        },

        '& .MuiCheckbox-colorPrimary.Mui-checked.Mui-disabled': {
          color: '#3f51b5',
        },
      },

      row: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 32,
      },

      import: {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        color: colorsTheme.grey,
        width: 190,
        marginLeft: 32,

        '&:hover': {
          color: colorsTheme.nodeColor,

          '& path': {
            fill: colorsTheme.nodeColor,
          },
        },

        '& .text': {
          marginLeft: 16,
          fontSize: 14,
        },
      },

      search: {
        width: '30%',
        minWidth: 120,
        maxWidth: 400,
      },

      closeIcon: {
        position: 'absolute',
        top: 12,
        right: 12,
        cursor: 'pointer',
        transition: 'color .2s ease-in-out',

        '&:hover': {
          color: colorsTheme.nodeColor,
        },
      },
    };
  },
  { name: 'getResources', index: 1 }
);
