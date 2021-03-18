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

export default function LockMenu(props) {
  return (
    <svg
      width={props.width === undefined ? '18' : props.width}
      height={props.height === undefined ? '24' : props.height}
      viewBox='0 0 18 24'
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'
      className='locked'>
      <path
        className='locked'
        fill={!props.color ? '#657D95' : props.color}
        d='M15.75 8H14.625V5.71429C14.625 2.56 12.105 0 9 0C5.895 0 3.375 2.56 3.375 5.71429V8H2.25C1.0125 8 0 9.02857 0 10.2857V21.7143C0 22.9714 1.0125 24 2.25 24H15.75C16.9875 24 18 22.9714 18 21.7143V10.2857C18 9.02857 16.9875 8 15.75 8ZM5.625 5.71429C5.625 3.81714 7.1325 2.28571 9 2.28571C10.8675 2.28571 12.375 3.81714 12.375 5.71429V8H5.625V5.71429ZM15.75 21.7143H2.25V10.2857H15.75V21.7143ZM9 18.2857C10.2375 18.2857 11.25 17.2571 11.25 16C11.25 14.7429 10.2375 13.7143 9 13.7143C7.7625 13.7143 6.75 14.7429 6.75 16C6.75 17.2571 7.7625 18.2857 9 18.2857Z'
      />
    </svg>
  );
}
