import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { Icon } from 'components';
import { ModelStructure } from './modelStructure';
import Word from '../../svg/Word';
import { getIcon } from '../../ui/Category/Сategory';

export const DescriptionModel = React.memo((props) => {
  const classes = useStyles(props);
  const {
    block,
    label,
    description,
    costCategories,
    metrics,
    resourceStructure,
  } = props;
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>
      <Grid container alignItems='center' justify='space-between'>
        <Grid item xs='auto'>
          Описание модели
        </Grid>
        <Grid item xs='auto'>
          <Icon
            onClick={() => setOpen(!open)}
            className={classNames(classes.icon, { active: open })}
            size={24}
          />
        </Grid>
      </Grid>
      <div className={classes.horizontalSeparator} />
      <CSSTransition
        in={open}
        classNames={{
          enter: classes.enter,
          enterActive: classes.enterActive,
          exit: classes.exit,
          exitActive: classes.exitActive,
        }}
        unmountOnExit
        timeout={222}>
        <Grid container>
          <Grid item className={classes.leftBlock} xs={4}>
            <div className={classes.otherText}>Расшифровка названия АС:</div>
            <span className={classes.mainText}>{label}</span>
            <div className={classes.otherText}>Блок:</div>
            <span className={classes.mainText}>{block}</span>
            <div className={classes.otherText}>
              {description || 'Описание отсутсвует'}
            </div>
            {metrics.map((metric, id) => (
              <Grid key={id} container className={classes.doc}>
                <Word />
                <Grid item className={classes.infoDoc}>
                  <div className={classes.otherText}>метрика:</div>
                  <Grid container alignItems='center'>
                    {metric.label}
                    <Icon
                      size={16}
                      className='icon'
                      icon='CIRCLE_INFO'
                      fillColor='transparent'
                      inline
                    />
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid item xs={1} className={classes.wrapSeparator}>
            <div className={classes.separator} />
          </Grid>
          <Grid item xs={7}>
            <ModelStructure {...resourceStructure} />
            <div className={classes.costAcc}>Учет расходов</div>
            <Grid
              container
              className={classes.doc}
              alignItems='center'
              spacing={2}>
              {costCategories?.map((category, id) => (
                <Grid item key={id} xs='auto'>
                  <Grid container className={classes.doc} alignItems='center'>
                    <div
                      className={classes.iconCat}
                      style={{ backgroundColor: category.color }}>
                      <Icon
                        icon={getIcon(category.value)}
                        size={18}
                        strokeColor='transparent'
                      />
                    </div>
                    <div className={classes.labelCat}>{category.label}</div>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </CSSTransition>
    </div>
  );
});

const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      root: {
        marginTop: 32,
        color: colorsTheme.nodeColor,
      },
      icon: {
        transform: 'rotate(45deg)',
        color: colorsTheme.disabled,
        cursor: 'pointer',
        transition: 'opacity .3s, transform .222s, color .222s',

        '&:hover': {
          opacity: 0.5,
        },

        '&.active': {
          transform: 'rotate(90deg)',
          color: colorsTheme.nodeColor,
        },
      },
      horizontalSeparator: {
        marginTop: 24,
        width: '100%',
        height: 1,
        backgroundColor: colorsTheme.greenFade,
      },
      wrapSeparator: {
        display: 'flex',
        justifyContent: 'center',
      },
      separator: {
        width: 1,
        height: '100%',
        backgroundColor: colorsTheme.greenFade,
      },
      leftBlock: {
        maxWidth: 440,
        marginTop: 48,
        width: '100%',
      },
      otherText: {
        fontSize: 13,
        color: colorsTheme.disabled,
        lineHeight: '16px',

        '&:not(:first-child)': {
          marginTop: 40,
        },
      },
      mainText: {
        lineHeight: '24px',
        fontSize: 18,
      },
      costAcc: {
        fontSize: 20,
        lineHeight: '24px',
        marginBottom: 28,
        marginTop: 56,
      },
      doc: {
        marginTop: 16,
      },

      iconCat: () => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 33,
        width: 33,
        borderRadius: 4,
        transition: 'all .2s ease-in-out',
      }),

      labelCat: {
        marginLeft: 16,
      },

      infoDoc: {
        fontSize: 14,
        lineHeight: '16px',
        marginBottom: 8,
        marginLeft: 8,
        '& .icon': {
          marginLeft: 8,
          color: colorsTheme.disabled,
        },
      },
      enter: {
        opacity: 0,
        transform: 'scaleY(0)',
        height: 0,
        transformOrigin: 'top',
        padding: 0,
      },
      enterActive: {
        transform: 'scaleY(1)',
        height: 'auto',
        minHeight: 0,
        opacity: 1,
        transformOrigin: 'top',
        overflow: 'hidden',
        transition: 'all .222s ease-in',
      },
      exit: {
        transform: 'scaleY(1)',
        height: 'auto',
        transformOrigin: 'top',
        opacity: 1,
      },
      exitActive: {
        opacity: 0,
        transform: 'scaleY(0)',
        transition: 'all .222s ease-in',
      },
    };
  },
  {
    name: 'DescriptionModel',
    index: 1,
  }
);

DescriptionModel.displayName = 'DescriptionModel';
