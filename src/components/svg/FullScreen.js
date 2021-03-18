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

export default function FullScreen(props) {
  return (
    <svg
      width={props.width === undefined ? '20' : props.width}
      height={props.height === undefined ? '17' : props.height}
      viewBox='0 0 20 17'
      fill={!props.color ? '#657D95' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M18.5714 11.3333H20V15.5833C20 16.3582 19.3529 17 18.5714 17H14.2857V15.5833H18.5714V11.3333ZM1.42857 11.3333H0V15.5833C0 16.3582 0.647143 17 1.42857 17H5.71429V15.5833H1.42857V11.3333ZM1.42857 1.41667H5.71429V0H1.42857C0.647143 0 0 0.64175 0 1.41667V5.66667H1.42857V1.41667ZM2.85714 2.83333H17.1429V14.1667H2.85714V2.83333ZM5.71429 11.3333H14.2857V5.66667H5.71429V11.3333ZM14.2857 0V1.41667H18.5714V5.66667H20V1.41667C20 0.64175 19.3529 0 18.5714 0H14.2857Z'
      />
    </svg>
  );
}
