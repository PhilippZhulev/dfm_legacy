/*
* desc: CheckboxWhiteChecked
* ver 1.0.0
* Copyright(c) Heavy mouse team.
*
* props:
* @width {string}
* @height {string}
* @color {string}
*/

import React from 'react';

export default function CheckboxWhiteChecked(props) {
  return (
    <svg
      width={props.width === undefined ? '18' : props.width}
      height={props.height === undefined ? '18' : props.height}
      viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="16" height="16" rx="3" fill="#6B75CA" stroke="#6B75CA"/>
      <path
        d="M12.4545 5.80823C12.8634 5.37655 13.5563 5.39479 13.9418 5.84739L14.1867 6.13481C14.5222 6.52875 14.5018 7.11363 14.1396 7.48322L8.77708 12.9551C8.38496 13.3552 7.74068 13.3551 7.3486 12.955L4.14376 9.68419C3.77582 9.30867 3.76148 8.71237 4.11095 8.3196L4.33815 8.06425C4.72912 7.62483 5.41305 7.61611 5.81512 8.0454L8.06281 10.4454L12.4545 5.80823Z"
        fill="white"/>
    </svg>
  );
}
