import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  PeriodChanger,
  StackedChart,
  ColumnChart,
  ChartItem,
} from 'components';
import Scrollbar from 'react-scrollbars-custom';
import Compare from './compare';
import { DescriptionModel } from './descriptionModel';
import HorizontalChanger from '../../ui/HorizontalChanger';
import DelimiterVertical from '../../svg/DelimiterVertical';
import getPrecisionLabel from '../../../helpers/getPrecisionLabel';

function BusinessOverview({
  classes,
  model,
  periodTypes,
  reportData,
  reportState,
  dispatchReport,
  dispatchReset,
  currentPeriod,
  secondPeriod,
}) {
  const styles = useStyles({ classes });

  /** MOCK */
  const [digit, setDigit] = useState(1e6);
  const [period, setPeriod] = useState([]);
  const [timeUnit, setTimeUnit] = useState(null);

  useEffect(() => {
    if (model) {
      dispatchReport({
        params: {
          modelId: model.model.id,
          periodFirstId: currentPeriod.value,
          periodLastId: secondPeriod.value,
          currency: digit,
        },
      });

      setPeriod([currentPeriod, secondPeriod]);
      setTimeUnit(periodTypes[0]);
    }

    return () => dispatchReset({});
  }, [model]);

  /** Колбэк изменения размерности */
  const handleDigitChange = (d) => {
    setDigit(d);

    dispatchReset({
      params: {
        modelId: model.model.id,
        periodFirstId: period[0].value,
        periodLastId: period[1].value,
        currency: d,
      },
    });
  };

  /** Колбэк изменения периода(ов) */
  const handlePeriodsChange = (d) => {
    setPeriod(d.currents);
    setTimeUnit(d.periodType);

    dispatchReset({
      params: {
        modelId: model.model.id,
        periodFirstId: d.currents[0].value,
        periodLastId: d.currents[1].value,
        currency: digit,
      },
    });
  };

  if (!reportState) {
    return null;
  }

  if (reportData.error) {
    return (
      <div className={styles.root}>
        <div className={styles.reportHeader}>
          <div className={styles.reportHeaderModel}>
            <div className={styles.reportFirstHeader}>Структура модели</div>
            <div className={styles.reportSecondHeader}>{reportData.label}</div>
          </div>
        </div>
        Для выбранной модели отчет не применим: проверьте наличие у главного
        узла модели тарифа и объема предоставляемых ресурсов и убедитесь, что
        модель не является объединенной.
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.reportHeader}>
        <div className={styles.reportHeaderModel}>
          <div className={styles.reportFirstHeader}>Структура модели</div>
          <div className={styles.reportSecondHeader}>{reportData.label}</div>
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

          <PeriodChanger
            doubleChanger={true}
            periodType={timeUnit}
            allowPeriodTypes={periodTypes}
            currents={period}
            periodList={model.periods}
            onChange={handlePeriodsChange}
          />
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
          height: 'calc(100% - 100px)',
        }}>
        <div>
          <Compare {...{ data: reportData }} />
          <DescriptionModel {...reportData} />
          <div className={styles.charts}>
            <ChartItem label={'Динамика TCO узла'}>
              <ColumnChart
                key={`${reportData.key}_column`}
                fetchData={reportData.chartDynamicsTCONode}
                date={reportData?.periods?.first?.label}
                digit={digit}
              />
            </ChartItem>
            <ChartItem
              label={`Распределение TCO по категориям, ${getPrecisionLabel(
                reportData.chartTcoCategory.digit
              )}руб.`}>
              <StackedChart
                key={`${reportData.key}_stacked`}
                fetchData={reportData.chartTcoCategory}
                date={reportData?.periods?.first?.label}
              />
            </ChartItem>
          </div>
        </div>
      </Scrollbar>
    </div>
  );
}

BusinessOverview.propTypes = {
  classes: PropTypes.object,
};

BusinessOverview.propTypes = {
  classes: PropTypes.object,
  model: PropTypes.object,
  periodTypes: PropTypes.array,
  dispatchReport: PropTypes.func,
  dispatchReset: PropTypes.func,
  reportData: PropTypes.object,
  reportState: PropTypes.bool,
  currentPeriod: PropTypes.object,
  secondPeriod: PropTypes.object,
};

const useStyles = makeStyles(
  (theme) => ({
    root: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      padding: 40,
      color: theme.colorsTheme.text,
    },

    reportHeader: {
      display: 'flex',
      flexFlow: 'row wrap',
      marginBottom: 30,
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

    delimiterInner: {
      display: 'flex',
      alignSelf: 'center',
      padding: '4px 40px',
    },

    charts: {
      display: 'flex',
      marginTop: 50,
      '& g[aria-labelledby^="id-"][filter^="url("]': {
        display: 'none',
      },
    },

    vspace: {
      flexGrow: 1,
    },

    periodChanger: { order: 999, marginLeft: 'auto', marginTop: 16 },
  }),
  {
    name: 'BusinessOverview',
    index: 1,
  }
);

export default BusinessOverview;
