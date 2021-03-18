import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Options from '../../svg/Options';

/**
 * Элемент заголовка таблицы
 * @component
 * @public
 */
function SystemCatalogsTableHeaderItem({
  classes,
  label,
  column,
  onClick,
  coumnMeta,
}) {
  const styles = useStyles({ classes });
  const headerItemRef = useRef(null);

  return (
    <td className={styles.headerItem} ref={headerItemRef}>
      {label}
      <div className={styles.optionsIcon}>
        <div
          className={styles.optionsIconWrapper}
          onClick={() => {
            onClick(headerItemRef.current, column);
            headerItemRef.current.columnMeta = coumnMeta;
          }}>
          <Options />
        </div>
      </div>
    </td>
  );
}

const useStyles = makeStyles(
  (theme) => ({
    headerItem: {
      padding: '15px 15.5px',
      fontSize: 12,
      borderRight: `1px solid ${theme.colorsTheme.headerBorders}`,
      borderTop: `1px solid ${theme.colorsTheme.headerBorders}`,
      borderBottom: `1px solid ${theme.colorsTheme.headerBorders}`,
      textTransform: 'uppercase',
      fontWeight: 600,
      color: theme.colorsTheme.headerColor,
      width: 300,
      height: 48,
      lineHeight: '16px',
      display: 'table-cell',
      whiteSpace: 'nowrap',
      paddingRight: 37,
      background: theme.colorsTheme.headerBackground,
      position: 'sticky',
      top: 0,
      zIndex: 6,
    },
    optionsIcon: {
      position: 'absolute',
      display: 'flex',
      top: 0,
      bottom: 0,
      right: 13.5,
      '& svg': {
        margin: 'auto 0',
        '& path': {
          transition: 'all 300ms ease-in-out',
        },
        '&:hover': {
          cursor: 'pointer',
        },
        '&:hover path': {
          stroke: 'white!important',
        },
      },
    },
    optionsIconWrapper: {
      height: '100%',
      display: 'flex',
    },
  }),
  { name: 'SystemCatalogsTableHeaderItem' }
);

SystemCatalogsTableHeaderItem.defaultProps = {
  label: '',
  column: '',
  coumnMeta: {},
};

SystemCatalogsTableHeaderItem.propTypes = {
  classes: PropTypes.object,
  label: PropTypes.string,
  column: PropTypes.string,
  onClick: PropTypes.func,
  coumnMeta: PropTypes.object,
};

export default SystemCatalogsTableHeaderItem;
