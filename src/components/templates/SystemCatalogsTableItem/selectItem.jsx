/* eslint-disable max-lines */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { SingleSelect } from 'components';

/**
 * Элемент таблицы системых справочников
 * @component
 * @public
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
function SelectItem({ classes, disabled, onChange, options, value, label }) {
  const styles = useStyles({ classes });

  return (
    <SingleSelect
      isDisabled={disabled}
      onChange={onChange}
      options={options}
      selected={{
        value,
        label,
      }}
      width={'100%'}
      noOptionsMessageSelect={''}
      classes={{ select: styles.select }}
    />
  );
}

const useStyles = makeStyles(
  (theme) => ({
    select: {
      background: 'rgba(0,0,0,0)',
      color: 'white',
      lineHeight: '18px',
      fontSize: 12,
    },
  }),
  { name: 'SelectItem', index: 1 }
);

SelectItem.defaultProps = {
  label: '',
  disabled: true,
  options: [],
  value: '',
  lable: '',
  onChange: () => {},
};

SelectItem.propTypes = {
  classes: PropTypes.object,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string,
};

export default SelectItem;
