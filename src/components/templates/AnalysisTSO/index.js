import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Report, PeriodChanger, SingleSelect } from 'components';
import Scrollbar from 'react-scrollbars-custom';
import ConsFilter from './filter';
import ConsTable from './table';
import HorizontalChanger from '../../ui/HorizontalChanger';
import DelimiterVertical from '../../svg/DelimiterVertical';
import { virualStore } from '../../../virtualStore';

import Maximize from '../../svg/Maximize';
import ReportTSOSelect from '../../mods/ReportTSOSelect';
import Pie from './pie';
import MaximizeWindow from './maximize';

const headData = [
  {
    value: 'Название узла',
    width: '40%',
  },
  {
    value: 'Метрика узла',
    width: '15%',
  },
  {
    value: 'Полн. Объём, ед.',
    width: '15%',
  },
  {
    value: 'Расходы на узел, руб.',
    width: '15%',
  },
  {
    value: 'Доля в ТСО, %',
    width: '15%',
  },
];

const sortData = [
  {
    label: 'Название узла',
    value: 'resourceName',
  },
  {
    label: 'Метрика узла',
    value: 'metricId',
  },
  {
    label: 'Полн. Объём, ед.',
    value: 'fullValue',
  },
  {
    label: 'Расходы на узел, руб.',
    value: 'partCause',
  },
  {
    label: 'Доля в ТСО, %',
    value: 'partTCO',
  },
];

function AnalysisTSO({
  classes,
  model,
  periodTypes,
  dispatchReport,
  dispatchReset,
  currentPeriod,
  headResource,
  reportData,
}) {
  const root = useRef(null);
  const header = useRef(null);
  const filter = useRef(null);

  const styles = useStyles({ classes });
  const [dependencies, setDependencies] = useState([]);
  const [slider, setSlider] = useState(null);
  // const [sort, setSort] = useState(null);
  const sort = 'partTCO';
  const [digit, setDigit] = useState(1e6);
  const [node, setNode] = useState(null);
  const [period, setPeriod] = useState({});
  const [max, setMax] = useState(false);
  const [frameSize, setFrameSize] = useState({
    rw: 0,
    rh: 0,
    hw: 0,
    hh: 0,
    fw: 0,
    fh: 0,
  });
  const [timeUnit, setTimeUnit] = useState(null);

  useLayoutEffect(() => {
    window.addEventListener('resize', getHeight);
    return () => window.removeEventListener('resize', getHeight);
  }, [root, header, filter]);

  useEffect(() => {
    if (slider) {
      getHeight();
      const d = [...reportData.list];
      const result = d
        .filter(
          (item) =>
            item[slider.type] >= slider.values[0] &&
            item[slider.type] <= slider.values[1]
        )
        .sort(sorted);
      setDependencies(result);
    }
  }, [slider]);

  useEffect(() => {
    if (model) {
      dispatchReport({
        params: {
          resourceId: headResource.value,
          periodId: currentPeriod.value,
          modelId: model.model.id,
          currency: digit,
        },
      });

      setPeriod(currentPeriod);
      setTimeUnit(periodTypes[0]);
    }

    return () => dispatchReset();
  }, [model]);

  useEffect(() => {
    if (Array.isArray(reportData.list)) {
      setDependencies(reportData.list);
    }
  }, reportData);

  useEffect(() => {
    let d = [...dependencies];
    if (sort) {
      d = d.sort(sorted);
      setDependencies(d);
    }
  }, []); // [sort]);

  const handleDigitChange = (d) => {
    setDigit(d);

    dispatchReport({
      params: {
        resourceId: reportData.chart.value,
        periodId: period?.value || currentPeriod.value,
        modelId: model.model.id,
        currency: d,
      },
    });
  };

  const handleNodeChange = (d) => {
    setNode(d);
    dispatchReport({
      params: {
        resourceId: d.value,
        periodId: period?.value || currentPeriod.value,
        modelId: model.model.id,
        currency: digit,
      },
    });
  };
  /** Колбэк изменения периода(ов) */
  const handlePeriodsChange = (d) => {
    dispatchReport({
      params: {
        resourceId: reportData.chart.value,
        periodId: d.currents[0].value,
        modelId: model.model.id,
        currency: digit,
      },
    });
    setPeriod(d.currents[0]);
    setTimeUnit(d.periodType);
  };

  const sorted = (a, b) => {
    if (a[sort] < b[sort]) {
      return 1;
    }
    if (a[sort] > b[sort]) {
      return -1;
    }

    // names must be equal
    return 0;
  };

  const getHeight = () => {
    if (root.current && header.current && filter.current) {
      const r = root.current;
      const h = header.current;
      const f = filter.current;

      setFrameSize({
        rh: r.offsetHeight,
        rw: r.offsetWidth,
        hw: h.offsetWidth,
        hh: h.offsetHeight,
        fw: f.offsetWidth,
        fh: f.offsetHeight,
      });
    }
  };

  if (!reportData.state) {
    return null;
  }

  return (
    <div ref={root} className={styles.root}>
      <MaximizeWindow
        {...{
          setMax,
          max,
          model,
          digit,
          node: node || headResource,
          period: period || currentPeriod,
          periodTypes,
          handleDigitChange,
          handlePeriodsChange,
          handleNodeChange,
          reportData,
          parentStyles: styles,
        }}
      />
      <div className={styles.leftPanel}>
        <div className={styles.reportHeader}>
          <div ref={header}>
            <div className={styles.reportHeaderRow}>
              <div className={styles.reportHeaderModel}>
                <div className={styles.reportFirstHeader}>
                  Анализ драйверов ТСО
                </div>
                <div className={styles.reportSecondHeader}>
                  <ReportTSOSelect>
                    <SingleSelect
                      options={model.resources}
                      selected={node || headResource}
                      onChange={(result) => handleNodeChange(result)}
                    />
                  </ReportTSOSelect>
                </div>
              </div>
              <div className={styles.periodChanger}>
                <HorizontalChanger
                  current={digit}
                  items={[
                    { value: 1e9, label: 'млрд' },
                    { value: 1e6, label: 'млн' },
                    { value: 1e3, label: 'тыс' },
                  ]}
                  allowItems={[1e9, 1e6, 1e3]}
                  onChange={handleDigitChange}
                />

                <div className={styles.delimiter}>
                  <div className={styles.delimiterInner}>
                    <DelimiterVertical />
                  </div>
                </div>

                <div className={styles.excel}>
                  <Report
                    reportType={'tco'}
                    reportData={reportData}
                    model={virualStore.model}
                    resource={node?.value || headResource.value}
                    period={period?.value || currentPeriod.value}
                  />
                </div>
                <div onClick={() => setMax(!max)} className={styles.maximize}>
                  <Maximize />
                </div>
              </div>
            </div>
          </div>
          <Scrollbar
            trackYProps={{
              style: {
                width: 4,
                right: -20,
              },
            }}
            thumbYProps={{
              style: {
                background: 'rgba(31, 142, 250, 0.4)',
                width: 4,
                borderRadius: 2,
              },
            }}
            style={{
              position: 'relative',
              height: frameSize.rh - frameSize.hh - 40,
            }}>
            <div
              className={classNames(
                styles.reportHeaderRow,
                styles.reportHeaderRowCenter
              )}>
              <PeriodChanger
                doubleChanger={false}
                periodType={timeUnit}
                allowPeriodTypes={periodTypes}
                currents={[period]}
                periodList={model.periods}
                onChange={handlePeriodsChange}
              />
            </div>
            <div>
              <Pie
                key={reportData.chart.label}
                chartData={reportData && reportData.chart}
              />
            </div>
          </Scrollbar>
        </div>
      </div>
      <div className={styles.consumption}>
        <div ref={filter}>
          <ConsFilter
            sliderCall={(value) => setSlider(value)}
            // sortCall={(val) => setSort(val.value)}
            {...{
              dependencies: reportData.list,
              sortData,
              select: sortData[4],
            }}
          />
        </div>
        <ConsTable {...{ frameSize, headData, dependencies }} />
      </div>
    </div>
  );
}

AnalysisTSO.propTypes = {
  classes: PropTypes.object,
  model: PropTypes.object,
  periodTypes: PropTypes.array,
  dispatchReport: PropTypes.func,
  dispatchReset: PropTypes.func,
  currentPeriod: PropTypes.object,
  headResource: PropTypes.object,
  reportData: PropTypes.object,
};

const useStyles = makeStyles(
  (theme) => ({
    root: {
      height: '100%',
      width: '100%',
    },
    leftPanel: {
      width: '45%',
      height: '100%',
      paddingRight: 40,
    },
    reportHeader: {
      marginBottom: 30,
    },

    reportHeaderRow: {
      paddingBottom: 32,
      marginBottom: 36,
      display: 'flex',
      flexFlow: 'row wrap',
      '&:not($reportHeaderRowCenter):nth-child(1)': {
        borderBottom: '1px solid rgba(112, 126, 138, 0.24)',
      },
    },

    reportHeaderRowCenter: {
      justifyContent: 'center',
    },

    reportHeaderModel: {},

    reportFirstHeader: {
      fontSize: 13,
      lineHeight: '16px',
      color: '#98A7B9',
      display: 'flex',
      alignItems: 'center',
    },

    reportSecondHeader: {
      fontSize: 20,
      lineHeight: '24px',
      color: '#fff',
      order: 0,
      display: 'flex',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 8,
    },

    delimiter: {
      display: 'inline-flex',
      verticalAlign: 'middle',
    },
    excel: {
      display: 'inline-flex',
      verticalAlign: 'middle',
      marginRight: 32,
      cursor: 'pointer',

      '&:hover svg': {
        fill: '#fff',
      },
    },
    maximize: {
      display: 'inline-flex',
      verticalAlign: 'middle',
      cursor: 'pointer',

      '&:hover svg': {
        fill: '#fff',
      },
    },

    delimiterInner: {
      display: 'flex',
      alignSelf: 'center',
      padding: '4px 40px',
    },

    periodChanger: { order: 999, marginLeft: 'auto', marginTop: 22 },

    consumption: {
      top: 0,
      right: 0,
      width: '55%',
      position: 'absolute',
      padding: '40px 50px',
      height: '100%',
      background: '#1F2738',
      borderRadius: '0px 8px 8px 0px',
    },
  }),
  {
    name: 'AnalysisTSO',
    index: 1,
  }
);

export default AnalysisTSO;
