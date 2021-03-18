/*
 * desc: Icon LocalReport
 * ver 1.0.0
 * Copyright(c) Heavy mouse team.
 *
 * props:
 * @width {string}
 * @height {string}
 * @color {string}
 */

import React from 'react';

export default function LocalReportIcon(props) {
  return (
    <svg
      width={props.width === undefined ? '20' : props.width}
      height={props.height === undefined ? '20' : props.height}
      viewBox='0 0 20 20'
      fill={!props.color ? 'none' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M18.6719 0L13.9062 5.75521L9.01042 4.08854L4.01042 8.25521L0 7.23958V20H20V0H18.6719ZM11.1719 9.42708L15.4688 11.5885L15.9896 11.849L16.4323 11.4323L18.3333 9.53125V18.3333H1.66667V13.5938L7.91667 15.1562V15.1302L8.22917 14.5833L11.1719 9.42708Z'
        fill='#EC407A'
      />
    </svg>
  );
}
