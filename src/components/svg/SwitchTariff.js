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
/**
  * @param  {object} props
  */
export default function Copy(props) {
  return (
    <svg
      width={props.width === undefined ? '18' : props.width}
      height={props.height === undefined ? '18' : props.height}
      viewBox='0 0 18 18'
      fill={!props.color ? '#fff' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path d="M17.9621 0.308609C17.9377 0.249636 17.9015 0.194385 17.8536 0.146447C17.8056 0.0985082 17.7504 0.062339 17.6914 0.0379391C17.6324 0.0134926 17.5678 0 17.5 0H13C12.7239 0 12.5 0.223858 12.5 0.5C12.5 0.776142 12.7239 1 13 1H16.2929L0.646447 16.6464C0.451184 16.8417 0.451184 17.1583 0.646447 17.3536C0.841709 17.5488 1.15829 17.5488 1.35355 17.3536L17 1.70711V5C17 5.27614 17.2239 5.5 17.5 5.5C17.7761 5.5 18 5.27614 18 5V0.5C18 0.432205 17.9865 0.367562 17.9621 0.308609Z" fill="#869AAC"/>
      <path d="M11.8536 11.1464C11.6583 10.9512 11.3417 10.9512 11.1464 11.1464C10.9512 11.3417 10.9512 11.6583 11.1464 11.8536L16.2929 17H13C12.7239 17 12.5 17.2239 12.5 17.5C12.5 17.7761 12.7239 18 13 18H17.5C17.7761 18 18 17.7761 18 17.5V13C18 12.7239 17.7761 12.5 17.5 12.5C17.2239 12.5 17 12.7239 17 13V16.2929L11.8536 11.1464Z" fill="#869AAC"/>
      <path d="M1.85355 1.14645C1.65829 0.951184 1.34171 0.951184 1.14645 1.14645C0.951184 1.34171 0.951184 1.65829 1.14645 1.85355L6.14645 6.85355C6.34171 7.04882 6.65829 7.04882 6.85355 6.85355C7.04882 6.65829 7.04882 6.34171 6.85355 6.14645L1.85355 1.14645Z" fill="#869AAC"/>
    </svg>
  );
}