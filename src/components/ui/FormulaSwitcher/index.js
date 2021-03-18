import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';

function FormulaSwitcher({ classes, label, formulaViewed, onViewed }) {
  const styles = useStyles({ classes });

  return (
    <FormControlLabel
      labelPlacement={'start'}
      onClick={(e) => e.stopPropagation()}
      control={
        <Tooltip
          title={
            <div className={styles.tooltipInner}>
              В полях значений узлов будут показаны формулы расчета
            </div>
          }
          arrow
          classes={{
            tooltipArrow: styles.tooltipArrow,
          }}
          placement='top'>
          <div>
            <Switch
              checked={formulaViewed}
              onChange={(e) => onViewed(!formulaViewed)}
              value={'formula'}
              color='primary'
              classes={{
                switchBase: styles.switchBase,
                switchRoot: styles.switchRoot,
              }}
            />
          </div>
        </Tooltip>
      }
      classes={{
        label: styles.triggerLabel,
        labelPlacementStart: styles.labelPlacementStart,
      }}
      label={label}
    />
  );
}

/** Назначаем  propTypes */
FormulaSwitcher.propTypes = {
  classes: PropTypes.object,
  label: PropTypes.string,
  formulaViewed: PropTypes.bool,
  onViewed: PropTypes.func,
};

FormulaSwitcher.defaultProps = {
  classes: {},
  label: 'Показать формулы',
  formulaViewed: true,
  onViewed: null,
};

/** Назначаем  displayName */
FormulaSwitcher.displayName = 'FormulaSwitcher';

/** Основные стили */
const useStyles = makeStyles((theme) => ({
  triggerLabel: {
    display: 'flex',
  },
  labelPlacementStart: {},
  switchBase: { color: theme.colorsTheme.formulaViewedLabelColor },

  tooltipArrow: {
    fontSize: 14,
    lineHeight: '16px',
    color: theme.colorsTheme.text,
    background: theme.colorsTheme.background,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: 217,
    height: 52,
    boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.5)',

    '& .MuiTooltip-arrow': {
      color: theme.colorsTheme.background,
    },
  },

  tooltipInner: {},
}));

export default FormulaSwitcher;
