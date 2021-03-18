import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TabButton } from 'components';
import { Categories } from './Categories/categories';
import { SubCategories } from './SubCategories/subCategories';
import { Metrics } from './Metrics/metrics';
import { Periods } from './Periods/periods';
import { Parameters } from './Parameters/parameters';

const catalogs = [
  { value: 'categories', label: 'Категории', view: <Categories /> },
  { value: 'subCategories', label: 'Подкатегории', view: <SubCategories /> },
  { value: 'metrics', label: 'Метрики', view: <Metrics /> },
  { value: 'periods', label: 'Периоды', view: <Periods /> },
  { value: 'parameters', label: 'Параметры', view: <Parameters /> },
];

export const BusinessCatalogs = (props) => {
  const [currentCatalog, setCurrentCatalog] = useState('categories');

  const styles = useStyles(props);

  return (
    <div className={styles.root}>
      <div className={styles.catalogMenu}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>Бизнес справочники</div>
        </div>
        {catalogs.map((item) => (
          <TabButton
            key={item.value}
            label={item.label}
            selected={item.value === currentCatalog}
            classes={{ label: styles.buttonLabel }}
            onClick={() => setCurrentCatalog(item.value)}
          />
        ))}
      </div>
      <div className={styles.workspace}>
        {catalogs.map((cat) => (
          <React.Fragment key={cat.value}>
            {currentCatalog === cat.value && cat.view}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const useStyles = makeStyles(
  (theme) => ({
    root: {
      height: 'fit-content',
      display: 'flex',
      borderRadius: 8,
      zIndex: 999,
      margin: -43,
      overflow: 'hidden',
    },
    catalogMenu: {
      width: 300,
      background: theme.colorsTheme.nodeBackground,
      height: 'calc(100vh - 70px)',
    },
    workspace: {
      width: 'calc(100% - 300px)',
      height: 'calc(100vh- 70px)',
      background: theme.colorsTheme.categoryBackground,
      padding: '0 32px',
    },
    titleWrapper: {
      display: 'flex',
      height: 95,
    },
    title: {
      margin: 'auto 0',
      marginLeft: 34,
      color: theme.colorsTheme.text,
      fontSize: 18,
      lineHeight: '25px',
      width: 'max-content',
    },
    buttonLabel: {
      fontSize: 14,
    },
  }),
  { name: 'BusinessCatalogs' }
);
