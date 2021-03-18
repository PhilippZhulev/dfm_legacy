import React from 'react';
import { storiesOf } from '@storybook/react';
import IconInfoItem from '.';
import Like from '../../svg/Like';

storiesOf('IconInfoItem', module).add('Тест с иконкой', () => (
  <div>
    <IconInfoItem label={'Просто текст с иконкой'} icon={<Like />} />
  </div>
));

storiesOf('IconInfoItem', module).add('Тест без иконки', () => (
  <div>
    <IconInfoItem label={'Просто текст без иконки'} />
  </div>
));
