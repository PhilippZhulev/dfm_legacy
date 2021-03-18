import React from 'react';
import { ConsumedResources } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

export const ModelStructure = React.memo((props) => {
  const classes = useStyles(props);

  const { otherNodes, topNodes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.title}>Топ 5 узлов по ТСО</div>
      <Grid container spacing={2}>
        {topNodes.map((node, id) => (
          <Grid key={id} item xs={4}>
            <ConsumedResources
              label={node.resourceName}
              value={node.fullTCO}
              noClick
              color={node.category.color}
              classes={{
                root: classes.consumedResource,
              }}
            />
          </Grid>
        ))}
        {otherNodes.countNodes && (
          <Grid item xs={4}>
            <ConsumedResources
              label={`${otherNodes.countNodes} узла`}
              value={otherNodes.sumTco}
              noClick
              color='transparent'
              classes={{
                root: classes.allConsumedResource,
              }}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
});

const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      root: { paddingRight: 24, marginTop: 62 },

      title: {
        fontSize: 20,
        lineHeight: '24px',
        marginBottom: 32,
      },

      consumedResource: {
        background: '#242E42',
      },

      allConsumedResource: {
        borderColor: 'transparent',
      },
    };
  },
  {
    name: 'ModelStructure',
    index: 1,
  }
);

ModelStructure.displayName = 'ModelStructure';
