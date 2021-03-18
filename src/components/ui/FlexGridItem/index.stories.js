import React from 'react';
import { storiesOf } from '@storybook/react';
import FlexGridItem from '.';

storiesOf('FlexGridItem', module).add('base', () => (
  <div>
    <FlexGridItem
      padding={'20px 30px 20px 40px'}
      width={'300px'}
      height={'200px'}>
      FlexGridItemContent
    </FlexGridItem>
  </div>
));
