import React, { useEffect, useState, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Report,
  PeriodChanger,
  SingleSelect,
  Icon,
  Checkbox,
} from 'components';
import Scrollbar from 'react-scrollbars-custom';
import HorizontalChanger from '../../ui/HorizontalChanger';
import DelimiterVertical from '../../svg/DelimiterVertical';
import { virualStore } from '../../../virtualStore';
import ReportTSOSelect from '../../mods/ReportTSOSelect';
import Maximize from '../../svg/Maximize';
import ConsFilter from './filter';
import CheckedHead from '../../svg/CheckedHead';

const getIcon = (value) => {
  switch (value) {
    case 'compute':
    case 'storage':
      return 'STORAGE';
    case 'dbms':
      return 'DBMS';
    case 'isoft':
      return 'ISOFT';
    case 'as':
      return 'AS';
    case 'staff':
      return 'STAFF';
    case 'bu':
      return 'BU';
    default:
      return 'COD';
  }
};

const headData = [
  {
    value: 'Категория, название узла',
    width: '23%',
  },
  {
    value: 'Полн. Объём, ед.',
    width: '9.5%',
  },
  {
    value: 'Исп. Объём, ед.',
    width: '9.5%',
  },
  {
    value: 'Метрика',
    width: '7.5%',
  },
  {
    value: 'Полные прям. расходы, руб.',
    width: '12%',
  },
  {
    value: 'Доля в расходах',
    width: '6%',
  },
  {
    value: 'Расходы на узел, руб.',
    width: '12%',
  },
  {
    value: 'Доля в ТСО, %',
    width: '8%',
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
    label: 'Исп. Объём, ед.',
    value: 'usedValue',
  },
  {
    label: 'Полные прям. расходы, руб.',
    value: 'directCause',
  },
  {
    label: 'Доля в ТСО, %',
    value: 'partTCO',
  },
];

const MaximizeWindow = memo(
  ({
    classes,
    model,
    parentStyles,
    handleDigitChange,
    handleNodeChange,
    handlePeriodsChange,
    periodTypes,
    digit,
    node,
    period,
    max,
    setMax,
    reportData,
  }) => {
    const styles = useStyles({ classes });
    const [slider, setSlider] = useState(null);
    const [sort, setSort] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
      setSelected(reportData.categories.map((el) => el.categoryId));
    }, [reportData]);

    useEffect(() => {
      if (reportData && slider) {
        const filter = (item) =>
          reportData.list
            .filter(
              (el) =>
                el.categoryId === item.categoryId &&
                el[slider.type] >= slider.values[0] &&
                el[slider.type] <= slider.values[1]
            )
            .sort(sorted);

        const dataCat = [];
        reportData.categories.forEach((item) => {
          if (selected.includes(item.categoryId)) {
            const f = filter(item);
            if (f.length > 0) {
              dataCat.push({
                items: f,
                categoryId: item.categoryId,
                categoryName: item.categoryName,
                color: item.color,
                partTCO: item.partTCO,
                sumCauseFormat: item.sumCauseFormat,
              });
            }
          }
        });
        setTableData(dataCat);
      }
    }, [reportData, selected, slider, sort]);

    const handleSelected = (index) => {
      let s = [...selected];
      if (!s.includes(index)) {
        s.push(index);
      } else {
        s = s.filter((item) => item !== index);
      }
      setSelected(s);
    };

    const handleClearSelected = () => {
      if (selected.length > 0) {
        setSelected([]);
      } else {
        setSelected(reportData.categories.map((el) => el.categoryId));
      }
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

    return (
      <div className={`${styles.root} ${max ? 'active' : ''}`}>
        <div className={parentStyles.reportHeader}>
          <div className={parentStyles.reportHeaderRow}>
            <div className={parentStyles.reportHeaderModel}>
              <div className={parentStyles.reportFirstHeader}>
                Анализ драйверов ТСО
              </div>
              <div className={parentStyles.reportSecondHeader}>
                <ReportTSOSelect>
                  <SingleSelect
                    options={model.resources}
                    selected={node}
                    onChange={(result) => handleNodeChange(result)}
                  />
                </ReportTSOSelect>
              </div>
            </div>
            <div className={parentStyles.periodChanger}>
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
              <div className={styles.periods}>
                <PeriodChanger
                  doubleChanger={false}
                  periodType={periodTypes[0]}
                  allowPeriodTypes={periodTypes}
                  currents={[period]}
                  periodList={model.periods}
                  onChange={handlePeriodsChange}
                />
              </div>

              <div className={parentStyles.delimiter}>
                <div className={parentStyles.delimiterInner}>
                  <DelimiterVertical />
                </div>
              </div>

              <div className={parentStyles.excel}>
                <Report
                  reportType={'tco'}
                  reportData={reportData}
                  model={virualStore.model}
                  resource={node.value}
                  period={period.value}
                />
              </div>
              <div
                onClick={() => setMax(!max)}
                className={parentStyles.maximize}>
                <Maximize />
              </div>
            </div>
          </div>
        </div>
        <div>
          <ConsFilter
            sliderCall={(value) => setSlider(value)}
            full
            sortCall={(val) => setSort(val.value)}
            {...{
              dependencies: reportData.list,
              sortData,
              select: sortData[4],
            }}
          />
        </div>
        <div className={styles.table}>
          <div className={styles.tableFilters}>
            <div className={styles.tableFiltersHeader}>
              <div className={styles.checkHeaderIcon}>
                <CheckedHead />
              </div>
              <div>Выделить/сбросить все</div>
              <div className={styles.checkHeader}>
                <Checkbox
                  checked={selected.length > 0}
                  onChange={() => handleClearSelected()}
                  value={true}
                />
              </div>
            </div>
            <div>
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
                  height: window.innerHeight - 570,
                }}>
                {reportData.categories.map((item, i) => (
                  <div
                    onClick={() => handleSelected(item.categoryId)}
                    className={styles.catsItem}
                    key={i}>
                    <div
                      style={{ background: item.color }}
                      className={styles.inner}
                    />
                    <div
                      style={{
                        background: item.color,
                      }}
                      className={styles.icon}
                      data-testid='categoryIcon'>
                      <Icon
                        icon={getIcon(item.categoryId)}
                        size={18}
                        strokeColor='transparent'
                      />
                    </div>
                    <div className={styles.text}>{item.categoryName}</div>
                    <div className={styles.check}>
                      <Checkbox
                        checked={selected.includes(item.categoryId)}
                        onChange={() => {}}
                        value={true}
                      />
                    </div>
                  </div>
                ))}
              </Scrollbar>
            </div>
          </div>
          <div className={styles.tableWrapper}>
            <div className={styles.tableHead}>
              {headData.map(({ value, width }, i) => (
                <div style={{ width }} key={i} className={styles.col}>
                  {value}
                </div>
              ))}
            </div>
            <div className={styles.tableBody}>
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
                  height: window.innerHeight - 590,
                }}>
                <div>
                  {tableData.map((item, i) => (
                    <React.Fragment key={i}>
                      <div className={styles.tableGroup}>
                        <div className={styles.tableCategoryGroupTitle}>
                          <div
                            style={{ background: item.color }}
                            className={styles.tableCategoryGroup}>
                            <Icon
                              icon={getIcon(item.categoryId)}
                              size={18}
                              strokeColor='transparent'
                            />
                          </div>
                          <div className={styles.tableCategoryGroupTitleLabel}>
                            {item.categoryName}
                          </div>
                        </div>
                        <div className={styles.tableCategoryGroupValues}>
                          <div> {item.sumCauseFormat}</div>
                          <div> {item.partTCO}%</div>
                        </div>
                      </div>
                      {item.items.map((el, index) => (
                        <div key={`${index}_${i}`} className={styles.tableItem}>
                          <div
                            style={{ width: headData[0].width }}
                            className={styles.tableItemCol}>
                            <div
                              style={{ background: item.color }}
                              className={styles.tableItemIcon}>
                              <Icon
                                icon={getIcon(item.categoryId)}
                                size={18}
                                strokeColor='transparent'
                              />
                            </div>
                            <div className={styles.tableItemLabel}>
                              <div>{item.categoryName}</div>
                              <div>{el.resourceName}</div>
                            </div>
                          </div>
                          <div
                            style={{ width: headData[1].width }}
                            className={styles.tableItemCol}>
                            <div className={styles.tableItemText}>
                              {el.fullValueFormat}
                            </div>
                          </div>
                          <div
                            style={{ width: headData[2].width }}
                            className={styles.tableItemCol}>
                            <div className={styles.tableItemText}>
                              {el.usedValueFormat}
                            </div>
                          </div>
                          <div
                            style={{ width: headData[3].width }}
                            className={styles.tableItemCol}>
                            <div className={styles.tableItemText}>
                              {el.metricName}
                            </div>
                          </div>
                          <div
                            style={{ width: headData[4].width }}
                            className={styles.tableItemCol}>
                            <div className={styles.tableItemText}>
                              {el.directCauseFormat}
                            </div>
                          </div>
                          <div
                            style={{ width: headData[5].width }}
                            className={styles.tableItemCol}>
                            <div className={styles.tableItemText}>
                              {el.partCauseFormat}
                            </div>
                          </div>
                          <div
                            style={{ width: headData[6].width }}
                            className={styles.tableItemCol}>
                            <div className={styles.tableItemTextWhite}>
                              {el.sumCauseFormat}
                            </div>
                          </div>
                          <div
                            style={{ width: headData[7].width }}
                            className={styles.tableItemCol}>
                            <div className={styles.tableItemTextWhite}>
                              {el.partTCOFormat}%
                            </div>
                          </div>
                          <div style={{ width: '12%' }}>
                            <div className={styles.progress}>
                              <div
                                style={{ width: `${el.partTCO}%` }}
                                className={styles.progressInner}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </Scrollbar>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

MaximizeWindow.propTypes = {
  classes: PropTypes.object,
  model: PropTypes.object,
  parentStyles: PropTypes.object,
  handleDigitChange: PropTypes.func,
  handleNodeChange: PropTypes.func,
  handlePeriodsChange: PropTypes.func,
  periodTypes: PropTypes.array,
  digit: PropTypes.number,
  node: PropTypes.object,
  period: PropTypes.object,
  max: PropTypes.bool,
  setMax: PropTypes.func,
  reportData: PropTypes.object,
};

MaximizeWindow.defaultProps = {};

const useStyles = makeStyles(
  (theme) => ({
    root: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: '#2F3B52',
      borderRadius: 8,
      overwflow: 'hidden',
      zIndex: 50,
      padding: 40,
      top: 0,
      left: 0,
      transition: 'all .2s ease-in-out',
      opacity: 0,
      visibility: 'hidden',
      transform: 'scale(1.5)',
      '&.active': {
        opacity: 1,
        visibility: 'visible',
        transform: 'scale(1)',
      },
    },
    inner: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      borderRadius: 4,
      transition: 'opacity .2s ease-in-out',
      top: 0,
      left: 0,
      zIndex: 0,
      opacity: 0,
    },
    cats: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    checkHeaderIcon: {
      marginTop: 3,
      marginRight: 20,
    },
    text: {
      margin: 'auto 0',
    },
    check: {
      margin: 'auto -5px auto auto',
      position: 'relative',
      zIndex: 2,
    },
    checkHeader: {
      margin: '-4px 5px auto auto',
      position: 'relative',
      zIndex: 2,
    },
    icon: () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      height: 33,
      width: 33,
      minWidth: 33,
      borderRadius: 4,
      backgroundColor: theme.colorsTheme.categoryIconBackgroundDefault,
      transition: 'all .2s ease-in-out',
      marginRight: 15,
      zIndex: 1,
    }),
    catsItem: {
      display: 'flex',
      color: '#fff',
      fontSize: 14,
      padding: '12px 10px 12px 15px',
      lineHeight: '15px',
      alignContent: 'center',
      position: 'relative',
      cursor: 'pointer',
      width: '100%',
      borderRadius: 4,
      '&:hover $inner': {
        opacity: 0.2,
      },
    },
    tableFiltersHeader: {
      borderBottom: '1px solid rgba(112, 126, 138, 0.24)',
      height: 45,
      color: '#fff',
      fonTSize: 14,
      display: 'flex',
      lineHeight: '24px',
    },
    periods: {
      marginLeft: 20,
      display: 'inline-flex',
    },
    table: {
      marginTop: 80,
      display: 'flex',
    },
    progress: {
      height: 5,
      width: '100%',
      position: 'relative',
      marginTop: 27,
    },
    progressInner: {
      height: '100%',
      position: 'absolute',
      background: '#6B75CA',
    },
    tableHead: {
      display: 'flex',
      borderBottom: '1px solid rgba(112, 126, 138, 0.24)',
      marginBottom: 13,
    },
    col: {
      color: '#98A7B9',
      paddingBottom: 20,
      fontSize: 12,
      lineHeight: '24px',
      '&:first-child': {},
    },
    tableWrapper: {
      width: 'calc(100% - 305px)',
    },
    tableFilters: {
      width: 305,
      marginRight: 50,
    },
    tableGroup: {
      display: 'flex',
      position: 'sticky',
      top: 0,
      background: '#2F3B52',
      marginBottom: 15,
      zIndex: 10,
    },
    tableCategoryGroupTitle: {
      display: 'flex',
      alignContent: 'center',
    },
    tableCategoryGroupTitleLabel: {
      margin: 'auto 0 auto 20px',
      color: '#fff',
      fontWeight: 600,
      fontSize: 18,
    },
    tableCategoryGroup: {
      width: 50,
      color: '#fff',
      fontSize: 18,
      height: 50,
      background: '#BB6878',
      borderRadius: 4,
      textAlign: 'center',
      lineHeight: '50px',
      alignContent: 'center',
      justifyContent: 'center',
      display: 'flex',
      '& > div': {
        margin: 'auto',
      },
    },
    tableCategoryGroupValues: {
      margin: 'auto 0 auto auto',
      display: 'flex',
      alignContent: 'center',
      color: '#fff',
      fontWeight: 600,
      fontSize: 18,
      '& > div:first-child': {
        marginRight: 40,
      },
    },
    tableItem: {
      padding: '30px 0px',
      display: 'flex',
    },
    tableItemIcon: {
      width: 33,
      height: 33,
      minWidth: 33,
      background: '#BB6878',
      borderRadius: 4,
      textAlign: 'center',
      lineHeight: '33px',
      alignContent: 'center',
      justifyContent: 'center',
      color: '#fff',
      display: 'flex',
      '& > div': {
        margin: 'auto',
      },
    },
    tableItemLabel: {
      marginLeft: 25,
      paddingRight: 25,
      '& div:first-child': {
        color: '#869AAC',
        fontSize: 12,
        lineHeight: '16px',
      },
      '& div:last-child': {
        fontSize: 14,
        lineHeight: '22px',
        color: '#fff',
      },
    },
    tableItemCol: {
      display: 'flex',
    },
    tableItemText: {
      fontSize: 14,
      color: '#869AAC',
      lineHeight: '24px',
      marginTop: 17,
    },
    tableItemTextWhite: {
      fontSize: 14,
      color: '#fff',
      lineHeight: '24px',
      marginTop: 17,
    },
  }),
  {
    name: 'MaximizeWindow',
    index: 1,
  }
);

export default MaximizeWindow;
