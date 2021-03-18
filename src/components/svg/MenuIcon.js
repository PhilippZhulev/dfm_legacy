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

export default function MenuIcon(props) {
  return (
    <svg
      width={props.width === undefined ? '12' : props.width}
      height={props.height === undefined ? '8' : props.height}
      viewBox='0 0 12 8'
      fill={!props.color ? '#fff' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M6 4.42809L1.92897 0.33279C1.48788 -0.11093 0.771908 -0.11093 0.330818 0.33279C-0.110273 0.77651 -0.110273 1.49675 0.330818 1.94047L5.24674 6.8857C5.66332 7.30477 6.33774 7.30477 6.75326 6.8857L11.6692 1.94047C12.1103 1.49675 12.1103 0.77651 11.6692 0.33279C11.2281 -0.11093 10.5121 -0.11093 10.071 0.33279L6 4.42809Z'
        fill={!props.color ? '#98A7B9' : props.color}
      />
    </svg>
  );
}
