/* eslint-disable max-lines */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MultiSelect } from 'components';

/**
 * Элемент таблицы системых справочников
 * @component
 * @public
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
function MultiselectItem({
  classes,
  disabled,
  onChange,
  options,
  value,
  label,
  selectObject,
}) {
  const styles = useStyles({ classes });

  return (
    <MultiSelect
      isDisabled={disabled}
      onChange={onChange}
      options={options}
      selected={value.map((el, index) => ({
        value: String(el),
        label: String(label[index]),
        option: selectObject[index],
      }))}
      width={'100%'}
      noOptionsMessageSelect={''}
      classes={{
        root: styles.select,
        selectedValues: classNames({ [styles.selectedValues]: disabled }),
      }}
    />
  );
}

const useStyles = makeStyles(
  (theme) => ({
    select: {
      width: 'unset',
      background: 'rgba(0,0,0,0)',
      color: 'white',
      lineHeight: '18px',
      fontSize: 12,
    },
    editEnabled: {
      background: theme.colorsTheme.nodeBackground,
    },
  }),
  { name: 'MultiselectItem', index: 1 }
);

MultiselectItem.defaultProps = {
  disabled: true,
  onChange: () => {},
  options: [],
  value: [''],
  label: [''],
  selectObject: [],
};

MultiselectItem.propTypes = {
  classes: PropTypes.object,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.array,
  label: PropTypes.array,
  selectObject: PropTypes.array,
};

export default MultiselectItem;
