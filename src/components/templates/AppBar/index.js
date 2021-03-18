import React, { useState, useCallback, useEffect } from 'react';
import {
  HeaderTop,
  SearchFieldGraph,
  SkeletonSeachAppBarModel,
  LinkButton,
  Margin,
} from 'components';
import {
  AccessControl,
  MainHeaderContent,
  MainHeaderContentCenter,
  MainHeaderContentBottom,
} from 'containers';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { handleError, permitRule } from 'helpers';
import SkeletonHeaderCenter from '../../skeletons/SkeletonHeaderCenter';
import SkeletonHeaderBottom from '../../skeletons/SkeletonHeaderBottom';
import { virualStore } from '../../../virtualStore';

/**
 * AppBar
 * @component
 * @public
 */
function AppBar({
  userData,
  modelSearch,
  modelLoad,
  dispatchModal,
  resource,
  locked,
  permissions,
  dispatchModelClearCache,
  dispatchModelListReload,
}) {
  const history = useHistory();
  const location = useLocation();

  const [modelSearchValue, setModelSearchValue] = useState('');

  /** ANCHOR: Получить classes */
  const styles = useStyles();

  /** ANCHOR: Очистка поиска если не экран моделей */
  useEffect((value) => {
    if (location.pathname !== '/dfm_it/model') {
      _handleSearch('');
    }
  });

  /** ANCHOR: Ввод в поле поиска с задержкой */
  const searchDebound = useCallback(
    (value) => {
      window.searchCount = setTimeout(() => {
        modelSearch(value);
      }, 300);
    },
    [modelSearchValue]
  );

  /**
   * ANCHOR: Обновление состояния поиска
   * @param  {string} value
   * @public
   */
  const _handleSearch = async (value) => {
    try {
      clearTimeout(window.searchCount);
      setModelSearchValue(value);
      searchDebound(value);
    } catch (e) {
      handleError('@AppBar/_handleSearch', e);
    }
  };

  /**
   * Открыть модальное окно ведения системных справочников
   * @public
   */
  const _handleOpenCatalogs = async (type) => {
    try {
      dispatchModal({
        type,
        state: true,
        title: '',
        buttonText: 'Создать',
        text: '',
        hideButton: true,
        cross: true,
        done: () => {},
      });
    } catch (e) {
      handleError('@AppBar/_handleOpenCatalogs', e);
    }
  };

  /**
   * Отработать возврат к списку моделей
   * @private
   */
  const _handleReturn = () => {
    dispatchModelClearCache({});

    dispatchModelListReload({
      params:
        localStorage.getItem('model') !== null
          ? { model: JSON.parse(localStorage.getItem('model')) }
          : {},
    });

    virualStore.model = {};
    virualStore._v = 0;

    history.push('/dfm_it/model');
  };

  return (
    <div>
      <HeaderTop
        logoMain={history.location.pathname === '/dfm_it'}
        userData={userData}>
        {history.location.pathname === '/dfm_it/model' ? (
          <>
            <SkeletonSeachAppBarModel load={!modelLoad}>
              <SearchFieldGraph
                onChange={(event) => _handleSearch(event.target.value)}
                width='583px'
                value={modelSearchValue}
                placeholder='Поиск по моделям...'
                classes={{ root: styles.inputRoot, input: styles.input }}
              />
            </SkeletonSeachAppBarModel>
            {modelLoad && (
              <>
                <AccessControl on={'system'}>
                  <Margin data={'auto 0 auto auto'}>
                    <LinkButton
                      text={'Роли и полномочия'}
                      onClick={() =>
                        history.push('./model/modal/roles-and-authorities')
                      }
                      size={14}
                      width={200}
                      clicked
                    />
                  </Margin>
                </AccessControl>

                <AccessControl on={'business'}>
                  <Margin data={'auto 0 auto auto'}>
                    <LinkButton
                      text={'Бизнес справочники'}
                      onClick={() => _handleOpenCatalogs('businessCatalogs')}
                      size={14}
                      width={200}
                      clicked
                    />
                  </Margin>
                </AccessControl>
              </>
            )}
          </>
        ) : null}
        {history.location.pathname === '/dfm_it' ? (
          <MainHeaderContent
            userData={userData}
            onReturn={() => _handleReturn()}
          />
        ) : null}
      </HeaderTop>

      {history.location.pathname === '/dfm_it' &&
      // locked &&
      permitRule(permissions, ['update']) ? (
        <>
          <SkeletonHeaderCenter resource={resource}>
            <MainHeaderContentCenter showed={locked} />
          </SkeletonHeaderCenter>
        </>
      ) : null}
      {history.location.pathname === '/dfm_it' ? (
        <>
          <SkeletonHeaderBottom resource={resource}>
            <MainHeaderContentBottom onReturn={() => _handleReturn()} />
          </SkeletonHeaderBottom>
        </>
      ) : null}
    </div>
  );
}

AppBar.propTypes = {
  userData: PropTypes.object,
  permissions: PropTypes.object,
  modelLoad: PropTypes.bool,
  locked: PropTypes.bool,
  resource: PropTypes.bool,
  dispatchModelClearCache: PropTypes.func.isRequired,
  dispatchModelListReload: PropTypes.func.isRequired,
  modelSearch: PropTypes.func,
  dispatchModal: PropTypes.func,
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    input: { borderColor: 'rgba(0,0,0,0)' },
    inputRoot: {
      margin: 'auto 0',
      marginLeft: 46,
    },
  }),
  {
    name: 'AppBar',
    index: 1,
  }
);

export default AppBar;
