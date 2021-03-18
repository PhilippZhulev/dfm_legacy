import React from 'react';
import { storiesOf } from '@storybook/react';
import Icon from './icon';

storiesOf('Icon', module).add('default', () => (
  <>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Icon size={32} />
      <Icon size={32} inline mark={'error'} />
      <Icon icon={'CHECK'} size={60} fillColor={'transparent'} inline />
    </div>
  </>
));
