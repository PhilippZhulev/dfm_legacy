import React from 'react';
import { MoneyFormat } from 'helpers';

/**
 * Создание отчетности
 * @public
 * @class
 */
class Report {
  constructor() {
    /* модель */
    this._model = null;
    this._second = null;
  }

  /**
   * Заполнить хранилище data
   * @param {Object} data // модель
   * @public
   */
  FillReportData = (data) => {
    this._model = data;
  };

  /**
   * Заполнить вторичные данные
   * @param {Object} second
   * @public
   */
  FillSecondReportData = (second) => {
    this._second = second;
  };

  /**
   * Получить дефолтное состояние модели
   * @public
   * @return {Object}
   */
  GetDefaultReportData = () => this._model;

  /**
  Создать данные для отчета
  @param {String} resource id ресурса
  @param {Number} period id периода
  @public
  @return {Object}
  */
  SetReportData = (resource, period, reportType = 'model') => {
    /**
     * Получить ресурс
     * @param {String} point //id
     * @private
     */
    const getRes = (point) =>
      this._model.resources.find(({ value }) => value === point);

    const targetRes = getRes(resource);
    const periodLabel = this._model.periodDictionary.find(
      ({ id }) => id === period
    ).label;

    /** Маппинг данных в csv структуру */
    const periodData = targetRes.budcycles.find(({ id }) => id === period);

    let childrenData = [];

    switch (reportType) {
      case 'model':
        childrenData = targetRes.uses.map((use) => {
          const child = getRes(use);
          const per = child.budcycles.find(({ id }) => id === period);
          const childCons = periodData.consumptions.find(
            ({ resourceId }) => resourceId === use
          );
          const metric = this._model.metricDictionary.find(
            ({ value }) => value === child.metrics[0]
          );

          /** TODO: Костыль на childCons и volumes */
          if (childCons?.volumes?.length > 0) {
            const { volume } = childCons.volumes[0];
            return [
              child?.label,
              metric?.label,
              String(volume),
              MoneyFormat(volume * per?.tariffs[0]?.unitCost),
              `${(
                ((volume * per?.tariffs[0]?.unitCost) /
                  periodData.totals.full) *
                100
              ).toFixed(1)}%`,
            ];
          }
          return [child?.label];
        });
        break;
      case 'tco':
        if (this._second) {
          childrenData = this._second.list.map((el, i) => [
            `${el.categoryName} / ${el.resourceName}`,
            el.fullValueFormat,
            el.usedValueFormat,
            el.metricName,
            el.directCauseFormat,
            el.partCauseFormat,
            el.sumCauseFormat,
            `${el.partTCOFormat}%`,
          ]);
        }
        break;

      default:
        break;
    }

    return {
      resource: [
        targetRes.label,
        MoneyFormat(periodData.totals.full),
        periodLabel,
        MoneyFormat(periodData.fixed[0].price),
        `${((periodData.fixed[0].price / periodData.totals.full) * 100).toFixed(
          1
        )}%`,
      ],
      children: childrenData,
    };
  };

  /**
  Создать данные для csv
  @param {Array} data массив данных для csv
  @public
  @return {String}
  */
  CreateReportCsv = (
    data,
    csvLast = 'Узел потребляет ресурсы;Единица измерения;Объем (исп.);Прямые расходы;Доля в ТСО\n'
  ) => {
    let csv = '';

    /** Заголовки таблицы */
    const csvFirst =
      'Выбранный узел;ТСО;Период;Фиксированные (в год);Доля в ТСО\n';

    /**
     * Gолучить ресурс
     * @param {Array} target исходный массив данных
     * @private
     */
    const csvGen = (target) => {
      target.forEach((row) => {
        csv += row.join(';');
        csv += '\n';
      });
    };

    /** Объеднить данные */
    csv += csvFirst;
    csvGen([data.resource]);
    csvGen([['']]);

    csv += csvLast;
    csvGen(data.children);

    const BOM = '\uFEFF';

    return BOM + csv;
  };

  /**
   * Создать данные для скачивания
   * @param {String} csv данные для csv
   * @public
   * @return {Object}
   */
  GenerateUrl = (csv) => ({
    url: `data:text/csv;charset=utf-8,${encodeURI(csv)}`,
    target: '_blank',
    download: `node_report_${new Date()}.csv`,
  });
}

export default Report;
