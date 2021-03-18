import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import Scrollbar from 'react-scrollbars-custom';
import { CustomTitle, TilesWrapper, Margin, LazyRender } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import { ModelTile } from 'containers';

/**
 * Генерация плиток
 * @component
 * @public
 */
const GenerateTiles = ({
  models,
  tribe,
  stages,
  userData,
  scenario,
  byParents,
}) => {
  /** ANCHOR: Список с рефами с заголовками трайбов */
  const titlesRef = useRef([]);
  /** ANCHOR: Реф на скролл */
  const scrollRef = useRef(null);

  const classes = useStyles();

  /**
   * ANCHOR: Проверка трайба
   * @param  {string} tribeItem
   * @param  {object} item
   * @public
   */
  const checkTribes = (tribeItem, item) =>
    ((tribeItem === 'fav' &&
      item.models.find(({ like }) => like === true) !== undefined) ||
      tribeItem === item.tribe ||
      tribeItem === 'all') &&
    item.models.filter((el) => el.scenario.toLowerCase() === scenario).length >
      0;

  /**
   * ANCHOR: Проверка лайка
   * @param  {string} tribeItem
   * @param  {object} item
   * @public
   */
  const checkLike = (tribeItem, item) => tribeItem === 'fav' && !item.like;

  /**
   * ANCHOR: Отрисовка плиток
   * @param  {object} item
   * @param  {int} i
   * @public
   */
  const renderTribesAndTiles = useCallback(
    (item, i, ps) => (
      <React.Fragment key={i}>
        {checkTribes(tribe, item) ? (
          <>
            <CustomTitle
              classes={{ title: classes.titleBg }}
              type={'h2'}></CustomTitle>
            <Margin data={'0'}>
              <CustomTitle
                ref={(ref) => (titlesRef.current[i] = ref)}
                classes={{ title: classes.title }}
                type={'h2'}>
                {item.tribe}
              </CustomTitle>
              <TilesWrapper margin={'12px -12px 12px 20px'}>
                {renderByParents(item, ps)}
              </TilesWrapper>
            </Margin>
          </>
        ) : null}
      </React.Fragment>
    ),
    [tribe, models, scenario]
  );

  const groupBy = (data, key) =>
    data.reduce((acc, item) => {
      (acc[item[key]] = acc[item[key]] || []).push(item);
      return acc;
    }, {});

  const renderByParents = (item, ps) => {
    const mod = item.models.filter(
      (el) => el.scenario.toLowerCase() === scenario
    );

    if (ps && scenario === 'whatif') {
      const groupped = groupBy(mod, 'parentlabel');

      return Object.keys(groupped).map((groupIndex) => {
        const groupItem = groupped[groupIndex];
        return (
          <React.Fragment key={groupIndex}>
            <CustomTitle classes={{ title: classes.subTitle }} type={'h5'}>
              {groupIndex}
            </CustomTitle>
            {groupItem.map((modelItem, index) => (
              <React.Fragment key={modelItem.value}>
                {checkLike(tribe, modelItem) ? null : (
                  <LazyRender
                    recalc={tribe}
                    height={153}
                    width={280}
                    offset={200}
                    container={scrollRef}>
                    <Margin data={'12px'}>
                      <ModelTile
                        key={index}
                        data={modelItem}
                        stages={stages}
                        userData={userData}
                        scenario={scenario}
                        countWhatifModels={modelItem.countWhatifModels}
                      />
                    </Margin>
                  </LazyRender>
                )}
              </React.Fragment>
            ))}
          </React.Fragment>
        );
      });
    }
    return mod.map((modelItem, index) => (
      <React.Fragment key={modelItem.value}>
        {checkLike(tribe, modelItem) ? null : (
          <LazyRender
            recalc={tribe}
            height={153}
            width={280}
            offset={200}
            container={scrollRef}>
            <Margin data={'12px'}>
              <ModelTile
                key={index}
                data={modelItem}
                stages={stages}
                userData={userData}
                scenario={scenario}
                countWhatifModels={modelItem.countWhatifModels}
              />
            </Margin>
          </LazyRender>
        )}
      </React.Fragment>
    ));
  };

  return (
    <Scrollbar
      ref={scrollRef}
      trackYProps={{
        style: {
          width: 4,
          top: 130,
          height: 'calc(100% - 190px)',
        },
      }}
      thumbYProps={{
        style: {
          background: 'rgba(31, 142, 250, 0.4)',
          width: 4,
          borderRadius: 2,
        },
      }}
      style={{ height: '90%' }}>
      {models.map((item, i) => renderTribesAndTiles(item, i, byParents))}
    </Scrollbar>
  );
};

GenerateTiles.displayName = 'GenerateTiles';

GenerateTiles.propTypes = {
  classes: PropTypes.object,
  update: PropTypes.bool,
  models: PropTypes.array,
  stages: PropTypes.array,
  userData: PropTypes.object,
  tribe: PropTypes.string,
  scenario: PropTypes.string,
  byParents: PropTypes.bool,
};

GenerateTiles.defaultProps = {
  classes: {},
  update: false,
  tribes: [],
  stages: [],
  userData: {},
  isActive: false,
  type: 'tco',
  byParents: false,
};

const useStyles = makeStyles(
  () => ({
    title: {
      position: 'sticky',
      zIndex: 11,
      paddingTop: 30,
      height: 70,
      paddingLeft: 32,
      paddingBottom: 0,
      top: 0,
      transition: 'opacity 200ms ease-in-out',
      opacity: 1,
      '&.fade': {
        opacity: 0,
      },
    },
    subTitle: {
      position: 'relative',
      zIndex: 0,
      fontSize: '16px!important',
      lineHeight: '16px!important',
      color: '#fff',
      width: '100%',
      margin: '10px 12px',
    },
    titleBg: {
      position: 'fixed',
      zIndex: 10,
      width: '100%',
      paddingTop: 52,
      height: 188,
      paddingBottom: 42,
      top: 90,
      transition: 'transform 300ms ease-in-out',
      background:
        'radial-gradient(66.03% 60.92% at 70% 80.37%, #202B43 5%, #20293C 100%)',
    },
  }),
  {
    name: 'GenerateTiles',
  }
);

export default GenerateTiles;
