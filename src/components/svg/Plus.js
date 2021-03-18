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

export default function Plus(props) {
  return (
    <svg
      width={props.width === undefined ? '7' : props.width}
      height={props.height === undefined ? '8' : props.height}
      viewBox='0 0 7 8'
      fill={!props.color ? 'none' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M3.05682 7.30398H4.17045V4.57955H6.89489V3.46591H4.17045V0.741477H3.05682V3.46591H0.332386V4.57955H3.05682V7.30398Z'
        fill='#98A7B9'
      />
    </svg>
  );
}
