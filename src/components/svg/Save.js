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

export default function Save(props) {
  return (
    <svg
      width={props.width === undefined ? '15' : props.width}
      height={props.height === undefined ? '14' : props.height}
      viewBox='0 0 15 14'
      fill={!props.color ? '#fff' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M14.6494 3.17275L11.6006 0.32725C11.46 0.196 11.2875 0.0997499 11.1 0.0472499V0H0.6C0.268125 0 0 0.25025 0 0.56V13.44C0 13.7498 0.268125 14 0.6 14H14.4C14.7319 14 15 13.7498 15 13.44V3.96375C15 3.66625 14.8744 3.38275 14.6494 3.17275ZM5.1 1.26H9.9V3.08H5.1V1.26ZM13.65 12.74H1.35V1.26H3.9V3.64C3.9 3.94975 4.16813 4.2 4.5 4.2H10.5C10.8319 4.2 11.1 3.94975 11.1 3.64V1.6415L13.65 4.0215V12.74ZM7.5 5.775C6.00938 5.775 4.8 6.90375 4.8 8.295C4.8 9.68625 6.00938 10.815 7.5 10.815C8.99063 10.815 10.2 9.68625 10.2 8.295C10.2 6.90375 8.99063 5.775 7.5 5.775ZM7.5 9.695C6.67125 9.695 6 9.0685 6 8.295C6 7.5215 6.67125 6.895 7.5 6.895C8.32875 6.895 9 7.5215 9 8.295C9 9.0685 8.32875 9.695 7.5 9.695Z'
        fill='#657D95'
      />{' '}
    </svg>
  );
}
