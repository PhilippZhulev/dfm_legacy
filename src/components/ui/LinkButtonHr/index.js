import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { fade } from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';

function LinkButtonHr({ classes }) {
  /** ANCHOR: получить стили */
  const styles = useStyles({ classes });

  return <hr className={classNames(styles.linkButtonHr, 'linkButtonHr')} />;
}

LinkButtonHr.displayName = 'LinkButtonHr';

LinkButtonHr.propTypes = {
  classes: PropTypes.object,
};

LinkButtonHr.defaultProps = { classes: {} };

export default LinkButtonHr;

/** Основные стили */
const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      linkButtonHr: {
        backgroundColor: `${fade(colorsTheme.grey, 0.5)} !important`,
      },
    };
  },
  { name: 'LinkButtonHr' }
);
