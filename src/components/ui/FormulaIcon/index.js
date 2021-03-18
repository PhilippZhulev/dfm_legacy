import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Formula from '../../svg/Formula';
import FormulaNormal from '../../svg/FormulaNormal';
import FormulaActive from '../../svg/FormulaActive';
import FormulaHover from '../../svg/FormulaHover';

function FormulaIcon({
  classes,
  existed,
  displayed,
  changeable,
  changeFormulaDisplayed,
  info,
}) {
  const styles = useStyles({ classes });

  /** Вид иконки */
  const formulaActive = displayed ? <FormulaActive /> : <FormulaNormal />;

  /** Тип иконки */
  const defaultIcon = changeable ? formulaActive : <Formula />;

  const [icon, setIcon] = useState(defaultIcon);

  useEffect(() => {
    setIcon(defaultIcon);
  }, [displayed]);

  const className = changeable
    ? styles.formulaIconChangeable
    : styles.formulaIcon;

  return existed ? (
    <span
      onClick={changeFormulaDisplayed}
      onMouseEnter={() => changeable && setIcon(<FormulaHover />)}
      onMouseLeave={() => changeable && setIcon(defaultIcon)}
      className={className}>
      {info ? (
        <Tooltip
          title={<div className={styles.tooltipInner}>{info}</div>}
          arrow
          classes={{
            tooltipArrow: styles.tooltipArrow,
          }}
          placement='top'>
          <div>{icon}</div>
        </Tooltip>
      ) : (
        icon
      )}
    </span>
  ) : null;
}
/** Описание пропсы */
FormulaIcon.propTypes = {
  classes: PropTypes.object,
  existed: PropTypes.bool,
  displayed: PropTypes.bool,
  changeable: PropTypes.bool,
  changeFormulaDisplayed: PropTypes.func,
  info: PropTypes.string,
};

/** Начальная пропса */
FormulaIcon.defaultProps = {
  classes: {},
  existed: false,
  displayed: false,
  changeable: false,
  changeFormulaDisplayed: null,
  info: null,
};

FormulaIcon.displayName = 'FormulaIcon';

// Приватные стили
const useStyles = makeStyles((theme) => ({
  formulaIcon: {
    height: 30,
  },
  formulaIconChangeable: {
    height: 30,
    cursor: 'pointer',
    transition: 'ease 0.5',
  },

  tooltipArrow: {
    fontSize: 14,
    lineHeight: '16px',
    color: theme.colorsTheme.text,
    background: theme.colorsTheme.background,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: 266,
    height: 53,
    boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.5)',

    '& .MuiTooltip-arrow': {
      color: theme.colorsTheme.background,
    },
  },

  tooltipInner: {},
}));

export default FormulaIcon;
