import React from 'react';
import { storiesOf } from '@storybook/react';
import Background from '.';
import FormControl from '@material-ui/core/FormControl';

storiesOf('Background (Заливка)', module).add('base', () => (
  <div
    style={{
      height: '200px',
    }}>
    <Background
      children={
        <>
          <FormControl
            style={{
              background: '#eee',
              width: 100,
              height: 100,
              margin: '50px',
            }}
          />

          <FormControl
            style={{
              background: '#eee',
              width: 100,
              height: 100,
              margin: '50px',
            }}
          />

          <FormControl
            style={{
              background: '#eee',
              width: 100,
              height: 100,
              margin: '50px',
            }}
          />
        </>
      }
    />
  </div>
));

