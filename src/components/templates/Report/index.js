import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Report from './logic';
import Excel from '../../svg/Excel';

/**
 * Создать отчет
 * @component
 * @public
 */
class ReportInit extends Report {
  Main = ({
    classes,
    model,
    resource,
    period,
    reportType = 'model',
    reportData,
  }) => {
    // Получить classes
    const styles = useStyles({ classes });
    const [urlData, setUrlData] = useState(null);

    useEffect(() => {
      this.FillReportData(model);

      let csvLast = null;
      if (reportType === 'tco') {
        this.FillSecondReportData(reportData);

        csvLast =
          'Категория/название узла;Полн. Объём, ед.;Исп. Объём, ед.;Метрика;Полные прям. расходы, руб.;Доля в расходах;Расходы на узел, руб.;Доля в ТСО, %\n';
      }

      const data = this.SetReportData(resource, period, reportType);
      const result = this.CreateReportCsv(data, csvLast);

      const urlParams = this.GenerateUrl(result);
      setUrlData(urlParams);
    }, [resource, period]);

    return urlData !== null ? (
      <a
        className={styles.root}
        download={urlData.download}
        href={urlData.url}
        onClick={(e) => e.stopPropagation()}
        target={urlData.target}>
        <Excel />
      </a>
    ) : null;
  };
}

const report = new ReportInit();

report.Main.propTypes = {
  classes: PropTypes.object,
  model: PropTypes.object,
  resource: PropTypes.string,
  period: PropTypes.number,
  reportType: PropTypes.string,
  reportData: PropTypes.object,
};

report.Main.defaultProps = { classes: {} };

// Приватные стили
const useStyles = makeStyles(() => ({
  root: {
    width: '19px',
    height: '20px',
    display: 'flex',
    margin: 'auto',
    marginRight: 15,
  },
}));

export default report.Main;
