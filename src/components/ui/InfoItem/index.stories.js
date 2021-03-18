import React from 'react';
import { storiesOf } from '@storybook/react';
import IconInfoItem from '.';

storiesOf('InfoItem', module).add('Текст с заголовком', () => (
  <div>
    <IconInfoItem label={'Заголовок'} text={'Значение'} />
  </div>
));

storiesOf('InfoItem', module).add('Текст без заголовка', () => (
  <div>
    <IconInfoItem text={'Текст без заголовка'} />
  </div>
));

storiesOf('InfoItem', module).add('Заголовок без текста', () => (
  <div>
    <IconInfoItem label={'Заголовок без текста'} />
  </div>
));
