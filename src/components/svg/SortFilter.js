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

export default function SortFilter(props) {
  return (
    <svg
      width={props.width === undefined ? '18' : props.width}
      height={props.height === undefined ? '18' : props.height}
      viewBox='0 0 18 18'
      fill={!props.color ? '#fff' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M-6.08941e-07 1.00127C-6.08941e-07 0.448277 0.441562 0 0.986267 0H17.0137C17.2168 0 17.4149 0.0636909 17.5811 0.182296C18.0266 0.500422 18.1337 1.12503 17.8204 1.57735L12.0092 9.96474L11.9929 16.0666C11.9919 16.4475 11.8803 16.8197 11.6722 17.1366C11.0873 18.0274 9.90183 18.2681 9.02439 17.6742L6.94885 16.2695C6.3974 15.8963 6.06739 15.2668 6.07049 14.594L6.09158 10.0016L0.182986 1.58228C0.0639386 1.4126 -6.08941e-07 1.20952 -6.08941e-07 1.00127ZM8.06702 9.36533L8.04298 14.6032L10.0206 15.9417L10.0383 9.32853L15.1141 2.00253H2.8999L8.06702 9.36533Z'
        fill='#657D95'
      />
    </svg>
  );
}
