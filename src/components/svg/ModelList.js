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

export default function WhatIf(props) {
  return (
    <svg
      width={props.width === undefined ? '16' : props.width}
      height={props.height === undefined ? '12' : props.height}
      viewBox='0 0 16 12'
      fill={'none'}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
        <path fillRule="evenodd" clipRule="evenodd" d="M0 10V12H16V10H0ZM0 5V7H16V5H0ZM0 0V2H16V0H0Z" fill="#869AAC"/>
    </svg>
  );
}
