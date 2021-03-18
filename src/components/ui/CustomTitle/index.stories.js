import React from 'react';
import { storiesOf } from '@storybook/react';
import CustomTitle from '.';

storiesOf('SmartTitle (Заголовок)', module).add('h1', () => (
  <CustomTitle type={'h1'}>H1 title</CustomTitle>
));

storiesOf('SmartTitle (Заголовок)', module).add('h2', () => (
  <CustomTitle type={'h2'}>H2 title</CustomTitle>
));

storiesOf('SmartTitle (Заголовок)', module).add('h3', () => (
  <CustomTitle type={'h3'}>H3 title</CustomTitle>
));

storiesOf('SmartTitle (Заголовок)', module).add('h4', () => (
  <CustomTitle type={'h4'}>H4 title</CustomTitle>
));

storiesOf('SmartTitle (Заголовок)', module).add('h5', () => (
  <CustomTitle type={'h5'}>H5 title</CustomTitle>
));

storiesOf('SmartTitle (Заголовок)', module).add('h6', () => (
  <CustomTitle type={'h6'}>H6 title</CustomTitle>
));
