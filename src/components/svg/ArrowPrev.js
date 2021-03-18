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

export default function ArrowPrev(props) {
  return (
    <svg
      width={props.width === undefined ? '22' : props.width}
      height={props.height === undefined ? '22' : props.height}
      viewBox='0 0 22 22'
      fill={!props.color ? '#fff' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M11 22C4.91765 22 0 17.0824 0 11C0 4.91765 4.91765 0 11 0C17.0824 0 22 4.91765 22 11C22 17.0824 17.0824 22 11 22ZM11 1.29412C5.62941 1.29412 1.29412 5.62941 1.29412 11C1.29412 16.3706 5.62941 20.7059 11 20.7059C16.3706 20.7059 20.7059 16.3706 20.7059 11C20.7059 5.62941 16.3706 1.29412 11 1.29412Z'
        fill='#657D95'
      />
      <path
        d='M11.1941 17.2765L4.91765 11L11.1941 4.72353L12.1 5.62941L6.72941 11L12.1 16.3706L11.1941 17.2765Z'
        fill='#657D95'
      />
      <path
        d='M5.82353 10.3529H16.8235V11.6471H5.82353V10.3529Z'
        fill='#657D95'
      />
    </svg>
  );
}
