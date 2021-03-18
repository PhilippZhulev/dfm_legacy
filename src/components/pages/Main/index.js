import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Background,
  AbsolutePosition,
  ModAbsolutePosition,
  GraphOptions,
  SearchFieldGraph,
  SingleSelect,
  FlexGrid,
  ModSelect,
  Margin,
} from 'components';
import { LeftPanelModel } from 'containers';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import D3Nodes from '../../../lib/D3Nodes.js';
import Middleware from '../../../services/middleware/index.js';

const calcOptions = [
  { value: 'full', label: 'Полный ТСО' },
  { value: 'direct', label: 'Прямые затраты' },
  { value: 'left', label: 'Нераспределённые' },
];

/**
 * Главный экран
 *
 * @component
 * @public
 */
function Main({
  classes,
  graph,
  graphSettings,
  filterValues,
  updateIndex,
  dispatchGraphCalc,
  dispatchGraphSuccess,
  calcType,
  period,
  locked,
  resource,
}) {
  const [search, setSearch] = useState('');
  const [init, setInit] = useState(false);
  const [drag, setDrag] = useState(null);
  const [calc, setCalc] = useState(calcOptions[0]);

  useEffect(
    () => () => {
      dispatchGraphSuccess({ data: { nodes: [] } });
    },
    []
  );

  /** ANCHOR: Инициализация стилей */
  const styles = useStyles({ classes });

  /**
   * ANCHOR: Поиск
   * @param  {object} event
   * @public
   */
  const _handleSearch = async (event) => {
    setSearch(event.target.value);
    window.FindNode(event.target.value);
  };
  /**
   * ANCHOR: Переключение типа значений
   * @param  {object} data
   * @public
   */
  const handleCalaType = async (data) => {
    dispatchGraphCalc({ type: data.value });
    setCalc(data);
  };

  useEffect(() => {
    if (drag !== null) {
      const dragData = drag.map((el) => ({ id: el.id, position: el.position }));
      handleSavePosition(dragData);
    }
  }, [drag]);

  const handleSavePosition = (arrayNodes) => {
    if (locked) {
      Middleware.SaveDumpData(
        {
          // id: e.id,
          resource,
          period,
          // position: { ...e.position, mod: true },
          arrayNodes,
        },
        'graph.c',
        true
      );
    }
  };

  const top = locked ? '205px' : '155px';

  // Отрисовка
  return (
    <Background>
      <AbsolutePosition
        top={top}
        zIndex={10}
        classes={{
          root: classNames(styles.leftPanel, { [styles.leftPanelTop]: locked }),
        }}>
        <LeftPanelModel />
      </AbsolutePosition>

      <AbsolutePosition
        top={top}
        right={30}
        zIndex={9}
        classes={{ root: styles.rightPanel }}>
        <FlexGrid>
          <Margin right={20}>
            <ModSelect>
              <SingleSelect
                label={''}
                width={'190px'}
                options={calcOptions}
                selected={calc}
                onChange={(result) => handleCalaType(result)}
              />
            </ModSelect>
          </Margin>
          <SearchFieldGraph
            onChange={_handleSearch}
            width={220}
            value={search}
            placeholder={'Поиск узлов'}
          />
        </FlexGrid>
      </AbsolutePosition>

      <ModAbsolutePosition>
        <AbsolutePosition zIndex={8}>
          {init === false ? (
            <div
              style={{
                background:
                  'radial-gradient(66.03% 60.92% at 70% 58.37%, #223359 0%, #20293C 76.37%)',
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: 200,
              }}>
              <div
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  margin: 'auto',
                  width: 40,
                  height: 40,
                }}>
                <CircularProgress disableShrink color='primary' />
              </div>
            </div>
          ) : null}
          <D3Nodes
            data={graph}
            visible={init}
            starsDensity={2000}
            key={`${graph.length}_${graphSettings.ver}_${updateIndex}_${calcType}`}
            onInit={() => {}}
            loked={false}
            onDelete={() => {}}
            onActive={(targetElement) => {
              document.dispatchEvent(
                new CustomEvent('app.graph.activeNode', {
                  detail: {
                    value: targetElement.userData.data.id,
                    label: targetElement.userData.data.name,
                  },
                })
              );
            }}
            init={(start) => {
              setInit(start);
              if (window.agrGraph) {
                window.IsAggregate(window.agrGraph);
              }
            }}
            settings={graphSettings.settings}
            onGroup={() => {}}
            onDrag={(e) => {
              clearTimeout(window.DragTimer);
              window.DragTimer = setTimeout(() => {
                setDrag(e);
              }, 200);
            }}
          />
        </AbsolutePosition>
      </ModAbsolutePosition>
      <GraphOptions {...{ init }} filterValues={filterValues} />
      <div id='portal-maximize'></div>
    </Background>
  );
}

/** Основные стили */
const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      leftPanel: { height: 'calc(100% - 155px)', transition: 'top .4s linear' },
      leftPanelTop: {
        height: 'calc(100% - 205px)',
      },
      rightPanel: {
        transition: 'top .4s linear',
      },
    };
  },
  {
    name: 'Main',
  }
);

Main.propTypes = {
  graph: PropTypes.array,
  period: PropTypes.number,
  classes: PropTypes.object,
  graphSettings: PropTypes.object,
  filterValues: PropTypes.object,
  updateIndex: PropTypes.number,
  dispatchGraphCalc: PropTypes.func.isRequired,
  dispatchGraphSuccess: PropTypes.func.isRequired,
  calcType: PropTypes.string.isRequired,
  resource: PropTypes.string,
  locked: PropTypes.bool,
};

export default Main;
