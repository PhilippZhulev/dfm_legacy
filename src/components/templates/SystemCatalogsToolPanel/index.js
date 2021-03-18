import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { LinkButton, Button, SearchFieldGraph } from 'components';
import Remove from '../../svg/Remove';
import Edit from '../../svg/NewEdit';
import Add from '../../svg/Add';

/**
 * Панель управления редактированием справочников
 * @component
 * @public
 */
function SystemCatalogsToolPanel({
  classes,
  switchEnableEdit,
  showDelete,
  enableEdit,
  onDelete,
  onCancel,
  onSave,
  onAdd,
  search,
  onSearch,
}) {
  const styles = useStyles({ classes });

  return (
    <div className={styles.root}>
      <div className={classNames(styles.block, styles.left)}>
        <LinkButton
          icon={<Edit width={15} height={15} />}
          classes={{ root: classNames(styles.link, styles.edit) }}
          onClick={switchEnableEdit}
          width={'fit-content'}
          text={'Редактировать'}
          clicked
        />
        {enableEdit ? (
          <LinkButton
            icon={<Add width={14} height={14} />}
            classes={{ root: classNames(styles.link, styles.add) }}
            width={'fit-content'}
            text={'Добавить'}
            onClick={onAdd}
            clicked
          />
        ) : null}
        {enableEdit && showDelete ? (
          <LinkButton
            icon={<Remove width={14} height={14} />}
            classes={{ root: classNames(styles.link, styles.delete) }}
            width={'fit-content'}
            text={'Удалить'}
            onClick={onDelete}
            clicked
          />
        ) : null}
        <SearchFieldGraph
          classes={{ root: styles.searchRoot, input: styles.searchInput }}
          value={search}
          width={300}
          onChange={onSearch}
        />
      </div>
      <div
        className={classNames(styles.block, styles.right, {
          [styles.hide]: !enableEdit,
        })}>
        <Button
          classes={{
            root: classNames(styles.cancel, styles.button),
            button: styles.minify,
          }}
          onClick={onCancel}
          position={'left'}
          red
          text={'Отмена'}
        />
        <Button
          classes={{
            root: styles.button,
            button: styles.minify,
          }}
          onClick={() => {
            switchEnableEdit();
            onSave();
          }}
          position={'left'}
          text={'Сохранить'}
        />
      </div>
    </div>
  );
}

SystemCatalogsToolPanel.propTypes = {
  switchEnableEdit: PropTypes.func,
  classes: PropTypes.object,
};

const useStyles = makeStyles(
  (theme) => ({
    root: {
      position: 'relative',
      minWidth: 600,
      height: 95,
    },
    block: {
      display: 'flex',
      top: 0,
      height: 95,
      position: 'absolute',
    },
    right: {
      right: 54,
    },
    left: {
      left: 36,
    },
    button: {
      width: 'fit-content',
      margin: 'auto 0!important',
      marginLeft: '8px!important',
    },
    hide: {
      display: 'none',
    },
    link: {
      margin: 'auto 0',
      marginRight: 13.1,
      transition: 'all 300ms ease-in-out',
      '& svg': {
        margin: 'auto 0',
        lineHeight: '25px',
      },
      '& path': {
        transition: 'all 300ms ease-in-out',
      },
      '&:first-child': {
        marginRight: 70,
      },
      '&:hover': {
        cursor: 'pointer',
        '& path': {
          fill: theme.colorsTheme.text,
        },
        color: theme.colorsTheme.text,
      },
    },
    cancel: {
      marginRight: 8,
    },
    minify: {
      padding: '6.5px 0!important',
      width: 102,
    },
    add: {
      '& path': {
        fill: theme.colorsTheme.addRole,
      },
    },
    delete: {
      '& path': {
        fill: theme.colorsTheme.err,
      },
    },
    searchRoot: {
      margin: 'auto 0',
    },
    searchInput: {
      border: `1px solid ${theme.colorsTheme.tableBorders}`,
      color: `${theme.colorsTheme.text}`,
    },
  }),
  { name: 'SystemCatalogsToolPanel', index: 1 }
);

SystemCatalogsToolPanel.defaultProps = {
  switchEnableEdit: () => {},
  showDelete: false,
  onDelete: () => {},
  onCancel: () => {},
  onSave: () => {},
  enableEdit: false,
  onAdd: () => {},
  onSearch: () => {},
  search: '',
};

SystemCatalogsToolPanel.propTypes = {
  classes: PropTypes.object,
  switchEnableEdit: PropTypes.func,
  showDelete: PropTypes.bool,
  onDelete: PropTypes.func,
  enableEdit: PropTypes.bool,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  onAdd: PropTypes.func,
  onSearch: PropTypes.func,
  search: PropTypes.string,
};

export default SystemCatalogsToolPanel;
