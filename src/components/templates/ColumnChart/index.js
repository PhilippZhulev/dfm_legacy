import React, { useRef, useLayoutEffect, useState, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
// eslint-disable-next-line camelcase
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { DateSlider } from 'components';
import ColumnLegend from './legend';
import colors from '../../theme/colors';
import {
  styleChart,
  styleDateAxis,
  styleValueAxis,
  styleSeries,
} from '../../../helpers/StyleCharts';
import getPrecisionLabel from '../../../helpers/getPrecisionLabel';

const ColumnChart = memo((props) => {
  const { classes, date, fetchData, digit } = props;
  const styles = useStyles({ classes });
  const [dataArray, setData] = useState([]);
  const [secondChart, setSecondChart] = useState('tariff');

  const precisionOptions = fetchData.depthDependencies;

  useLayoutEffect(() => {
    if (chartVar?.current) {
      chartVar.current.data = dataArray;
    }
  }, [dataArray]);

  const { dependencies: data } = fetchData;

  const chartVar = useRef(null);

  const generateLineSeriesAndValueAxis = (chart, value, color) => {
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    styleValueAxis(valueAxis);
    if (chart.yAxes.indexOf(valueAxis) !== 0) {
      valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
    }
    valueAxis.renderer.opposite = true;
    // valueAxis.title.text = value === 'tariff' ? 'Тариф' : 'Объём';
    // valueAxis.title.fill = am4core.color(colors.colorsTheme.grey);
    // valueAxis.title.rotation = 0;
    // valueAxis.title.valign = 'bottom';
    // valueAxis.title.dy = 10;

    const series = chart.series.push(new am4charts.LineSeries());
    series.name = value === 'tariff' ? 'Тариф' : 'Объём';
    series.dataFields.categoryX = 'date';
    series.dataFields.valueY = value;
    series.yAxis = valueAxis;
    series.tooltipText = `[${color}]{${value}_label}[/]`;
    styleSeries(series);
    series.sequencedInterpolation = true;
    series.fillOpacity = 0;
    series.stroke = am4core.color(color);
    series.tensionX = 0.8;

    const bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.stroke = am4core.color(color);
    bullet.circle.strokeWidth = 4;
    bullet.circle.fill = am4core.color(colors.colorsTheme.background);
  };

  const generateColumnSeriesAndValueAxis = (chart, value, color) => {
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    styleValueAxis(valueAxis);
    // valueAxis.title.text = 'TCO';
    // valueAxis.title.rotation = 0;
    // valueAxis.title.fill = am4core.color(colors.colorsTheme.grey);
    // valueAxis.title.valign = 'bottom';
    // valueAxis.title.dy = 10;
    valueAxis.renderer.grid.template.strokeOpacity = 0.2;
    if (chart.yAxes.indexOf(valueAxis) !== 0) {
      valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
    }

    const series = chart.series.push(new am4charts.ColumnSeries());
    styleSeries(series);
    series.name = 'TCO';
    series.dataFields.categoryX = 'date';
    series.dataFields.valueY = value;
    series.yAxis = valueAxis;
    series.tooltipText = `[${color}]{${value}_label}[/]`;
    series.fill = am4core.color(color);
    series.stroke = am4core.color(color);
    series.columns.template.column.cornerRadiusTopLeft = 2;
    series.columns.template.column.cornerRadiusTopRight = 2;
    series.columns.template.width = am4core.percent(50);
  };

  useLayoutEffect(() => {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    const chart = am4core.create('chartdiv_columnChart', am4charts.XYChart);
    chart.data = [];
    styleChart(chart);
    chart.cursor.xAxis = dateAxis;

    const dateAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    styleDateAxis(dateAxis);
    dateAxis.dataFields.category = 'date';

    generateColumnSeriesAndValueAxis(chart, 'tco', '#DA9C54');

    generateLineSeriesAndValueAxis(chart, 'tariff', '#5794DE');

    chartVar.current = chart;

    return () => {
      chart.dispose();
    };
  }, []);

  const handleChange = (e) => {
    setSecondChart(e);
    if (chartVar.current.series.values.length < 3) {
      generateLineSeriesAndValueAxis(chartVar.current, 'volume', '#4E8E96');
    }
    chartVar.current.series.each((el) => {
      const name = el.dataFields.valueY;
      if (name !== 'tco') {
        if (name === e) {
          el.show();
          el.yAxis.disabled = false;
        } else {
          el.hide();
          el.yAxis.disabled = true;
        }
      }
    });
  };

  return (
    <div className={styles.root}>
      <DateSlider
        onChange={(e) => setData(e)}
        dates={data}
        numberShown={3}
        currentDate={date || data[data.length].date}
        classes={{ root: styles.sliderRoot }}
      />
      <div
        style={{ width: '100%', height: '300px' }}
        id='chartdiv_columnChart'
      />
      <div className={styles.chartNames}>
        <div className={styles.tcoName}>{`TCO, ${getPrecisionLabel(
          precisionOptions.tco
        )}руб.`}</div>
        <div className={styles.secondName}>
          {secondChart === 'tariff'
            ? `Тариф, ${getPrecisionLabel(precisionOptions.tariff)}руб./ед.`
            : `Объём, ${getPrecisionLabel(precisionOptions.volume)}ед.`}
        </div>
      </div>
      <ColumnLegend
        classes={{ root: styles.legendRoot }}
        value={secondChart}
        onChange={handleChange}
      />
    </div>
  );
});

const useStyles = makeStyles(
  (theme) => ({
    sliderRoot: {
      position: 'absolute',
      top: -18,
      left: 135,
      right: 155,
      width: 'unset!important',
    },
    root: {
      position: 'relative',
      marginTop: 50,
    },
    legendRoot: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 'fit-content',
    },
    chartNames: {
      position: 'absolute',
      height: 18,
      bottom: 10,
      left: 0,
      right: 0,
      display: 'flex',
    },
    tcoName: {
      flexGrow: 1,
      color: theme.colorsTheme.grey,
      textAlign: 'left',
    },
    secondName: {
      flexGrow: 1,
      color: theme.colorsTheme.grey,
      textAlign: 'right',
    },
  }),
  {
    index: 1,
    name: 'ColumnChart',
  }
);

export default ColumnChart;
