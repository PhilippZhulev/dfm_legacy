import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { StyledPopper, TextInput } from 'components';
import Scrollbar from 'react-scrollbars-custom';
import Slider from '@material-ui/core/Slider';
import Middleware from '../../../services/middleware/index.js';
import Lock from '../../svg/Lock';

// TODO: Разобраться, почему balance.free каждый раз высчитывается как 100 - value и меняется
// обобщить функции округления и записи значений
// вероятно, шаг слайдера можно сделать 1?

/**
 * Редактирование объема потребления
 * @component
 * @public
 */
export const SliderEditor = React.memo(
  ({ value, balance, period, id, lockedModel }) => {
    const [state, setState] = useState(0);
    const [input, setInput] = useState('0');
    const [error, setError] = useState(false);

    const maxLimit = Number((balance.free + value * 100).toFixed(5));

    /** Обновление состояний */
    useEffect(() => {
      const val = value * 100;
      setState(val);
      setInput(String(val));
    }, [value]);

    useEffect(() => {
      const val = Number(input);
      if (isNaN(val) || val < 0 || val > maxLimit) {
        setError(true);
      } else {
        setError(false);
      }
    }, [input]);

    /**
     * Сохранение изменения правила метрики
     * @param {String} result `значение`
     */
    const saveDump = (result) => {
      Middleware.SaveDumpData(
        {
          id,
          resource: period.resource,
          period: period.period,
          value: result / 100,
        },
        'paymentConsumption'
      );
    };

    /** Инициализация стилей */
    const classes = useStyles();

    const handleInput = (e) => {
      setInput(e.target.value);
    };

    const handleDump = () => {
      if (!error) {
        saveDump(
          Number(String((Math.round(Number(input) * 1e5) / 1e5).toFixed(5)))
        );
        setInput(
          String(
            Number(String((Math.round(Number(input) * 1e5) / 1e5).toFixed(5)))
          )
        );
        setState(
          Number(String((Math.round(Number(input) * 1e5) / 1e5).toFixed(5)))
        );
      }
    };

    const handleSlide = (_, val) => {
      const res = val > maxLimit ? maxLimit : val;
      setError(false);
      setState(res);
      setInput(String(res));
    };

    /** Рендер компонента */
    return (
      <div className={classes.root}>
        <div className={classes.row}>
          <span>От всего объема узла, %</span>
          <TextInput
            classes={{ input: classes.info, label: classes.infoLabel }}
            onChange={handleInput}
            disabled={!lockedModel}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleDump();
              }
            }}
            onBlur={handleDump}
            value={input}
          />
        </div>
        {error && (
          <span className={classes.errorMsg}>
            Введено некорректное значение
          </span>
        )}
        <div className={classes.sliderWrapper}>
          <Slider
            classes={{
              rail: classes.sliderRail,
              track: classes.sliderTrack,
              thumb: classes.sliderThumb,
              mark: classes.sliderMark,
              markLabel: classes.sliderMarkLabel,
            }}
            value={state}
            onChange={handleSlide}
            onChangeCommitted={(_, val) =>
              saveDump(val > maxLimit ? maxLimit : val)
            }
            step={1}
            min={0}
            max={100}
            // valueLabelDisplay='auto'
            aria-labelledby='track-inverted-range-slider'
            disabled={!lockedModel}
            marks={[{ value: maxLimit, label: '' }]}
            ThumbComponent={(props) => (
              <span className={classes.sliderThumb} {...props}>
                <span />
                <span />
              </span>
            )}
          />
          <div
            className={classNames(classes.sliderAvailable, {
              [classes.sliderFullyAvailable]: maxLimit === 100,
            })}
            style={{ width: `${maxLimit}%` }}
          />
          <div className={classes.iconWrapper} style={{ left: `${maxLimit}%` }}>
            <StyledPopper
              content={
                <div>
                  <div
                    className={classNames(
                      classes.infoItem,
                      classes.infoListTitle
                    )}>
                    <span className='info-title'>Не распределено:</span>
                    <span>{maxLimit}%</span>
                  </div>
                  {balance.consumers.length > 0 && (
                    <>
                      <div
                        className={classNames(
                          classes.infoItem,
                          classes.infoListTitle
                        )}>
                        <span className='info-title'>Другие потребители:</span>
                      </div>
                      <Scrollbar
                        trackYProps={{ style: { width: 4, right: -15 } }}
                        thumbYProps={{
                          style: {
                            background: 'rgba(31, 142, 250, 0.4)',
                            width: 4,
                            borderRadius: 2,
                          },
                        }}
                        style={{ height: 40, width: '100%' }}>
                        {balance.consumers.map((el) => (
                          <div key={el.value} className={classes.infoItem}>
                            <span>{`${el.label} - ${el.fraction}%`}</span>
                          </div>
                        ))}
                      </Scrollbar>
                    </>
                  )}
                </div>
              }>
              <Lock />
            </StyledPopper>
          </div>
        </div>
      </div>
    );
  }
);

/** Назначаем  displayName */
SliderEditor.displayName = 'SliderEditor';

/** Назначаем  propTypes */
SliderEditor.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string.isRequired,
  period: PropTypes.object.isRequired,
  balance: PropTypes.object.isRequired,
  lockedModel: PropTypes.bool.isRequired,
};

/** Основные стили */
const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      row: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
        marginBottom: 6,
        fontSize: 14,
      },
      info: {
        width: 85,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2F3B52',
        borderRadius: 4,
        fontSize: 12,
        lineHeight: 16,
        color: '#FFF',
        '&:focus': {
          borderBottom: '0px solid transparent',
        },
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
      infoLabel: {
        marginBottom: 0,
      },
      errorMsg: {
        color: 'red',
        fontSize: 12,
      },
      sliderMark: {
        height: 13,
        color: '#657D95',
        borderRadius: '0 0 1px 1px',
        zIndex: 2,
      },
      sliderMarkLabel: {
        color: colorsTheme.text,
      },
      sliderWrapper: {
        position: 'relative',
        marginBottom: 15,
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
      iconWrapper: {
        position: 'absolute',
        top: 40,
        left: 0,
        transform: 'translateX(-5px)',
        '&:hover': {
          cursor: 'pointer',
          '& path': {
            fill: '#FFFFFF',
          },
        },
        '& path': {
          fill: '#657D95',
          transition: 'all 300ms ease-in-out',
        },
      },
      infoItem: {
        fontSize: 12,
        color: theme.colorsTheme.nodeColor,
        display: 'flex',
        textAlign: 'right',

        // '&:first-child': { marginBottom: 8 },

        '& .info-title': {
          color: theme.colorsTheme.grey,
          marginRight: 16,
          width: 'fit-content',
        },
      },
      infoListTitle: {
        marginBottom: 10,
      },
    };
  },
  { name: 'SliderEditor', index: 1 }
);
