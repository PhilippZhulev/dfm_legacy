import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '../../svg/MenuIcon';

const padding = '0 20px 20px 20px';

/**
 * Настройки графа (производительность)
 * @component
 * @public
 */
const GraphSettings = React.memo(
  ({ classes, graphSettings, dispatchGraphSettings }) => {
    const styles = useStyles({ classes });

    const maxVisual =
      Object.values(graphSettings.settings).filter(
        (item) =>
          item !== 'NodeMinSize' && item !== 'NodeMaxSize' && item === true
      ).length > 0;

    /**
     * ANCHOR: Изменение zoom
     * @param {string} name
     * @param {string} value
     * @public
     */
    const _handleGraphSettings = (name, value) => {
      dispatchGraphSettings({
        settings: { ...graphSettings.settings, [name]: value },
        ver: ++graphSettings.ver,
      });
    };

    const _handleSetMaxVisual = (status) => {
      const newSettings = { ...graphSettings.settings };
      Object.keys(newSettings).map((index) => {
        if (
          Number.isNaN(Number(index)) &&
          index !== 'nodeMinSize' &&
          index !== 'nodeMaxSize'
        ) {
          newSettings[index] = status;
        }
        return index;
      });

      dispatchGraphSettings({
        settings: newSettings,
        ver: ++graphSettings.ver,
      });
    };

    return (
      <div>
        <ExpansionPanel square classes={{ root: styles.rootPanel }}>
          <ExpansionPanelSummary
            expandIcon={<MenuIcon />}
            aria-controls='panel1a-content'
            classes={{
              root: styles.rootSummary,
            }}
            id='panel1a-header'>
            <FormControlLabel
              onClick={(e) => e.stopPropagation()}
              control={
                <Switch
                  checked={maxVisual}
                  onChange={() => _handleSetMaxVisual(!maxVisual)}
                  value='groupNode'
                  color='primary'
                  classes={{
                    switchBase: styles.switchBase,
                    switchRoot: styles.switchRoot,
                  }}
                />
              }
              classes={{ label: styles.triggerLabel }}
              label='Макс.визуализация'
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <FormControlLabel
              control={
                <Switch
                  checked={graphSettings.settings.light}
                  onChange={(e) =>
                    _handleGraphSettings('light', e.target.checked)
                  }
                  value='groupNode'
                  color='primary'
                  classes={{
                    switchBase: styles.switchBase,
                    switchRoot: styles.switchRoot,
                  }}
                />
              }
              classes={{ label: styles.triggerLabel }}
              label='Динамичное освещение'
            />
            <FormControlLabel
              control={
                <Switch
                  checked={graphSettings.settings.SMAA}
                  onChange={(e) =>
                    _handleGraphSettings('SMAA', e.target.checked)
                  }
                  value='groupNode'
                  color='primary'
                  classes={{
                    switchBase: styles.switchBase,
                    switchRoot: styles.switchRoot,
                  }}
                />
              }
              classes={{ label: styles.triggerLabel }}
              label='SMAA'
            />
            <FormControlLabel
              control={
                <Switch
                  checked={graphSettings.settings.antialias}
                  onChange={(e) =>
                    _handleGraphSettings('antialias', e.target.checked)
                  }
                  value='groupNode'
                  color='primary'
                  classes={{
                    switchBase: styles.switchBase,
                    switchRoot: styles.switchRoot,
                  }}
                />
              }
              classes={{ label: styles.triggerLabel }}
              label='Сглаживание'
            />
            <FormControlLabel
              control={
                <Switch
                  checked={graphSettings.settings.fog}
                  onChange={(e) =>
                    _handleGraphSettings('fog', e.target.checked)
                  }
                  value='groupNode'
                  color='primary'
                  classes={{
                    switchBase: styles.switchBase,
                    switchRoot: styles.switchRoot,
                  }}
                />
              }
              classes={{ label: styles.triggerLabel }}
              label='Эффект тумана'
            />
            <FormControlLabel
              control={
                <Switch
                  checked={graphSettings.settings.bloom}
                  onChange={(e) =>
                    _handleGraphSettings('bloom', e.target.checked)
                  }
                  value='groupNode'
                  color='primary'
                  classes={{
                    switchBase: styles.switchBase,
                    switchRoot: styles.switchRoot,
                  }}
                />
              }
              classes={{ label: styles.triggerLabel }}
              label='Эффект bloom'
            />
            <FormControlLabel
              control={
                <Switch
                  checked={graphSettings.settings.orbit}
                  onChange={(e) =>
                    _handleGraphSettings('orbit', e.target.checked)
                  }
                  value='groupNode'
                  color='primary'
                  classes={{
                    switchBase: styles.switchBase,
                    switchRoot: styles.switchRoot,
                  }}
                />
              }
              classes={{ label: styles.triggerLabel }}
              label='Анимация орбит'
            />
            <FormControlLabel
              control={
                <Switch
                  checked={graphSettings.settings.stars}
                  onChange={(e) =>
                    _handleGraphSettings('stars', e.target.checked)
                  }
                  value='groupNode'
                  color='primary'
                  classes={{
                    switchBase: styles.switchBase,
                    switchRoot: styles.switchRoot,
                  }}
                />
              }
              classes={{ label: styles.triggerLabel }}
              label='Объемные звёзды'
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
);

GraphSettings.propTypes = {
  classes: PropTypes.object,
  graphSettings: PropTypes.object.isRequired,
  dispatchGraphSettings: PropTypes.func.isRequired,
};

GraphSettings.defaultProps = {};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    triggerLabel: {
      color: theme.colorsTheme.text,
      fontSize: 14,
      lineHeight: '34px',
    },
    switchBase: { color: theme.colorsTheme.text },
    rootPanel: {
      '& .MuiFormControlLabel-root': {
        width: '100%',
      },
      '& .MuiExpansionPanelSummary-content .MuiFormControlLabel-root': {
        width: 'auto',
      },
    },
    rootSummary: {},
    rootDetails: {},
  }),
  {
    name: 'GraphSettings',
  }
);

export default GraphSettings;
