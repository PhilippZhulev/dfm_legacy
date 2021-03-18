/*
 * desc: модальное окно.
 * type: UI-component
 * ver: 1.0.0
 * Copyright(c) Heavy mouse team.
 *
 * props:
 * classes {object}
 * open {boolean}
 * close {void}
 * title {string}
 * text {string}
 * children {*}
 */

// Зависимомти
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import React from 'react';
import Slide from '@material-ui/core/Slide/Slide';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from 'components';

// Анимация
const Transition = React.forwardRef((props, ref) =>
  (
    <Slide
      direction={props.direction ? props.direction : 'up'}
      ref={ref}
      {...props}
    />
  ));

Transition.displayName = 'Transition';

/**
 * Модалка
 * @component
 * @public
 */
function Modal({ close, direction, open, text, children, title, classes, cross, noMaxWidth }) {
  // Получить classes
  const styles = useStyles({ classes });

  return (
    /* модалка компонент material */
    <Dialog
      classes={{
        root: styles.root,
        scrollBody: styles.modalRoot,
        container: styles.modalRoot,
        paper: classNames(styles.paper, { [styles.noMaxWidth]: noMaxWidth }),
      }}
      open={Boolean(open)}
      TransitionComponent={Transition}
      TransitionProps={{ direction }}
      keepMounted
      onClose={close}>
      {/* Заголовок модального окна компонент material */}
      {
        title ?
        <DialogTitle classes={{ root: styles.title }}>{title}</DialogTitle> : null
      }

      {/* Крестик для закрытия модального окна */}
      {cross ? <Icon size={24} className={styles.closeIcon} onClick={close} /> : null}

      {/* Контент */}
      {text ? <div className={styles.content}>{text}</div> : null}

      {/* контролы */}
      {children ?
        <DialogActions>
          <div className={styles.buttons}>{children}</div>
        </DialogActions>
        :
        null
      }
    </Dialog>
  );
}

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  close: PropTypes.func,
  direction: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  cross: PropTypes.bool,
  title: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]),
  open: PropTypes.bool,
  noMaxWidth: PropTypes.bool,
  classes: PropTypes.object,
};

Modal.defaultProps = {
  text: '',
  title: '',
  open: null,
  cross: false,
  noMaxWidth: false,
};

// Приватные стили
const useStyles = makeStyles((theme) =>
  ({ ...theme.modal }), {
    name: 'Modal',
  });

export default Modal;

// TODO: Проблема тестирования. Составной компонент
