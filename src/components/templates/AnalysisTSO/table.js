import React, { useEffect, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Icon, Checkbox } from 'components';
import PropTypes from 'prop-types';
import Scrollbar from 'react-scrollbars-custom';
import { useMoneyFormat } from 'helpers';
import { virualStore } from '../../../virtualStore';

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

const ConsTable = memo(({ classes, dependencies, headData, frameSize }) => {
  const styles = useStyles({ classes });

  useEffect(() => {}, [dependencies]);

  return (
    <div className={styles.root}>
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
            height: frameSize.rh - frameSize.fh - 100,
          }}>
          {dependencies.map((col, i) => (
            <div key={i} className={styles.row}>
              <div
                style={{ width: headData[0].width }}
                className={styles.bodyCol}>
                <div
                  style={{
                    background: virualStore.model.resCategories.find(
                      ({ value }) => value === col.categoryId
                    ).color,
                  }}
                  className={styles.icon}
                  data-testid='categoryIcon'>
                  <Icon
                    icon={getIcon(col.categoryId)}
                    size={18}
                    strokeColor='transparent'
                  />
                </div>
                <div className={styles.resourceNameContent}>
                  {col.resourceName}
                  <div className={styles.progress}>
                    <div
                      style={{ width: `${col.partTCO}%` }}
                      className={styles.progressInner}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{ width: headData[1].width }}
                className={styles.bodyCol}>
                <div className={styles.bodyColText}>{col.metricName}</div>
              </div>
              <div
                style={{ width: headData[2].width }}
                className={styles.bodyCol}>
                <div className={styles.bodyColText}>{col.fullValueFormat}</div>
              </div>
              <div
                style={{ width: headData[3].width }}
                className={styles.bodyCol}>
                <div className={styles.bodyColText}>{col.sumCauseFormat}</div>
              </div>
              <div
                style={{ width: headData[4].width }}
                className={styles.bodyCol}>
                <div className={styles.bodyColText}>{col.partTCOFormat}</div>
              </div>
            </div>
          ))}
        </Scrollbar>
      </div>
    </div>
  );
});

ConsTable.propTypes = {
  classes: PropTypes.object,
  dependencies: PropTypes.array,
  headData: PropTypes.array,
  frameSize: PropTypes.object,
};

const useStyles = makeStyles(
  (theme) => ({
    root: {
      marginTop: 45,
    },
    progress: {
      height: 5,
      width: '100%',
      position: 'relative',
      marginTop: 10,
    },
    progressInner: {
      height: '100%',
      position: 'absolute',
      background: '#6B75CA',
    },
    resourceNameContent: {
      marginTop: -4,
      lineHeight: '20px',
    },
    box: {
      width: 33,
      height: 33,
    },
    tableHead: {
      display: 'flex',
      borderBottom: '1px solid rgba(112, 126, 138, 0.24)',
      marginBottom: 13,
    },
    row: {
      display: 'flex',
      marginRight: -6,
    },
    col: {
      color: '#98A7B9',
      paddingBottom: 20,
      fontSize: 14,
      paddingRight: 45,
      '&:first-child': {
        paddingLeft: 54,
        paddingRight: 160,
      },
    },
    bodyCol: {
      color: '#98A7B9',
      fontSize: 14,
      lineHeight: '33px',
      display: 'flex',
      alignContent: 'center',
      padding: '13px 0',
      '&:first-child': {
        color: '#fff',
      },
    },
    icon: () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 33,
      width: 33,
      minWidth: 33,
      borderRadius: 4,
      backgroundColor: theme.colorsTheme.categoryIconBackgroundDefault,
      transition: 'all .2s ease-in-out',
      marginRight: 20,
    }),
  }),
  {
    name: 'ConsTable',
    index: 1,
  }
);

export default ConsTable;
