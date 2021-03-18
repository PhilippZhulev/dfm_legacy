import React, { useState } from 'react';
import { Tag } from 'components';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { Scrollbar } from 'react-scrollbars-custom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import { useStyles } from './styles';
import MenuIcon from '../../svg/MenuIcon';
import CheckboxWhite from '../../svg/CheckboxWhite';
import CheckboxWhiteChecked from '../../svg/CheckboxWhiteChecked';

/**
 * Компонент выбора метрик
 * @component
 * @public
 */
export const TagsMetricForm = React.memo((props) => {
  const {
    lockedModel,
    metricForm,
    tagsMetric,
    changeMetric,
    deleteMetric,
  } = props;
  /** Инициализация стилей */
  const classes = useStyles(props);

  const [tagsSelectorExpanded, setTagsSelectorExpanded] = useState(null);

  /** Функция сворачивания выпадашки с чекбоксами метрик */
  const handleTagsSelectorExpanded = () => {
    setTagsSelectorExpanded(!tagsSelectorExpanded);
  };

  return (
    <>
      {lockedModel ? (
        <div className='metricPanel'>
          <React.Fragment>
            <ExpansionPanel
              square
              expanded={tagsSelectorExpanded}
              classes={{ root: classes.dropdownTagsAdd }}>
              <ExpansionPanelSummary
                expandIcon={<MenuIcon color={'#fff'} />}
                aria-controls='panel1a-content'
                onClick={() => handleTagsSelectorExpanded()}
                classes={{
                  root: classes.dropdownTagsAddSummary,
                }}>
                Добавить метрику
              </ExpansionPanelSummary>
              {metricForm.length ? (
                <ExpansionPanelDetails
                  classes={{
                    root: classes.detailsRoot,
                  }}>
                  <Scrollbar
                    noScroll={metricForm.length <= 5}
                    trackYProps={{ style: { width: 4 } }}
                    thumbYProps={{
                      style: {
                        background: 'rgba(31, 142, 250, 0.4)',
                        width: 4,
                        borderRadius: 2,
                      },
                    }}>
                    {metricForm.map((metric, index) => (
                      <FormControlLabel
                        key={index}
                        classes={{ root: classes.label }}
                        control={
                          <Checkbox
                            onChange={(event) => changeMetric(event, index)}
                            checked={metric.state}
                            icon={<CheckboxWhite />}
                            checkedIcon={<CheckboxWhiteChecked />}
                            color='primary'
                            disabled={!lockedModel}
                          />
                        }
                        label={metric.label}
                      />
                    ))}
                  </Scrollbar>
                </ExpansionPanelDetails>
              ) : (
                <ExpansionPanelDetails className='noMetrics'>
                  Для данного узла недоступна ни одна метрика предоставления
                </ExpansionPanelDetails>
              )}
            </ExpansionPanel>
          </React.Fragment>
        </div>
      ) : null}

      <div className={classes.containerTags}>
        {tagsMetric.map((tag, index) => (
          <div key={index} className={classes.containerTag}>
            {lockedModel ? (
              <Tag
                color={'#6B75CA'}
                label={tag.label}
                onDelete={() => deleteMetric(tag.value)}
              />
            ) : (
              <Tag color={'#6B75CA'} label={tag.label} />
            )}
          </div>
        ))}
      </div>
    </>
  );
});

/** Назначаем  displayName */
TagsMetricForm.displayName = 'TagsMetricForm';

/** Назначаем  propTypes */
TagsMetricForm.propTypes = {
  lockedModel: PropTypes.bool,
  metricForm: PropTypes.array,
  tagsMetric: PropTypes.array,
  changeMetric: PropTypes.func,
  deleteMetric: PropTypes.func,
};
