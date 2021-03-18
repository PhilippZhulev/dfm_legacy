import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Icon } from 'components';

const StackedLegend = (props) => {
  const { classes, categories } = props;
  const styles = useStyles({ classes });

  const getIcon = (value) => {
    switch (value) {
      case 'compute':
      case 'storage':
        return 'STORAGE';
      case 'dbms':
        return 'DBMS';
      case 'isoft':
        return 'ISOFT';
      case 'as':
        return 'AS';
      case 'staff':
        return 'STAFF';
      case 'bu':
        return 'BU';
      default:
        return 'COD';
    }
  };

  return (
    <div className={styles.root}>
      {categories.map((el) => (
        <div key={el.value} className={styles.category}>
          <div
            style={{
              background: el.color,
            }}
            className={styles.icon}
            data-testid='categoryIcon'>
            <Icon
              icon={getIcon(el.value)}
              size={18}
              strokeColor='transparent'
            />
          </div>
          <span className={styles.label}>{el.label}</span>
        </div>
      ))}
    </div>
  );
};

const useStyles = makeStyles(
  (theme) => ({
    category: {
      display: 'flex',
      marginRight: 16.5,
      margin: 3.5,
    },
    root: {
      display: 'flex',
      width: '100%',
      flexWrap: 'wrap',
      padding: '0 10px',
      left: 0,
      right: 0,
      height: 'fit-content',
    },
    icon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 18,
      width: 18,
      borderRadius: 4,
      backgroundColor: theme.colorsTheme.categoryIconBackgroundDefault,
      transition: 'all .2s ease-in-out',
      marginRight: 20,
      '& > div': {
        height: 13,
      },
    },
    label: {
      fontSize: 13,
      lineHeight: '18px',
    },
  }),
  {
    index: 1,
    name: 'StackedLegend',
  }
);

export default StackedLegend;
