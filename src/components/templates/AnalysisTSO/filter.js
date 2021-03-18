import React, { useEffect, useState, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextInput, SingleSelect } from 'components';
import PropTypes from 'prop-types';
import Slider from '@material-ui/core/Slider';
import { debounce } from 'helpers';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const ConsFilter = memo(
  ({ classes, dependencies, sliderCall, sortData, select, sortCall, full }) => {
    const styles = useStyles({ classes });
    const [sizes, setSizes] = useState([0, 0]);
    const [type, setType] = useState(true);
    const [value, setValue] = useState([0, 0]);
    const [selected, setSelected] = useState(select);

    useEffect(() => {
      const data = dependencies.map((item) => item[checkType(type)]);
      const min = Math.min.apply(null, data);
      const max = Math.max.apply(null, data);
      setSizes([min, max]);
      setValue([min, max]);
      sliderCall({ values: [min, max], type: checkType(type) });
    }, [dependencies, type]);

    const handleSlider = (nv) => {
      sliderCall({ values: nv, type: checkType(type) });
    };

    const checkType = (t) => (t ? 'partTCO' : 'sumCause');

    const valueFormater = (val) => {
      if (!type) {
        return val / 1000000;
      }
      return val;
    };

    const handleSort = (result) => {
      setSelected(result);
      sortCall(result);
    };

    return (
      <div className={styles.filter}>
        <div className={styles.filterTop}>
          <div className={`${!full ? styles.slider : styles.sliderFull}`}>
            <div className={styles.sliderInputs}>
              <div className={styles.sliderLeft}>
                <TextInput
                  type='text'
                  width={65}
                  disabled
                  value={valueFormater(value[0]).toFixed(2)}
                  onChange={({ target }) =>
                    handleSlider([target.value, value[1]])
                  }
                  classes={{ input: styles.input, root: styles.inputRoot }}
                />
              </div>
              <div className={styles.sliderTitle}>
                Доля ТСО узла, {type ? '%' : 'руб'}
              </div>
              <div className={styles.sliderRight}>
                <TextInput
                  type='text'
                  width={65}
                  disabled
                  value={valueFormater(value[1]).toFixed(2)}
                  onChange={({ target }) =>
                    handleSlider([value[0], target.value])
                  }
                  classes={{ input: styles.input }}
                />
              </div>
            </div>
            <Slider
              classes={{
                rail: styles.sliderRail,
                track: styles.sliderTrack,
                thumb: styles.sliderThumb,
                mark: styles.sliderMark,
                markLabel: styles.sliderMarkLabel,
              }}
              value={value}
              onChangeCommitted={(_, nv) => handleSlider(nv)}
              onChange={(_, nv) => setValue(nv)}
              step={1}
              min={sizes[0]}
              max={sizes[1]}
              aria-labelledby='track-inverted-range-slider'
              disabled={false}
              ThumbComponent={(props) => (
                <span className={styles.sliderThumb} {...props}>
                  <span />
                  <span />
                </span>
              )}
            />
          </div>
          <div className={styles.switcher}>
            <FormControlLabel
              control={
                <Switch
                  checked={type}
                  onChange={(e) => setType(!type)}
                  value='type'
                  color='primary'
                  classes={{
                    switchBase: styles.switchBase,
                    switchRoot: styles.switchRoot,
                  }}
                />
              }
              classes={{ label: styles.triggerLabel }}
              label='В процентах'
            />
          </div>
          {/* <div className={styles.filterSelect}>
            <SingleSelect
              width={'152px'}
              options={sortData}
              classes={{ selectedValues: styles.selected }}
              selected={selected}
              onChange={(result) => handleSort(result)}
            />
          </div> */}
        </div>
      </div>
    );
  }
);

ConsFilter.propTypes = {
  classes: PropTypes.object,
  dependencies: PropTypes.array,
  sliderCall: PropTypes.func,
  sortData: PropTypes.array,
  select: PropTypes.object,
  sortCall: PropTypes.func,
  full: PropTypes.bool,
};

ConsFilter.defaultProps = {
  sliderCall: () => {},
  sortCall: () => {},
};

const useStyles = makeStyles(
  (theme) => ({
    filterTop: {
      display: 'flex',
    },
    triggerLabel: {
      color: theme.colorsTheme.grey,
      fontSize: 14,
      lineHeight: '34px',
      '&.Mui-disabled': { color: theme.colorsTheme.grey },
    },
    switchBase: { color: theme.colorsTheme.grey },
    sliderTitle: {
      textAlign: 'center',
      lineHeight: '16px',
      fontSize: 12,
      color: '#98A7B9',
      margin: 'auto auto auto auto',
      width: 'calc(100% - 104px)',
    },
    sliderInputs: {
      display: 'flex',
    },
    sliderRight: {
      margin: 'auto 0 auto auto',
    },
    input: {
      background: '#242E42',
      borderRadius: 4,
      fontSize: 14,
    },
    inputRoot: {
      width: 65,
      height: 30,
    },
    switcher: {
      paddingTop: 28,
      paddingLeft: 30,
      minWidth: 180,
    },
    consumption: {
      top: 0,
      right: 0,
      width: '57%',
      position: 'absolute',
      padding: '40px 50px',
      height: '100%',
      background: '#1F2738',
      borderRadius: '0px 8px 8px 0px',
    },
    filterSelect: {
      paddingTop: 28,
      margin: '0 0 auto auto',
    },
    slider: {
      // width: 300,
      width: 'calc(100% - 180px)',
    },
    sliderFull: {
      width: '70%',
      marginRight: 20,
    },
    sliderMark: {
      height: 13,
      color: '#657D95',
      borderRadius: '0 0 1px 1px',
      zIndex: 2,
    },
    sliderMarkLabel: {
      color: theme.colorsTheme.text,
    },
    sliderWrapper: {
      position: 'relative',
      marginBottom: 15,
    },
    selected: {
      fontSize: 14,
    },
    sliderAvailable: {
      position: 'absolute',
      top: 13,
      left: 0,
      width: 0,
      height: 7,
      borderRadius: '4px 0 0 4px',
      background: '#657D95',
      zIndex: 1,
    },
    sliderFullyAvailable: {
      borderRadius: 4,
    },
    sliderRail: {
      height: 7,
      backgroundColor: 'rgba(101, 125, 149, 0.2)',
      borderRadius: 4,
    },
    sliderTrack: {
      height: 7,
      backgroundColor: '#1F8EFA',
      borderRadius: 4,
      zIndex: 2,
    },
    sliderThumb: {
      width: 16,
      height: 24,
      backgroundColor: '#1F8EFA',
      borderRadius: 4,
      marginTop: -8,
      zIndex: 2,
      '&.Mui-disabled': {
        width: 16,
        height: 24,
        marginTop: -8,
      },
      '& span': {
        margin: '0 1px',
        width: 1,
        height: 10,
        background: 'rgba(255, 255, 255, 0.48)',
      },
    },
  }),
  {
    name: 'ConsFilter',
    index: 1,
  }
);

export default ConsFilter;
