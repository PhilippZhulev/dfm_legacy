import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import colors from '../components/theme/colors';

export function styleChart(chart) {
  // Стилизация курсора графика

  chart.cursor = new am4charts.XYCursor();
  chart.cursor.lineX.stroke = am4core.color('#FFF');
  chart.cursor.lineX.strokeOpacity = 0.7;
  chart.cursor.lineY.stroke = am4core.color('#FFF');
  chart.cursor.lineY.strokeOpacity = 0.7;
}

export function styleDateAxis(dateAxis) {
  // стилизация оси дат, сетки

  dateAxis.renderer.minGridDistance = 60;
  dateAxis.renderer.labels.template.opacity = 0;
  dateAxis.renderer.grid.template.strokeOpacity = 0;

  // Стилизация всплывающих подсказок над значениями

  dateAxis.tooltip.background.fill = am4core.color(
    colors.colorsTheme.hrBackgroundDefault
  );
  dateAxis.tooltip.background.stroke = am4core.color(
    colors.colorsTheme.hrBackgroundDefault
  );
  dateAxis.tooltip.background.cornerRadius = 5;
}

export function styleValueAxis(valueAxis) {
  valueAxis.tooltip.disabled = true;
  valueAxis.renderer.labels.template.fill = am4core.color(
    colors.colorsTheme.grey
  );
  valueAxis.renderer.labels.template.marginRight = 20;
  valueAxis.renderer.labels.template.maxWidth = 80;
  valueAxis.renderer.labels.template.width = 80;
  valueAxis.renderer.labels.template.truncate = true;
  valueAxis.renderer.grid.template.strokeOpacity = 0;
}

export function styleSeries(series) {
  series.tooltip.background.fill = am4core.color(
    colors.colorsTheme.hrBackgroundDefault
  );
  series.tooltip.background.stroke = am4core.color(
    colors.colorsTheme.hrBackgroundDefault
  );
  series.tooltip.background.fillOpacity = 1;
  series.tooltip.getFillFromObject = false;
  series.tooltip.getStrokeFromObject = false;
  series.tooltip.background.strokeWidth = 3;
  series.fillOpacity = 1;
  series.strokeWidth = 2;
  series.tooltip.background.filters.clear();
}
