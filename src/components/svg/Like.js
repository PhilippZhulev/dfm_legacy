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

export default function Like(props) {
  return (
    <svg
      width={props.width === undefined ? '17' : props.width}
      height={props.height === undefined ? '18' : props.height}
      viewBox='0 0 17 18'
      fill={!props.color ? '#fff' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M4.81046 8.19995L7.85883 1C8.46519 1 9.04672 1.25285 9.47548 1.70294C9.90424 2.15302 10.1451 2.76347 10.1451 3.39998V6.59996H14.4586C14.6795 6.59734 14.8983 6.64517 15.0999 6.74014C15.3015 6.83511 15.481 6.97495 15.626 7.14997C15.771 7.325 15.878 7.53102 15.9396 7.75376C16.0012 7.9765 16.0159 8.21064 15.9827 8.43995L14.9311 15.6399C14.8759 16.0214 14.6913 16.3692 14.4112 16.6191C14.1311 16.869 13.7744 17.0043 13.4069 16.9999H4.81046M4.81046 8.19995V16.9999M4.81046 8.19995H2.52419C2.11995 8.19995 1.73226 8.36852 1.44642 8.66858C1.16058 8.96864 1 9.3756 1 9.79994V15.3999C1 15.8243 1.16058 16.2312 1.44642 16.5313C1.73226 16.8313 2.11995 16.9999 2.52419 16.9999H4.81046'
        stroke='#869AAC'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
