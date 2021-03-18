import React from 'react';
import { storiesOf } from '@storybook/react';
import KeyValue from '.';

storiesOf('KeyValue', module).add('Тескт с заголовком', () => (
  <div>
    <KeyValue label={'Заголовок'} text={'Значение'} />
  </div>
));

storiesOf('KeyValue', module).add('Текст без заголовка', () => (
  <div>
    <KeyValue value={'Текст без заголовка'} />
  </div>
));

storiesOf('KeyValue', module).add('Заголовок без текста', () => (
  <div>
    <KeyValue label={'Заголовок без текста'} />
  </div>
));
