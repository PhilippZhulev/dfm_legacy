/*
 * desc: ParentModel
 * ver 1.0.0
 * Copyright(c) Heavy mouse team.
 *
 * props:
 * @width {string}
 * @height {string}
 * @color {string}
 */

import React from 'react';

export default function ParentModel(props) {
  return (
    <svg
      width={props.width === undefined ? '20' : props.width}
      height={props.height === undefined ? '20' : props.height}
      viewBox='0 0 20 20'
      fill={'none'}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
        <path fillRule="evenodd" clipRule="evenodd" d="M7.5 17C10.5376 17 13 14.5376 13 11.5C13 8.46243 10.5376 6 7.5 6C4.46243 6 2 8.46243 2 11.5C2 14.5376 4.46243 17 7.5 17ZM7.5 18C11.0899 18 14 15.0899 14 11.5C14 7.91015 11.0899 5 7.5 5C3.91015 5 1 7.91015 1 11.5C1 15.0899 3.91015 18 7.5 18Z" fill="#869AAC"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M16 7C17.1046 7 18 6.10457 18 5C18 3.89543 17.1046 3 16 3C14.8954 3 14 3.89543 14 5C14 6.10457 14.8954 7 16 7ZM16 8C17.6569 8 19 6.65685 19 5C19 3.34315 17.6569 2 16 2C14.3431 2 13 3.34315 13 5C13 6.65685 14.3431 8 16 8Z" fill="#869AAC"/>
    </svg>
  );
}
