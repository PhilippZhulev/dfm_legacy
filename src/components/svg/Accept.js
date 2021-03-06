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

export default function Accept(props) {
  return (
    <svg
      width={props.width === undefined ? '10' : props.width}
      height={props.height === undefined ? '8' : props.height}
      viewBox='0 0 10 8'
      fill={!props.color ? '#fff' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M7.85328 0.808227C8.26211 0.376547 8.95503 0.394793 9.34058 0.847391L9.40737 0.925794C9.74294 1.31973 9.72254 1.90461 9.36033 2.2742L4.76472 6.96348C4.3726 7.36359 3.72832 7.36355 3.33624 6.96341L0.653528 4.22548C0.28558 3.84996 0.271242 3.25365 0.620715 2.86088L0.667947 2.8078C1.05892 2.36838 1.74285 2.35966 2.14491 2.78896L4.05045 4.82358L7.85328 0.808227Z'
        fill='#05C985'
      />
    </svg>
  );
}
