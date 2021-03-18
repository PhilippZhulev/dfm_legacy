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

export default function ArrowNext(props) {
  return (
    <svg
      width={props.width === undefined ? '22' : props.width}
      height={props.height === undefined ? '22' : props.height}
      viewBox='0 0 22 22'
      fill={!props.color ? '#fff' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M11 22C17.0824 22 22 17.0824 22 11C22 4.91765 17.0824 0 11 0C4.91765 0 0 4.91765 0 11C0 17.0824 4.91765 22 11 22ZM11 1.29412C16.3706 1.29412 20.7059 5.62941 20.7059 11C20.7059 16.3706 16.3706 20.7059 11 20.7059C5.62941 20.7059 1.29412 16.3706 1.29412 11C1.29412 5.62941 5.62941 1.29412 11 1.29412Z'
        fill='#657D95'
      />
      <path
        d='M10.8059 17.2765L17.0824 11L10.8059 4.72353L9.9 5.62941L15.2706 11L9.9 16.3706L10.8059 17.2765Z'
        fill='#657D95'
      />
      <path
        d='M16.1765 10.3529H5.17647V11.6471H16.1765V10.3529Z'
        fill='#657D95'
      />
    </svg>
  );
}
