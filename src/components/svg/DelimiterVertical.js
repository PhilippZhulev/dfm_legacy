/*
 * desc: DelimiterVertical
 * ver 1.0.0
 * Copyright(c) Heavy mouse team.
 *
 * props:
 * @width {string}
 * @height {string}
 * @color {string}
 */

import React from 'react';

export default function DelimiterVertical(props) {
  return (
    <svg
      width={1}
      height={16}
      viewBox='0 0 1 16'
      fill='none'
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <line
        x1='0.5'
        y1='2.18557e-08'
        x2='0.499999'
        y2='16'
        stroke='white'
        strokeOpacity='0.12'
      />
    </svg>
  );
}
