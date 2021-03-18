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

export default function TrashCan(props) {
  return (
    <svg
      width={props.width === undefined ? '12' : props.width}
      height={props.height === undefined ? '16' : props.height}
      viewBox='0 0 12 16'
      fill={!props.color ? '#fff' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path d="M4.5 0.5L3.75 1.25H0V2.75H2.25H9.75H12V1.25H8.25L7.5 0.5H4.5ZM0.75 4.25V14C0.75 14.825 1.425 15.5 2.25 15.5H9.75C10.575 15.5 11.25 14.825 11.25 14V4.25H0.75Z" fill="#657D95"/>
    </svg>
  );
}
