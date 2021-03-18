import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SearchFieldGraph, TribeButton } from 'components';
import Scrollbar from 'react-scrollbars-custom';
import PropTypes from 'prop-types';
import Star from '../../svg/Star';

/**
 * Мешю трайбов
 * @component
 * @public
 */
function TribesMenu({ classes, setTribe, onClickTribe, tribe, blockDict }) {
  const [search, setSearch] = useState('');

  /** ANCHOR: Получить classes */
  const styles = useStyles({ classes });

  return (
    <div className={styles.root}>
      <SearchFieldGraph
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        width='100%'
        value={search}
        placeholder='Поиск по трайбам...'
        classes={{
          root: styles.inputRoot,
          input: styles.input,
        }}
      />

      <TribeButton
        label='Все трайбы'
        onClick={() => {
          setTribe('all');
          onClickTribe();
        }}
        selected={tribe === 'all'}
      />

      <TribeButton
        label='Избранные модели'
        onClick={() => {
          setTribe('fav');
          onClickTribe();
        }}
        selected={tribe === 'fav'}
        color='gold'>
        <Star />
      </TribeButton>

      <Scrollbar
        trackYProps={{
          style: {
            width: 4,
            right: -20,
          },
        }}
        thumbYProps={{
          style: {
            background: 'rgba(31, 142, 250, 0.4)',
            width: 4,
            borderRadius: 2,
          },
        }}
        style={{
          height: 'calc(100% - 320px)',
          marginTop: 34,
        }}>
        <div className={styles.groupsBodyWrapper}>
          {blockDict
            ? blockDict.map((block) => (
                <div key={block.id}>
                  <div className={styles.blockTitle}>{block.label}</div>
                  <div className={styles.tribes}>
                    {block.tribes
                      .filter((item) =>
                        item.label.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((item) => (
                        <TribeButton
                          key={item.id}
                          label={item.label}
                          onClick={() => {
                            setTribe(item.label);
                            onClickTribe();
                          }}
                          selected={tribe === item.label}
                        />
                      ))}
                  </div>
                </div>
              ))
            : null}
        </div>
      </Scrollbar>
    </div>
  );
}

TribesMenu.propTypes = {
  classes: PropTypes.object,
  setTribe: PropTypes.func,
  tribe: PropTypes.string,
  onClickTribe: PropTypes.func,
  blockDict: PropTypes.array,
};

TribesMenu.defaultProps = {
  classes: {},
  blockDict: [],
};

const useStyles = makeStyles(
  (theme) => ({
    root: {
      width: 304,
      minWidth: 304,
      position: 'absolute',
      padding: '52px 32px 0px 32px',
      paddingBottom: 0,
      height: '100%',
      top: 82,
      backgroundColor: theme.colorsTheme.tribeMenuBackground,
      zIndex: 2,
      boxSizing: 'border-box',
    },
    title: {
      color: theme.colorsTheme.text,
      fontSize: 20,
      marginBottom: 43,
    },
    input: { borderColor: 'rgba(0,0,0,0)' },
    inputRoot: { marginBottom: 23 },
    blockTitle: {
      color: theme.colorsTheme.grey,
      fontSize: 16,
      marginBottom: 24,
    },
    tribes: {},
  }),
  {
    name: 'TribesMenu',
  }
);

export default TribesMenu;
