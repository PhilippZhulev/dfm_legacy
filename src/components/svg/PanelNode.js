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

export default function PanelNode(props) {
  return (
    <svg
      width={props.width === undefined ? '13' : props.width}
      height={props.height === undefined ? '19' : props.height}
      viewBox='0 0 13 19'
      fill={!props.color ? '#fff' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M1.625 0C0.73125 0 0 0.855 0 1.9V17.1C0 18.145 0.73125 19 1.625 19H11.375C12.2688 19 13 18.145 13 17.1V5.7L8.125 0H1.625ZM7.3125 6.65V1.425L11.7813 6.65H7.3125Z'
        fill='#1F8EFA'
      />
    </svg>
  );
}
