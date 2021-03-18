import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'components';
import { MoneyFormat } from 'helpers';
import NodePreview from '../../svg/NodePreview';
import ConsumtionIco from '../../svg/ConsumtionIco';
import DirectСostIco from '../../svg/DirectСostIco';
import ProvidesIco from '../../svg/ProvidesIco';
import TarriffHover from '../../svg/TarriffHover';
import VolumeHover from '../../svg/VolumeHover';
import { useStyles } from './compareStyles';

const Compare = memo(({ classes, data }) => {
  const styles = useStyles({ classes });

  const diffType = (value) => {
    let cl = 'red';
    if (value < 0) {
      cl = 'green';
    }
    return <div className={styles[cl]}>{value}%</div>;
  };

  /**
   * Разделение числа от разрядности
   * @param value
   * @returns {[*, *]}
   */
  const splitNumberAndDigit = (value) => {
    const res = value.split(' ');

    let digitIndex = res.findIndex((n) => !/^-?[\d.]+(?:e-?\d+)?$/.test(n));
    if (digitIndex < 0) {
      digitIndex = res.length;
    }

    return [
      res.slice(0, digitIndex).join(' '),
      res.slice(digitIndex).join(' '),
    ];
  };

  const splitValue = (value, unit = '') => {
    const res = splitNumberAndDigit(value);
    return (
      <>
        <span>{res[0]}</span>
        <span> </span>
        <span>{res[1]}</span>
        <span> </span>
        <span>{unit}</span>
      </>
    );
  };

  const splitValuePrev = (value, unit = '') => {
    const res = splitNumberAndDigit(value);
    return (
      <>
        <span>{res[0]}</span>
        <span> </span>
        <span>{res[1]}</span>
        <span> </span>
        <span>{unit}</span>
        <span> </span>
        <span>({data.periods?.last.label})</span>
      </>
    );
  };

  const splitPrev = (value) => {
    const res = splitNumberAndDigit(value);
    return (
      <>
        <div />
        <div>
          <span>{res[0]}</span>
          <span> </span>
          <span>{res[1]}</span>
          <span> </span>
          <span>р.</span>
          <span> </span>
          <span>({data.periods?.last.label})</span>
        </div>
      </>
    );
  };

  const createTile = (key) => {
    const res = splitNumberAndDigit(data[key]?.prev);
    return (
      <div className={styles.compareTile}>
        <div className={styles.circle}>{key === 'tariff' ? 'X ' : '='}</div>
        <div className={styles.compareTileInner}>
          <div className={styles.compareTileTitle}>
            <span>{key === 'tariff' ? 'Тариф' : 'Объем'}</span>
            <span> </span>
            <span>({data.periods?.first.label})</span>
          </div>
          <div className={styles.compareTileValue}>
            <div className={styles.compareTileValueMain}>
              <div>
                {splitValue(data[key]?.valueFormat)}
                <span>{data[key]?.format}</span>
              </div>
            </div>
            <div className={styles.compareTileValueDiff}>
              {diffType(data[key]?.difference)}
            </div>
          </div>
        </div>
        <div className={styles.compareTilePrevPeriod}>
          <div>
            <span>{res[0]}</span>
            <span> </span>
            <span>{res[1]}</span>
            <span> </span>
            <span>{data[key]?.format}</span>
            <span> </span>
            <span>({data.periods?.last.label})</span>
          </div>
        </div>
        <div className={`${styles.compareTileHover} ${key}`}>
          <div className={styles.compareTileHoverImg}>
            {key === 'tariff' ? <TarriffHover /> : <VolumeHover />}
          </div>
        </div>
      </div>
    );
  };

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

  return (
    <div className={styles.root}>
      <div className={styles.innerPadding}>
        <div className={styles.compareTitle}>
          <div
            style={{
              background: data.category.color,
            }}
            className={styles.categoryIcon}
            data-testid='categoryIcon'>
            <Icon
              icon={getIcon(data.category.value)}
              size={18}
              strokeColor='transparent'
            />
          </div>
          {data.resourceLabel}
        </div>
        <div className={styles.compareTiles}>
          {createTile('tariff')}
          {createTile('volume')}
          <div className={styles.compareTileLarge}>
            <div className={styles.compareTileTitle}>
              <span>ТСО модели</span>
              <span> </span>
              <span>({data.periods?.first.label})</span>
            </div>
            <div className={styles.compareTileValue}>
              <div className={styles.compareTileValueMain}>
                <div>{splitValue(data.fullTcoFormat, 'р.')}</div>
              </div>
              <div className={styles.compareTileValueDiff}>
                {diffType(data.provideCost?.difference)}
              </div>
            </div>
            <div className={styles.compareValuesWrapper}>
              <div className={styles.compareValuesWrapperItem}>
                <div className={styles.compareValuesWrapperTitle}>
                  <div className={styles.compareValuesIcon}>
                    <ConsumtionIco />
                  </div>
                  потребляет
                </div>
                <div className={styles.compareValuesWrapperFlex}>
                  <div className={styles.compareTileValueMainSmall}>
                    <div>
                      {splitValue(data.consumptionCost?.valueFormat, 'р.')}
                    </div>
                    <div />
                  </div>
                  <div className={styles.compareTileValueDiff}>
                    {diffType(data.consumptionCost?.difference)}
                  </div>
                </div>
                <div className={`${styles.compareTilePrevPeriod} small`}>
                  {splitPrev(data.consumptionCost?.prevFormat)}
                </div>
              </div>
              <div className={styles.compareValuesWrapperItem}>
                <div className={styles.compareValuesWrapperTitle}>
                  <div className={styles.compareValuesIcon}>
                    <DirectСostIco />
                  </div>
                  прямые расходы
                </div>
                <div className={styles.compareValuesWrapperFlex}>
                  <div className={styles.compareTileValueMainSmall}>
                    <div>{splitValue(data.directCost?.valueFormat, 'р.')}</div>
                    <div />
                  </div>
                  <div className={styles.compareTileValueDiff}>
                    {diffType(data.directCost?.difference)}
                  </div>
                </div>
                <div className={`${styles.compareTilePrevPeriod} small`}>
                  <div>{splitValuePrev(data.directCost?.prevFormat, 'р.')}</div>
                </div>
              </div>
              <div className={styles.compareValuesWrapperItem}>
                <div className={styles.compareValuesWrapperTitle}>
                  <div className={styles.compareValuesIcon}>
                    <ProvidesIco />
                  </div>
                  предоставляет
                </div>
                <div className={styles.compareValuesWrapperFlex}>
                  <div className={styles.compareTileValueMainSmall}>
                    <div>{splitValue(data.provideCost?.valueFormat, 'р.')}</div>
                    <div />
                  </div>
                  <div className={styles.compareTileValueDiff}>
                    {diffType(data.provideCost?.difference)}
                  </div>
                </div>
                <div className={`${styles.compareTilePrevPeriod} small`}>
                  {splitPrev(data.provideCost?.prevFormat)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.inner} />
    </div>
  );
});

Compare.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
};

export default Compare;
