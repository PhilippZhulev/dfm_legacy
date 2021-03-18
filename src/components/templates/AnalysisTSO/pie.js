import React, { useEffect, useState, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { PieChart } from 'react-minimal-pie-chart';
import { Icon, Checkbox } from 'components';
import { virualStore } from '../../../virtualStore';
import NodesIco from '../../svg/NodesIco';

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

const lineWidth = 20;

const Pie = memo(({ classes, chartData }) => {
  const [selected, setSelected] = useState([]);
  const [params, setParams] = useState([]);
  const styles = useStyles({ classes });

  useEffect(() => {
    if (chartData.dependencies) {
      const cats = {};
      const getColor = (id) =>
        virualStore.model.resCategories.find(({ value }) => value === id).color;

      chartData.dependencies.forEach((item) => {
        if (typeof cats[item.categoryId] === 'undefined') {
          cats[item.categoryId] = {
            title: item.categoryName,
            value: Number(item.partTCO),
            color: getColor(item.categoryId),
          };
        } else {
          cats[item.categoryId].value += item.partTCO;
        }
      });

      setParams(Object.keys(cats).map((item) => cats[item]));
    }
  }, [chartData]);

  const handleSelected = (index) => {
    let s = [...selected];
    if (!s.includes(index)) {
      s.push(index);
    } else {
      s = s.filter((item) => item !== index);
    }
    setSelected(s);
  };

  const splitValue = (value) => {
    const res = value.split(' ');

    const fields = ['тыс.', 'млн', 'млрд', 'трлн'];

    return res.map((item, i) => {
      if (fields.includes(item)) {
        return <span key={i}> {item}</span>;
      }

      return `${item} `;
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <PieChart
          style={{
            fontFamily: '"Open Sans',
            fontSize: '8px',
            position: 'relative',
            zIndex: 1,
          }}
          data={params}
          totalValue={params.reduce((a, c) => a + c.value, 0)}
          radius={40}
          lineWidth={20}
          segmentsStyle={(segmentIndex) => ({
            transition: 'all 200ms ease-in-out',
            cursor: 'pointer',
            // filter: selected.includes(segmentIndex) ? 'url("#f3")' : '',
            strokeWidth: selected.includes(segmentIndex) ? 8.2 : 5,
          })}
          paddingAngle={1.5}
          animate
          onClick={(_, index) => handleSelected(index)}
          label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
          labelPosition={100 + lineWidth / 1.5}
          labelStyle={(segmentIndex) => ({
            fill: params[segmentIndex].color,
            opacity: selected.includes(segmentIndex) ? 0.75 : 0,
            pointerEvents: 'none',
            fontSize: 4,
            transition: 'all 200ms ease-in-out',
          })}>
          <filter id='f3' width='380' height='380'>
            <feOffset result='offOut' in='SourceGraphic' dx='0' dy='0' />
            <feGaussianBlur result='blurOut' in='offOut' stdDeviation='1' />
            <feBlend in='SourceGraphic' in2='blurOut' mode='normal' />
          </filter>
        </PieChart>
        <div className={styles.value}>
          <div className={styles.mainValueCenter}>
            <div className={styles.mainValue}>
              {splitValue(chartData.fullTco || '')}
            </div>
            <div className={styles.nodes}>
              <span className={styles.nodesIco}>
                <NodesIco />
              </span>
              {chartData.countNode} Узлов
            </div>
          </div>
        </div>
      </div>
      <div className={styles.cats}>
        {params.map((item, i) => (
          <div
            onClick={() => handleSelected(i)}
            className={styles.catsItem}
            key={i}>
            <div style={{ background: item.color }} className={styles.inner} />
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
            <div className={styles.text}>{item.title}</div>
            <div className={styles.check}>
              <Checkbox
                checked={selected.includes(i)}
                onChange={() => {}}
                value={true}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

Pie.propTypes = {
  classes: PropTypes.object,
  chartData: PropTypes.object,
};

Pie.defaultProps = {};

const useStyles = makeStyles(
  (theme) => ({
    root: {},
    wrapper: {
      width: 400,
      height: 380,
      position: 'relative',
      margin: '-65px auto auto auto',
    },
    value: {
      display: 'flex',
      position: 'absolute',
      width: '100%',
      top: 0,
      height: '100%',
      zIndex: 0,
    },
    mainValueCenter: {
      margin: 'auto',
      alignContent: 'center',
    },
    mainValue: {
      color: '#fff',
      fontSize: 32,
      textAlign: 'center',
      fontWeight: 500,
      lineHeihgt: '52px',
      '& span': {
        fontSize: 18,
      },
    },
    nodes: {
      color: '#657D95',
      fontSize: 14,
      textAlign: 'center',
      lineHeihgt: '17px',
      marginTop: 8,
    },
    nodesIco: {
      marginRight: 10,
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
    cats: {
      display: 'flex',
      flexWrap: 'wrap',
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
    catsItem: {
      display: 'flex',
      color: '#fff',
      fontSize: 14,
      padding: '12px 10px 12px 15px',
      lineHeight: '15px',
      alignContent: 'center',
      position: 'relative',
      minWidth: 245,
      cursor: 'pointer',
      width: '50%',
      borderRadius: 4,
      '&:hover $inner': {
        opacity: 0.2,
      },
    },
    check: {
      margin: 'auto -5px auto auto',
      position: 'relative',
      zIndex: 2,
    },
    text: {
      margin: 'auto 0',
    },
  }),
  {
    name: 'Pie',
    index: 1,
  }
);

export default Pie;
