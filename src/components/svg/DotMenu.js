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

export default function DotMenu(props) {
  return (
    <svg
      width={props.width === undefined ? '5' : props.width}
      height={props.height === undefined ? '17' : props.height}
      viewBox='0 0 5 17'
      fill={!props.color ? '#657D95' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'
      className='locked'>
      <path
        className='locked'
        d='M3.20116 1.60058C3.20116 2.48455 2.48455 3.20116 1.60058 3.20116C0.716603 3.20116 0 2.48455 0 1.60058C0 0.716603 0.716603 0 1.60058 0C2.48455 0 3.20116 0.716603 3.20116 1.60058Z'
        fill='#657D95'
      />
      <path
        className='locked'
        d='M3.20116 8.5C3.20116 9.38398 2.48455 10.1006 1.60058 10.1006C0.716603 10.1006 0 9.38398 0 8.5C0 7.61602 0.716603 6.89942 1.60058 6.89942C2.48455 6.89942 3.20116 7.61602 3.20116 8.5Z'
        fill='#657D95'
      />
      <path
        className='locked'
        d='M3.20116 15.3994C3.20116 16.2834 2.48455 17 1.60058 17C0.716603 17 0 16.2834 0 15.3994C0 14.5154 0.716603 13.7988 1.60058 13.7988C2.48455 13.7988 3.20116 14.5154 3.20116 15.3994Z'
        fill='#657D95'
      />
    </svg>
  );
}
