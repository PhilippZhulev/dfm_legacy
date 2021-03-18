import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { TagsList, PanelNodeConsumption, FormulaSwitcher } from 'components';
import { PanelCategories } from 'containers';
import Scrollbar from 'react-scrollbars-custom';
import PropTypes from 'prop-types';
import MenuIcon from '../../svg/MenuIcon';
import AbsolutePosition from '../../ui/AbsolutePosition';

/**
 * Компонент Узел потребляет(полноэкранный режим)
 * @component
 * @public
 */
export const MaximizeNodeConsumes = React.memo((props) => {
  const {
    mapCategories,
    categories,
    consumptions,
    period,
    lockedModel,
    formulaViewed,
    dispatchFormulaViewed,
  } = props;
  /** Список для рендера с параметрами потребления */
  const [renderConsumptions, setRenderConsumptions] = useState(consumptions);
  /** Объект с рефами панелей по категориям */
  const panelRef = useRef({});
  /** Реф скроллбара */
  const scrollbarRef = useRef(null);
  /** Состояние открытой панели Тегов */
  const [expandedTag, setExpandedTag] = useState(false);

  /**
   * ANCHOR: Переключатель панелей
   * @param {SyntheticEvent} event `SyntheticEvent`
   * @param {Boolean} isExpanded состояние панели
   */
  const handleChangeExpandedTag = () => (event, isExpanded) => {
    setExpandedTag(isExpanded);
  };

  /**
   * Клик по тэгу,
   *
   * `IntersectionObserver` - помогает отследить появилась ли панель в зоне видимости
   * @param {Object} consumption `объект с параметрами потребления`
   */
  const handleClickTag = (consumption) => {
    const panels = panelRef.current;
    const currentRef = panels[consumption.category][consumption.id];

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.intersectionRatio === 1) {
          intersectionObserver.unobserve(currentRef.elementRef.current);

          setTimeout(() => {
            currentRef.setExpanded(true);
            currentRef.setTrigger(true);
          }, 400);
        }
      },
      { root: scrollbarRef.current.scrollerElement, threshold: [0, 1] }
    );

    intersectionObserver.observe(currentRef.elementRef.current);

    currentRef.elementRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  };

  /** Диспатчер переключателя показа формул */
  const handleFormulaViewed = (viewed) => {
    dispatchFormulaViewed({ formulaViewed: viewed });
  };

  /** Инициализация стилей */
  const classes = useStyles(props);

  /** Обновляем сосотояние параметров потрбления */
  useEffect(() => {
    setRenderConsumptions(consumptions);
  }, [consumptions]);

  const formulaSwitcherShow = Object.values(mapCategories).some(
    (category) => category.consumption
  );

  /** Рендер компонента */
  return (
    <>
      <h2 className={classes.title}>Узел потребляет</h2>
      <Scrollbar
        ref={scrollbarRef}
        trackYProps={{ style: { width: 4, right: -20 } }}
        thumbYProps={{
          style: {
            background: 'rgba(31, 142, 250, 0.4)',
            width: 4,
            borderRadius: 2,
            position: 'relative',
          },
        }}
        style={{
          height: 'calc(100% - 32px)',
          marginTop: 34,
        }}>
        <PanelCategories
          categories={categories}
          mapCategories={mapCategories}
          period={period}
          lockedModel={lockedModel}
        />

        <ExpansionPanel
          square
          expanded={expandedTag}
          classes={{ root: classes.rootPanel }}
          onChange={handleChangeExpandedTag()}>
          <ExpansionPanelSummary
            expandIcon={<MenuIcon />}
            aria-controls='panel1a-content'
            classes={{ root: classes.rootSummary }}
            id='panel1a-header'>
            Тэги
          </ExpansionPanelSummary>
          <ExpansionPanelDetails classes={{ root: classes.rootDetails }}>
            <TagsList
              clickTag={handleClickTag}
              classes={{ root: classes.tagList }}
              consumptions={consumptions}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <div style={{ position: 'relative' }}>
          {formulaSwitcherShow ? (
            <AbsolutePosition right={5} top={24}>
              <FormulaSwitcher
                classes={{
                  switchBase: classes.switchBase,
                  switchRoot: classes.switchRoot,
                  triggerLabel: classes.maximizeTriggerLabel,
                }}
                label={'Показать формулы'}
                formulaViewed={formulaViewed}
                onViewed={(e) => handleFormulaViewed(!formulaViewed)}
              />
            </AbsolutePosition>
          ) : null}

          {Object.values(mapCategories).map((category, index) => {
            if (category.consumption) {
              return (
                <React.Fragment key={index}>
                  <div className={classes.labelWrap}>
                    <div className={classes.label}>{category.label}</div>
                  </div>
                  <Grid className={classes.list} container spacing={3}>
                    {category.consumption.map((consumption, curIndex) => (
                      <Grid item key={curIndex} xl={2} lg={4} md={6} sm={6}>
                        <PanelNodeConsumption
                          ref={(ref) => {
                            if (!panelRef.current[category.value]) {
                              panelRef.current[category.value] = {};
                            }

                            panelRef.current[category.value][
                              consumption.id
                            ] = ref;
                          }}
                          classes={{ root: classes.panelNodeConsumption }}
                          consumption={consumption}
                          lockedModel={lockedModel}
                          period={period}
                          formulaViewed={formulaViewed}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </React.Fragment>
              );
            }

            return null;
          })}
        </div>
      </Scrollbar>
    </>
  );
});

/** Назначаем  displayName */
MaximizeNodeConsumes.displayName = 'MaximizeNodeConsumes';

/** Назначаем  propTypes */
MaximizeNodeConsumes.propTypes = {
  mapCategories: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  consumptions: PropTypes.array.isRequired,
  period: PropTypes.object.isRequired,
  lockedModel: PropTypes.bool.isRequired,
  formulaViewed: PropTypes.bool,
  dispatchFormulaViewed: PropTypes.func.isRequired,
};

MaximizeNodeConsumes.defaultProps = { formulaViewed: true };

/** Основные стили */
const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      title: {
        fontSize: 20,
        lineHeight: '27px',
        fontWeight: 'normal',
        color: colorsTheme.nodeColor,
        margin: 0,
      },

      label: {
        fontSize: 20,
        lineHeight: '27px',
        fontWeight: 'normal',
        color: colorsTheme.nodeColor,
        margin: '24px 0',
      },

      tagList: {
        marginTop: 0,
      },

      iconDown: {
        transition: 'transform 0.15s ease-in-out',
        transform: 'rotate(0deg)',
      },

      iconDownExpanded: {
        transform: 'rotate(180deg)',
      },

      rootPanel: {
        backgroundColor: colorsTheme.nodeBackground,
        borderRadius: 8,
        marginTop: 0,
        color: colorsTheme.grey,
        overflow: 'hidden',

        '&:not(:first-child)': {
          marginTop: 16,
        },

        '&::before': {
          opacity: 0,
        },

        '&.Mui-expanded': {
          marginTop: 0,

          '&:not(:first-child)': {
            marginTop: 16,
          },
        },
      },

      rootSummary: {
        backgroundColor: colorsTheme.nodeBackground,
        borderRadius: 8,
        color: colorsTheme.nodeColor,
        fontSize: 18,
        paddingLeft: 40,

        '&.Mui-expanded': {
          backgroundColor: colorsTheme.nodeBackground,
          minHeight: 'auto',
        },

        '& .MuiExpansionPanelSummary-content': {
          height: '100%',
        },
      },

      rootDetails: {
        paddingTop: 0,
        paddingLeft: 40,
        paddingRight: 25,
      },

      list: {
        width: '100%',
      },

      maximizeTriggerLabel: {
        color: theme.colorsTheme.formulaViewedLabelColor,
        fontSize: 16,
        lineHeight: '16px',
        fontWeight: 'normal',
      },

      labelWrap: {
        display: 'flex',
        alignContent: 'space-between',
      },

      maximizeLabelPlacementStart: {},
    };
  },
  { name: 'MaximizeNodeConsumes', index: 1 }
);
