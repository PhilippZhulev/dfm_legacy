import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { handleWarn, handleError } from 'helpers';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import ModelList from '../../svg/ModelList';
import MenuIcon from '../../svg/MenuIcon';
import ParentModel from '../../svg/ParentModel';
import AddIcon from '../../svg/Add';
import TrashCan from '../../svg/TrashCan';
import { virualStore } from '../../../virtualStore';
import { handleCreate, handleExit } from './controls';

const WhatIf = (props) => {
  const {
    classes,
    dispatchModal,
    modelsList,
    parentValue,
    dispatchWhatIfCreate,
    model,
    modelLabel,
    dispatchModelLocked,
    dispatchModelChange,
    dispatchModelListReload,
    dispatchModelClearCache,
    locked,
    modelChange,
    dispatchModelSelect,
    dispatchDeleteModal,
    userData,
  } = props;
  const styles = useStyles({ classes });
  const [open, setOpen] = useState(false);

  const history = useHistory();

  const createModal = (e) => {
    dispatchWhatIfCreate({
      params: { data: { name: e.value, parentModelValue: model } },
    });
  };

  const handleCreateClick = () => {
    if (modelsList.length < 5) {
      handleCreate(dispatchModal, createModal);
    } else {
      handleWarn({
        message:
          'Создано максимальное число What-if моделей для данной родительской',
      });
    }
  };

  const handleModelClick = (id) => {
    if (id === model) {
      return;
    }
    if (modelChange) {
      handleExit(dispatchModal, () => handleLeave(id));
    } else {
      handleLeave(id);
    }
  };

  const handleLeave = (id) => {
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
      params: { model: id },
      route: history,
    });
  };

  const _deleteModel = async (event, close, id, label) => {
    try {
      if (event.value === id) {
        dispatchDeleteModal({
          params: { name: label },
          model: parentValue || model,
        });
        close();
        if (model === id && parentValue) {
          dispatchModelClearCache({});

          dispatchModelListReload({
            params:
              localStorage.getItem('model') !== null
                ? { model: JSON.parse(localStorage.getItem('model')) }
                : {},
          });

          virualStore.model = {};
          virualStore._v = 0;

          history.push('/dfm_it/model');
        }
      } else {
        handleWarn({ message: 'Имя модели не совпадает.' });
      }
    } catch (e) {
      handleError('@ModelTile/_deleteModel', e);
    }
  };

  const handleDelete = (e, id, label) => {
    e.stopPropagation();
    dispatchModal({
      type: 'deleteModel',
      state: true,
      title: `Вы действительно хотите удалить модель ${label}`,
      buttonText: 'Удалить',
      titleSize: 220,
      text: '',
      done: (event, close) => _deleteModel(event, close, id, label),
    });
  };

  return (
    <div className={styles.root}>
      {parentValue ? (
        <div
          className={styles.item}
          onClick={() => handleModelClick(parentValue)}>
          <ParentModel />
          {'Родительская модель'}
        </div>
      ) : (
        <div className={styles.item} onClick={handleCreateClick}>
          <AddIcon />
          {'Создать модель What-if'}
        </div>
      )}
      {modelsList.length > 0 && (
        <ExpansionPanel
          square
          expanded={open}
          classes={{ root: styles.rootPanel }}
          onChange={() => setOpen(!open)}>
          <ExpansionPanelSummary
            expandIcon={<MenuIcon />}
            aria-controls='panel1a-content'
            classes={{ root: styles.rootSummary }}
            id='panel1a-header'>
            <div className={styles.icon}>{<ModelList />}</div> Список моделей{' '}
            <div className={styles.modelsCounter}>
              <span>{modelsList?.length || 0}</span>/5
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails classes={{ root: styles.detailsRoot }}>
            {modelsList.map((item) => (
              <div
                key={item.value}
                onClick={() => handleModelClick(item.value)}
                className={classNames(
                  {
                    [styles.selected]: item.value === model,
                  },
                  styles.modelItem
                )}>
                {item.label}
                <div className={styles.delete}>
                  <div onClick={(e) => handleDelete(e, item.value, item.label)}>
                    <TrashCan />
                  </div>
                </div>
              </div>
            ))}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )}
    </div>
  );
};

WhatIf.propTypes = {
  classes: PropTypes.object,
  dispatchModal: PropTypes.func.isRequired,
  modelsList: PropTypes.array,
  parentValue: PropTypes.string,
  dispatchWhatIfCreate: PropTypes.func.isRequired,
  model: PropTypes.string.isRequired,
  modelLabel: PropTypes.string.isRequired,
  dispatchModelLocked: PropTypes.func.isRequired,
  dispatchModelChange: PropTypes.func.isRequired,
  dispatchModelListReload: PropTypes.func.isRequired,
  dispatchModelClearCache: PropTypes.func.isRequired,
  locked: PropTypes.bool.isRequired,
  modelChange: PropTypes.bool.isRequired,
  dispatchModelSelect: PropTypes.func.isRequired,
  dispatchDeleteModal: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
};

WhatIf.displayName = 'WhatIf';

WhatIf.defaultProps = {
  modelsList: [],
};

const useStyles = makeStyles(
  (theme) => ({
    root: {
      width: '365px!important',
    },
    icon: {
      marginRight: 24,
      width: 20,
      textAlign: 'center',
    },

    rootPanel: {
      marginBottom: 8,

      '&::before': {
        opacity: 0,
      },
    },

    rootSummary: {
      '&.Mui-expanded *': {
        fill: theme.colorsTheme.nodeColor,
        color: theme.colorsTheme.nodeColor,
      },
    },
    detailsRoot: {
      padding: 0,
      backgroundColor: theme.colorsTheme.categoryIconBackgroundDefault,
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      // justifyContent: 'space-between',
      height: 58,
      width: '100%',
      transition: 'all .3s ease-in-out',
      cursor: 'pointer',
      padding: '0 24px',
      color: theme.colorsTheme.grey,

      '& svg': {
        marginRight: 24,
      },

      '& path, circle': {
        transition: 'all .3s ease-in-out',
      },

      '&:hover': {
        color: theme.colorsTheme.nodeColor,
        '& path, circle': {
          fill: theme.colorsTheme.nodeColor,
        },
      },
    },
    modelItem: {
      padding: '24px 0px 27px 60px',
      color: theme.colorsTheme.grey,
      transition: 'all 300ms ease-in-out',
      width: '100%',
      display: 'flex',
      cursor: 'pointer',
      '&:hover': {
        color: theme.colorsTheme.text,
      },
    },
    selected: {
      cursor: 'default',
      color: theme.colorsTheme.text,
    },
    modelsCounter: {
      color: theme.colorsTheme.grey,
      flexGrow: 1,
      textAlign: 'right',
      '& > span': {
        color: theme.colorsTheme.text,
      },
    },
    delete: {
      flexGrow: 1,
      display: 'flex',
      '& > div': {
        margin: 'auto',
        marginRight: 20,
      },
      '& > div > svg': {
        cursor: 'pointer',
        '& path': {
          transition: 'all 300ms ease-in-out',
        },
      },
      '& > div > svg:hover': {
        '& path': {
          fill: theme.colorsTheme.text,
        },
      },
    },
  }),
  {
    index: 1,
    name: 'WhatIf',
  }
);

export default WhatIf;
