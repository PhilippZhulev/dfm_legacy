import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import CheckboxIcon from '../../svg/Checkbox';
import CheckboxChecked from '../../svg/CheckboxChecked';

export default function StyledCheckbox({
  classes,
  checked,
  indeterminate,
  onChange,
}) {
  const styles = useStyles({ classes });
  return (
    <Checkbox
      checked={checked}
      indeterminate={indeterminate}
      classes={{ root: styles.checkboxRoot }}
      value={true}
      icon={<CheckboxIcon />}
      checkedIcon={<CheckboxChecked />}
      onChange={onChange}
    />
  );
}

StyledCheckbox.defaultProps = {
  onChange: () => {},
  checked: false,
  indeterminate: false,
};

StyledCheckbox.propTypes = {
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  onChange: PropTypes.func,
  classes: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  checkboxRoot: {
    '& svg': {
      minWidth: 16,
      minHeight: 16,
      fill: 'rgba(0,0,0,0)',
    },
    '&.Mui-checked + span': {
      color: theme.colorsTheme.text,
    },
    '&.Mui-checked svg': {
      background: theme.colorsTheme.text,
      borderRadius: 4,
    },
    margin: 'auto 0',
  },
}));
