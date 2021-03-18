import React from 'react';
import { storiesOf } from '@storybook/react';
import AppBarCol from '.';
import FormControl from '@material-ui/core/FormControl';

storiesOf('AppBarCol (Колонка для AppBar)', module).add('base', () => (
  <div
    style={{
      background: '#eee',
      height: '200px',
      width: '100%',
      position: 'relative',
    }}>
    <AppBarCol
      children={
        <>
          <FormControl
            style={{
              border: '1px dashed green',
              padding: '10px',
            }}>
            1
          </FormControl>
          <FormControl
            style={{
              border: '1px dashed red',
              padding: '10px',
            }}>
            2
          </FormControl>
          <FormControl
            style={{
              border: '1px dashed blue',
              padding: '10px',
            }}>
            3
          </FormControl>
        </>
      }></AppBarCol>
  </div>
));
