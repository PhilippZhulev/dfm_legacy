import React, { useState, useEffect, useRef } from 'react';
import {
  Category,
  TagsList,
  PanelNodeConsumption,
  FormulaSwitcher,
  ClonePeriod,
} from 'components';
import { CategoryManagementPanel, Maximize } from 'containers';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import PropTypes from 'prop-types';
import { virualStore } from '../../../virtualStore';

/**
 * Узел потребляет (мин)
 * @component
 * @public
 */
export const MinimizeNodeConsumes = React.memo((props) => {
  const {
    categories,
    lockedModel,
    consumptions,
    mapCategories,
    period,
    formulaViewed,
    dispatchFormulaViewed,
    dispatchFilter,
    dispatchGraph,
    dispatchModelChange,
  } = props;
  /** Список для рендера с параметрами потребления */
  const [renderConsumptions, setRenderConsumptions] = useState(consumptions);
  /** Состояние выбранной категории */
  const [selected, setSelected] = useState(null);
  /** Состояние сортировки */
  const [sort, setSort] = useState('name');
  /** Список с рефами панелей */
  const panelRef = useRef([]);

  // TODO доделать сортировку по чему сортировать ? сумма ? пока делать не надо. Потом уточнить.

  // const sortRenderConsumptions = useMemo(
  //   () =>
  //     renderConsumptions.sort((a, b) => {
  //       if (sort === 'amount') {
  //         return a.name - b.name;
  //       }
  //     }),
  //   [sort]
  // );
  /** ссылка на скролл левой панели */
  const scrollBar = document.getElementById('scrollbar-left-panel');
  /** ссылка на контейнер для портала */
  const container = document.getElementById('portal-maximize');

  /** Обновляем сосотояние параметров потрбления */
  useEffect(() => {
    setRenderConsumptions(consumptions);
  }, [consumptions]);

  /**
   * Клик по тэгу,
   *
   * `IntersectionObserver` - помогает отследить появилась ли панель в зоне видимости
   * @param {Number} index `индекс тэга`
   */
  const handleClickTag = (_, index) => {
    const currentRef = panelRef.current[index];
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.intersectionRatio === 1) {
          intersectionObserver.unobserve(currentRef.elementRef.current);

          setTimeout(() => {
            currentRef.setExpanded(true);
            currentRef.setTrigger(true);
          }, 300);
        }
      },
      { root: scrollBar, threshold: [0, 1] }
    );

    intersectionObserver.observe(currentRef.elementRef.current);

    currentRef.elementRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  /**
   * Клик по категории
   * @param {Boolean} isSelected `выбрана/невыбрана категория`
   * @param {Number} index `индекс в списке`
   */
  const handleClickCategory = (isSelected, index) => {
    setSelected(!isSelected ? index : null);
  };

  /** Диспатчер переключателя показа формул */
  const handleFormulaViewed = (viewed) => {
    dispatchFormulaViewed({ formulaViewed: viewed });
  };

  /** Диспатчер переключателя показа формул */
  const handleClonePeriodCompleted = () => {
    const params = {
      model: virualStore.model.value,
      resource: period.resource,
      period: period.period,
    };
    /** Делаем диспатч состояния филтра в сагу и получаем новые данные */
    dispatchFilter({ params });
    /** Получаем новые данные графа */
    dispatchGraph({ params });
    /** Обновить состояние модели */
    dispatchModelChange({ state: true });
  };

  /** Инициализация стилей */
  const classes = styles(props);

  /** Рендер компонента */
  return (
    <>
      <div className={classes.categoriesList}>
        <ClonePeriod
          onCompleted={handleClonePeriodCompleted}
          locked={lockedModel}
          type={'consumptions'}
          period={period.period}
          resource={period.resource}
          model={virualStore.model}
          periods={virualStore.model.periodDictionary}
        />
        <div className='title'>Категории</div>

        {categories.map((category, index) => (
          <Category
            key={index}
            category={category}
            isSelected={selected === index}
            isActive={!!mapCategories[category.value].consumption}
            onClick={(isSelected) => handleClickCategory(isSelected, index)}
          />
        ))}
      </div>

      <TagsList clickTag={handleClickTag} consumptions={renderConsumptions} />

      {renderConsumptions.length ? (
        <FormulaSwitcher
          classes={{
            switchBase: classes.switchBase,
            switchRoot: classes.switchRoot,
            triggerLabel: classes.minimizeTriggerLabel,
            labelPlacementStart: classes.minimizeLabelPlacementStart,
          }}
          label={'Показать формулы'}
          formulaViewed={formulaViewed}
          onViewed={(e) => handleFormulaViewed(!formulaViewed)}
        />
      ) : null}

      {renderConsumptions.map((consumption, index) => (
        <PanelNodeConsumption
          key={`${consumption.id}_${consumption.name}_${index}`}
          period={period}
          lockedModel={lockedModel}
          ref={(ref) => (panelRef.current[index] = ref)}
          classes={{ root: classes.panelNodeConsumption }}
          consumption={consumption}
          formulaViewed={formulaViewed}
        />
      ))}

      <Maximize
        container={container}
        classes={{
          background: classes.background,
          container: classes.container,
        }}
        clickBackground={() => setSelected(null)}
        stateIn={selected !== null}
        onClose={() => setSelected(null)}>
        {selected !== null && (
          <CategoryManagementPanel
            consumptions={consumptions}
            category={categories[selected]}
            period={period}
            lockedModel={lockedModel}
          />
        )}
      </Maximize>
    </>
  );
});

/** Назначаем  displayName */
MinimizeNodeConsumes.displayName = 'MinimizeNodeConsumes';

/** Назначаем  propTypes */
MinimizeNodeConsumes.propTypes = {
  mapCategories: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  consumptions: PropTypes.array.isRequired,
  period: PropTypes.object.isRequired,
  lockedModel: PropTypes.bool.isRequired,
  formulaViewed: PropTypes.bool,
  dispatchFormulaViewed: PropTypes.func.isRequired,
  dispatchFilter: PropTypes.func.isRequired,
  dispatchGraph: PropTypes.func.isRequired,
  dispatchModelChange: PropTypes.func.isRequired,
};

MinimizeNodeConsumes.defaultProps = { formulaViewed: true };

/** Основные стили */
const styles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      categoriesList: {
        margin: '0 -16px',

        '& .title': {
          color: colorsTheme.nodeColor,
          paddingLeft: 26,
          fontSize: 18,
          margin: '24px 0',
        },
      },

      panelNodeConsumption: {
        marginTop: 16,
      },

      background: {
        background: fade(colorsTheme.dark, 0.4),
      },

      container: {
        margin: 16,
        marginTop: 205,
        marginLeft: 396,
        backgroundColor: colorsTheme.background,
        padding: 40,
        paddingRight: 20,
        borderRadius: 8,
        position: 'relative',
        height: 'calc(100% - 300px)',
        maxWidth: '60%',
        color: colorsTheme.grey,
        overflow: 'hidden',
      },

      minimizeTriggerLabel: {
        color: theme.colorsTheme.formulaViewedLabelColor,
        fontSize: 16,
        lineHeight: '16px',
        fontWeight: 'normal',
      },

      minimizeLabelPlacementStart: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '10px -5px 0 0',
      },
    };
  },
  { name: 'MinimizeNodeConsumes' }
);
