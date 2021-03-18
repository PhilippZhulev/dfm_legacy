// Зависимости
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const CustomTitle = React.forwardRef((props, ref) => {
  const { type, content, children } = props;
  // Инициализировать стили
  const classes = useStyles(props);

  // Представление
  return (
    <div ref={ref} className={`${classes.title} ${classes[type]}`}>
      {content || children}
    </div>
  );
});

CustomTitle.displayName = 'CustomTitle';

// Типы props
CustomTitle.propTypes = {
  classes: PropTypes.object,
  content: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
};

// Стили
const useStyles = makeStyles((theme) =>
  ({ ...theme.typography.titles }));

export default CustomTitle;
