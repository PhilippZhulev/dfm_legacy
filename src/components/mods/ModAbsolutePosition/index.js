import { modifyComponent } from 'helpers';
import { makeStyles } from '@material-ui/core/styles';

/**
 * @mod Модификатор абсолютной позиции
 * @component
 * @public
 */
function ModAbsolutePosition({ children, custom }) {
  const styles = useStyles();
  return modifyComponent(children, { classes: styles });
}

const useStyles = makeStyles(
  () => ({
    root: {
      top: 135,
      height: 'calc(100% - 135px)',
      width: '100%',
    },
  }),
  {
    name: 'ModAbsolutePosition',
  }
);

export default ModAbsolutePosition;
