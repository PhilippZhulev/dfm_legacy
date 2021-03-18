import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export const PeriodTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      background: 'none',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

export const PeriodTab = withStyles((theme) => ({
  root: {
    textTransform: 'uppercase',
    color: '#fff',
    maxWidth: 280,
    padding: '22px 40px',
    '&:focus': {
      opacity: 1,
    },
    '&.Mui-selected': {
      background: '#283449',
    },
    '& > span.MuiTab-wrapper > span > span:nth-child(1)': {
      fontWeight: 700,
      paddingRight: 5,
    },
    '& > span.MuiTab-wrapper > span > span:nth-child(2)': {
      color: '#4F5E79',
      fontSize: 14,
      lineHeight: '16px',
      fontWeight: 700,
    },
    '& > span.MuiTab-wrapper > span:nth-child(2)': {
      textTransform: 'none',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxWidth: '100%',
      overflow: 'hidden',
      color: '#869AAC',
      fontSize: 12,
      lineHeight: '16px',
    },
  },
}))((props) => <Tab {...props} />);
