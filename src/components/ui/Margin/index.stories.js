import React from 'react';
import { storiesOf } from '@storybook/react';
import Margin from '.';
import FormControl from '../../theme/formControl';

storiesOf('Margin (Внешний отступ)', module).add('data all 50', () => (
  <div
    style={{
      width: 500,
      height: 500,
      background: '#f1f1f1',
      position: 'relative',
      padding: 10,
    }}>
    <Margin data='50px 50px 50px 50px'>
      <FormControl />
    </Margin>
  </div>
));

storiesOf('Margin (Внешний отступ)', module).add('data all 50 inline', () => (
  <div
    style={{
      width: 500,
      height: 500,
      background: '#f1f1f1',
      position: 'relative',
      padding: 10,
    }}>
    <Margin data='50px 50px 50px 50px' inline>
      <FormControl />
    </Margin>
  </div>
));

storiesOf('Margin (Внешний отступ)', module).add('top 100', () => (
  <div
    style={{
      width: 500,
      height: 500,
      background: '#f1f1f1',
      position: 'relative',
      padding: 10,
    }}>
    <Margin top={100}>
      <FormControl />
    </Margin>
  </div>
));

storiesOf('Margin (Внешний отступ)', module).add('left 100', () => (
  <div
    style={{
      width: 500,
      height: 500,
      background: '#f1f1f1',
      position: 'relative',
      padding: 10,
    }}>
    <Margin left={100}>
      <FormControl />
    </Margin>
  </div>
));

storiesOf('Margin (Внешний отступ)', module).add('right 100', () => (
  <div
    style={{
      width: 500,
      height: 500,
      background: '#f1f1f1',
      position: 'relative',
      padding: 10,
    }}>
    <Margin right={100}>
      <FormControl />
    </Margin>
  </div>
));

storiesOf('Margin (Внешний отступ)', module).add('bottom 100', () => (
  <div
    style={{
      width: 500,
      height: 500,
      background: '#f1f1f1',
      position: 'relative',
      padding: 10,
    }}>
    <Margin bottom={100}>
      <FormControl />
    </Margin>
  </div>
));

storiesOf('Margin (Внешний отступ)', module).add(
  'top bottom left right',
  () => (
    <div
      style={{
        width: 500,
        height: 500,
        background: '#f1f1f1',
        position: 'relative',
        padding: 10,
      }}>
      <Margin top={100} bottom={100} left={100} right={100}>
        <FormControl />
      </Margin>
    </div>
  )
);

storiesOf('Margin (Внешний отступ)', module).add('auto', () => (
  <div
    style={{
      width: 500,
      height: 500,
      background: '#f1f1f1',
      position: 'relative',
      padding: 10,
    }}>
    <Margin top='auto' bottom='auto' left='auto' right='auto'>
      <FormControl />
    </Margin>
  </div>
));

storiesOf('Margin (Внешний отступ)', module).add('0 auto', () => (
  <div
    style={{
      width: 500,
      height: 500,
      background: '#f1f1f1',
      position: 'relative',
      padding: 10,
    }}>
    <Margin top='0' bottom='0' left='auto' right='auto'>
      <FormControl />
    </Margin>
  </div>
));
