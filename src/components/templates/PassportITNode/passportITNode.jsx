import React, { useRef, useState } from 'react';
import { Icon, Tag } from 'components';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuElement from '@material-ui/core/MenuItem';
import classNames from 'classnames';
import {
  NodeProvides,
  NodeInfo,
  NodeConsumes,
  DirectExpenses,
  Maximize,
} from 'containers';
import MenuIcon from '../../svg/MenuIcon';

/**
 * Компонент паспорт Узла
 * @component
 * @public
 */
export const PassportITNode = React.memo((props) => {
  const { resources } = props;

  /** Состояние открытой панели */
  const [expanded, setExpanded] = useState(null);
  /** Состояние открытого меню */
  const [menuIndex, setMenuIndex] = useState(null);
  /** Состояние полноэкранного режима */
  const [maximize, setMaximize] = useState(null);
  /** Контейнер для портала */
  const container = document.getElementById('portal-maximize');
  /** Реф кнопки More */
  const refDot = useRef([]);

  /** Список панелей в паспорте узла */
  const infoNodePanels = [
    {
      title: 'Узел предоставляет',
      details: <NodeProvides.MinimizeNodeProvides />,
      price: resources?.provideValueFormat || 0,
    },
    {
      title: 'Узел потребляет',
      details: <NodeConsumes.MinimizeNodeConsumes />,
      price: resources?.tariffValueFormat || 0,
    },
    {
      title: 'Прямые расходы на узел',
      details: <DirectExpenses />,
      price: resources?.formatValue.direct || 0,
    },
  ];

  /**
   * Переключатель панелей
   * @param {Number} index индекс панели
   * @param {Boolean} isExpanded состояние панели
   */
  const handleChange = (index) => (_, isExpanded) => {
    if (maximize !== null) {
      return;
    }
    setExpanded(isExpanded ? index : null);
  };

  /**
   * Переключатель полноэкранного режима
   * @param {Number} index индекс панели
   * @param {SyntheticEvent} event `SyntheticEvent`
   */
  const handleClickMaximize = (event, index) => {
    event.stopPropagation();
    setMaximize(index === maximize ? null : index);
    setExpanded(null);
  };

  /**
   * Переключатель меню
   * @param {Number} index индекс панели
   * @param {SyntheticEvent} event `SyntheticEvent`
   */
  const handleClick = (event, index) => {
    event.stopPropagation();
    setMenuIndex(index);
  };

  /** Закрытие полноэкранного режима */
  const handleClose = () => {
    setMenuIndex(null);
  };

  /** Инициализация стилей */
  const classes = useStyles();

  /** Рендер компонента */
  return (
    <>
      <div className={classes.root}>
        <NodeInfo />

        {resources.group && (
          <>
            <div className={classes.tagTitle}>Список узлов</div>
            <div className={classes.tagList}>
              {resources.groupChildren.map((children, index) => (
                <div key={index} className={classes.containerTag}>
                  <Tag label={children.label} color={children.color} />
                </div>
              ))}
            </div>
          </>
        )}

        {!resources.group &&
          infoNodePanels.map((panel, index) => (
            <React.Fragment key={index}>
              <ExpansionPanel
                square
                expanded={expanded === index}
                classes={{
                  root: classes.rootPanel,
                }}
                onChange={handleChange(index)}>
                <ExpansionPanelSummary
                  expandIcon={<MenuIcon />}
                  aria-controls='panel1a-content'
                  classes={{
                    root: classes.rootSummary,
                    expanded: classes.expandedSummary,
                    expandIcon: classNames({
                      [classes.maximize]: maximize === index,
                    }),
                  }}
                  id='panel1a-header'>
                  {/* <Icon
                    icon='MORE_VERTICAL'
                    size={24}
                    ref={(ref) => (refDot.current[index] = ref)}
                    onClick={(event) => handleClick(event, index)}
                    className={classNames(classes.icon, classes.colorIconPanel)}
                  /> */}

                  <div className={classes.title}>
                    <span>{panel.title}</span>
                    <span className='price'>{panel.price}</span>
                  </div>

                  {index !== 2 && (
                    <Icon
                      icon={maximize !== index ? 'MAXIMIZE' : 'MINIMIZE'}
                      size={18}
                      title={
                        maximize !== index
                          ? 'Перейти в полноэкранный режим'
                          : 'Выйти из полноэкранного режима'
                      }
                      className={classNames(
                        classes.iconMaximize,
                        classes.colorIconPanel,
                        { active: maximize === index }
                      )}
                      onClick={(event) => handleClickMaximize(event, index)}
                    />
                  )}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails classes={{ root: classes.rootDetails }}>
                  {expanded === index && panel.details}
                </ExpansionPanelDetails>
              </ExpansionPanel>

              <Menu
                keepMounted
                anchorEl={refDot.current[index]}
                onClose={handleClose}
                classes={{ paper: classes.paper }}
                open={index === menuIndex}>
                <MenuElement classes={{ root: classes.menuItem }}>
                  <Icon
                    icon='EDIT_FORM'
                    size={20}
                    fillColor='transparent'
                    className={classes.iconMenuItem}
                  />
                  Редактировать
                </MenuElement>
                <MenuElement classes={{ root: classes.menuItem }}>
                  <Icon
                    icon='CIRCLE_MESSAGE_BOX'
                    size={20}
                    fillColor='transparent'
                    className={classes.iconMenuItem}
                  />
                  Комментировать
                </MenuElement>
              </Menu>
            </React.Fragment>
          ))}
      </div>

      <Maximize
        onClose={() => setMaximize(null)}
        stateIn={maximize !== null}
        container={container}>
        {maximize === 0 && <NodeProvides.MaximizeNodeProvides />}
        {maximize === 1 && <NodeConsumes.MaximizeNodeConsumes />}
      </Maximize>
    </>
  );
});

/** Назначаем displayName */
PassportITNode.displayName = 'PassportITNode';

PassportITNode.propTypes = {
  resources: PropTypes.object.isRequired,
};

/** Основные стили */
const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;
    return {
      root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      },

      paper: {
        background: colorsTheme.layer,
        marginTop: 55,
      },

      menuItem: {
        color: colorsTheme.grey,
        fontSize: 14,
        padding: '15px 50px 15px 20px',
        '&:not(:last-child)': {
          borderBottom: `1px solid  ${colorsTheme.separator}`,
        },
        transition: 'all .3s ease-in-out',
        '&:hover': {
          color: colorsTheme.nodeColor,

          '& svg': {
            stroke: colorsTheme.nodeColor,
          },
        },
      },

      icon: {
        cursor: 'pointer',
        color: colorsTheme.grey,
        marginRight: 24,
      },

      iconMenuItem: {
        marginRight: 16,
      },

      iconMaximize: {
        margin: 'auto',
        marginRight: 15,
        '&.active': {
          color: colorsTheme.nodeColor,
        },
      },

      colorIconPanel: {
        color: colorsTheme.grey,
        transition: 'all .15s ease-in-out',

        '&:hover': {
          color: colorsTheme.nodeColor,
        },
      },

      rootPanel: {
        '&.Mui-expanded': {
          marginTop: 0,

          '&::before': {
            opacity: 1,
          },
        },
      },

      maximize: {
        transform: 'rotate(270deg)',

        '& path': {
          fill: colorsTheme.nodeColor,
        },
      },

      rootSummary: {
        height: 68,
        fontSize: 14,
        backgroundColor: colorsTheme.nodeBackground,

        '&::before': {
          content: '""',
          width: 5,
          height: '100%',
          backgroundColor: colorsTheme.selectedPanel,
          left: 0,
          position: 'absolute',
          opacity: 0,
          transition: 'all .15s ease-in-out',
        },

        '&.Mui-expanded': {
          backgroundColor: colorsTheme.nodeBackground,
          color: colorsTheme.nodeColor,

          '&::before': {
            opacity: 1,
          },
        },
      },

      title: {
        display: 'flex',
        flexDirection: 'column',

        '& span': {
          lineHeight: '18px',

          '&.price': {
            fontSize: 12,
            color: colorsTheme.nodeColor,
          },
        },
      },

      rootDetails: {
        display: 'flex',
        flexDirection: 'column',
        color: colorsTheme.grey,
        flexWrap: 'nowrap',
      },

      tagList: {
        display: 'flex',
        aliginItems: 'center',
        flexWrap: 'wrap',
        margin: '0 -4px',
        padding: '0 16px',
        marginBottom: 16,
      },

      tagTitle: {
        color: colorsTheme.grey,
        fontSize: 16,
        marginLeft: 16,
        marginBottom: 16,
        marginTop: 8,
      },

      containerTag: {
        padding: '4px',
      },
    };
  },
  { index: 2, name: 'PassportITNode' }
);
