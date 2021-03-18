  import React, { useState, useEffect } from 'react';
  import ExpansionPanel from '@material-ui/core/ExpansionPanel';
  import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
  import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
  import Checkbox from '@material-ui/core/Checkbox';
  import FormControlLabel from '@material-ui/core/FormControlLabel';
  import PropTypes from 'prop-types';
  import Grid from '@material-ui/core/Grid';
  import Scrollbar from 'react-scrollbars-custom';
  import { Category, SearchFieldGraph } from 'components';
  import { handleError } from 'helpers';
  import MenuIcon from '../../svg/MenuIcon';
  import { virualStore } from '../../../virtualStore';
  import Middleware from '../../../services/middleware/index.js';
  import Copy from '../../svg/Copy';
  import { handleCopyResource } from '../MainHeaderContentBottom/controls';
  import { useStyles } from './style';

  /**
   * Компонент панели с категориями
   * @component
   * @public
   */
  export const PanelCategories = React.memo((props) => {
    const {
      categories,
      mapCategories,
      period,
      lockedModel,
      dispatchModal,
      dispatchCopyResource,
    } = props;
    /** Состояние панели */
    const [expandedCategories, setExpandedCategories] = useState(false);
    /** Состояние выбранной категории */
    const [selected, setSelected] = useState(null);
    /** Состояние строки поиска */
    const [search, setSearch] = useState('');
    /** Список ресурсов */
    const [resources, setResources] = useState([]);

    /** Список согласно поиску */
    const renderSearch = resources.filter((element) =>
      element.label.toLowerCase().includes(search.toLocaleLowerCase())
    );

    /** Получаем список ресурсов */
    useEffect(() => {
      setSearch('');
      if (selected !== null) {
        getResources();
      }

      if (!selected) {
        setResources([]);
      }
    }, [selected, JSON.stringify(period)]);

    /** Функция для получения ресурсов */
    const getResources = async () => {
      try {
        const { model } = virualStore;
        const res = await Middleware.GetDumpData(
          model,
          {
            resource: period.resource,
            period: period.period,
            category: categories[selected].value,
          },
          'getResourcesToCategory'
        );

        if (res.completed) {
          setResources(res.data);
        }
      } catch (error) {
        handleError('PanelCategories/fetch', error);
      }
    };

    /**
     * Переключатель панелей
     * @param {SyntheticEvent} event `SyntheticEvent`
     * @param {Boolean} isExpanded состояние панели
     */
    const handleChangeExpandedCategories = () => (event, isExpanded) => {
      setExpandedCategories(isExpanded);
    };

    /**
     * Клик по категории
     * @param {Boolean} isSelected `выбрана/невыбрана категория`
     * @param {Number} index `индекс в списке`
     */
    const handleClickCategory = (isSelected, index) => {
      setSelected(!isSelected ? index : null);
    };

    /** Смена состояние чексбоксов ресурсов */
    const handleChangeCheckbox = (event, resourceId) => {
      const { checked } = event.target;

      Middleware.SaveDumpData(
        {
          checked,
          resourceId,
          resource: period.resource,
          period: period.period,
        },
        'categoryManagment'
      );

      const newResources = resources.map((el, index) => {
        if (el.id === resourceId) {
          return { ...el, state: checked };
        }

        return el;
      });

      setResources(newResources);
    };

    /** Инициализация стилей */
    const classes = useStyles(props);

    /** Рендер компонента */
    return (
      <ExpansionPanel
        square
        expanded={expandedCategories}
        classes={{ root: classes.rootPanel }}
        onChange={handleChangeExpandedCategories()}>
        <ExpansionPanelSummary
          aria-controls='panel1a-content'
          expandIcon={<MenuIcon />}
          classes={{ root: classes.rootSummary }}
          id='panel1a-header'>
          <div className={classes.leftSummary}>
            <div className='title'>Категории</div>
          </div>

          {expandedCategories && (
            <div className={classes.rightSummary}>
              {categories[selected]?.label || 'Выберите категорию'}
            </div>
          )}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: classes.details }}>
          <div className={classes.leftDetails}>
            <Scrollbar
              trackYProps={{
                style: { width: 4, right: -4, top: 0, height: '100%' },
              }}
              thumbYProps={{
                style: {
                  background: 'rgba(31, 142, 250, 0.4)',
                  width: 4,
                  borderRadius: 2,
                },
              }}
              wrapperProps={{
                style: {
                  right: 0,
                },
              }}
              style={{ height: 460, width: '100%', margin: '8px 0' }}>
              {categories.map((category, index) => (
                <Category
                  key={index}
                  category={category}
                  isSelected={selected === index}
                  classes={{ selected: classes.selected }}
                  isActive={!!mapCategories[category.value].consumption}
                  onClick={(isSelected) =>
                    handleClickCategory(isSelected, index)
                  }
                />
              ))}
            </Scrollbar>
          </div>

          <div className={classes.rightDetails}>
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
                height: 'calc(100% - 16px)',
                width: '100%',
              }}>
              {selected !== null && (
                <Grid
                  container
                  className={classes.panel}
                  align='center'
                  justify='space-between'>
                  <SearchFieldGraph
                    placeholder='Поиск'
                    width={'70%'}
                    classes={{ root: classes.search }}
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                  {lockedModel && (
                    <div
                      className={classes.import}
                      onClick={() =>
                        handleCopyResource(
                          dispatchModal,
                          dispatchCopyResource,
                          categories[selected].value
                        )
                      }>
                      <Copy />
                      <div className='text'>Скопировать узел</div>
                    </div>
                  )}
                </Grid>
              )}

              {!renderSearch.length && selected !== null && (
                <div className='empty-text'>
                  Список доступных ресурсов пуст.
                </div>
              )}

              <Grid className={classes.list} container spacing={3}>
                {renderSearch.map((resource, index) => (
                  <Grid item key={index} xl={2} lg={4} md={6} sm={6}>
                    <FormControlLabel
                      classes={{ root: classes.labelCheck }}
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
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  });

  /** Назначаем  displayName */
  PanelCategories.displayName = 'PanelCategories';

  /** Назначаем  propTypes */
  PanelCategories.propTypes = {
    mapCategories: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    period: PropTypes.object.isRequired,
    lockedModel: PropTypes.bool.isRequired,
    dispatchModal: PropTypes.func.isRequired,
    dispatchCopyResource: PropTypes.func.isRequired,
  };
