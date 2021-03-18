import React from 'react';
import { storiesOf } from '@storybook/react';
import IconColor from '.';
import Like from '../../svg/Like';

storiesOf('IconColor (Цвет в SVG-иконке)', module).add(
  'обводка (stroke)',
  () => (
    <div>
      <IconColor color={'red'} type={'stroke'}>
        <Like />
      </IconColor>
    </div>
  )
);

storiesOf('IconColor (Цвет в SVG-иконке)', module).add('заливка (fill)', () => (
  <div>
    <IconColor color={'blue'} type={'fill'}>
      <Like />
    </IconColor>
  </div>
));

storiesOf('IconColor (Цвет в SVG-иконке)', module).add('стили обертки', () => (
  <div>
    <IconColor
      styles={{
        width: '100px',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px dashed grey',
      }}>
      <Like />
    </IconColor>
  </div>
));
