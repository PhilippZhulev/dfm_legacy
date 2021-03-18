import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
  Margin,
  SingleSelect,
  FlexGrid,
  FlexGridItem,
  Confrim,
  Checkbox,
} from 'components';
import { AccessControl } from 'containers';
import { makeStyles } from '@material-ui/core/styles';
import { handleError } from 'helpers';
import { Scrollbar } from 'react-scrollbars-custom';
import { ruleName } from './ruleName';

/**
 * Модалка копировать модель
 * @component
 * @public
 */
function CopyAndCreateModel({ callback, blocks, onValidate, type }) {
  const [state, setState] = useState({
    value: '',
    block: {
      value: '',
      label: '',
    },
    tribe: {
      value: '',
      label: '',
    },
    tariff: false,
  });

  const ruleModal = useRef(null);

  const [openModal, setOpenModal] = useState(false);

  /* ANCHOR: Отдать значения в каллбэки при изменении состояния */
  useEffect(() => {
    onValidate(
      state.value.length !== 0 &&
        state.tribe.value.length !== 0 &&
        state.block.value.length !== 0
    );
    callback(state);
  }, [state]);

  /**
   * ANCHOR: Изменение состояния полей
   * @param  {object} event
   * @public
   */
  const _handleChange = async (event) => {
    try {
      setState({
        ...state,
        value: event.target.value,
      });
    } catch (e) {
      handleError('@CopyModel/_handleChange', e);
    }
  };

  /**
   * ANCHOR: Выбрать блок
   * @param {array} target
   * @public
   */
  const _getBlocks = (target) => {
    try {
      return target.map((item) => ({
        value: item.id,
        label: item.label,
      }));
    } catch (e) {
      handleError('@CopyModel/_getBlocks', e);
      return false;
    }
  };

  /**
   * ANCHOR: Получить трайбы
   * @param  {array} target
   * @param  {object} blockState
   * @public
   * @return {array}
   */
  const _getTribes = (target, blockState) => {
    try {
      const selectBlock = target.find((item) => item.id === blockState.value);

      return selectBlock
        ? selectBlock.tribes.map((elm) => ({
            value: elm.id,
            label: elm.label,
          }))
        : [];
    } catch (e) {
      handleError('@CopyModel/_getBlocks', e);
      return false;
    }
  };

  /**
   * ANCHOR: Выключить трайбы
   * @param  {object} target
   */
  const _isDisabledTribe = (target) => target.value.length === 0;

  // Получить classes
  const styles = useStyles();

  /**
   * ANCHOR: Выйти без сохранения
   * @public
   */
  const handleAgree = () => {
    ruleModal.current.handleHide();
  };

  const handleOpenRule = () => {
    if (openModal) {
      return;
    }

    setOpenModal(true);
    ruleModal.current.handleShow();
  };

  return (
    <>
      <Margin bottom={25} top={-15}>
        <FlexGrid style={{ width: 450 }}>
          <FlexGridItem padding={'0 15px 0 0'} width={'50%'}>
            <TextInput
              label={`${
                type === 'copyModel' ? 'Новое название' : 'Название'
              } модели`}
              type={'text'}
              onChange={(e) => _handleChange(e)}
              onFocus={handleOpenRule}
              value={state.value}
            />
          </FlexGridItem>
          <FlexGridItem padding={'0 0 0 15px'} width={'50%'}>
            <SingleSelect
              label={'Блок'}
              width={'100%'}
              options={_getBlocks(blocks)}
              selected={state.block}
              onChange={(val) =>
                setState({
                  ...state,
                  block: val,
                })
              }
            />
          </FlexGridItem>
          <FlexGridItem padding={'10px 15px 0 0'} width={'50%'}>
            <SingleSelect
              noOptionsMessage={
                _isDisabledTribe(state.block)
                  ? 'Выбирите блок'
                  : 'Выбирете опцию'
              }
              label={'Трайб'}
              width={'100%'}
              isDisabled={_isDisabledTribe(state.block)}
              options={_getTribes(blocks, state.block)}
              selected={state.tribe}
              onChange={(val) =>
                setState({
                  ...state,
                  tribe: val,
                })
              }
            />
          </FlexGridItem>
          <AccessControl role={'DFM_BUSINESS_ADMIN'} on={'model'} do={'create'}>
            <FlexGridItem padding={'30px 0 0 6px'} width={'50%'}>
              <FlexGrid>
                <Checkbox
                  checked={state.tariff}
                  onChange={() => setState({ ...state, tariff: !state.tariff })}
                />
                <div className={styles.text}>Тарифная модель</div>
              </FlexGrid>
            </FlexGridItem>
          </AccessControl>
        </FlexGrid>
      </Margin>

      <Confrim
        ref={ruleModal}
        title='Правила наименования моделей'
        description={
          <Scrollbar
            trackYProps={{ style: { width: 4, right: -20 } }}
            thumbYProps={{
              style: {
                background: 'rgba(31, 142, 250, 0.4)',
                width: 4,
                borderRadius: 2,
                position: 'relative',
              },
            }}
            style={{
              height: 'calc(100vh - 220px)',
              maxHeight: '600px',
              width: '400px',
              maxWidth: '90vw',
            }}>
            <ol className={styles.list}>
              {ruleName.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ol>
          </Scrollbar>
        }
        footer={{
          agree: {
            label: 'Понятно',
            callback: handleAgree,
          },
        }}
      />
    </>
  );
}

CopyAndCreateModel.propTypes = {
  callback: PropTypes.func,
  onValidate: PropTypes.func,
  blocks: PropTypes.array.isRequired,
  type: PropTypes.string,
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    list: {
      margin: 0,
      padding: 0,
      fontSize: 14,
      paddingLeft: 16,

      '& li': {
        '&:not(:last-child)': {
          marginBottom: 16,
        },
      },
    },
    text: {
      color: theme.colorsTheme.grey,
      fontSize: 14,
      margin: 'auto 0',
    },
  }),
  { index: 2 }
);

export default CopyAndCreateModel;
