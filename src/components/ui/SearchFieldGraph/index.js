/*
 * desc: контролл Поле ввода
 * Copyright(c) Heavy mouse team.
 */

// Зависимости
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import GraphSearch from '../../svg/GraphSearch';

/**
 * Поля ввода экрана графа
 * @component
 * @public
 */
function SearchFieldGraph({
  width,
  placeholder,
  onChange,
  type,
  value,
  icon,
  focusRef,
  classes,
}) {
  // Получить classes
  const styles = useStyles({ classes });

  return (
    /* Обертка */
    <div
      data-testid='root'
      style={width ? { width } : {}}
      className={styles.root}>
      {/*
       * Поле ввода
       * readOnly + onFocus => remove attr readOnly
       * хак для отключения автозаполнения
       */}
      <input
        data-testid='input'
        placeholder={placeholder}
        readOnly
        onFocus={(e) => e.target.removeAttribute('readonly')}
        onChange={onChange}
        type={type}
        value={value}
        className={styles.input}
        ref={focusRef || null}
      />
      <div className={styles.icon}>{!icon ? <GraphSearch /> : icon}</div>
    </div>
  );
}

SearchFieldGraph.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.array,
  focusRef: PropTypes.object,
  classes: PropTypes.object,
};

SearchFieldGraph.defaultProps = {
  placeholder: '',
  type: 'text',
  width: 100,
};

// Приватные стили
const useStyles = makeStyles((theme) => ({ ...theme.searchFieldGraph }));

export default SearchFieldGraph;
