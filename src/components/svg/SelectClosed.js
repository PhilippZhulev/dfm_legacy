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

export default function SelectClosed(props) {
  return (
    <svg
      width={props.width === undefined ? '17' : props.width}
      height={props.height === undefined ? '17' : props.height}
      viewBox='0 0 17 17'
      fill={!props.color ? '#fff' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M5 3.69007L8.39252 0.277325C8.7601 -0.0924417 9.35674 -0.0924417 9.72432 0.277325C10.0919 0.647092 10.0919 1.24729 9.72432 1.61706L5.62772 5.73808C5.28056 6.08731 4.71855 6.08731 4.37228 5.73808L0.275681 1.61706C-0.0918951 1.24729 -0.0918951 0.647092 0.275681 0.277325C0.643255 -0.0924417 1.2399 -0.0924417 1.60748 0.277325L5 3.69007Z'
        fill='#657D95'
      />
    </svg>
  );
}
