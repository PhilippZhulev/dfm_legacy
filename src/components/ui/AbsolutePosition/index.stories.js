import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../Button';
import AbsolutePosition from '.';

storiesOf('AbsolutePosition (Левый верхний угол)', module).add(
  'left top',
  () => (
    <div
      style={{
        background: '#f1f1f1',
        height: 200,
        position: 'relative',
      }}>
      <AbsolutePosition top='0' left='0'>
        <Button />
      </AbsolutePosition>
    </div>
  )
);

storiesOf('AbsolutePosition (Правый верхний угол)', module).add(
  'right top',
  () => (
    <div
      style={{
        background: '#f1f1f1',
        height: 200,
        position: 'relative',
      }}>
      <AbsolutePosition top='0' right='0'></AbsolutePosition>
    </div>
  )
);

storiesOf('AbsolutePosition (Левый нижний угол)', module).add(
  'left bottom',
  () => (
    <div
      style={{
        background: '#f1f1f1',
        height: 200,
        position: 'relative',
      }}>
      <AbsolutePosition bottom='0' left='0'>
        <Button />
      </AbsolutePosition>
    </div>
  )
);

storiesOf('AbsolutePosition (Правый нижний угол)', module).add(
  'right bottom',
  () => (
    <div
      style={{
        background: '#f1f1f1',
        height: 200,
        position: 'relative',
      }}>
      <AbsolutePosition bottom='0' right='0'>
        <Button />
      </AbsolutePosition>
    </div>
  )
);
