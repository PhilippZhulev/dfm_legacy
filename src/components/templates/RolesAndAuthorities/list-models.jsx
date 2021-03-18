import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import {
  AutoSizer,
  List,
  CellMeasurerCache,
  CellMeasurer,
} from 'react-virtualized';
import { Button } from 'components';
import { handleWarn, useWindowSize } from 'helpers';
import { useHistory } from 'react-router-dom';
import { PermissionCard } from './permission-card';
import Permissions from '../../../services/api/permissions';

const getModels = (state) => state.handleModelSuccess.models;

/** пока селектор для всех моделей в общий массив */
const getMemoSelectorModels = createSelector(
  [getModels],
  (models) =>
    models?.reduce((summary, model) => summary.concat(model.models), []) || []
);

export const ListModels = React.memo((props) => {
  const { user, permissions, getUserPermissionsById, search } = props;
  const models = useSelector(getMemoSelectorModels);
  const classes = useStyles(props);
  const history = useHistory();
  const refList = useRef(null);
  const [permissionsModel, setPermissionsModel] = useState({
    fetch: {},
    update: {},
    create: {},
  });
  const { height } = useWindowSize();

  const cache = useMemo(
    () =>
      new CellMeasurerCache({
        fixedWidth: true,
      }),
    []
  );

  const renderItems = models
    .filter(
      (el) =>
        el.value.toLowerCase().includes(search.toLowerCase()) ||
        el.label.toLowerCase().includes(search.toLowerCase())
    )
    .sort(
      (a, b) =>
        !!permissionsModel.fetch[b.value] - !!permissionsModel.fetch[a.value]
    );

  useEffect(() => {
    getUserPermissionsModels();
  }, [permissions]);

  const getUserPermissionsModels = async () => {
    try {
      const mapModel = {};

      permissions.forEach((el) => {
        if (el.target === 'model') {
          mapModel[el.code] = el;
        }
      });

      setPermissionsModel((prev) => ({
        ...prev,
        fetch: mapModel,
        update: {},
        create: {},
      }));
    } catch (error) {
      handleWarn(error);
    }
  };

  const handlePermissionsModel = useCallback(
    (model, state) => {
      if (permissionsModel.fetch[model]) {
        setPermissionsModel((prevState) => ({
          ...prevState,
          update: {
            ...prevState.update,
            [model]: state,
          },
        }));
      } else {
        setPermissionsModel((prevState) => ({
          ...prevState,
          create: {
            ...prevState.create,
            [model]: { ...state, code: model, userId: user.id },
          },
        }));
      }
    },
    [permissionsModel]
  );

  const rowRenderer = ({ index, key, parent, style }) => {
    const el = renderItems[index];
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={el.id}
        rowIndex={index}
        parent={parent}>
        {({ measure, registerChild }) => (
          <div ref={registerChild} style={style}>
            <PermissionCard
              classes={{ root: classes.permissionCard }}
              label='модель'
              oChangePermission={(state) =>
                handlePermissionsModel(el.value, state)
              }
              measure={measure}
              permission={permissionsModel.fetch[el.value]}
              update={permissionsModel?.update[el.value]}
              create={permissionsModel?.create[el.value]}
              model={el.value}
              main
              name={el.label}
            />
          </div>
        )}
      </CellMeasurer>
    );
  };

  const handleSave = async () => {
    try {
      const createValues = Object.values(permissionsModel.create);
      const updateValues = Object.values(permissionsModel.update);
      if (createValues.length) {
        await Permissions.createAll(createValues);
      }
      if (updateValues.length) {
        await Permissions.updateAll(updateValues);
      }
      getUserPermissionsById();
    } catch (error) {
      handleWarn(error);
    }
  };

  if (!user || !models.length) {
    return null;
  }

  return (
    <>
      <AutoSizer disableHeight>
        {({ width }) => (
          <List
            ref={refList}
            rowCount={renderItems.length}
            overscanRowCount={15}
            width={width - 1}
            style={{ outline: 'none' }}
            height={height - 491}
            rowHeight={cache.rowHeight}
            deferredMeasurementCache={cache}
            rowRenderer={rowRenderer}
            permissionsModel={permissionsModel.fetch}
            user={user}
            models={models}
          />
        )}
      </AutoSizer>
      <div className={classes.actions}>
        <Button
          onClick={() => history.push('../users')}
          classes={{ root: classes.rootBtn }}
          text={'Выйти без сохранения'}
        />
        <Button
          onClick={handleSave}
          classes={{ root: classes.rootBtn }}
          text={'Сохранить'}
        />
      </div>
    </>
  );
});

ListModels.displayName = 'ListModels';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: '32px 56px',
    },

    search: {
      maxWidth: 300,
      marginTop: 24,
      marginBottom: 24,

      '& input': {
        backgroundColor: 'rgba(68, 142, 242, 0.1)',
      },
    },

    rootBtn: {
      margin: 0,

      '&:first-child': {
        '& button': {
          borderColor: '#CA6B6B',

          '&:hover': {
            boxShadow: 'inset 0 0 0 100px #CA6B6B',
          },
        },
      },

      '&:last-child': {
        marginLeft: 24,
      },
    },

    actions: {
      display: 'flex',
      width: 'calc(100% - 1px)',
      justifyContent: 'flex-end',
      marginTop: 22,
    },

    backBtn: {
      fontSize: 14,
      display: 'flex',
      alignItems: 'center',
      color: '#98A7B9',
      marginLeft: -4,
      cursor: 'pointer',
      marginBottom: 32,

      '&:hover': {
        opacity: 0.65,
      },
    },

    permissionCard: {
      margin: '24px 0',
      '&:first-child': {
        marginTop: 0,
      },
    },

    list: {
      width: 'calc(100% - 1px)',
    },

    title: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 20,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: theme.colorsTheme.grey,
      marginBottom: 24,
    },
  }),
  { index: 2 }
);
