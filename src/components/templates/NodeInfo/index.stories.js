import React from 'react';
import { storiesOf } from '@storybook/react';
import NodeInfo from '.';

const items = [
  { value: 'АС', label: 'АС' },
  { value: 'БС', label: 'БС' },
  { value: 'ВС', label: 'ВС' },
];

storiesOf('NodeInfo', module).add('Информация об узле (просмотр)', () => (
  <>
    <NodeInfo locked={true} label='IT-узел' items={items} current='ВС' />
  </>
));

storiesOf('NodeInfo', module).add('Информация об узле (редактирование)', () => (
  <>
    <NodeInfo locked={false} label='IT-узел' items={items} current='БС' />
  </>
));
