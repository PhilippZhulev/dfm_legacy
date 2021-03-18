import React from 'react';
import { storiesOf } from '@storybook/react';
import ItemWrapper from '.';
import Like from '../../svg/Like';

storiesOf('ItemWrapper', module).add('с текстом', () => (
  <div>
    <ItemWrapper>{['Some text']}</ItemWrapper>
  </div>
));

storiesOf('ItemWrapper', module).add('с SVG', () => (
  <div>
    <ItemWrapper>
      <Like />
    </ItemWrapper>
  </div>
));
