import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

/**
 * Инлан стилизованый текст
 * @component
 * @public
 */
function LinkText({ text, label, clicked, onClick, size, width, classes }) {
  const styles = useStyles({ classes });

  return (
    /* Обертка */
    <div
      data-testid='LinkTextWrapper'
      style={{
        width: width || 350,
        fontSize: size || 12,
      }}
      onClick={onClick}
      className={`${styles.root} ${clicked ? styles.hover : ''}`}>
      <span data-testid='LinkTextLabel' className={styles.label}>
        {label}
      </span>
      <span data-testid='LinkTextContent'>{text}</span>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.colorsTheme.text,
    fontSize: 12,
    lineHeight: '22.5px',
    display: 'flex',
    '& span': { paddingLeft: 10 },
  },
  hover: {
    cursor: 'pointer',
    transition: 'all 300ms ease-in-out',
    '& path': { transition: 'all 300ms ease-in-out' },
    '&:hover': { color: '#fff' },
    '&:hover path': { fill: '#fff' },
  },
  label: {
    width: 140,
    textAlign: 'right',
    color: theme.colorsTheme.grey,
  },
}));

export default LinkText;
