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

export default function Indicator(props) {
  return (
    <svg
      width={props.width === undefined ? '19' : props.width}
      height={props.height === undefined ? '19' : props.height}
      viewBox='0 0 19 19'
      fill={!props.color ? '#fff' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <circle
        cx='9.5'
        cy='9.5'
        r='9.4'
        fill={!props.color ? '#fff' : props.color}
        fillOpacity='0.2'
        stroke={!props.color ? '#fff' : props.color}
        strokeWidth='0.2'
      />
      <g filter='url(#filter0_d)'>
        <circle
          cx='9.50085'
          cy='9.49999'
          r='4.23913'
          fill={!props.color ? '#fff' : props.color}
        />
      </g>
      <defs>
        <filter
          id='filter0_d'
          x='0.261719'
          y='2.26086'
          width='18.4783'
          height='18.4783'
          filterUnits='userSpaceOnUse'>
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          />
          <feOffset dy='2' />
          <feGaussianBlur stdDeviation='2.5' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
}
