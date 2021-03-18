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

export default function Icon0(props) {
  return (
    <svg
      width={props.width === undefined ? '21' : props.width}
      height={props.height === undefined ? '16' : props.height}
      viewBox='0 0 21 16'
      fill={!props.color ? '#657D95' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path d='M16.4063 10.6667C15.6827 10.6667 15.0938 11.265 15.0938 12C15.0938 12.735 15.6827 13.3333 16.4063 13.3333C17.1298 13.3333 17.7188 12.735 17.7188 12C17.7188 11.265 17.1298 10.6667 16.4063 10.6667Z' />
      <path d='M4.05683 10.3838H5.36933V13.7172H4.05683V10.3838Z' />
      <path d='M6.76136 10.3838H8.07386V13.7172H6.76136V10.3838Z' />
      <path d='M9.46592 10.3838H10.7784V13.7172H9.46592V10.3838Z' />
      <path d='M21 2C21 0.897131 20.1169 0 19.0313 0H1.96875C0.883114 0 0 0.897131 0 2V6.66667C0 7.18073 0.197233 7.64533 0.512074 8C0.197233 8.35467 0 8.81923 0 9.33333V14C0 15.1029 0.883114 16 1.96875 16H19.0313C20.1169 16 21 15.1029 21 14V9.33333C21 8.81927 20.8028 8.35467 20.488 8C20.8028 7.64533 21 7.18073 21 6.66667V2ZM1.3125 2C1.3125 1.63216 1.60666 1.33333 1.96875 1.33333H19.0313C19.3933 1.33333 19.6875 1.63216 19.6875 2V6.66667C19.6875 7.03451 19.3933 7.33333 19.0313 7.33333H1.96875C1.60666 7.33333 1.3125 7.03451 1.3125 6.66667V2ZM19.6875 14C19.6875 14.3678 19.3933 14.6667 19.0313 14.6667H1.96875C1.60666 14.6667 1.3125 14.3678 1.3125 14V9.33333C1.3125 8.9655 1.60666 8.66667 1.96875 8.66667H19.0313C19.3933 8.66667 19.6875 8.9655 19.6875 9.33333V14Z' />
      <path d='M16.4063 6C17.1298 6 17.7188 5.4017 17.7188 4.66667C17.7188 3.93164 17.1298 3.33333 16.4063 3.33333C15.6827 3.33333 15.0938 3.93164 15.0938 4.66667C15.0938 5.4017 15.6827 6 16.4063 6Z' />
      <path d='M4.05683 2.82827H5.36933V6.16161H4.05683V2.82827Z' />
      <path d='M6.76136 2.82827H8.07386V6.16161H6.76136V2.82827Z' />
      <path d='M9.46592 2.82827H10.7784V6.16161H9.46592V2.82827Z' />
    </svg>
  );
}