import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import classNames from 'classnames';

const ColumnLegend = (props) => {
  const { classes, onChange, value } = props;
  const styles = useStyles({ classes });
  return (
    <div className={styles.root}>
      <div className={styles.legendItem}>
        <Radio
          checked={value === 'tariff'}
          onChange={() => onChange('tariff')}
          classes={{ root: styles.radio }}
          color='primary'
        />
        <div className={classNames(styles.dot, styles.TCO)} />
        <span className={styles.label}>TCO</span>
        <div className={classNames(styles.dot, styles.tariff)} />
        <span className={styles.label}>Тариф</span>
      </div>
      <div className={styles.legendItem}>
        <Radio
          checked={value === 'volume'}
          onChange={() => onChange('volume')}
          classes={{ root: styles.radio }}
          color='primary'
        />
        <div className={classNames(styles.dot, styles.TCO)} />
        <span className={styles.label}>TCO</span>
        <div className={classNames(styles.dot, styles.volume)} />
        <span className={styles.label}>Объём предоставляемых ресурсов</span>
      </div>
    </div>
  );
};

const useStyles = makeStyles(
  (theme) => ({
    category: {
      display: 'flex',
      marginRight: 16.5,
      margin: 3.5,
    },
    root: {
      display: 'flex',
      width: '100%',
      left: 0,
      right: 0,
      height: 'fit-content',
    },
    icon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 18,
      width: 18,
      borderRadius: 4,
      backgroundColor: theme.colorsTheme.categoryIconBackgroundDefault,
      transition: 'all .2s ease-in-out',
      marginRight: 20,
      '& > div': {
        height: 13,
      },
    },
    label: {
      fontSize: 13,
      height: 'fit-content',
      margin: '3.5px 0',
    },
    TCO: {
      backgroundColor: '#DA9C54',
    },
    tariff: {
      backgroundColor: '#5794DE',
    },
    volume: {
      backgroundColor: '#4E8E96',
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      margin: 'auto 8px',
    },
    legendItem: {
      display: 'flex',
      height: 21,
      marginRight: 20,
    },
    radio: {
      fontSize: 14,
      padding: '5px 9px',
      color: theme.colorsTheme.grey,
    },
  }),
  {
    index: 1,
    name: 'ColumnLegend',
  }
);

export default ColumnLegend;
