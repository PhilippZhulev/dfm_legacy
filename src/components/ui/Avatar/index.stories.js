import React from 'react';
import { storiesOf } from '@storybook/react';
import Avatar from '.';

storiesOf('Avatar (Аватар)', module).add('Иван (Имя без картинки)', () => (
  <Avatar name={'Иван'} />
));

storiesOf('Avatar (Аватар)', module).add('Картинка', () => (
  <Avatar data={'ivan.jpg'} updated={'true'} />
));
