/*
 * desc: Icon
 * ver 1.0.0
 * Copyright(c) Heavy mouse team.
 *
 * props:
 * @width {string}
 * @height {string}
 * @color {string}
 */

import React from 'react';

export default function Agregate(props) {
  return (
    <svg
      width={props.width === undefined ? '18' : props.width}
      height={props.height === undefined ? '18' : props.height}
      viewBox='0 0 18 18'
      fill={!props.color ? '#fff' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M9 0C4.032 0 0 4.032 0 9C0 13.968 4.032 18 9 18C13.968 18 18 13.968 18 9C18 4.032 13.968 0 9 0ZM9 16.2C5.031 16.2 1.8 12.969 1.8 9C1.8 5.031 5.031 1.8 9 1.8C12.969 1.8 16.2 5.031 16.2 9C16.2 12.969 12.969 16.2 9 16.2Z'
        fill='#657D95'
      />
      <path
        d='M5.4 12.6C6.39411 12.6 7.2 11.7941 7.2 10.8C7.2 9.80589 6.39411 9 5.4 9C4.40589 9 3.6 9.80589 3.6 10.8C3.6 11.7941 4.40589 12.6 5.4 12.6Z'
        fill='#657D95'
      />
      <path
        d='M9 7.2C9.99411 7.2 10.8 6.39411 10.8 5.4C10.8 4.40589 9.99411 3.6 9 3.6C8.00589 3.6 7.2 4.40589 7.2 5.4C7.2 6.39411 8.00589 7.2 9 7.2Z'
        fill='#657D95'
      />
      <path
        d='M12.6 12.6C13.5941 12.6 14.4 11.7941 14.4 10.8C14.4 9.80589 13.5941 9 12.6 9C11.6059 9 10.8 9.80589 10.8 10.8C10.8 11.7941 11.6059 12.6 12.6 12.6Z'
        fill='#657D95'
      />
    </svg>
  );
}
