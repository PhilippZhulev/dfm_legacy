import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
  Margin,
  FlexGrid,
  FlexGridItem,
  SingleSelect,
} from 'components';
import { makeStyles } from '@material-ui/core/styles';
import { handleError, handleWarn } from 'helpers';

/**
 * Модалка копировать модель
 * @component
 * @public
 */
function CreateWhatIfModel({ callback, onValidate, type, modelsList, params }) {
  const [state, setState] = useState({ value: '', model: {} });

  /* ANCHOR: Отдать значения в каллбэки при изменении состояния */
  useEffect(() => {
    const validation =
      (state.value.length !== 0 && type === 'createWhatIfCurrent') ||
      (state.value.length !== 0 &&
        state.model &&
        state.model.count < 5 &&
        type === 'createWhatIf');
    onValidate(validation);
    if (validation) {
      callback(state, validation);
    }
  }, [state]);

  useEffect(() => {
    if (state.model.count >= 5) {
      handleWarn({
        message:
          'Создано максимальное число What-if моделей для данной родительской',
      });
    }
  }, [state.model]);

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

  // Получить classes
  const styles = useStyles();

  /**
   * ANCHOR: Выбрать блок
   * @param {array} target
   * @public
   */
  const _getModels = (target) => {
    try {
      if (!target) {
        return [];
      }
      return target.map((item) => ({
        value: item.id,
        label: item.label,
        count: item.countWhatifModels,
      }));
    } catch (e) {
      handleError('@CopyModel/_getBlocks', e);
      return false;
    }
  };

  return (
    <>
      <Margin bottom={25} top={-15}>
        <FlexGrid style={{ width: 450 }}>
          {!params.target && type === 'createWhatIf' && (
            <FlexGrid style={{ width: 450, marginBottom: 20 }}>
              <FlexGridItem padding={'0 15px 0 0'} width={'100%'}>
                <SingleSelect
                  label={'Родительская модель'}
                  width={'100%'}
                  options={_getModels(modelsList)}
                  selected={state.model}
                  noOptionsMessageSelect={'Модель не выбрана'}
                  onChange={(val) =>
                    setState({
                      ...state,
                      model: val,
                    })
                  }
                />
              </FlexGridItem>
            </FlexGrid>
          )}
          <FlexGridItem padding={'0 15px 0 0'} width={'100%'}>
            <TextInput
              label={'Название модели What-if #'}
              type={'text'}
              onChange={(e) => _handleChange(e)}
              value={state.value}
            />
          </FlexGridItem>
        </FlexGrid>
      </Margin>
    </>
  );
}

CreateWhatIfModel.propTypes = {
  callback: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  modelsList: PropTypes.array,
  params: PropTypes.object,
};

CreateWhatIfModel.defaultProps = {
  modelsList: [],
};

CreateWhatIfModel.displayName = 'CreateWhatIfModel';

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

export default CreateWhatIfModel;
