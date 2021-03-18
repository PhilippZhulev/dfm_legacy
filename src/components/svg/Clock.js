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

export default function Clock(props) {
  return (
    <svg
      width={props.width === undefined ? '15' : props.width}
      height={props.height === undefined ? '15' : props.height}
      viewBox='0 0 16 16'
      fill={!props.color ? '#fff' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M8 0C3.58214 0 0 3.58214 0 8C0 12.4179 3.58214 16 8 16C12.4179 16 16 12.4179 16 8C16 3.58214 12.4179 0 8 0ZM8 14.6429C4.33214 14.6429 1.35714 11.6679 1.35714 8C1.35714 4.33214 4.33214 1.35714 8 1.35714C11.6679 1.35714 14.6429 4.33214 14.6429 8C14.6429 11.6679 11.6679 14.6429 8 14.6429Z'
        fill='#657D95'
      />
      <path
        d='M11.1196 10.2607L8.57321 8.41964V4C8.57321 3.92143 8.50893 3.85714 8.43036 3.85714H7.57143C7.49286 3.85714 7.42857 3.92143 7.42857 4V8.91786C7.42857 8.96429 7.45 9.00714 7.4875 9.03393L10.4411 11.1875C10.5054 11.2339 10.5946 11.2196 10.6411 11.1571L11.1518 10.4607C11.1982 10.3946 11.1839 10.3054 11.1196 10.2607Z'
        fill='#657D95'
      />
    </svg>
  );
}
