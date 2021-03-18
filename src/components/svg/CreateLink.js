/*
 * desc: Create Link Icon
 * ver 1.0.0
 * Copyright(c) Heavy mouse team.
 *
 * props:
 * @width {string}
 * @height {string}
 * @color {string}
 */

import React from 'react';

export default function CreateLink(props) {
  return (
    <svg
      width={props.width === undefined ? '20' : props.width}
      height={props.height === undefined ? '18' : props.height}
      viewBox='0 0 20 11'
      fill={!props.color ? '#fff' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M15 0.5H12C11.45 0.5 11 0.95 11 1.5C11 2.05 11.45 2.5 12 2.5H15C16.65 2.5 18 3.85 18 5.5C18 7.15 16.65 8.5 15 8.5H12C11.45 8.5 11 8.95 11 9.5C11 10.05 11.45 10.5 12 10.5H15C17.76 10.5 20 8.26 20 5.5C20 2.74 17.76 0.5 15 0.5ZM6 5.5C6 6.05 6.45 6.5 7 6.5H13C13.55 6.5 14 6.05 14 5.5C14 4.95 13.55 4.5 13 4.5H7C6.45 4.5 6 4.95 6 5.5ZM8 8.5H5C3.35 8.5 2 7.15 2 5.5C2 3.85 3.35 2.5 5 2.5H8C8.55 2.5 9 2.05 9 1.5C9 0.95 8.55 0.5 8 0.5H5C2.24 0.5 0 2.74 0 5.5C0 8.26 2.24 10.5 5 10.5H8C8.55 10.5 9 10.05 9 9.5C9 8.95 8.55 8.5 8 8.5Z'
        fill='#657D95'
      />
    </svg>
  );
}
