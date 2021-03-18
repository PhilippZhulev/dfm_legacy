import React, { useState, useImperativeHandle } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from 'components';

export const Confrim = React.forwardRef((props, ref) => {
  const { title, description, footer, classes } = props;
  const [open, setOpen] = useState(false);

  const handleHide = () => {
    setOpen(false);
  };

  const handleShow = () => {
    setOpen(true);
  };

  useImperativeHandle(ref, () => ({
    handleHide,
    handleShow,
  }));

  // Получить classes
  const styles = useStyles(classes);

  return (
    <Dialog
      open={open}
      onClose={handleHide}
      classes={{
        root: styles.root,
        scrollBody: styles.modalRoot,
        container: styles.modalRoot,
        paper: styles.paper,
        paperScrollPaper: styles.root,
      }}>
      <DialogTitle classes={{ root: styles.title }}>{title}</DialogTitle>
      {description && (
        <DialogContent className={styles.root}>
          <div className={styles.text}>{description}</div>
        </DialogContent>
      )}

      {footer && (
        <DialogActions classes={{ root: styles.actions }}>
          {footer.agree && (
            <Button
              position='left'
              onClick={footer.agree.callback}
              top={1}
              red
              text={footer.agree?.label}
            />
          )}

          {footer.disagree && (
            <Button
              onClick={footer.disagree.callback}
              top={1}
              position='left'
              text={footer.disagree.label}
            />
          )}
        </DialogActions>
      )}
    </Dialog>
  );
});

Confrim.displayName = 'Confrim';

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    ...theme.modal,

    root: { overflow: 'visible' },

    text: {
      ...theme.modal.text,
      marginBottom: 8,
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontSize: 14,
      lineHeight: '20px',
      fontWeight: 400,
    },

    actions: {
      justifyContent: 'flex-start',
      paddingLeft: 24,
    },
  }),
  { index: 1 }
);

// TODO: Проблема тестирования. Составной компонент, нет привязки к физическим тегам
