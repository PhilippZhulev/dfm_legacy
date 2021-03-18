import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, AbsolutePosition } from 'components';
import PropTypes from 'prop-types';

/**
 * Кнопка
 * @component
 * @public
 */
function ChangeButton({ onClick, text, classes, active }) {
  // Получить classes
  const styles = useStyles({ classes });

  return active ? (
    <AbsolutePosition right={30}>
      <Button
        classes={{ button: styles.root }}
        text={text}
        top={7}
        position={'right'}
        onClick={onClick}
      />
    </AbsolutePosition>
  ) : null;
}

ChangeButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  classes: PropTypes.object,
  active: PropTypes.bool,
};

ChangeButton.defaultProps = { text: '' };

// Приватные стили
const useStyles = makeStyles(
  {
    root: {
      height: 32,
      padding: '6px 10px',
    },
  },
  { name: 'ChangeButton' }
);

export default ChangeButton;

// TODO: Проблема тестирования. Составной компонент, нет привязки к физическим тегам
