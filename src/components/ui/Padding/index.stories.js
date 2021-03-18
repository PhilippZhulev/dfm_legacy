import React from 'react';
import { storiesOf } from '@storybook/react';
import Padding from '.';
import FormControl from '../../theme/formControl';

storiesOf('Padding (Внутренний отступ)', module).add('data all 50', () => (
  <div
    style={{
      width: 500,
      height: 500,
      background: '#f1f1f1',
      position: 'relative',
      padding: 10,
    }}>
    <Padding data='50px 50px 50px 50px'>
      <FormControl />
    </Padding>
  </div>
));

storiesOf('Padding (Внутренний отступ)', module).add(
  'data all 50 inline',
  () => (
    <div
      style={{
        width: 500,
        height: 500,
        background: '#f1f1f1',
        position: 'relative',
        padding: 10,
      }}>
      <Padding data='50px 50px 50px 50px' inline>
        <FormControl />
      </Padding>
    </div>
  )
);

storiesOf('Padding (Внутренний отступ)', module).add('top 100', () => (
  <div
    style={{
      width: 500,
      height: 500,
      background: '#f1f1f1',
      position: 'relative',
      padding: 10,
    }}>
    <Padding top={100}>
      <FormControl />
    </Padding>
  </div>
));

storiesOf('Padding (Внутренний отступ)', module).add('left 100', () => (
  <div
    style={{
      width: 500,
      height: 500,
      background: '#f1f1f1',
      position: 'relative',
      padding: 10,
    }}>
    <Padding left={100}>
      <FormControl />
    </Padding>
  </div>
));

storiesOf('Padding (Внутренний отступ)', module).add('right 100', () => (
  <div
    style={{
      width: 500,
      height: 500,
      background: '#f1f1f1',
      position: 'relative',
      padding: 10,
    }}>
    <Padding right={100}>
      <FormControl />
    </Padding>
  </div>
));

storiesOf('Padding (Внутренний отступ)', module).add('bottom 100', () => (
  <div
    style={{
      width: 500,
      height: 500,
      background: '#f1f1f1',
      position: 'relative',
      padding: 10,
    }}>
    <Padding bottom={100}>
      <FormControl />
    </Padding>
  </div>
));

storiesOf('Padding (Внутренний отступ)', module).add(
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
      <Padding top={100} bottom={100} left={100} right={100}>
        <FormControl />
      </Padding>
    </div>
  )
);

storiesOf('Padding (Внутренний отступ)', module).add('auto', () => (
  <div
    style={{
      width: 500,
      height: 500,
      background: '#f1f1f1',
      position: 'relative',
      padding: 10,
    }}>
    <Padding top='auto' bottom='auto' left='auto' right='auto'>
      <FormControl />
    </Padding>
  </div>
));

storiesOf('Padding (Внутренний отступ)', module).add('0 auto', () => (
  <div
    style={{
      width: 500,
      height: 500,
      background: '#f1f1f1',
      position: 'relative',
      padding: 10,
    }}>
    <Padding top='0' bottom='0' left='auto' right='auto'>
      <FormControl />
    </Padding>
  </div>
));
