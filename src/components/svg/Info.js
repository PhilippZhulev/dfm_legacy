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

export default function Info(props) {
  return (
    <svg
      width={props.width === undefined ? '17' : props.width}
      height={props.height === undefined ? '17' : props.height}
      viewBox='0 0 17 17'
      fill={!props.color ? '#fff' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M7.65 4.25H9.35V5.95H7.65V4.25ZM7.65 7.65H9.35V12.75H7.65V7.65ZM8.5 0C3.808 0 0 3.808 0 8.5C0 13.192 3.808 17 8.5 17C13.192 17 17 13.192 17 8.5C17 3.808 13.192 0 8.5 0ZM8.5 15.3C4.7515 15.3 1.7 12.2485 1.7 8.5C1.7 4.7515 4.7515 1.7 8.5 1.7C12.2485 1.7 15.3 4.7515 15.3 8.5C15.3 12.2485 12.2485 15.3 8.5 15.3Z'
        fill='#657D95'
      />
    </svg>
  );
}
