import React from 'react';
import { storiesOf } from '@storybook/react';
import FlexGrid from '.';

storiesOf('FlexGrid', module).add('base', () => (
  <div style={{ padding: '20px', display: 'inline-flex' }}>
    <FlexGrid>
      {[
        <div style={{ margin: '10px' }}>Column1</div>,
        <div style={{ margin: '10px' }}>Column2</div>,
        <div style={{ margin: '10px' }}>Column3</div>,
      ]}
    </FlexGrid>
  </div>
));
