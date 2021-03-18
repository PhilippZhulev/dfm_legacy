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

export default function Manual(props) {
  return (
    <svg
      width={props.width === undefined ? '18' : props.width}
      height={props.height === undefined ? '18' : props.height}
      viewBox='0 0 16 20'
      fill={!props.color ? '#fff' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path d="M2 0C0.895 0 0 0.895 0 2V17C0 18.645 1.35503 20 3 20H16V18H3C2.43497 18 2 17.565 2 17C2 16.435 2.43497 16 3 16H16V15V14V0H12V10L9 8L6 10V0H2Z" fill="#657D95"/>
    </svg>
  );
}
