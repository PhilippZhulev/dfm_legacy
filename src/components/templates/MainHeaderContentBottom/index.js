import React from 'react';
import PropTypes from 'prop-types';
import { AppBarCol, LinkButton, IconColor, LinkText } from 'components';
import { ModelExit, ModelDangers } from 'containers';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ParentModel from '../../svg/ParentModel';
import Return from '../../svg/Return';
import Indicator from '../../svg/Indicator';
import AddIcon from '../../svg/Add';
import { handleCreate, handleExit } from '../WhatIf/controls';
import { virualStore } from '../../../virtualStore';

/**
 * Контент шапки (Низ)
 * @component
 * @publics
 */
function MainHeaderContentBottom({
  data,
  dispatchModal,
  dispatchModelSelect,
  parentValue,
  parentLabel,
  dispatchWhatIfCreate,
  model,
  modelChange,
  modelLabel,
  userData,
  locked,
  dispatchModelChange,
  dispatchModelLocked,
  dispatchModelClearCache,
}) {
  const classes = useStyles();

  const history = useHistory();

  const createModal = (e) => {
    dispatchWhatIfCreate({
      params: { data: { name: e.value, parentModelValue: model } },
    });
  };

  const handleModelClick = () => {
    if (modelChange) {
      handleExit(dispatchModal, leave);
    } else {
      leave();
    }
  };

  const leave = () => {
    dispatchModelChange({ state: false });
    if (locked) {
      dispatchModelLocked({
        params: {
          name: modelLabel,
          id: model,
          state: false,
        },
        userData,
      });
    }
    if (modelChange) {
      dispatchModelClearCache({});
    }
    virualStore.model = {};
    virualStore._v = 0;
    dispatchModelSelect({
      params: { model: parentValue },
      route: history,
    });
  };

  return (
    <>
      <AppBarCol
        classes={{
          headerItemCol: classes.returnCol,
        }}>
        <ModelExit
          classes={{
            return: classes.return,
          }}
          icon={<Return />}
          label={'К списку моделей'}
        />
      </AppBarCol>
      <AppBarCol>
        <LinkButton
          classes={{
            root: classes.indicator,
          }}
          size={14}
          width={'auto'}
          icon={
            <IconColor color={data.inidicator.color}>
              <Indicator />
            </IconColor>
          }
          text={data.inidicator.label}
        />
      </AppBarCol>
      <AppBarCol>
        <LinkText
          size={14}
          width={'auto'}
          label={'ТСО узла: '}
          text={data.formatValue.full}
        />
      </AppBarCol>
      <ModelDangers />
      <AppBarCol
        classes={{
          headerItemCol: classes.createModel,
        }}>
        {parentValue ? (
          <>
            <LinkButton
              size={14}
              width={'auto'}
              icon={<div />}
              text={parentLabel}
              clicked
              onClick={handleModelClick}
              classes={{ root: classes.parentModel }}
            />
            <ParentModel />
            <span className={classes.buttonTitle}>Родительская модель</span>
          </>
        ) : (
          <LinkButton
            size={14}
            width={'auto'}
            icon={<AddIcon />}
            text={'Создать модель What-if'}
            onClick={() => handleCreate(dispatchModal, createModal)}
            clicked
          />
        )}
      </AppBarCol>
    </>
  );
}

MainHeaderContentBottom.propTypes = {
  data: PropTypes.object,
  dispatchModal: PropTypes.func,
  dispatchModelSelect: PropTypes.func,
  parentValue: PropTypes.string,
  parentLabel: PropTypes.string,
  dispatchWhatIfCreate: PropTypes.func,
  model: PropTypes.string,
  modelChange: PropTypes.bool,
  modelLabel: PropTypes.string,
  locked: PropTypes.bool,
  userData: PropTypes.object,
  dispatchModelChange: PropTypes.func,
  dispatchModelLocked: PropTypes.func,
  dispatchModelClearCache: PropTypes.func,
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    returnCol: {
      padding: '12px 146px 12px 0',
    },
    return: {
      padding: 0,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transitionDuration: '0.3s',

      '& span': {
        paddingLeft: 8,
        lineHeight: '14px',
      },

      '& svg path': {
        transitionDuration: '0.3s',
      },

      '&:hover': {
        color: '#fff',

        '& svg path': {
          fill: '#fff',
        },
      },
    },
    indicator: {
      lineHeight: '22px',
    },

    buttonTitle: {
      color: theme.colorsTheme.grey,
      margin: 'auto 0',
      marginRight: 10,
      fontSize: 14,
    },

    createModel: {
      flexGrow: 1,
      flexDirection: 'row-reverse',
      '& > div, svg': {
        margin: 'auto 0',
      },
    },

    parentModel: {
      color: theme.colorsTheme.blue,
    },
  }),
  {
    name: 'MainHeaderContentBottom',
    index: 1,
  }
);

export default MainHeaderContentBottom;
