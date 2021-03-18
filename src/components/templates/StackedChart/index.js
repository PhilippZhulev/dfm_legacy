import React, { useRef, useLayoutEffect, useState, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
// eslint-disable-next-line camelcase
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { DateSlider } from 'components';
import StackedLegend from './legend';
import colors from '../../theme/colors';
import {
  styleChart,
  styleDateAxis,
  styleValueAxis,
  styleSeries,
} from '../../../helpers/StyleCharts';

const StackedChart = memo((props) => {
  const { classes, fetchData, date } = props;
  const styles = useStyles({ classes });

  const [dataArray, setData] = useState([]);

  useLayoutEffect(() => {
    if (chartVar?.current) {
      chartVar.current.data = dataArray;
    }
  }, [dataArray]);

  const { dependencies: data, categories } = fetchData;

  const chartVar = useRef(null);

  const generateLineSeries = (chart, value) => {
    const categoryData = categories.find((item) => item.value === value);
    const series = chart.series.push(new am4charts.LineSeries());
    series.name = categoryData?.categoryName || '';
    series.dataFields.categoryX = 'date';
    series.dataFields.valueY = value;
    series.tooltipText = `[${categoryData.color}]{${value}_label}[/]`;
    series.stacked = true;
    series.fill = am4core.color(categoryData?.color);
    series.stroke = am4core.color(categoryData?.color);
    series.tensionX = 0.8;
    styleSeries(series);
  };

  const generateColumnSeries = (chart, value) => {
    const categoryData = categories.find((item) => item.value === value);
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.name = categoryData?.categoryName || '';
    series.dataFields.categoryX = 'date';
    series.dataFields.valueY = value;
    series.tooltipText = `[${categoryData.color}]{${value}_label}[/]`;
    series.stacked = true;
    series.fill = am4core.color(categoryData?.color);
    series.stroke = am4core.color(categoryData?.color);
    styleSeries(series);
  };

  useLayoutEffect(() => {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    const chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.data = [];

    styleChart(chart);

    const dateAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    dateAxis.dataFields.category = 'date';
    chart.cursor.xAxis = dateAxis;

    styleDateAxis(dateAxis);

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    styleValueAxis(valueAxis);

    valueAxis.renderer.grid.template.strokeOpacity = 0.2;

    const generateSeries =
      data.length === 1 ? generateColumnSeries : generateLineSeries;

    categories.forEach((el) => generateSeries(chart, el.value));

    chartVar.current = chart;

    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <div className={styles.root}>
      <DateSlider
        onChange={(e) => setData(e)}
        dates={data}
        numberShown={3}
        currentDate={date || data[data.length].date}
        classes={{ root: styles.sliderRoot }}
      />
      <div style={{ width: '100%', height: '300px' }} id='chartdiv' />
      <StackedLegend
        classes={{ root: styles.legendRoot }}
        categories={categories}
      />
    </div>
  );
});

const useStyles = makeStyles(
  () => ({
    sliderRoot: {
      position: 'absolute',
      top: -18,
      left: 155,
      right: 57,
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
  }),
  {
    index: 1,
    name: 'StackedChart',
  }
);

export default StackedChart;
