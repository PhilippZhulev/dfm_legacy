import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 * Компонент "Вкладки"
 * @param classes - стили
 * @param tabs - массив объектов с информацией о вкладках
 * @param current - код текущей вкладки
 * @param counterViewed - показывать ли счетчик
 * @param onChange - колбэк смены вкладки
 * @constructor
 */

const Tabs = (props) => {
  const { classes, tabs, current, counterViewed, onChange } = props;

  const styles = useStyles(classes);

  return (
    <>
      <div className={styles.tabs}>
        {tabs.map((item, ind) => (
          <div
            key={ind}
            onClick={() => onChange(item.id)}
            className={classNames({
              [styles.tab]: true,
              active: item.id === current,
            })}>
            <div className={classNames(styles.label, 'tabLabel')}>
              {item.label}
            </div>
            {counterViewed && (
              <div className={classNames(styles.counter, 'tabCounter')}>
                {item.counter}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
Tabs.displayName = 'Tabs';

Tabs.propTypes = {
  classes: PropTypes.object,
  tabs: PropTypes.array,
  current: PropTypes.string,
  counterViewed: PropTypes.bool,
  onChange: PropTypes.func,
};

Tabs.defaultProps = {
  classes: {},
  tabs: [],
  current: '',
  counterViewed: true,
  onChange: null,
};

const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      tabs: {
        width: '100%',
        borderBottom: '1px solid rgba(112, 126, 138, 0.24)',
        display: 'flex',
        position: 'relative',
        zIndex: 20,
        margin: '30px 30px 0',
      },
      tab: {
        display: 'inline-flex',
        padding: '22px 38px',
        cursor: 'pointer',
        '&.active': {
          borderBottom: '2px solid #448EF2',
          color: '#fff',

          '& .tabLabel': {
            color: '#fff',
          },

          '& .tabCounter': {
            background: 'rgba(68,142,242,0.12)',
            color: '#448EF2',
          },
        },
      },
      label: {
        fontSize: 16,
        lineHeight: '24px',
        fontWeight: 400,
        color: '#869AAC',
      },
      counter: {
        fontSize: 10,
        lineHeight: '16px',
        fontWeight: 700,
        background: 'rgb(47,59,82)',
        borderRadius: 4,
        padding: 5,
        marginLeft: 8,
        minWidth: 25,
        textAlign: 'center',
        color: '#869AAC',
      },
    };
  },
  { index: 1 }
);

export default Tabs;
