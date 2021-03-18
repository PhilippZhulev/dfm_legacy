  import React, { useState, useEffect, useCallback } from 'react';
  import PropTypes from 'prop-types';
  import {
    Padding,
    FlexGrid,
    FlexGridItem,
    ModSlider,
    Margin,
    ModClick,
    MenuButton,
  } from 'components';

  import FormControlLabel from '@material-ui/core/FormControlLabel';
  import Switch from '@material-ui/core/Switch';
  import { makeStyles } from '@material-ui/core/styles';
  import Slider from '@material-ui/core/Slider';
  import classNames from 'classnames';
  import Radio from '@material-ui/core/Radio';
  import RadioGroup from '@material-ui/core/RadioGroup';
  import { MoneyFormat } from 'helpers';
  import Camera from '../../svg/Camera';

  /**
   * Панель опций графа
   * @component
   * @public
   */
  const GraphOptions = ({ classes, filterValues, init }) => {
    const [zoom, setZoom] = useState([100]);
    const [filter, setFilter] = useState([0, 0]);
    const [values, setValues] = useState([0, 0]);
    const [switches, setSwitches] = useState({
      groupNodes: false,
      fixedGraph: true,
      linkNode: false,
      cameraToActive: false,
      hiddenLabel: true,
    });
    const [radio, setRadio] = useState('tso');
    const [active, setActive] = useState(false);

    const styles = useStyles({ classes });

    /** ANCHOR: Значения фильтра */
    useEffect(() => {
      const value = [filterValues.min, filterValues.max];
      setFilter(value);
      setValues(value);
    }, [filterValues]);

    /** ANCHOR: подписка на смену расчета при изменении периода и ресурса */
    useEffect(() => {
      if (init) {
        _handleValueType(radio);
      }
    }, [init]);

    /**
     * ANCHOR: Изменение zoom
     * @param {object} event
     * @param {string} newValue
     * @public
     */
    const handleZoom = (event, newValue) => {
      setZoom(newValue);
      window.ZoomCamera(newValue);
    };

    /**
     * ANCHOR: Изменение свичей
     * @param {boolean} value
     * @param {string} name
     * @public
     */
    const handleSwitches = async (value, name) => {
      setSwitches({ ...switches, [name]: value });
      switch (name) {
        case 'fixedGraph':
          window.fixedGraph(!value);
          break;
        case 'groupNodes':
          window.IsAggregate(value);
          break;
        case 'linkNode':
          window.IsGroup(value);
          break;
        case 'cameraToActive':
          window.ActiveCamera(value);
          break;
        case 'hiddenLabel':
          window.HiddenLabel(value, switches.groupNodes);
          break;
        default:
          await null;
      }
    };

    /**
     * ANCHOR: Изменение типа значений
     * @param {string} value
     * @public
     */
    const _handleValueType = async (value) => {
      setRadio(value);
      window.valueType = value;
      window.UpdateValueType(value !== 'tso');
    };

    /**
     * ANCHOR: callback фильтра (Отбатывает при изменении values)
     * @param {string} value
     * @public
     */
    const handleChangeNodes = useCallback(
      (value) => {
        window.FilterNode(value);
      },
      [values]
    );

    /**
     * ANCHOR: callback фильтра (Отбатывает при изменении filter)
     * @param {string} value
     * @public
     */
    const handleFilter = useCallback(
      (value) => {
        setValues(value);
      },
      [filter]
    );

    /**
     * ANCHOR: Изменение слайдера значений
     * @param {object} event
     * @param {string} value
     * @public
     */
    const handleChangeFilter = (event, value) => {
      setFilter(value);
      handleFilter(value);
      handleChangeNodes(value);
    };

    return (
      <div className={classNames(styles.root, active ? 'active' : null)}>
        <FlexGrid>
          <FlexGridItem margin={'0 0 0 auto'} width={'fit-content'}>
            <Margin right={35}>
              <MenuButton
                classes={{ menuButton: styles.menuButton }}
                onClick={() => setActive(!active)}
                label={'Настроить граф'}
              />
            </Margin>
          </FlexGridItem>
          <FlexGridItem margin={'auto 0 0 0'} width={'fit-content'}>
            <Margin right={25}>
              <ModClick onClick={() => window.DefaultCamera()}>
                <Camera style={{ top: -5 }} />
              </ModClick>
            </Margin>
          </FlexGridItem>
          <FlexGridItem margin={'auto 0 0 0'} width={'fit-content'}>
            <Padding right={'10px'}>
              <ModSlider label={'Масштаб:'}>
                <Slider
                  value={zoom}
                  onChange={handleZoom}
                  min={50}
                  max={150}
                  valueLabelDisplay='auto'
                  aria-labelledby='track-inverted-range-slider'
                />
              </ModSlider>
            </Padding>
          </FlexGridItem>
        </FlexGrid>
        <Padding top={'25px'}>
          <FlexGrid>
            <FlexGridItem
              separator
              margin={'-15px 0 0 auto'}
              height={'105px'}
              width={190}>
              <div className={styles.label}>Отображать значение:</div>
              <RadioGroup
                name='valueType'
                value={radio}
                onChange={(e) => _handleValueType(e.target.value)}>
                <FormControlLabel
                  classes={{ label: styles.radio }}
                  value='tso'
                  control={
                    <Radio classes={{ root: styles.radio }} color='primary' />
                  }
                  label='ТСО'
                />
                <FormControlLabel
                  classes={{ label: styles.radio }}
                  value='tariff'
                  control={
                    <Radio classes={{ root: styles.radio }} color='primary' />
                  }
                  label='Тариф'
                />
              </RadioGroup>
            </FlexGridItem>
            <FlexGridItem
              separator
              margin={'-15px 0 0 20px'}
              height={'105px'}
              width={250}>
              <Padding left={15}>
                <div className={styles.label}>Фильтр по значению ТСО:</div>
              </Padding>
              <ModSlider label={''}>
                <Slider
                  value={filter}
                  onChange={handleChangeFilter}
                  min={filterValues.min}
                  max={filterValues.max}
                />
              </ModSlider>
              <FlexGrid className={styles.slider}>
                <FlexGridItem width={'54%'}>
                  <Padding left={15}>
                    <div className='title'>Min</div>
                    {/* <ModTextInput>
                      <TextInput
                        type='text'
                        width={90}
                        value={MoneyFormat(values[0])}
                        onChange={() => {}}
                        classes={{ input: styles.input }}
                      />
                    </ModTextInput> */}
                    {MoneyFormat(values[0])}
                  </Padding>
                </FlexGridItem>
                <FlexGridItem className={styles.itemMax} width={'46%'}>
                  <Padding right={20}>
                    <div className='title'>Max</div>
                    {/* <ModTextInput>
                      <TextInput
                        type='text'
                        width={90}
                        value={MoneyFormat(values[1])}
                        onChange={() => {}}
                        classes={{ input: styles.input }}
                      />
                    </ModTextInput> */}
                    {MoneyFormat(values[1])}
                  </Padding>
                </FlexGridItem>
              </FlexGrid>
            </FlexGridItem>
            <FlexGridItem margin={'0 0 0 0'} height={'105px'} width={700}>
              <FlexGrid style={{ padding: '0 20px' }}>
                <FlexGridItem height={'50%'} width={'33.3333333%'}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={switches.hiddenLabel}
                        onChange={(e) =>
                          handleSwitches(e.target.checked, 'hiddenLabel')
                        }
                        value='hiddenLabel'
                        color='primary'
                        classes={{
                          switchBase: styles.switchBase,
                          switchRoot: styles.switchRoot,
                        }}
                      />
                    }
                    classes={{ label: styles.triggerLabel }}
                    label='Названия узлов'
                  />
                </FlexGridItem>
                <FlexGridItem height={'50%'} width={'33.33333333%'}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={switches.fixedGraph}
                        onChange={(e) =>
                          handleSwitches(e.target.checked, 'fixedGraph')
                        }
                        value='fixedGraph'
                        color='primary'
                        classes={{
                          switchBase: styles.switchBase,
                          switchRoot: styles.switchRoot,
                        }}
                      />
                    }
                    classes={{ label: styles.triggerLabel }}
                    label='Фиксированный граф'
                  />
                </FlexGridItem>
                <FlexGridItem height={'50%'} width={'33.33333333%'}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={switches.groupNodes}
                        onChange={(e) =>
                          handleSwitches(e.target.checked, 'groupNodes')
                        }
                        value='groupNodes'
                        disabled={switches.linkNode}
                        color='primary'
                        classes={{
                          switchBase: styles.switchBase,
                          switchRoot: styles.switchRoot,
                        }}
                      />
                    }
                    classes={{ label: styles.triggerLabel }}
                    label='Группа узлов'
                  />
                </FlexGridItem>
                <FlexGridItem height={'50%'} width={'33.33333333%'}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={switches.linkNode}
                        onChange={(e) =>
                          handleSwitches(e.target.checked, 'linkNode')
                        }
                        value='linkNode'
                        color='primary'
                        disabled={switches.groupNodes}
                        classes={{
                          switchBase: styles.switchBase,
                          switchRoot: styles.switchRoot,
                        }}
                      />
                    }
                    classes={{ label: styles.triggerLabel }}
                    label='Cвязанные узлы'
                  />
                </FlexGridItem>
                <FlexGridItem height={'50%'} width={'33.33333333%'}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={switches.cameraToActive}
                        onChange={(e) =>
                          handleSwitches(e.target.checked, 'cameraToActive')
                        }
                        value='cameraToActive'
                        color='primary'
                        classes={{
                          switchBase: styles.switchBase,
                          switchRoot: styles.switchRoot,
                        }}
                      />
                    }
                    classes={{ label: styles.triggerLabel }}
                    label='Камера на активный'
                  />
                </FlexGridItem>
              </FlexGrid>
            </FlexGridItem>
          </FlexGrid>
        </Padding>
      </div>
    );
  };

  GraphOptions.propTypes = {
    classes: PropTypes.object,
    filterValues: PropTypes.object,
    init: PropTypes.bool,
  };

  /** ANCHOR: Приватные стили */
  const useStyles = makeStyles(
    (theme) => ({
      root: {
        padding: '20px',
        background: 'rgba(36, 46, 66, 0.5)',
        bottom: 0,
        zIndex: 9,
        position: 'fixed',
        width: '100%',
        height: 180,
        ...theme.helper.transition(300),
        transform: 'translateY(120px)',
        '&.active': {
          transform: 'translateY(0)',
          background: 'rgba(36, 46, 66, 1)',
        },
        '& $menuButton svg': {
          ...theme.helper.transition(300),
          transform: 'rotate(180deg)',
        },
        '&.active $menuButton svg': { transform: 'rotate(0)' },
      },
      triggerLabel: {
        color: theme.colorsTheme.grey,
        fontSize: 14,
        lineHeight: '34px',
        '&.Mui-disabled': { color: theme.colorsTheme.grey },
      },
      switchBase: { color: theme.colorsTheme.grey },
      menuButton: {},
      label: {
        fontSize: 14,
        paddingBottom: 5,
        color: theme.colorsTheme.grey,
      },
      radio: {
        fontSize: 14,
        padding: '5px 9px',
        color: theme.colorsTheme.grey,
      },

      slider: {
        color: theme.colorsTheme.grey,
        fontSize: 14,

        '& .title': {
          marginBottom: 4,
          color: '#418FF3',
        },
      },

      itemMax: {
        textAlign: 'right',
      },
    }),
    { index: 2, name: 'GraphOptions' }
  );

  export default GraphOptions;
