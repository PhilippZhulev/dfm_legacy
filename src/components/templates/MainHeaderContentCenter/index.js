import React from 'react';
import PropTypes from 'prop-types';
import { AppBarCol, LinkButton } from 'components';
import { permitRule } from 'helpers';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Add from '../../svg/Add';
import Agregate from '../../svg/Agregate';
import Remove from '../../svg/Remove';
import Copy from '../../svg/Copy';
import CreateLink from '../../svg/CreateLink';
import {
  handleAddResource,
  handleRemoveResource,
  handleCopyResource,
  handleLinkResource,
  handleGroupResource,
} from './controls';

/**
 * Контент шапки (Центральная часть, появляется в режиме редактирования модели)
 * @component
 * @publics
 */
function MainHeaderContentCenter({
  data,
  showed,
  dispatchModal,
  dispatchCreateResource,
  dispatchRemoveResource,
  dispatchCopyResource,
  dispatchLinkResource,
  dispatchGroupResource,
  permissions,
}) {
  const classes = useStyles();

  return (
    <div
      className={classNames(
        classes.contentCenter,
        showed ? classes.toShow : null
      )}>
      {showed && (
        <>
          <AppBarCol
            classes={{
              headerItemCol: classes.col,
            }}>
            <LinkButton
              classes={{
                root: classes.add,
              }}
              clicked
              size={14}
              width={'auto'}
              colorType={'stroke'}
              icon={<Add height={18} />}
              text={'Создать узел'}
              disabled={!permitRule(permissions, ['update'])}
              onClick={() =>
                handleAddResource(dispatchModal, dispatchCreateResource)
              }
            />
          </AppBarCol>

          <AppBarCol
            classes={{
              headerItemCol: classes.col,
            }}>
            <LinkButton
              clicked
              classes={{
                root: classes.aggregate,
              }}
              size={14}
              width={'auto'}
              colorType={'stroke'}
              icon={<Agregate height={18} />}
              text={'Агрегировать узел'}
              disabled={!permitRule(permissions, ['update'])}
              onClick={() =>
                handleGroupResource(dispatchModal, dispatchGroupResource)
              }
            />
          </AppBarCol>

          <AppBarCol
            classes={{
              headerItemCol: classes.col,
            }}>
            <LinkButton
              classes={{
                root: classes.copy,
              }}
              clicked
              size={14}
              width={'auto'}
              colorType={'stroke'}
              icon={<Copy height={18} />}
              text={'Скопировать узел'}
              disabled={!permitRule(permissions, ['update'])}
              onClick={() =>
                handleCopyResource(dispatchModal, dispatchCopyResource)
              }
            />
          </AppBarCol>

          <AppBarCol
            classes={{
              headerItemCol: classes.col,
            }}>
            <LinkButton
              classes={{
                root: classes.remove,
              }}
              clicked
              size={14}
              width={'auto'}
              colorType={'stroke'}
              icon={<Remove height={18} />}
              text={'Удалить узел'}
              disabled={!permitRule(permissions, ['update'])}
              onClick={() =>
                handleRemoveResource(
                  dispatchModal,
                  dispatchRemoveResource,
                  data.label
                )
              }
            />
          </AppBarCol>

          <AppBarCol
            classes={{
              headerItemCol: classes.col,
            }}>
            <LinkButton
              classes={{
                root: classes.createLink,
              }}
              clicked
              size={14}
              width={'auto'}
              colorType={'stroke'}
              icon={<CreateLink />}
              text={'Создать ссылку'}
              disabled={!permitRule(permissions, ['update'])}
              onClick={() =>
                handleLinkResource(
                  dispatchModal,
                  dispatchLinkResource,
                  data.value
                )
              }
            />
          </AppBarCol>
        </>
      )}
    </div>
  );
}

MainHeaderContentCenter.propTypes = {
  data: PropTypes.object,
  showed: PropTypes.bool,
  dispatchModal: PropTypes.func.isRequired,
  dispatchCreateResource: PropTypes.func.isRequired,
  dispatchRemoveResource: PropTypes.func.isRequired,
  dispatchCopyResource: PropTypes.func.isRequired,
  dispatchLinkResource: PropTypes.func.isRequired,
  dispatchGroupResource: PropTypes.func.isRequired,
  locked: PropTypes.bool.isRequired,
  model: PropTypes.string,
  permissions: PropTypes.object,
  modelChange: PropTypes.bool.isRequired,
  dispatchModelSave: PropTypes.func.isRequired,
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    contentCenter: {
      background: theme.colorsTheme.headerCenterBackground,
      height: 0,
      transition: 'height .4s linear',
    },

    toShow: {
      height: 48,
    },

    col: {
      padding: '15px 40px 15px 25px',
    },

    add: {
      '& span': {
        paddingLeft: 20,
      },
    },
    aggregate: {
      '& span': {
        paddingLeft: 20,
      },
    },
    copy: {
      '& span': {
        paddingLeft: 20,
      },
    },
    remove: {
      '& span': {
        paddingLeft: 20,
      },
    },
    createLink: {
      '& span': {
        paddingLeft: 20,
      },
    },
  }),
  {
    name: 'MainHeaderContentCenter',
    index: 1,
  }
);

export default MainHeaderContentCenter;
