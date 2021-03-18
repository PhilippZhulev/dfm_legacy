import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '.';

storiesOf('Button (Кнопка)', module).add('base', () => (
  <div style={{ background: '#000', padding: '20px', display: 'inline-flex' }}>
    <Button
      top={'0px'}
      text={'Кнопка'}
      onClick={() => {
        alert('Я кнопка');
      }}
    />
  </div>
));

storiesOf('Button (Кнопка)', module).add('top 100', () => (
  <div style={{ background: '#000', padding: '20px', display: 'inline-flex' }}>
    <Button
      text={'Кнопка'}
      top={100}
      onClick={() => {
        alert('Я кнопка');
      }}
    />
  </div>
));

storiesOf('Button (Кнопка)', module).add('mod', () => (
  <div style={{ background: '#000', padding: '20px', display: 'inline-flex' }}>
    <Button
      top={'0px'}
      text={'Кнопка'}
      mod={true}
      onClick={() => {
        alert('Я кнопка');
      }}
    />
  </div>
));

storiesOf('Button (Кнопка)', module).add('red', () => (
  <div style={{ background: '#000', padding: '20px', display: 'inline-flex' }}>
    <Button
      top={'0px'}
      text={'Кнопка'}
      red={true}
      onClick={() => {
        alert('Я кнопка');
      }}
    />
  </div>
));

storiesOf('Button (Кнопка)', module).add('mod red', () => (
  <div style={{ background: '#000', padding: '20px', display: 'inline-flex' }}>
    <Button
      top={'0px'}
      text={'Кнопка'}
      mod={true}
      red={true}
      onClick={() => {
        alert('Я кнопка');
      }}
    />
  </div>
));

storiesOf('Button (Кнопка)', module).add('disabled', () => (
  <div style={{ background: '#000', padding: '20px', display: 'inline-flex' }}>
    <Button
      top={'0px'}
      text={'Кнопка заблокирована'}
      disabled={'disabled'}
      onClick={() => {
        alert('Алерт не работает');
      }}
    />
  </div>
));
