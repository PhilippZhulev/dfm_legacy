import React, { useState } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { makeStyles } from '@material-ui/core/styles';
import Scrollbar from 'react-scrollbars-custom';
import {
  PassportITNode,
  GraphSettings,
  ReferenceBook,
  WhatIf,
} from 'containers';
import { LocalReport, Report } from 'components';
import PanelNode from '../../svg/PanelNode';
import MenuIcon from '../../svg/MenuIcon';
import PanelGraph from '../../svg/PanelGraph';
import PanelBook from '../../svg/PanelBook';
import LocalReportIcon from '../../svg/LocalReportIcon';
import WhatIfIcon from '../../svg/WhatIf';
import { virualStore } from '../../../virtualStore';

/**
 * Компонент левой боковой панели
 * страницы модель
 * @component
 * @public
 */
export const LeftPanelModel = (props) => {
  /** ANCHOR: Состояние открытой панели */
  const [expanded, setExpanded] = useState(0);

  /** ANCHOR: Список панелей */
  const panels = [
    {
      title: 'Паспорт IT узла',
      icon: <PanelNode />,
      details: <PassportITNode />,
      colorActive: '#1F8EFA',
      features: true,
    },
    {
      title: 'Граф связей',
      icon: <PanelGraph />,
      details: <GraphSettings />,
      colorActive: '#FFAB4F',
    },
    {
      title: 'Справочники',
      icon: <PanelBook />,
      details: <ReferenceBook />,
      colorActive: '#843FA0',
    },
    {
      title: 'Отчеты',
      icon: <LocalReportIcon />,
      details: <LocalReport />,
      colorActive: 'rgb(236, 64, 122)',
    },
    {
      title: 'Модели What-if',
      icon: <WhatIfIcon />,
      details: <WhatIf />,
      colorActive: '#5DAAB4',
    },
  ];

  /** ANCHOR: Инициализация стилей */
  const classes = styles(props);

  /**
   * ANCHOR: Переключатель панелей
   * @param {Number} index индекс панели
   * @param {SyntheticEvent} event `SyntheticEvent`
   * @param {Boolean} isExpanded состояние панели
   */
  const handleChange = (index) => (event, isExpanded) => {
    setExpanded(isExpanded ? index : null);
  };

  /** Рендер */
  return (
    <div className={classes.root}>
      <Scrollbar
        id='scrollbar-left-panel'
        wrapperProps={{ style: { right: 0 } }}
        trackYProps={{ style: { width: 4, right: -15 } }}
        thumbYProps={{
          style: {
            background: 'rgba(31, 142, 250, 0.4)',
            width: 4,
            borderRadius: 2,
          },
        }}
        style={{ height: '100%' }}>
        {panels.map((panel, index) => (
          <ExpansionPanel
            key={index}
            square
            expanded={expanded === index}
            classes={{ root: classes.rootPanel }}
            onChange={handleChange(index)}>
            <ExpansionPanelSummary
              expandIcon={<MenuIcon />}
              aria-controls='panel1a-content'
              classes={{ root: classes.rootSummary }}
              style={{
                background: expanded === index ? panel.colorActive : '',
              }}
              id='panel1a-header'>
              <div className={classes.icon}>{panel.icon}</div> {panel.title}
              {panel.features && props.data.value ? (
                <Report
                  key={0}
                  model={virualStore.model}
                  resource={props.data.value}
                  period={props.data.period}
                />
              ) : null}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails classes={{ root: classes.detailsRoot }}>
              {panel.details}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </Scrollbar>
    </div>
  );
};

/** Основные стили */
const styles = makeStyles(
  (theme) => ({
    root: {
      width: 365,
      height: '100%',

      '& > .ScrollbarsCustom > .ScrollbarsCustom-Wrapper': {
        width: '365px!important',
        '& > .ScrollbarsCustom-Scroller > .ScrollbarsCustom-Content': {
          width: '365px!important',
        },
      },
    },
    icon: {
      marginRight: 24,
      width: 20,
      textAlign: 'center',
    },

    rootPanel: {
      marginBottom: 8,

      '&::before': {
        opacity: 0,
      },
    },

    rootSummary: {
      '&.Mui-expanded *': {
        fill: theme.colorsTheme.nodeColor,
        color: theme.colorsTheme.nodeColor,
      },
    },
    detailsRoot: {
      padding: 0,
    },
  }),
  { name: 'LeftPanelModel', index: 1 }
);
