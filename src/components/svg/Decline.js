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

export default function Decline(props) {
  return (
    <svg
      width={props.width === undefined ? '10' : props.width}
      height={props.height === undefined ? '9' : props.height}
      viewBox='0 0 10 9'
      fill={!props.color ? '#fff' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M6.06095 4.2513L9.0297 1.28255C9.1706 1.1419 9.24985 0.951045 9.25002 0.751964C9.2502 0.552882 9.17128 0.361885 9.03064 0.220989C8.88999 0.0800923 8.69913 0.000838857 8.50005 0.000663042C8.30097 0.000487227 8.10997 0.0794034 7.96907 0.220051L5.00032 3.1888L2.03157 0.220051C1.89068 0.0791548 1.69958 0 1.50032 0C1.30107 0 1.10997 0.0791548 0.969074 0.220051C0.828178 0.360947 0.749023 0.552044 0.749023 0.751301C0.749023 0.950558 0.828178 1.14165 0.969074 1.28255L3.93782 4.2513L0.969074 7.22005C0.828178 7.36095 0.749023 7.55204 0.749023 7.7513C0.749023 7.95056 0.828178 8.14165 0.969074 8.28255C1.10997 8.42345 1.30107 8.5026 1.50032 8.5026C1.69958 8.5026 1.89068 8.42345 2.03157 8.28255L5.00032 5.3138L7.96907 8.28255C8.10997 8.42345 8.30107 8.5026 8.50032 8.5026C8.69958 8.5026 8.89068 8.42345 9.03157 8.28255C9.17247 8.14165 9.25163 7.95056 9.25163 7.7513C9.25163 7.55204 9.17247 7.36095 9.03157 7.22005L6.06095 4.2513Z'
        fill='#F9514D'
      />
    </svg>
  );
}