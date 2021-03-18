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

export default function Icon1(props) {
  return (
    <svg
      width={props.width === undefined ? '18' : props.width}
      height={props.height === undefined ? '20' : props.height}
      viewBox='0 0 18 20'
      fill={!props.color ? '#fff' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M9 0C4.63687 0 0 1.31409 0 3.75V16.25C0 18.6859 4.63687 20 9 20C13.3631 20 18 18.6859 18 16.25V3.75C18 1.31409 13.3631 0 9 0ZM9 1.25C13.7794 1.25 16.7143 2.70629 16.7143 3.75C16.7143 4.79371 13.7794 6.25 9 6.25C4.22061 6.25 1.28571 4.79371 1.28571 3.75C1.28571 2.70629 4.22061 1.25 9 1.25ZM9 18.75C4.22065 18.75 1.28571 17.2937 1.28571 16.25V11.9978C2.96575 13.1448 6.0434 13.75 9 13.75C11.9566 13.75 15.0342 13.1448 16.7143 11.9978V16.25C16.7143 17.2937 13.7794 18.75 9 18.75ZM9 12.5C4.22065 12.5 1.28571 11.0437 1.28571 10V5.74777C2.96575 6.89477 6.0434 7.5 9 7.5C11.9566 7.5 15.0342 6.89477 16.7143 5.74777V10C16.7143 11.0437 13.7794 12.5 9 12.5Z'
        fill='#657D95'
      />
    </svg>
  );
}
