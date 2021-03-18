import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Return from '../../svg/Return';

const DateSlider = (props) => {
  const { currentDate, dates, numberShown, classes, onChange } = props;
  const styles = useStyles({ classes });

  const getSubarray = (dateArray, current = 0) => {
    let first = 0;
    // Если слева от текущего года хватает элементов, чтобы взять подмассив размера numberShown
    if (current - Math.floor(numberShown / 2) > 0) {
      first = current - Math.floor(numberShown / 2);
    }
    let last = dates.length - 1;
    // Если справа от текущего года хватает элементов, чтобы взять подмассив размера numberShown
    if (current + Math.floor(numberShown / 2) < dates.length - 1) {
      last = current + Math.floor(numberShown / 2);
    }
    if (dateArray.length > numberShown) {
      return dates.slice(first, last + 1);
    }
    return dateArray;
  };

  const searchCurrentDateIndex = () => {
    let current = -1;
    for (let i = 0; i < dates.length; i++) {
      if (dates[i].date === currentDate) {
        current = i;
      }
    }

    // Если нужной даты не нашлось

    if (current === -1) {
      return Math.floor(dates.length / 2);
    }

    // если вокруг текущей даты число дат меньше числа отображаемых дат, а всего их больше
    if (
      getSubarray(dates, current).length < numberShown &&
      dates.length > numberShown
    ) {
      // в начале
      if (current < Math.floor(dates.length / 2)) {
        return Math.floor(numberShown / 2);
      }
      // в конце
      return dates.length - 1 - Math.floor(numberShown / 2);
    }
    // иначе выдаём, что нашли
    return current;
  };

  const [current, setCurrent] = useState(searchCurrentDateIndex());

  useEffect(() => {
    onChange(getSubarray(dates, current));
  }, [current, dates]);

  const handleNext = () => {
    if (current + 1 + Math.floor(numberShown / 2) < dates.length) {
      setCurrent(current + 1);
    }
  };

  const handlePrev = () => {
    if (current - 1 - Math.floor(numberShown / 2) >= 0) {
      setCurrent(current - 1);
    }
  };

  return (
    <div className={styles.root}>
      {numberShown < dates.length && current > 1 && (
        <div className={styles.prev} key='prev' onClick={handlePrev}>
          <Return />
        </div>
      )}
      {getSubarray(dates, current).map((el, index) => {
        if (index > 0) {
          return (
            <React.Fragment key={el.date}>
              <div className={styles.emptySpace} />
              <div className={styles.date}>{el.date}</div>
            </React.Fragment>
          );
        }
        return (
          <div
            key={el.date}
            className={classNames(styles.date, {
              [styles.singleDate]: dates.length === 1,
            })}>
            {el.date}
          </div>
        );
      })}
      {numberShown < dates.length && current < dates.length - 2 && (
        <div className={styles.next} key='next' onClick={handleNext}>
          <Return />
        </div>
      )}
    </div>
  );
};

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'flex',
      width: '100%',
      color: theme.colorsTheme.grey,
    },
    date: {
      textAlign: 'center',
    },
    emptySpace: {
      flexGrow: 1,
    },
    prev: {
      marginRight: 20,
      cursor: 'pointer',
      '&:hover': {
        '& path': {
          fill: theme.colorsTheme.text,
          transition: 'fill 300ms ease-in-out',
        },
      },
    },
    next: {
      marginLeft: 20,
      transform: 'rotate(180deg)',
      cursor: 'pointer',
      '&:hover': {
        '& path': {
          fill: theme.colorsTheme.text,
          transition: 'fill 300ms ease-in-out',
        },
      },
    },
    singleDate: {
      flexGrow: 1,
    },
  }),
  {
    index: 1,
    name: 'DateSlider',
  }
);

export default DateSlider;
